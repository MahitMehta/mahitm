import type { NextPage } from 'next'
import Head from 'next/head'
import clsx from 'clsx';
import { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useStyles } from './styles';
import ProjectsPreview from '../components/ProjectsPreview';
import Skills from '../components/Skills';
import Terminal from '../components/Terminal';
import { IRootReducer } from '../redux/reducers';
import { getTerminalAnimationComplete } from '../redux/selectors/bootstrap.selectors';
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import dynamic from 'next/dynamic';

const Cursor = dynamic(() => import("../components/Cursor"), { ssr: false });
const World = dynamic(() => import("../components/World"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const Home: NextPage = () => {
  const classes = useStyles();
  const worldRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const state = useSelector((state:IRootReducer) => state);
  const terminalAnimationComplete = getTerminalAnimationComplete(state);

  useEffect(() => {
      document.body.style.overflowY = terminalAnimationComplete ? "auto" : "hidden";
  }, [ terminalAnimationComplete ]);

  const handleScrollDown = useCallback(() => {
      gsap.timeline({
          repeat: 0,
          scrollTrigger: {
              trigger: introRef.current,
              scrub: true,
          }
      })
      .fromTo(worldRef.current, {
          y: 0, opacity: 1
      }, { y: -150, opacity: 0 });
  }, [ worldRef, introRef ]);

  useEffect(handleScrollDown, [ handleScrollDown ]);

  const pointerRef = useRef<HTMLSpanElement | null>(null);

  const pointerAnimation = useCallback(() => {
      const animation = gsap.timeline({
          repeat: -1,
      })
      .to(pointerRef.current, { y: 0, duration: 2.5,  })
      .to(pointerRef.current, { y: 10, duration: 2.5, })
      .to(pointerRef.current, { y: 0, duration: 2.5, });

      return () => animation.kill();
  }, [ pointerRef ]);

  useEffect(() => {
     pointerAnimation();
  }, [ pointerAnimation ]);
  
  return (
    <>
        <Head>
            <title>About | Mahit's Portfolio</title>
        </Head>
        <Cursor />
        <div className={classes.container}>
            <div className={classes.bg}></div>
            <div ref={worldRef} className={classes.world}>
                <World />
            </div>
            <Terminal />
            <main className={clsx(classes.contentSection, terminalAnimationComplete && classes.contentSectionDisplay)}>
                <div className={classes.content} style={{ zIndex: 1, }}>
                    <header className={classes.header}>
                        <p className={classes.greeting}>👋 Hello, I&apos;m Mahit.</p>
                        <h1 className={classes.text}>Developer</h1>
                        <h1 className={classes.text}>& Designer</h1>
                        <h1 className={classes.headerCaption}>
                            Upcoming Web Architect.
                        </h1>
                    </header>
                    <div className={classes.footer}>
                        <span ref={pointerRef} >
                            <Image width={30} height={30} src="/svg/scroll-down.svg" />
                        </span>
                    </div>
                    
                </div> 
        
                <span ref={introRef}></span>
                <ProjectsPreview />
                <Skills />
                <Contact/>
                <Footer />
            </main>
            <Navbar />
        </div>
    </>
  )
}

export default Home
