import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style/BottomNavigation.css';

import missoesIcon from '../assets/img/missoes.png';
import postIcon from '../assets/img/post.png';
import casaIcon from '../assets/img/casa.png';
import likeIcon from '../assets/img/like.png';
import perfilIcon from '../assets/img/perfil.png';

function BottomNavigation() {
  const navigate = useNavigate();

  return (
    <div className="bottom-navigation">
      <div className="nav-icon" onClick={() => navigate('/missoes')}>
        <img src={missoesIcon} alt="Missões" className="icon-image" />
      </div>

      <div className="nav-icon" onClick={() => navigate('/post')}>
        <img src={postIcon} alt="Postagens" className="icon-image" />
      </div>

      <div className="nav-icon home" onClick={() => navigate('/home')}>
        <img src={casaIcon} alt="Início" className="icon-image" />
      </div>

      <div className="nav-icon" onClick={() => navigate('/likes')}>
        <img src={likeIcon} alt="Curtidas" className="icon-image" />
      </div>

      <div className="nav-icon user" onClick={() => navigate('/perfil')}>
        <img src={perfilIcon} alt="Perfil" className="icon-image" />
      </div>
    </div>
  );
}

export default BottomNavigation;

