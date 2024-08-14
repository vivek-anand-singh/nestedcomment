import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import { motion } from 'framer-motion';

function CommentList() {
  const comments = useSelector(state => state.list) || [];
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'desc' 
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <motion.div 
      className="comment-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
        Sort {sortOrder === 'desc' ? 'Oldest First' : 'Newest First'}
      </button>
      {sortedComments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </motion.div>
  );
}

export default CommentList;