import { motion } from 'framer-motion';

const Particle = () => {
  const randomProps = {
    initialX: `${Math.random() * 100}%`,
    duration: 6 + Math.random() * 14,
    delay: Math.random() * 5,
    size: 2 + Math.random() * 4,
    opacity: 0.12 + Math.random() * 0.18,
    yOffset: -(40 + Math.random() * 120),
  };

  return (
    <motion.div
      className="hero-particle"
      style={{
        left: randomProps.initialX,
        width: randomProps.size,
        height: randomProps.size,
      }}
      animate={{
        y: [0, randomProps.yOffset],
        opacity: [randomProps.opacity, 0],
      }}
      transition={{
        duration: randomProps.duration,
        repeat: Infinity,
        delay: randomProps.delay,
        ease: 'linear',
      }}
    />
  );
};

interface FloatingTokenProps {
  children: string;
  x: string;
  y: string;
  delay: number;
}

const FloatingToken = ({ children, x, y, delay }: FloatingTokenProps) => (
  <motion.span
    className="hero-floating-token"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    animate={{
      opacity: [0, 0.7, 0.7, 0],
      scale: [0.6, 1, 1, 0.8],
      y: [20, 0, 0, -10],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      times: [0, 0.1, 0.8, 1],
    }}
  >
    {children}
  </motion.span>
);

const CODE_TOKENS = ['</>', '{ }', '=>', '[]', '&&', '||', 'const', 'await', '::', '##'];

const HeroBackground = () => (
  <>
    <div className="hero-particles-container">
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle key={i} />
      ))}
    </div>
    <div className="hero-tokens-container">
      {CODE_TOKENS.map((token, i) => (
        <FloatingToken
          key={token}
          x={`${8 + Math.random() * 84}%`}
          y={`${5 + Math.random() * 90}%`}
          delay={i * 0.8}
        >
          {token}
        </FloatingToken>
      ))}
    </div>
  </>
);

export default HeroBackground;
