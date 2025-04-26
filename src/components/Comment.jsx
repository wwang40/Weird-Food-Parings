import { formatDistanceToNow } from 'date-fns';

function Comment({ comment }) {
  return (
    <div className="comment" style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
      <p>{comment.content}</p>
      <small style={{ color: 'var(--gray-color)', display: 'block', marginTop: '5px' }}>
        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
      </small>
    </div>
  );
}

export default Comment;