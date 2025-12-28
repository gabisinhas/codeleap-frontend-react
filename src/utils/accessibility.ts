// Accessibility utilities for consistent app-wide implementation
export const a11y = {
  // Screen reader only text for complex actions
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: 0,
  },

  // Focus management
  focusRing: {
    outline: '2px solid #1976d2',
    outlineOffset: '2px',
  },

  // Color contrast helpers
  colors: {
    primary: '#1976d2', // WCAG AA compliant
    primaryDark: '#115293',
    error: '#d32f2f',
    warning: '#ed6c02',
    success: '#2e7d32',
    textPrimary: '#212121',
    textSecondary: '#757575',
    disabled: '#bdbdbd',
  },

  // Responsive breakpoints consistent with MUI
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },

  // Common ARIA patterns
  getAriaProps: (type: 'button' | 'form' | 'dialog' | 'alert', label: string, describedBy?: string) => {
    const base = { 'aria-label': label };
    
    switch (type) {
      case 'button':
        return { ...base, role: 'button', tabIndex: 0 };
      case 'form':
        return { ...base, role: 'form' };
      case 'dialog':
        return { ...base, role: 'dialog', 'aria-modal': true, ...(describedBy && { 'aria-describedby': describedBy }) };
      case 'alert':
        return { ...base, role: 'alert', 'aria-live': 'assertive' };
      default:
        return base;
    }
  },

  // Keyboard navigation helpers
  handleKeyboard: (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  },

  // Skip link for keyboard navigation
  skipLink: {
    position: 'absolute' as const,
    top: '-40px',
    left: '6px',
    background: '#1976d2',
    color: 'white',
    padding: '8px',
    textDecoration: 'none',
    zIndex: 1000,
    borderRadius: '0 0 4px 4px',
    '&:focus': {
      top: '6px',
    },
  },
};

// Responsive design utilities
export const responsive = {
  // Container max-widths
  container: {
    xs: '100%',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1400px',
  },

  // Common spacing patterns
  spacing: {
    xs: { p: 0.25, m: 0.125 },
    sm: { p: 0.75, m: 0.25 },
    md: { p: 1.5, m: 0.75 },
    lg: { p: 2.5, m: 1.25 },
  },

  // Typography scales
  typography: {
    h1: { xs: '1.25rem', sm: '1.375rem', md: '1.625rem' },
    h2: { xs: '1rem', sm: '1.25rem', md: '1.375rem' },
    h3: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
    body: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
    caption: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
  },

  // Button sizes
  button: {
    small: { xs: 20, sm: 24, md: 28 },
    medium: { xs: 24, sm: 28, md: 32 },
    large: { xs: 28, sm: 32, md: 36 },
  },

  // Grid helpers
  grid: {
    post: { xs: 12, sm: 12, md: 8, lg: 6 },
    sidebar: { xs: 12, sm: 12, md: 4, lg: 6 },
    form: { xs: 12, sm: 10, md: 8, lg: 6, xl: 4 },
  },
};