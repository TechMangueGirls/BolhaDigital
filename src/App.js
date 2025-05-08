import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import FeedItem from './components/FeedItem';
import BottomNavigation from './components/BottomNavigation';
import FloatingActionButton from './components/FloatingActionButton';
import './App.css'; // Importe o arquivo de estilos global

function App() {
  const feedData = [
    {
      author: 'André',
      handle: 'andrezin',
      content: 'Hoje, quero compartilhar uma música que sempre me faz sentir bem: "Happy" do Pharrell Williams!',
      likes: 10,
    },
    {
      author: 'André',
      handle: 'andrezin',
      content: 'Uma ótima maneira de relaxar, explorar a natureza e manter a forma.',
      image: '/images/bicycle.jpg',
    },
  ];

  return (
    <div className="app-container">
      <ProfileHeader />
      <div className="feed">
        {feedData.map((post, index) => (
          <FeedItem key={index} post={post} />
        ))}
      </div>
      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
}

export default App;