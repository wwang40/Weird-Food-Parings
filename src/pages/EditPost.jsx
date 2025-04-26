import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import PostForm from '../components/PostForm';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPost();
  }, [id]);
  
  async function fetchPost() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  }
  
  const handleUpdatePost = async (postData) => {
    try {
      setUpdating(true);
      setError('');
      
      const { error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', id);
      
      if (error) throw error;

      navigate(`/post/${id}`);
      
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post. Please try again.');
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) return <p className="text-center mt-20">Loading post...</p>;
  if (error) return <p className="error text-center mt-20">{error}</p>;
  if (!post) return <p className="text-center mt-20">Post not found</p>;
  
  return (
    <div className="edit-post">
      <h1 className="text-center mb-20 mt-20">Edit Your Food Combination</h1>
      
      <Link to={`/post/${id}`} style={{ marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Post
      </Link>
      
      <div className="card">
        <PostForm 
          initialData={post} 
          onSubmit={handleUpdatePost} 
          buttonText={updating ? 'Updating...' : 'Update Post'}
        />
      </div>
    </div>
  );
}

export default EditPost;