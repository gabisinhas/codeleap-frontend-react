import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PostCard from '../components/PostCardEdit/PostCard';

// Mock the API module
vi.mock('../services/api', () => ({
  updatePost: vi.fn(),
  deletePost: vi.fn(),
}));

// Mock MUI icons to prevent file handle issues
vi.mock('@mui/icons-material/Warning', () => ({
  __esModule: true,
  default: () => <div data-testid="warning-icon" />,
}));

// Mock the ConfirmDialog component to avoid loading all MUI dependencies
vi.mock('../components/common/ConfirmDialog', () => ({
  __esModule: true,
  default: ({ open, children, ...props }: any) => 
    open ? <div data-testid="confirm-dialog">{children}</div> : null,
}));

describe('PostCard', () => {
  const post = {
    id: 1,
    username: 'testuser',
    title: 'Test Post',
    content: 'This is a test post',
    createdAt: '2025-12-27T12:00:00Z',
    currentUser: 'testuser',
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders post title and content', () => {
    render(<PostCard {...post} />);
    
    // Check for the exact title text
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    
    // Check for the exact content text  
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
    
    // Check for the username
    expect(screen.getByText('@testuser')).toBeInTheDocument();
  });
});
