import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post }) {
  return (
    <div className="card">
      <div className="flex justify-between">
        <small>
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </small>
        <div className="flex align-center gap-10">
          <span title="Upvotes">👍 {post.upvotes}</span>
        </div>
      </div>
      <Link to={`/post/${post.id}`}>
        <h2 style={{ marginTop: '10px', color: 'var(--dark-color)' }}>{post.title}</h2>
      </Link>
    </div>
  );
}

export default PostCard;