import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';

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

export function usePaginatedPosts(searchText: string = '', pageSize = 10, page = 0, refresh = 0) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchPosts()
      .then((response) => {
        if (!isMounted) return;
        let data = response.data;

        let results: Post[] = (data.results || data).map((post: any) => ({
          ...post,
          createdAt: post.created_datetime,
        }));

        if (searchText) {
          const lower = searchText.toLowerCase();
          results = results.filter(post => {
            const username = post.username ? post.username.toLowerCase() : '';
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
        setPosts(results.slice(start, end));
        setTotalCount(results.length);
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Failed to fetch posts');
        setLoading(false);
      });
    return () => { isMounted = false; };
  }, [page, pageSize, searchText, refresh]);

  return { posts, loading, error, totalCount };
}
