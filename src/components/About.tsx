import { aboutText } from '../data';
import './About.css';

const About = () => {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <h2 className="section-title">Sobre Mim</h2>
        <div className="about-content">
          <div className="about-text">
            <p>{aboutText}</p>
            <p>
              Acredito que a excelência técnica anda de mãos dadas com a experiência do usuário. 
              Meu código é sempre limpo, bem documentado e pensado para escalabilidade. 
              Valorizo a colaboração e o trabalho em equipe, sempre buscando as melhores soluções.
            </p>
            <p>
              Estou constantemente estudando novas tecnologias, explorando tendências do mercado 
              e contribuindo para projetos open-source. Acredito no compartilhamento de conhecimento 
              e em ajudar outros desenvolvedores a evoluírem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

