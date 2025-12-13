import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-50 text-text-primary">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">
            About Meridian
          </h1>
          <p className="text-lg text-text-secondary">
            Built for global teams who need precision and beauty
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              What is Meridian?
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Meridian is a modern, beautiful time zone converter designed specifically for global teams, remote workers, and anyone who needs to coordinate across multiple time zones. Whether you're scheduling a meeting with colleagues in Tokyo, New York, and London, or just trying to figure out what time it is in your favorite city, Meridian makes it effortless.
            </p>
            <p className="text-text-secondary leading-relaxed">
              With support for over 200 cities worldwide, real-time updates, and an intuitive interface, Meridian helps you never miss a call or meeting again.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Key Features
            </h2>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-text-primary">200+ Cities:</strong> Comprehensive coverage of major cities and time zones worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-text-primary">Real-time Updates:</strong> Live clock that updates every second</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-text-primary">Time Travel Mode:</strong> Adjust time to plan future or past meetings</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-text-primary">Meeting Planner:</strong> Share meeting times with your team instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-text-primary">Focus Timer:</strong> Built-in Pomodoro timer for productivity</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-text-primary">Dark Mode:</strong> Beautiful themes for any preference</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Meridian is built using cutting-edge web technologies to ensure fast performance, reliability, and a great user experience:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
                <div key={tech} className="bg-surface-card rounded-xl p-4 border border-surface-200 text-center">
                  <span className="font-semibold text-text-primary">{tech}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Privacy & Data
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Your privacy is important to us. Meridian stores your preferences (pinned cities and theme) locally in your browser. No personal data is collected, stored on servers, or shared with third parties. Everything runs in your browser.
            </p>
          </section>

          <section className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-8 border border-brand-200 dark:border-brand-800">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Built by Designbyte Studio
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Meridian is crafted with care by Designbyte Studio, a team passionate about creating beautiful, functional web applications that solve real problems for global teams.
            </p>
            <a
              href="https://studio.designbyte.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold transition-colors"
            >
              Visit Designbyte Studio
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

