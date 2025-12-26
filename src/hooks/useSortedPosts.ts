import { useMemo } from 'react';
import type { Post } from '../components/PostCardCreation/types/PostForm.types';

export type SortOrder = 'newest' | 'oldest';

export function useSortedPosts(posts: Post[], sortOrder: SortOrder) {
  return useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
    });
  }, [posts, sortOrder]);
}
