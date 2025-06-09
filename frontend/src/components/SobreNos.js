import './Sobre.css';
import bolhaDigitalLogo from '../assets/img/BolhaDigital.png';
import GabyPhoto from '../assets/img/Gaby.webp';
import AnaPhoto from '../assets/img/Ana.webp';
import LuaPhoto from '../assets/img/Lua.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const SobreNos = () => {
  return (
    <div className="sobre-nos-container">
      {/* Logo acima do título */}
      <div className="logo-bolha-digital-wrapper">
        <img
          src={bolhaDigitalLogo}
          alt="Logo Bolha Digital"
          className="logo-bolha-digital"
        />
      </div>

      <h1 className="sobre-nos-title">Sobre Nós</h1>

      {/* Nossa Equipe */}
      <section className="sobre-nos-section team-section">
        <h2 className="section-heading">Por trás da bolha: conheça as fundadoras</h2>
        <div className="team-members">
          <div className="team-member-card">
            <img
              src={AnaPhoto}
              alt="Ana Mendes"
              className="member-photo"
            />
            <h3 className="member-name">Ana Mendes</h3>
            <p className="member-role">Desenvolvedora Frontend e Engenheira de Performance </p>
            <p className="member-bio">
              <a href="https://github.com/Anacarlamends" target="_blank" rel="noopener noreferrer" aria-label="GitHub da Ana">
                <FontAwesomeIcon icon={faGithub}  style={{ color: '#035f8d' }} />
              </a>
              {' | '}
              <a href="https://www.linkedin.com/in/anacarlamendess/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Ana">
                <FontAwesomeIcon icon={faLinkedin}  style={{ color: '#035f8d' }}/>
                </a>
            </p>
          </div>

          <div className="team-member-card">
            <img
              src={LuaPhoto}
              alt="Luana Bernardo"
              className="member-photo"
            />
            <h3 className="member-name">Luana Bernardo</h3>
            <p className="member-role">Gerente de projeto e Designer UX/UI</p>
            <p className="member-bio">
              <a href="https://github.com/luanabernardo" target="_blank" rel="noopener noreferrer" aria-label="GitHub da Luana">
                <FontAwesomeIcon icon={faGithub}  style={{ color: '#035f8d' }} />
              </a>
              {' | '}
              <a href="https://www.linkedin.com/in/luana-bernardo-155623241/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Luana">
                <FontAwesomeIcon icon={faLinkedin}  style={{ color: '#035f8d' }}/>
                </a>
            </p>
          </div>

          <div className="team-member-card">
            <img
              src={GabyPhoto}
              alt="Gabriely Xavier"
              className="member-photo"
            />
            <h3 className="member-name">Gabriely Xavier</h3>
            <p className="member-role">Desenvolvedora Backend e Administradora de Banco de dados</p>
            <p className="member-bio">
              <a href="https://github.com/GabyXavierr" target="_blank" rel="noopener noreferrer" aria-label="GitHub da Gabriely">
                <FontAwesomeIcon icon={faGithub}  style={{ color: '#035f8d' }} />
              </a>
              {' | '}
              <a href="https://www.linkedin.com/in/gabriely-xavier/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Gabriely">
                <FontAwesomeIcon icon={faLinkedin}  style={{ color: '#035f8d' }} />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="sobre-nos-section">
        <h2 className="section-heading">Nossa História</h2>
        <p className="section-content">
        Fundada em 2025, a TechMangueGirls reúne tecnologia, cultura e representatividade feminina, inspirada pelo movimento Manguebeat pernambucano. 
        Mais do que um projeto, é um movimento que fortalece a presença das mulheres no setor tecnológico.
        </p>
        <p className="section-content">
        A criação do Bolha Digital foi idealizada para promover um ambiente online mais justo, seguro e acolhedor.
        Acreditamos que a tecnologia pode e deve ser usada para espalhar o bem, estimular conexões saudáveis e fortalecer a presença feminina na transformação digital.

        </p>
      </section>

      {/* Nossa Missão */}
      <section className="sobre-nos-section">
        <h2 className="section-heading">Nossa Missão</h2>
        <p className="section-content">
        Nossa missão é criar e fortalecer espaços digitais positivos, onde o respeito, a empatia e a 
        colaboração estejam no centro das interações.
        </p>
        <p className="section-content">
        Com o Bolha Digital, temos como propósito impulsionar iniciativas sociais de impacto significativo, promover o bem-estar emocional e mental no ambiente digital e 
        disseminar práticas responsáveis no uso da tecnologia, com ênfase no incentivo de boas práticas e segurança.
        </p>
      </section>

     
      <footer className="sobre-nos-footer">
      
        <a
          href="https://github.com/luanabernardo/Bolha-Digital" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-copyright-link" 
        >
          &copy; {new Date().getFullYear()} Bolha Digital. Todos os direitos reservados.
        </a>
      </footer>
    </div>
  );
};

export default SobreNos;