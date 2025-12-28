import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock all MUI icons to prevent "too many open files" error
vi.mock('@mui/icons-material', () => {
  // Create a proxy to handle any icon import dynamically
  return new Proxy({}, {
    get: (target, prop) => {
      // Return a mock React component for any icon
      return () => {
        const displayName = String(prop).replace(/([A-Z])/g, '-$1').toLowerCase();
        return React.createElement('div', { 'data-testid': `mock-icon-${displayName}` });
      };
    }
  });
});

// Also mock specific icons that might be imported individually
vi.mock('@mui/icons-material/Delete', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'delete-icon' }),
}));

vi.mock('@mui/icons-material/Edit', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'edit-icon' }),
}));

vi.mock('@mui/icons-material/Warning', () => ({
  __esModule: true,
  default: () => React.createElement('div', { 'data-testid': 'warning-icon' }),
}));
