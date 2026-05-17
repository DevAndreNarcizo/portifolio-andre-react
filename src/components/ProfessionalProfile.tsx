import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Rocket, ShieldCheck } from 'lucide-react';
import { contactInfo } from '../data';
import { useLanguage } from '../i18n';
import { text } from '../content';
import './ProfessionalProfile.css';

const ProfessionalProfile = () => {
  const { language } = useLanguage();
  const t = text[language].profile;
  const panelRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const photoRotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const photoRotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="section profile-section">
      <div className="container-wide">
        <div className="profile-grid">
          <motion.div
            ref={panelRef}
            className="profile-photo-panel reveal reveal-left"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: photoRotateX,
              rotateY: photoRotateY,
              transformPerspective: 800,
            }}
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/Imagens/Foto.webp" alt="Andre Narcizo em ambiente profissional" className="profile-photo" />
            <div className="profile-code-badge" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="profile-badge-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                </defs>
                <text>
                  <textPath href="#profile-badge-circle">
                    DEVELOPER • FULLSTACK • PRODUCTS •
                  </textPath>
                </text>
              </svg>
              <strong>&lt;/&gt;</strong>
            </div>
          </motion.div>

          <motion.div
            className="profile-content reveal reveal-right"
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-kicker">{t.kicker}</p>
            <h2 className="section-title">{t.title}</h2>
            <p className="profile-copy">
              {t.copy}
            </p>

            <div className="profile-pill-list">
              <span><Code2 size={16} /> {t.pills[0]}</span>
              <span><ShieldCheck size={16} /> {t.pills[1]}</span>
              <span><Rocket size={16} /> {t.pills[2]}</span>
            </div>

            <motion.a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary profile-link"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.cta}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProfile;
