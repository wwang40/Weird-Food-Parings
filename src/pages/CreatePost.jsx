import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import PostForm from '../components/PostForm';

function CreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (postData) => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error } = await supabase
        .from('posts')
        .insert([
          { 
            ...postData,
            upvotes: 0
          }
        ])
        .select();
      
      if (error) throw error;

      navigate(`/post/${data[0].id}`);
      
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h1 className="text-center mb-20 mt-20">Share Your Weird Food Combination</h1>
      
      {error && <p className="error text-center">{error}</p>}
      
      <div className="card">
        <PostForm onSubmit={handleCreatePost} buttonText={loading ? 'Creating...' : 'Create Post'} />
      </div>
    </div>
  );
}

export default CreatePost;