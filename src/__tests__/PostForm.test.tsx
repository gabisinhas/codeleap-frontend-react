import { render, screen } from '@testing-library/react';
import PostForm from '../components/PostCardCreation/PostForm';

describe('PostForm', () => {
  it('renders post form fields', () => {
    render(
      <PostForm
        currentUser="testuser"
        onCreate={() => {}}
      />
    );
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  });
});
