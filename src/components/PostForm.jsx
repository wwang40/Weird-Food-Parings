import { useState } from 'react';

function PostForm({ initialData, onSubmit, buttonText = 'Create Post' }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    onSubmit({
      title,
      content,
      image_url: imageUrl
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Pickles and Peanut Butter"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Description (Optional)</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell us about this weird combination! Why does it work?"
          rows="5"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL (Optional)</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default PostForm;