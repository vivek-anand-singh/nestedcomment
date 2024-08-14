import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../Store/commentSlice';
import { validateComment } from '../utils/validationUtils';
import { motion } from 'framer-motion';

function CommentForm() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateComment(name, text)) {
      dispatch(addComment({ name, text }));
      setName('');
      setText('');
    } else {
      alert('Please enter both name and comment.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your Comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </motion.div>
  );
}

export default CommentForm;