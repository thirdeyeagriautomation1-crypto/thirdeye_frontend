import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/1234567890?text=Hello, I would like to inquire about your irrigation systems', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
