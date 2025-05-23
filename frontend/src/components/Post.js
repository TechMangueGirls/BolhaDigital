import React from "react";
import BottomNavigation from "./BottomNavigation"; // importação do footer

const Post = () => {
  return (
    <div className="page-container">
      <h1>Postar</h1>
      <p>Crie e compartilhe algo com a comunidade.</p>

      {/* Rodapé fixo */}
      <footer className="page-footer">
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Post;
