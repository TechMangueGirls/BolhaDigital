import React from 'react';
import './BottomNavigation.css';

function BottomNavigation() {
  return (
    <div className="bottom-navigation">
      <div className="nav-icon">
        <img src="/img/missoes.png" alt="Missões" className="icon-image" />
      </div>
      <div className="nav-icon">
        <img src="/img/post.png" alt="Post" className="icon-image" />
      </div>
      <div className="nav-icon home">
        <img src="/img/casa.png" alt="Início" className="icon-image" />
      </div>
      <div className="nav-icon">
        <img src="/img/like.png" alt="Like" className="icon-image" />
      </div>
      <div className="nav-icon user">
        <img src="/img/perfil.png" alt="Perfil" className="icon-image" />
      </div>
    </div>
  );
}

export default BottomNavigation;
