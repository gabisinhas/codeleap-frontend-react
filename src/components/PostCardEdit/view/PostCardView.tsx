import React from 'react';
import type { PostCardProps } from '../types/PostCard.types';
import { usePostCardController } from '../controller/usePostCardController';
import ConfirmDialog from '../../common/ConfirmDialog';

const PostCardView: React.FC<PostCardProps> = (props) => {
  const { 
    isOwner, 
    handleDeleteClick, 
    handleConfirmDelete, 
    handleCancelDelete, 
    showConfirmDialog 
  } = usePostCardController(props);

  return (
    <>
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
          {isOwner ? (
            <span>
              <button
                aria-label="Delete"
                onClick={handleDeleteClick}
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
          ) : null}
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

      <ConfirmDialog
        open={showConfirmDialog}
        title="localhost:5173 diz"
        message="Are you sure you want to delete this item?"
        confirmText="OK"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        severity="warning"
      />
    </>
  );
};

export default PostCardView;
