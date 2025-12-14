import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What is Meridian?",
      answer: "Meridian is a beautiful, modern time zone converter and meeting planner designed for global teams. It helps you compare times across 200+ cities worldwide, plan meetings, and never miss a call."
    },
    {
      question: "How many cities are supported?",
      answer: "Meridian supports over 200 cities across all major time zones worldwide, including major business centers, capitals, and popular destinations."
    },
    {
      question: "Can I pin my favorite cities?",
      answer: "Yes! You can pin your frequently used cities to the top of the list for quick access. Just click the pin icon on any time zone card."
    },
    {
      question: "What is Time Travel Mode?",
      answer: "Time Travel Mode allows you to adjust the displayed time for all cities simultaneously. This is perfect for planning meetings at specific times in the future or past."
    },
    {
      question: "Does Meridian work offline?",
      answer: "Meridian is a web application that requires an internet connection to load initially. However, once loaded, basic time calculations work offline."
    },
    {
      question: "Is Meridian free to use?",
      answer: "Yes, Meridian is completely free to use. There are no subscriptions, hidden fees, or premium features."
    },
    {
      question: "Can I share meeting times with my team?",
      answer: "Absolutely! Use the Share button to generate a formatted schedule that you can copy or add directly to Google Calendar."
    },
    {
      question: "Does Meridian support dark mode?",
      answer: "Yes! Meridian has a beautiful dark mode that you can toggle using the theme button in the header."
    },
    {
      question: "What is the Focus Timer?",
      answer: "The Focus Timer is a built-in Pomodoro-style timer that helps you stay focused during work sessions. It includes multiple alarm sounds and wake lock support."
    },
    {
      question: "How accurate are the time zone conversions?",
      answer: "Meridian uses the IANA Time Zone Database, which is the most accurate and up-to-date source for time zone information, including daylight saving time changes."
    },
    {
      question: "Can I compare two time zones side by side?",
      answer: "Yes! The Time Zone Comparator feature allows you to compare two cities and see a visual timeline of their business hours overlap."
    },
    {
      question: "Is my data stored?",
      answer: "Meridian stores your pinned cities and theme preference locally in your browser. No personal data is sent to any server."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-surface-50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about Meridian and how to make the most of it.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface-card rounded-2xl border border-surface-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                aria-expanded={activeIndex === index}
              >
                <span className="font-bold text-lg text-text-primary">{faq.question}</span>
                <span className={`transform transition-transform duration-300 text-brand-500 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-transparent">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
