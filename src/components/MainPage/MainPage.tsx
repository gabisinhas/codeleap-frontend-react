import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PostForm from '../PostCardCreation/PostForm';
import PostCardList from '../PostCardList/PostCardList';
import { useSortedPosts } from '../../hooks/useSortedPosts';
import { usePaginatedPosts } from '../../hooks/usePaginatedPosts';
import type { SortOrder } from '../../hooks/useSortedPosts';
import type { Post } from '../PostCardCreation/types/PostForm.types';
import SuccessSnackbar from '../common/SuccessSnackbar';
import ErrorSnackbar from '../common/ErrorSnackbar';

interface MainPageProps {
  username: string;
  posts: Post[];
  onCreate: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  onDelete: (id: number) => void;
}


const MainPage: React.FC<MainPageProps> = ({ username, onCreate, onDelete }) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState('');

  const {
    posts,
    loading,
    error,
    totalCount
  } = usePaginatedPosts(search, pageSize, page, refresh);
  
  const sortedPosts = useSortedPosts(posts, sortOrder);
  const totalPages = Math.ceil((totalCount || 0) / pageSize);



  React.useEffect(() => {
    setPage(0);
  }, [pageSize]);


  const handleDelete = (id: number) => {
    setRefresh(r => r + 1);
    if (onDelete) onDelete(id);
  };

  const handleCreate = (post: Omit<Post, 'id' | 'createdAt'>) => {
    setRefresh(r => r + 1);
    if (onCreate) onCreate(post);
  };

  const handleDeleteSuccess = (_message: string) => {
    setDeleteSuccessOpen(true);
  };

  const handleDeleteError = (message: string) => {
    setDeleteErrorMsg(message);
    setDeleteErrorOpen(true);
  };

  return (
    <Box maxWidth={700} mx="auto" mt={3} mb={2}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mt: 0 }}>
        <img
          src="/banner.png"
          alt="Blog Banner"
          style={{
            width: '100%',
            maxHeight: 165,
            objectFit: 'cover',
            borderRadius: '0 0 6px 6px',
          }}
        />
        <Box p={2} pt={2}>
          <Box display="flex" flexDirection="column" gap={3}>
            <PostForm currentUser={username} onCreate={handleCreate} />
            {totalCount > 0 && (
              <Box display="flex" justifyContent="center" mb={1}>
                <Box display="flex" alignItems="center" gap={2} maxWidth={600} width="100%" justifyContent="center">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', flex: 1, maxWidth: 220 }}
                    aria-label="Search posts"
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="page-size-label">Posts per page</InputLabel>
                    <Select
                      labelId="page-size-label"
                      value={pageSize}
                      label="Posts per page"
                      onChange={e => setPageSize(Number(e.target.value))}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={40}>40</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="sort-label">Sort by</InputLabel>
                    <Select
                      labelId="sort-label"
                      value={sortOrder}
                      label="Sort by"
                      onChange={e => setSortOrder(e.target.value as SortOrder)}
                    >
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            )}
            <Box>
              {/* Loading state for initial load */}
              {loading && posts.length === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={200} gap={2}>
                  <CircularProgress 
                    size={50} 
                    thickness={4}
                    sx={{ 
                      color: '#7695EC',
                      '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                      },
                    }} 
                  />
                  <Typography 
                    variant="h6" 
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Carregando posts...
                  </Typography>
                </Box>
              ) : (
                <>
                  <PostCardList
                    posts={sortedPosts}
                    currentUser={username}
                    onDelete={handleDelete}
                    onEdit={() => setRefresh(r => r + 1)}
                    onDeleteSuccess={handleDeleteSuccess}
                    onDeleteError={handleDeleteError}
                  />
                  {loading && (
                    <Box 
                      display="flex" 
                      flexDirection="column"
                      alignItems="center" 
                      justifyContent="center"
                      my={4}
                      gap={2}
                    >
                      <CircularProgress 
                        size={40} 
                        thickness={4}
                        sx={{ 
                          color: '#7695EC',
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }} 
                      />
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        Carregando posts...
                      </Typography>
                    </Box>
                  )}
                  {error && (
                    <Box color="error.main" textAlign="center" my={2}>{error}</Box>
                  )}
                  {totalPages > 1 && (
                    <Box display="flex" justifyContent="center" alignItems="center" gap={2} my={2}>
                      <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #7695EC', background: page === 0 ? '#eee' : '#fff', color: '#7695EC', cursor: page === 0 ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                      >
                        Prev
                      </button>
                      <span style={{ fontWeight: 600 }}>
                        Page {page + 1} of {totalPages}
                      </span>
                      <button
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #7695EC', background: page === totalPages - 1 ? '#eee' : '#fff', color: '#7695EC', cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                      >
                        Next
                      </button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
      <SuccessSnackbar 
        open={deleteSuccessOpen} 
        onClose={() => setDeleteSuccessOpen(false)} 
        message="Your post was deleted successfully!" 
      />
      <ErrorSnackbar 
        open={deleteErrorOpen} 
        onClose={() => setDeleteErrorOpen(false)} 
        message={deleteErrorMsg} 
      />
    </Box>
  );
};

export default MainPage;
