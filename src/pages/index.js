import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Head from 'next/head';

const AnimatedLetter = ({ letter, delay }) => (
  <motion.span
    initial={{ opacity: 1, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, delay }}
  >
    {letter}
  </motion.span>
);

export default function Home() {
  const [showLogo, setShowLogo] = useState(false);
  const [showMarquee, setShowMarquee] = useState(false);
  const [currentText, setCurrentText] = useState([]);
  const texts = ["STAY TUNED!!!", "STAY TUNED!!!"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const animateText = (text, index = 0, isAppearing = true) => {
    if (index <= text.length && isAppearing) {
      setCurrentText([...text.slice(0, index)]);
      setTimeout(() => animateText(text, index + 1, true), 100);
    } else if (index >= 0 && !isAppearing) {
      setCurrentText([...text.slice(0, index)]);
      setTimeout(() => animateText(text, index - 1, false), 100);
    } else {
      if (isAppearing) {
        setTimeout(() => animateText(text, text.length - 1, false), 3000);
      } else {
        setCurrentTextIndex((currentTextIndex + 1) % texts.length);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 500);
    setTimeout(() => {
      setShowMarquee(true);
      animateText(texts[currentTextIndex].split(''));
    }, 1000);
  }, [currentTextIndex]);

  return (
    <>
    <Head>
      <meta name="description" content="EBIV Clothing is an innovative venture poised to disrupt Chennai's streetwear scene. We leverage the distinctive properties of terry cotton to craft a line that resonates with global fashion trends, yet remains deeply rooted in the local culture. Our focus on customization and quality at affordable prices uniquely positions us in a rapidly evolving market."/>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:image' content="/x.png"/>
      <link rel='icon' href='/l100px.png' />
      <title>Ebiv Clothing</title>
    </Head>
    <div className="overflow-hidden w-full h-screen relative">
      <motion.div
        className="bg-[url('/bg.png')] bg-cover bg-no-repeat w-full h-screen flex items-center justify-center z-10"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ position: 'relative' }}
      >
        {showMarquee && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="text-opacity-80 font-bold font-hj text-6xl text-black whitespace-nowrap animate-marquee">
              {'COMING SOON ·   '.repeat(1000)}
            </div>
          </div>
        )}
        {showLogo && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              animate={{ y: ["0%", "-5%", "0%"] }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
              <Image 
                src="/logo.png" 
                alt="Brand Logo" 
                width={900} 
                height={300}
                layout="intrinsic"
              />
            </motion.div>
            <h1 className='text-[40px] md:text-[80px] font-na  text-red-600'>
              {currentText.map((letter, index) => (
                <AnimatedLetter key={index} letter={letter} delay={index * 0.1} />
              ))}
            </h1>
          </motion.div>
        )}
      </motion.div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-80%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
    </>
  );
}
