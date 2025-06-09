import React from 'react';
import GabyPhoto from '../assets/img/Gaby.webp';
import AnaPhoto from '../assets/img/Ana.webp';
import LuaPhoto from '../assets/img/Lua.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const styles = {
  sobreNosContainer: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 900,
    margin: '0 auto',
    padding: '80px 20px 20px',
    color: '#333',
    lineHeight: 1.5,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#035f8d',
    marginBottom: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 22,
    color: '#035f8d',
    marginBottom: 15,
    borderBottom: '2px solid #035f8d',
    paddingBottom: 4,
  },
  teamMembers: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
  },
  teamMemberCard: {
    backgroundColor: '#f8faff',
    borderRadius: 8,
    boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
    padding: 10,
    textAlign: 'center',
    width: 180,
  },
   memberPhoto: {
  width: 80,
  height: 80,
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center 40%',
  marginBottom: 10,
  border: '2px solid #035f8d',
},
memberPhotoGaby: {
  width: 80,
  height: 80,
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center 30%', 
  marginBottom: 10,
  border: '2px solid #035f8d',
},
  memberName: {
    fontSize: 16,
    marginBottom: 4,
    color: '#02476b',
  },
  memberRole: {
    fontStyle: 'italic',
    fontSize: 13,
    marginBottom: 8,
    color: '#555',
  },
  memberBio: {
    fontSize: 14,
  },
  linkIcon: {
    color: '#035f8d',
    margin: '0 4px',
    textDecoration: 'none',
  },
  sectionContent: {
    fontSize: 18,
    marginBottom: 14,
    color: '#333',
  },
  footer: {
    marginTop: 40,
    paddingTop: 10,
    borderTop: '1px solid #ccc',
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    color: '#035f8d',
    textDecoration: 'none',
  },
  '@media (max-width: 700px)': {
    teamMembers: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 15,
    },
    teamMemberCard: {
      width: '90%',
      maxWidth: 300,
    },
  },
};

const SobreNos = () => {
  return (
    <div style={styles.sobreNosContainer}>
      <h1 style={styles.title}>Sobre Nós</h1>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Por trás da bolha: conheça as fundadoras</h2>
        <div style={styles.teamMembers}>
          {[{
            photo: AnaPhoto,
            alt: "Ana Mendes",
            name: "Ana Mendes",
            role: "Frontend & Performance",
            github: "https://github.com/Anacarlamends",
            linkedin: "https://www.linkedin.com/in/anacarlamendess/"
          }, {
            photo: LuaPhoto,
            alt: "Luana Bernardo",
            name: "Luana Bernardo",
            role: "Gerente de Projeto & UX/UI",
            github: "https://github.com/luanabernardo",
            linkedin: "https://www.linkedin.com/in/luana-bernardo-155623241/"
          }, {
            photo: GabyPhoto,
            alt: "Gabriely Xavier",
            name: "Gabriely Xavier",
            role: "Backend & DBA",
            github: "https://github.com/GabyXavierr",
            linkedin: "https://www.linkedin.com/in/gabriely-xavier/"
          }].map(({ photo, alt, name, role, github, linkedin }) => (
            <div key={name} style={styles.teamMemberCard}>
              <img
                src={photo}
                alt={alt}
                style={name === "Gabriely Xavier" ? styles.memberPhotoGaby : styles.memberPhoto}
              />
              <h3 style={styles.memberName}>{name}</h3>
              <p style={styles.memberRole}>{role}</p>
              <p style={styles.memberBio}>
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub da ${name}`} style={styles.linkIcon}>
                  <FontAwesomeIcon icon={faGithub} />
                </a>{' | '}
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn da ${name}`} style={styles.linkIcon}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Nossa História</h2>
        <p style={styles.sectionContent}>
          TechMangueGirls, fundada em 2025 e inspirada no Manguebeat, une cultura, tecnologia e representatividade feminina.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Nossa Missão</h2>
        <p style={styles.sectionContent}>
         Criamos espaços digitais baseados em respeito e empatia, promovendo bem-estar, impacto social e uso responsável da tecnologia.
        </p>
      </section>

      <footer style={styles.footer}>
        <a href="https://github.com/luanabernardo/Bolha-Digital" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>
          &copy; {new Date().getFullYear()} Bolha Digital. Todos os direitos reservados.
        </a>
      </footer>
    </div>
  );
};

export default SobreNos;
