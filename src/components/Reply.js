import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReply, deleteReply } from '../Store/commentSlice';
import { formatDate } from '../utils/dateUtils';
import { validateComment } from '../utils/validationUtils';
import { motion } from 'framer-motion';

function Reply({ reply, commentId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(reply.text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (validateComment(reply.name, editedText)) {
      dispatch(editReply({ commentId, replyId: reply.id, text: editedText }));
      setIsEditing(false);
    } else {
      alert('Reply text cannot be empty.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this reply?')) {
      dispatch(deleteReply({ commentId, replyId: reply.id }));
    }
  };

  return (
    <motion.div 
      className="reply"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="reply-header">
        <strong>{reply.name}</strong>
        <span>{formatDate(reply.date)}</span>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{reply.text}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button className="delete-btn" onClick={handleDelete}>X</button>
    </motion.div>
  );
}

export default Reply;