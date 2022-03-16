import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { useProgress, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useStyles } from './styles';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useSpring, animated, useTransition } from '@react-spring/three'
import useDimensions from '../../hooks/useDimensions';

gsap.registerPlugin(ScrollTrigger);

function Model({ url } : { url: string }) {
    const { scene, nodes }:any = useGLTF(url, true);
    useMemo(() => Object.values(nodes).forEach((obj:any) =>
        obj.isMesh && Object.assign(obj, { castShadow: true,  })), [nodes])
    return <primitive object={scene} dispose={null} />;
}

const Lights = () => {
    return (
      <>
        <ambientLight intensity={1} castShadow />
      </>
    );
  };


const MeshWorld : React.FC<{ zoom: boolean }> = ({ zoom }) => {
    const { scale } = useSpring({ scale: zoom ? 4 : 3});
    const mesh = useRef<any>(null); 

    const { width } = useDimensions();

    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);

    return (
            <Suspense fallback={null}>
            <animated.mesh 
                rotation={[0,  -150 * (Math.PI / 180), 0]} 
                scale={scale} ref= {mesh} 
                position={[0, -7.5, 0]}
            
            >
                <Model url={"./assets/chest.glb"} />
            </animated.mesh>
            {/* <Model /> */}
        </Suspense>
    )
}

const Chest = () => {
    gsap.registerPlugin(ScrollTrigger);
   
    const viewRef = useRef<HTMLElement | null>(null);
    const { progress, } = useProgress();
    const classes = useStyles();
    const [ zoom, setZoom ] = useState(false);

    useEffect(() => {
        gsap.timeline({
            repeat: 0,
            scrollTrigger: {
                start: "center 70%",
                trigger: viewRef.current,
                onEnter: () => {
                    setZoom(true);
                },
                onLeaveBack: () => {
                    setZoom(false);
                }
            }
        })
    }, [ viewRef ]);

    return (
        <section style={{ opacity: progress === 100 ? 1 : 0, zIndex: 99 }} ref={viewRef} className={classes.container}>
            <Canvas
                gl={{ 
                    antialias: true,
                    autoClear: true,
                }}
                style={{ 
                    width: "100%"
                }}
                onCreated={(ctx) => { 
                    ctx.gl.physicallyCorrectLights = true;
                }}
                dpr={(Math.min(window.devicePixelRatio), 2)}
                camera={{ position: [0, 60, 150], fov: 20 }}>
                {/* Lights Component */}
                <OrbitControls
                    enableZoom={false}
                    rotateSpeed={0.5}
                    autoRotate={true}
                    enableRotate={true}
                    autoRotateSpeed={0.5}
                />
                <Lights />
                <MeshWorld zoom={zoom} />
            </Canvas>
        </section>
    )
}

export default Chest; 
