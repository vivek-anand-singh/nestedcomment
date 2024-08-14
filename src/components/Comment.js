import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, addReply } from '../Store/commentSlice';
import Reply from './Reply';
import { formatDate } from '../utils/dateUtils';
import { validateComment } from '../utils/validationUtils';
import { motion } from 'framer-motion';

function Comment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (validateComment(comment.name, editedText)) {
      dispatch(editComment({ id: comment.id, text: editedText }));
      setIsEditing(false);
    } else {
      alert('Comment text cannot be empty.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(comment.id));
    }
  };

  const handleReply = () => {
    if (validateComment(replyName, replyText)) {
      dispatch(addReply({ commentId: comment.id, name: replyName, text: replyText }));
      setReplyName('');
      setReplyText('');
    } else {
      alert('Please enter both name and reply.');
    }
  };

  const renderNestedComments = (nestedComments) => {
    if (!nestedComments || nestedComments.length === 0) {
      return null;
    }
    return nestedComments.map(nestedComment => (
      <Comment key={nestedComment.id} comment={nestedComment} />
    ));
  };

  return (
    <motion.div
      className="comment"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="comment-header">
        <strong>{comment.name}</strong>
        <span>{formatDate(comment.date)}</span>
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
          <p>{comment.text}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button className="delete-btn" onClick={handleDelete}>X</button>
      <div className="reply-form">
        <input
          type="text"
          value={replyName}
          onChange={(e) => setReplyName(e.target.value)}
          placeholder="Your Name"
        />
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Your Reply"
        />
        <button onClick={handleReply}>Reply</button>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="nested-comments">
          {renderNestedComments(comment.replies)}
        </div>
      )}
    </motion.div>
  );
}

export default Comment;