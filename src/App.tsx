import React, { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics, trackPerformance, trackPageView } from './components/Analytics';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./components/Pages/About'));
const FAQ = lazy(() => import('./components/Pages/FAQ'));

// Loading component
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-surface-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-secondary">Loading...</p>
    </div>
  </div>
);

// Track page views on route change
const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize performance tracking
    trackPerformance();
  }, []);

  return (
    <Router>
      <Analytics />
      <PageTracker />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
