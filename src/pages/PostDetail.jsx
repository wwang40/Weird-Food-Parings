import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '../client';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);
  
  async function fetchPost() {
    try {
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
  
  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }
  
  async function handleUpvote() {
    try {
      const newUpvotes = (post.upvotes || 0) + 1;
      
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: newUpvotes })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setPost({ ...post, upvotes: newUpvotes });
    } catch (err) {
      console.error('Error upvoting post:', err);
    }
  }
  
  async function handleAddComment(content) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ content, post_id: id }])
        .select();
      
      if (error) throw error;
      
      setComments([...comments, data[0]]);
      
      return data;
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  }
  
  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      await supabase
        .from('comments')
        .delete()
        .eq('post_id', id);
      
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post');
    }
  }
  
  if (loading) return <p className="text-center mt-20">Loading post...</p>;
  if (error) return <p className="error text-center mt-20">{error}</p>;
  if (!post) return <p className="text-center mt-20">Post not found</p>;
  
  return (
    <div className="post-detail mt-20">
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        &larr; Back to Home
      </Link>
      
      <div className="card">
        <div className="flex justify-between">
          <small>
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </small>
          <div className="flex align-center gap-10">
            <span>👍 {post.upvotes || 0}</span>
            <button onClick={handleUpvote} style={{ padding: '5px 10px' }}>Upvote</button>
          </div>
        </div>
        
        <h1 style={{ margin: '15px 0' }}>{post.title}</h1>
        
        {post.image_url && (
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="post-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            }}
          />
        )}
        
        {post.content && <p style={{ marginBottom: '20px' }}>{post.content}</p>}
        
        <div className="flex justify-between mt-20">
          <Link to={`/edit/${post.id}`}>
            <button className="secondary">Edit Post</button>
          </Link>
          <button className="danger" onClick={handleDelete}>Delete Post</button>
        </div>
      </div>
      
      <div className="comments-section mt-20">
        <h2>Comments ({comments.length})</h2>
        <div className="divider"></div>
        
        <CommentForm postId={id} onCommentAdded={handleAddComment} />
        
        <div className="comments-list mt-20">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;