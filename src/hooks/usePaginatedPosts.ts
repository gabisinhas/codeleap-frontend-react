import { useState, useEffect } from 'react';
import { useSearchFilter } from './useSearchFilter';

const MOCK_POSTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Mock Post Title ${i + 1}`,
  content: `This is the content for mock post #${i + 1}.`,
  username: `user${(i % 5) + 1}`,
  createdAt: new Date(Date.now() - i * 1000 * 60 * 10).toISOString(),
}));

export interface PaginatedPost<T> {
  results: T[];
  next: string | null;
  previous: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  createdAt: string;
}

export function usePaginatedPosts(searchText: string = '', pageSize = 10, page = 0) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(MOCK_POSTS.length);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      if (!isMounted) return;
      
      let filtered = MOCK_POSTS as Post[];
      if (searchText) {
        const lower = searchText.toLowerCase();
        filtered = filtered.filter(post => {
          const username = post.username ? post.username.toLowerCase() : '';
          // Allow search for @username or username
          const usernameVariants = [username, `@${username}`];
          return (
            (post.title && post.title.toLowerCase().includes(lower)) ||
            (post.content && post.content.toLowerCase().includes(lower)) ||
            usernameVariants.some(variant => variant.includes(lower))
          );
        });
      }
      const start = page * pageSize;
      const end = start + pageSize;
      setPosts(filtered.slice(start, end));
      setTotalCount(filtered.length);
      setLoading(false);
    }, 400);
    return () => { isMounted = false; };
  }, [page, pageSize, searchText]);

  return { posts, loading, error, totalCount };
}
