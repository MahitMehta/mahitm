import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { useProgress, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber"
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


const MeshWorld : React.FC<{ zoom: any, isMobile:boolean }> = ({ zoom, isMobile }) => {
   
    const maxZoom = useMemo(() => isMobile ? 5 : 4, [ isMobile ]);
    const { scale } = useSpring({ scale: zoom ? maxZoom : 3});
    const mesh = useRef<any>(null); 

   // const camera = useThree((state) => state.camera)

    return (
            <Suspense fallback={null}>
            <animated.mesh 
                rotation={[0,  -250 * (Math.PI / 180), 0]} 
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
    const [ zoom, setZoom ] = useState(false);
   
    const viewRef = useRef<HTMLElement | null>(null);
    const { progress, } = useProgress();
    const { classes } = useStyles();

    const { width } = useDimensions();

    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);

    const controlRef = useRef<null | any>(null);

    useEffect(() => {
        gsap.timeline({
            repeat: 0,
            scrollTrigger: {
                start: "center 70%",
                trigger: viewRef.current,
                onEnter: () => {
                    if (controlRef.current) {
                        // controlRef.current.object.rotation.x = 0;
                        // controlRef.current.object.rotation.y = 60;
                        // controlRef.current.object.rotation.z = 150;
                        // controlRef.current.update();
                       
                    }
                    setZoom(true);
                },
                onLeave: () => {
                    if (controlRef.current) {
                        controlRef.current.reset();
                    }
                },
                onLeaveBack: () => {
                    setZoom(false);
                }
            }
        })
    }, [ viewRef, controlRef ]);

    return (
        <section style={{
                opacity: progress === 100 ? 1 : 0, 
                pointerEvents: isMobile ? "none" : "initial"  
            }} ref={viewRef} className={classes.container}>
            <Canvas
                gl={{ 
                    antialias: true,
                    autoClear: true,
                }}
                style={{ 
                    width: "100%",
                }}
                onCreated={(ctx) => { 
                    ctx.gl.physicallyCorrectLights = true;
                }}
                dpr={(Math.min(window.devicePixelRatio), 2)}
                camera={{ 
                    position: [
                        10, 60, 150
                    ], fov: 20
                }}>
                {/* Lights Component */}
                <OrbitControls
                    ref={controlRef}
                    enableZoom={false}
                    rotateSpeed={0.5}
                    autoRotate={true}
                    enablePan={false}
                    panSpeed={2}
                    enableDamping={true}
                    enableRotate={!isMobile}
                    autoRotateSpeed={0.5}
                />
                <Lights />
                <MeshWorld zoom={zoom} isMobile={isMobile} />
            </Canvas>
        </section>
    )
}

export default Chest; 
