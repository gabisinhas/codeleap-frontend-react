import { useState } from 'react';
import { usePaginatedPosts } from '../../hooks/usePaginatedPosts';

export default function PostsWithSearch() {
  const [search, setSearch] = useState('');
  const { posts, loading, totalCount } = usePaginatedPosts(search, 10, 0);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: 8, flex: 1, borderRadius: 4, border: '1px solid #ccc' }}
          aria-label="Search posts"
        />
        
        <select style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} aria-label="Posts per page">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        <select style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }} aria-label="Sort by">
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>
      <div style={{ marginBottom: 8, color: '#555' }}>Total found: {totalCount}</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map(post => (
            <li key={post.id} style={{ background: '#6d9bf7', color: '#fff', borderRadius: 8, marginBottom: 16, padding: 16 }}>
              <strong style={{ fontSize: 18 }}>{post.title}</strong> <span style={{ color: '#e0e0e0', fontSize: 12, float: 'right' }}>{post.createdAt}</span>
              <div style={{ color: '#ffe082', fontWeight: 600, marginTop: 4 }}>@{post.username}</div>
              <div style={{ color: '#fff', marginTop: 8 }}>{post.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
