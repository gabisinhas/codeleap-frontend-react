import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import PostCard from '../PostCardEdit/PostCard';
import type { Post } from '../PostCardCreation/types/PostForm.types';


interface PostCardListProps {
  posts: Post[];
  currentUser: string;
  onDelete: (id: number) => void;
}


const PostCardList: React.FC<PostCardListProps> = ({ posts, currentUser, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {posts.map(post => {
        const displayDate = new Date(post.createdAt).toLocaleString();
        return (
          <Box key={post.id} width="100%">
            <Fade in timeout={600}>
              <div>
                <PostCard
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  username={post.username}
                  createdAt={displayDate}
                  currentUser={currentUser}
                  onDelete={() => onDelete(post.id)}
                  onEdit={() => {}}
                />
              </div>
            </Fade>
          </Box>
        );
      })}
    </Grid>
  );
};

export default PostCardList;
