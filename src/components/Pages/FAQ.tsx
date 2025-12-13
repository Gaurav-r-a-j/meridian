import React from 'react';

const FAQ: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-surface-50 text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-secondary">
            Everything you need to know about Meridian
          </p>
        </header>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-surface-card rounded-2xl border border-surface-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <summary className="font-bold text-lg text-text-primary cursor-pointer list-none flex items-center justify-between">
                <span>{faq.question}</span>
                <svg
                  className="w-5 h-5 text-brand-500 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="mt-4 text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-8 border border-brand-200 dark:border-brand-800">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Still have questions?
          </h2>
          <p className="text-text-secondary mb-6">
            Can't find the answer you're looking for? Reach out to our support team.
          </p>
          <a
            href="https://studio.designbyte.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition-colors"
          >
            Contact Designbyte Studio
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

