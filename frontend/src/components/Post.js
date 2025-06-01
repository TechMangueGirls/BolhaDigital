import React from "react";
import BottomNavigation from "./BottomNavigation"; 
import LogoutButton from "./LogoutBottom";
import LogoFixa from "./LogoFixa";

const Post = () => {
  return (
    <div className="page-container">
      <h1>Postar</h1>
      <p>Crie e compartilhe algo com a comunidade.</p>

      {/* Rodapé fixo */}
      <footer className="page-footer">
         <LogoutButton />
          <LogoFixa/>
        <BottomNavigation />
      </footer>
    </div>
  );
};

export default Post;
