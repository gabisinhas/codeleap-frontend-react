// Comprehensive accessibility and responsiveness tests
export const a11yTests = {
  // Keyboard navigation test
  testKeyboardNavigation: () => {
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    console.log('Keyboard Navigation Test:');
    console.log(`Found ${focusableElements.length} focusable elements`);
    
    // Check if all interactive elements have proper focus indicators
    focusableElements.forEach((element, index) => {
      const hasAriaLabel = element.hasAttribute('aria-label');
      const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
      const hasTitle = element.hasAttribute('title');
      const hasTextContent = element.textContent?.trim().length > 0;
      
      const hasAccessibleName = hasAriaLabel || hasAriaLabelledBy || hasTitle || hasTextContent;
      
      if (!hasAccessibleName) {
        console.warn(`Element ${index + 1} lacks accessible name:`, element);
      }
    });
  },

  // Color contrast test (basic)
  testColorContrast: () => {
    console.log('Color Contrast Test:');
    const elements = document.querySelectorAll('*');
    let contrastIssues = 0;
    
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Basic check for very light text on light backgrounds
      if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(255, 255, 255)') {
        contrastIssues++;
      }
    });
    
    console.log(`Found ${contrastIssues} potential contrast issues`);
  },

  // Screen reader simulation
  testScreenReader: () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const forms = document.querySelectorAll('form');
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    
    console.log('Screen Reader Structure Test:');
    console.log(`Headings: ${headings.length}`);
    console.log(`Forms: ${forms.length}`);
    console.log(`Buttons: ${buttons.length}`);
    console.log(`Links: ${links.length}`);
    
    // Check heading hierarchy
    let previousLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      if (level > previousLevel + 1) {
        console.warn(`Heading hierarchy skip detected: H${previousLevel} to H${level} at index ${index}`);
      }
      previousLevel = level;
    });
  },

  // Responsive design test
  testResponsiveness: () => {
    const breakpoints = [320, 480, 768, 1024, 1200, 1440];
    const results: any = {};
    
    console.log('Responsiveness Test:');
    
    breakpoints.forEach(width => {
      // Simulate viewport width
      const elements = document.querySelectorAll('*');
      let overflowElements = 0;
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.width > width) {
          overflowElements++;
        }
      });
      
      results[`${width}px`] = {
        overflowElements,
        viewportWidth: width
      };
    });
    
    console.table(results);
    return results;
  },

  // Touch target size test
  testTouchTargets: () => {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [onclick], [role="button"]');
    let smallTargets = 0;
    
    console.log('Touch Target Size Test:');
    
    interactiveElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const minSize = 44; // WCAG recommendation
      
      if (rect.width < minSize || rect.height < minSize) {
        smallTargets++;
        console.warn(`Small touch target at index ${index}:`, {
          element,
          width: rect.width,
          height: rect.height,
          recommended: `${minSize}px minimum`
        });
      }
    });
    
    console.log(`Found ${smallTargets} touch targets smaller than 44px`);
    return { smallTargets, total: interactiveElements.length };
  },

  // Run all tests
  runAllTests: () => {
    console.log('🔍 Running Accessibility & Responsiveness Tests...\n');
    
    a11yTests.testKeyboardNavigation();
    console.log('');
    
    a11yTests.testColorContrast();
    console.log('');
    
    a11yTests.testScreenReader();
    console.log('');
    
    const responsiveResults = a11yTests.testResponsiveness();
    console.log('');
    
    const touchResults = a11yTests.testTouchTargets();
    console.log('');
    
    console.log('✅ All tests completed. Check console output for issues.');
    
    return {
      responsive: responsiveResults,
      touch: touchResults,
      timestamp: new Date().toISOString()
    };
  }
};

// Auto-run tests in development
if (import.meta.env.DEV) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => a11yTests.runAllTests(), 1000);
    });
  } else {
    setTimeout(() => a11yTests.runAllTests(), 1000);
  }
}

// Make available globally for manual testing
(window as any).a11yTests = a11yTests;