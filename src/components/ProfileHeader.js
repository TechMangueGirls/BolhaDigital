import React from 'react';
import './ProfileHeader.css'; // Importe o arquivo de estilos específico

function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="top-bar">
        <div className="left-icons">☰</div>
        <div className="logo">
          <img src="/img/logo-bolha.png" alt="Bolha Digital Logo" className="logo-image" />
        </div>
        <div className="right-icons">
  <img src="/img/notificacao.png" alt="Notificações" className="notificacao-image" />
</div>
      </div>
      <div className="profile-info">
        <div className="profile-picture">
          <img src="/images/default-profile.png" alt="Perfil" />
        </div>
        <div className="username-info">
          <div className="name">André</div>
          <div className="handle">@andrezin</div>
        </div>
        <div className="stats">
          <div className="stat-item">
            <div className="number">3000</div>
            <div className="label">Seguindo</div>
          </div>
          <div className="stat-item">
            <div className="number">40</div>
            <div className="label">Seguidores</div>
          </div>
          <div className="stat-item">
          </div>
          <div className="stat-item">
            <div className="number">25</div>
            <div className="label">Publicações</div>
          </div>
        </div>
        <div className="bio">
          <p>🎮 Gamer | 📸 Apaixonado por fotografia</p>
          <p>Explorando o mundo, um passo de cada vez</p>
          <p>🎧 Viciado em música e boas vibes</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
