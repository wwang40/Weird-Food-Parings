import { useState } from 'react';

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    
    try {
      await onCommentAdded(content);
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to add comment');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      
      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          rows="3"
        />
      </div>
      
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;