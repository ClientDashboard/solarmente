import { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="w-full text-left px-6 py-4 bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            {item.title}
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-900 text-gray-400 text-sm border-t border-gray-700">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
