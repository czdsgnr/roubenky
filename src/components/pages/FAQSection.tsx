import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  navigate?: (page: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ navigate }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "Můžeme přivézt domácího mazlíčka?",
      answer: "Bohužel, v zájmu zachování luxusního prostředí a z důvodu alergií ostatních hostů, nejsou domácí mazlíčkové v roubence povoleni. Doporučujeme kontaktovat místní penziony, které nabízejí ubytování s mazlíčky."
    },
    {
      question: "Je k dispozici parkování?",
      answer: "Ano, k dispozici je bezplatné parkování přímo u objektu pro všechna vaše vozidla. Parkovací místa jsou hlídaná a v zimním období udržovaná."
    },
    {
      question: "Jaké je vybavení kuchyně?",
      answer: "Kuchyň je plně vybavena všemi spotřebiči včetně indukčních sporáků, troub, myčky nádobí, lednice s mrazákem, kávovaru, mikrovlnky a veškerého nádobí. K dispozici je také gril pro venkovní vaření."
    },
    {
      question: "Kdy je check-in a check-out?",
      answer: "Check-in je možný od 16:00 hodin, check-out do 10:00 hodin. V případě potřeby je možné domluvit jiný čas předem. Recepce je k dispozici 24/7 pro jakékoli potřeby během vašeho pobytu."
    },
    {
      question: "Jsou v ceně zahrnuty energie?",
      answer: "Ano, všechny energie včetně elektřiny, vody, vytápění a internetového připojení jsou plně zahrnuty v ceně. Neplatíte žádné dodatečné poplatky za spotřebu."
    },
    {
      question: "Je možné zajistit catering?",
      answer: "Ano, nabízíme širokou škálu cateringových služeb od snídaní až po slavnostní večeře. Máme spolupráci s místními restauracemi a kuchaři. Catering je nutné objednat předem při rezervaci."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 mb-4">
            Časté dotazy
          </h2>
          <p className="text-lg text-gray-600 font-light">
            Odpovědi na nejčastější otázky našich hostů
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 lg:p-8 text-left transition-all duration-200"
              >
                <span className="text-lg font-normal text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-700 transition-transform duration-300 flex-shrink-0 ${
                    expandedFaq === index ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedFaq === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <p className="text-gray-600 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 font-light mb-6">
            Nenašli jste odpověď na svou otázku?
          </p>
          <button
            onClick={() => navigate?.('kontakt')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 rounded-lg"
          >
            Kontaktujte nás
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;