import React from 'react';
import type { PostCardProps } from '../types/PostCard.types';
import { usePostCardController } from '../controller/usePostCardController';

const PostCardView: React.FC<PostCardProps> = (props) => {
  const { isOwner } = usePostCardController(props);

  return (
    <div className="postcard-animated" style={{ marginBottom: 24 }}>
      <div style={{
        background: '#7695EC',
        color: 'white',
        padding: '16px',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 700,
        fontSize: 18,
      }}>
        <span>{props.title}</span>
        {isOwner && (
          <span>
            <button
              aria-label="Delete"
              onClick={props.onDelete}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginRight: 8,
                fontSize: 18,
              }}
            >
              🗑️
            </button>
            <button
              aria-label="Edit"
              onClick={props.onEdit}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              ✏️
            </button>
          </span>
        )}
      </div>
      <div style={{
        background: 'white',
        border: '1px solid #ccc',
        borderTop: 'none',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#777', fontWeight: 700 }}>@{props.username}</span>
          <span style={{ color: '#999', fontSize: 14 }}>{props.createdAt}</span>
        </div>
        <div style={{ color: '#333', fontSize: 16 }}>{props.content}</div>
      </div>
    </div>
  );
};

export default PostCardView;
