import { useState, useEffect } from 'react';
import { supabase } from '../client';
import PostCard from '../components/PostCard';
import SearchSort from '../components/SearchSort';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  async function fetchPosts() {
    try {
      setLoading(true);
      
      let query = supabase.from('posts').select('*');
      
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else if (sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true });
      } else if (sortBy === 'upvotes') {
        query = query.order('upvotes', { ascending: false });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <h1 className="text-center mb-20 mt-20">Discover Weird Food Combinations</h1>
      
      <SearchSort 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : error ? (
        <p className="error text-center">{error}</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center">No posts found. Be the first to share a weird food pairing!</p>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;