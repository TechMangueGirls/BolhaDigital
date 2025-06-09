import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          background-color: white;
          color: #0579b2;
          font-family: Arial, sans-serif;
        }
        .welcome-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .welcome-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px 10px;
          max-width: 800px;
          margin: 0 auto;
          gap: 24px;
        }
        .welcome-logo {
          width: 180px;
          height: 120px;
          margin-bottom: 16px;
          object-fit: contain;
        }
        .welcome-main-text {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.3;
          color: #024a86;
          text-align: center;
        }
        .welcome-button {
          background-color: #0579b2;
          color: white;
          font-weight: 700;
          font-size: 1.15rem;
          padding: 10px 30px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgb(5 121 178 / 0.4);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 280px;
        }
        .welcome-button:hover {
          background-color: #045a8d;
          box-shadow: 0 6px 12px rgb(4 90 141 / 0.6);
        }
        .info-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #024a86;
          text-align: center;
        }
        .video-thumbnail {
          position: relative;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 0 8px 3px rgba(5, 121, 178, 0.2);
          transition: box-shadow 0.3s ease;
        }
        .video-thumbnail:hover {
          box-shadow: 0 0 12px 4px rgba(5, 121, 178, 0.3);
        }
        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.6);
          border: none;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 28px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .play-button:hover {
          background: rgba(0, 0, 0, 0.8);
        }
        footer {
          width: 100%;
          text-align: center;
          color: #0579b2;
          font-size: 0.9rem;
          padding: 15px 0;
          user-select: none;
        }
        footer span {
          color: #0579b2;
          text-decoration: underline;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .welcome-container {
            padding: 40px 16px 20px;
          }
          .welcome-main-text,
          .info-text {
            max-width: 100%;
          }
          .welcome-button {
            max-width: 100%;
          }
          .video-thumbnail {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="welcome-wrapper">
        <div className="welcome-container">
          <img src={logo} alt="Logo" className="welcome-logo" />
          <p className="welcome-main-text">O lugar que garante a sua segurança virtual.</p>
          <button className="welcome-button" onClick={() => navigate("/login")}>
            Iniciar Sessão
          </button>

          <p className="info-text">Para mais informações assista ao nosso vídeo.</p>
          <a
            href="https://youtu.be/qhnsUwyxJrk"
            target="_blank"
            rel="noopener noreferrer"
            className="video-thumbnail"
          >
            <img
              src="https://img.youtube.com/vi/qhnsUwyxJrk/hqdefault.jpg"
              alt="Capa do vídeo"
            />
            <button className="play-button">▶</button>
          </a>
        </div>

        <footer>
          © {new Date().getFullYear()} Bolha Digital. Todos os direitos reservados.
          <p>
            Criado por{" "}
            <span onClick={() => navigate("/sobrenos")}>
              TechMangueGirls
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Welcome;
