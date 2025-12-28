export const a11yTests = {
  testKeyboardNavigation: () => {
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    console.log('Keyboard Navigation Test:');
    console.log(`Found ${focusableElements.length} focusable elements`);
    
      
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

  
  testColorContrast: () => {
    console.log('Color Contrast Test:');
    const elements = document.querySelectorAll('*');
    let contrastIssues = 0;
    
    elements.forEach(element => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      
      if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(255, 255, 255)') {
        contrastIssues++;
      }
    });
    
    console.log(`Found ${contrastIssues} potential contrast issues`);
  },

  
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
    
    
    let previousLevel = 0;
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      if (level > previousLevel + 1) {
        console.warn(`Heading hierarchy skip detected: H${previousLevel} to H${level} at index ${index}`);
      }
      previousLevel = level;
    });
  },

  
  testResponsiveness: () => {
    const breakpoints = [320, 480, 768, 1024, 1200, 1440];
    const results: any = {};
    
    console.log('Responsiveness Test:');
    
    breakpoints.forEach(width => {
      
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

  
  testTouchTargets: () => {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [onclick], [role="button"]');
    let smallTargets = 0;
    
    console.log('Touch Target Size Test:');
    
    interactiveElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const minSize = 44;
      
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

if (import.meta.env.DEV) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => a11yTests.runAllTests(), 1000);
    });
  } else {
    setTimeout(() => a11yTests.runAllTests(), 1000);
  }
}

(window as any).a11yTests = a11yTests;