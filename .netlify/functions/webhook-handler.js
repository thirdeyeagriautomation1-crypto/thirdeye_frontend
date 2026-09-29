/**
 * Netlify Function: GitHub Webhook Handler for Product Management
 * 
 * Receives GitHub webhook events when:
 * - A product JSON file is modified in public/products.json
 * - Product images are added to public/assets/images/products/
 * 
 * Triggers:
 * - Updates products.json from GitHub
 * - Validates product data
 * - Triggers Netlify redeploy
 */

const crypto = require('crypto');

const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const NETLIFY_BUILD_HOOK = process.env.NETLIFY_BUILD_HOOK;

/**
 * Verify GitHub webhook signature
 */
function verifyGitHubSignature(req, secret) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) return false;

  const payload = JSON.stringify(req.body);
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  const expectedSignature = `sha256=${hash}`;
  return crypto.timingSafeEqual(signature, expectedSignature);
}

/**
 * Trigger Netlify rebuild/redeploy
 */
async function triggerNetlifyDeploy() {
  if (!NETLIFY_BUILD_HOOK) {
    console.warn('⚠️  NETLIFY_BUILD_HOOK not configured. Skipping deploy.');
    return { success: false, message: 'Build hook not configured' };
  }

  try {
    const response = await fetch(NETLIFY_BUILD_HOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trigger: 'webhook',
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log('✅ Netlify deploy triggered successfully');
      return { success: true, message: 'Deploy queued' };
    } else {
      console.error('❌ Failed to trigger Netlify deploy:', response.statusText);
      return { success: false, message: response.statusText };
    }
  } catch (error) {
    console.error('❌ Error triggering Netlify deploy:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Process push event to products.json
 */
function processPushEvent(payload) {
  const { repository, pusher, ref } = payload;
  
  console.log(`📦 Push event from ${pusher.name} to ${repository.name}`);
  
  // Check if products.json or product images were modified
  const modifiedFiles = payload.head_commit?.modified || [];
  const addedFiles = payload.head_commit?.added || [];
  const files = [...modifiedFiles, ...addedFiles];

  const hasProductChanges =
    files.some(f => f.includes('products.json')) ||
    files.some(f => f.includes('assets/images/products'));

  if (hasProductChanges) {
    console.log('✅ Product changes detected. Triggering deployment...');
    return true;
  }

  console.log('ℹ️  No product changes detected in this push');
  return false;
}

/**
 * Process pull request event
 */
function processPullRequestEvent(payload) {
  const { action, pull_request } = payload;

  if (action !== 'closed' || !pull_request.merged) {
    console.log('ℹ️  PR not merged. Skipping.');
    return false;
  }

  const changedFiles = payload.pull_request?.changed_files || 0;
  console.log(`✅ PR #${pull_request.number} merged with ${changedFiles} changes`);
  
  return changedFiles > 0;
}

/**
 * Main handler
 */
exports.handler = async (event, context) => {
  try {
    // Only handle POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      };
    }

    // Verify webhook signature
    if (!GITHUB_SECRET) {
      console.warn('⚠️  GITHUB_WEBHOOK_SECRET not configured. Accepting all webhooks.');
    } else {
      if (!verifyGitHubSignature(event, GITHUB_SECRET)) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid signature' }),
        };
      }
      console.log('✅ GitHub signature verified');
    }

    const body = JSON.parse(event.body);
    const eventType = event.headers['x-github-event'];

    console.log(`📬 GitHub webhook event: ${eventType}`);

    let shouldDeploy = false;

    // Handle different webhook events
    if (eventType === 'push') {
      shouldDeploy = processPushEvent(body);
    } else if (eventType === 'pull_request') {
      shouldDeploy = processPullRequestEvent(body);
    } else if (eventType === 'workflow_run') {
      // Allow manual workflow triggers
      if (body.action === 'completed' && body.workflow_run.conclusion === 'success') {
        console.log('✅ Workflow completed successfully. Triggering deployment...');
        shouldDeploy = true;
      }
    } else {
      console.log(`⏭️  Event type '${eventType}' not configured for auto-deploy`);
    }

    // Trigger Netlify deploy if needed
    if (shouldDeploy) {
      const deployResult = await triggerNetlifyDeploy();
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Webhook processed',
          deploy: deployResult,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Webhook received but no deployment triggered' }),
    };
  } catch (error) {
    console.error('❌ Webhook handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
