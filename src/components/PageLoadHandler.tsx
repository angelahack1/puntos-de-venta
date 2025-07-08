'use client';

import { useEffect } from 'react';

interface PageLoadHandlerProps {
  children: React.ReactNode;
}

export default function PageLoadHandler({ children }: PageLoadHandlerProps) {
  useEffect(() => {
    // Function to execute when DOM is ready
    const handleDOMReady = () => {
      console.log('DOM is ready for product catalog!');
      
      // Code that needs DOM but doesn't need images to be loaded
      // Example: Set up form validation, initialize UI components
      
      // Example: Initialize tooltips
      // initializeTooltips();
      
      // Example: Set up keyboard shortcuts
      // setupKeyboardShortcuts();
    };

    // Function to execute when page is fully loaded
    const handlePageLoad = () => {
      console.log('Product catalog page is fully loaded!');
      
      // Your custom JavaScript code here
      // Examples:
      // - Initialize analytics
      // - Set up event listeners
      // - Load third-party libraries
      // - Perform DOM manipulations
      window.setTimeout(() => {
        document?.querySelector("body > nextjs-portal")?.setAttribute("style", "display: none !important;");
      }, 100);
      // Example: Track page view (replace with your analytics code)
      console.log('Page loaded at:', new Date().toISOString());
      console.log('Current URL:', window.location.href);
      
      // Example: Initialize a custom library
      // initializeCustomLibrary();
      
      // Example: Set up scroll tracking
      // setupScrollTracking();
      
      // Example: Add custom event listeners
      // document.addEventListener('scroll', handleScroll);
      
      // Example: Initialize third-party widgets
      // initializeWidgets();
    };

    // Check current state and set up listeners
    if (document.readyState === 'complete') {
      handleDOMReady();
      handlePageLoad();
    } else if (document.readyState === 'interactive') {
      handleDOMReady();
      window.addEventListener('load', handlePageLoad);
    } else {
      document.addEventListener('DOMContentLoaded', handleDOMReady);
      window.addEventListener('load', handlePageLoad);
    }

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMReady);
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  return <>{children}</>;
} 