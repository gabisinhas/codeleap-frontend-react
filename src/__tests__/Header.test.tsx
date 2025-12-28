import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';

describe('Header', () => {
  it('renders the blog title', () => {
    render(<Header username="testuser" />);
    expect(screen.getByText(/codeleap network/i)).toBeInTheDocument();
  });
});
