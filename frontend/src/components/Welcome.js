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
          justify-content: center;
          align-items: center;
          gap: 40px;
          padding: 30px 10px;
          flex-wrap: wrap;
          max-width: 1100px;
          margin: 0 auto;
        }
        .welcome-left, .welcome-right {
          flex: 1 1 400px;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .welcome-logo {
          width: 180px;
          height: 120px;
          margin-bottom: 24px;
          object-fit: contain;
        }
        .welcome-main-text {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 12px;
          line-height: 1.3;
          color: #024a86;
          max-width: 320px;
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
        .video-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 8px 3px rgba(5, 121, 178, 0.2);
          transition: box-shadow 0.3s ease;
          max-width: 480px;
        }
        .video-wrapper:hover {
          box-shadow: 0 0 12px 4px rgba(5, 121, 178, 0.3);
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        .info-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #024a86;
          margin-bottom: 16px;
          max-width: 320px;
        }
        footer {
          width: 100%;
          text-align: center;
          color: #0579b2;
          font-size: 0.9rem;
          padding: 15px 0;
          user-select: none;
        }
        footer a {
          color: #0579b2;
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .welcome-container {
            flex-direction: column;
            padding: 40px 16px 20px;
          }
          .welcome-left, .welcome-right {
            max-width: 100%;
          }
          .welcome-main-text,
          .info-text {
            max-width: 100%;
          }
          .welcome-button {
            max-width: 100%;
          }
          .video-wrapper {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="welcome-wrapper">
        <div className="welcome-container">
          <div className="welcome-left">
            <img src={logo} alt="Logo" className="welcome-logo" />
            <p className="welcome-main-text">O lugar que garante a sua segurança virtual.</p>
            <button className="welcome-button" onClick={() => navigate("/login")}>
              Iniciar Sessão
            </button>
          </div>

          <div className="welcome-right">
            <p className="info-text">Para mais informações assista ao nosso vídeo.</p>
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID"
                title="Para mais informações"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <footer>
          © {new Date().getFullYear()} Bolha Digital. Todos os direitos reservados.
          <p>
            Criado por{" "}
            <a
              href="https://github.com/luanabernardo/Bolha-Digital"
              target="_blank"
              rel="noopener noreferrer"
            >
              TechMangueGirls
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Welcome;

