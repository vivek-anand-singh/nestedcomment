// src/store/commentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    list: []
  },
  reducers: {
    addComment: (state, action) => {
        state.list.push({
          id: Date.now().toString(),
          name: action.payload.name,
          text: action.payload.text,
          date: new Date().toISOString(),
          replies: [], 
        });
      },
    editComment: (state, action) => {
      const comment = state.list.find(c => c.id === action.payload.id);
      if (comment) {
        comment.text = action.payload.text;
      }
    },
    deleteComment: (state, action) => {
      state.list = state.list.filter(comment => comment.id !== action.payload);
    },
    addReply: (state, action) => {
        const addReplyToComment = (comments) => {
          return comments.map(comment => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Date.now().toString(),
                    name: action.payload.name,
                    text: action.payload.text,
                    date: new Date().toISOString(),
                    replies: []
                  }
                ]
              };
            } else if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: addReplyToComment(comment.replies)
              };
            }
            return comment;
          });
        };
      
        state.list = addReplyToComment(state.list);
      },
    editReply: (state, action) => {
      const comment = state.list.find(c => c.id === action.payload.commentId);
      if (comment) {
        const reply = comment.replies.find(r => r.id === action.payload.replyId);
        if (reply) {
          reply.text = action.payload.text;
        }
      }
    },
    deleteReply: (state, action) => {
      const comment = state.list.find(c => c.id === action.payload.commentId);
      if (comment) {
        comment.replies = comment.replies.filter(reply => reply.id !== action.payload.replyId);
      }
    },
  },
});

export const { 
  addComment, 
  editComment, 
  deleteComment, 
  addReply, 
  editReply, 
  deleteReply 
} = commentSlice.actions;

export default commentSlice.reducer;