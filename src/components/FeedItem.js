import React from 'react';
import './FeedItem.css'; // Importe o arquivo de estilos específico

function FeedItem({ post }) {
  return (
    <div className="feed-item">
      <div className="post-header">
        <div className="profile-picture small">
          <img src="/images/default-profile.png" alt={post.author} />
        </div>
        <div className="author-info">
          <div className="name">{post.author}</div>
          <div className="handle">@{post.handle}</div>
        </div>
    
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Imagem da Publicação" className="post-image" />}
      </div>
      <div className="post-actions">
        <div className="action-icon">🔗</div>
        <div className="action-link">Comentários</div>
        <div className="action-icon like">❤️</div>
      </div>
    </div>
  );
}

export default FeedItem;