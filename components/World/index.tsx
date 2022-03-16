import React, { useRef, Suspense, useState, useCallback, useEffect, useMemo } from 'react';
import { useProgress, useGLTF } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { useStyles } from './styles';
import * as THREE from "three";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useSpring, animated } from '@react-spring/three'
import { useDispatch, useSelector } from 'react-redux';
import { setModelLoadedPercent } from '../../redux/actions/bootstrap.actions';
import { IRootReducer } from '../../redux/reducers';
import { getTerminalAnimationComplete } from '../../redux/selectors/bootstrap.selectors';
//import Model from "./Model";

function Model({ url } : { url: string }) {
    const { scene, nodes }:any = useGLTF(url, true);
    useMemo(() => Object.values(nodes).forEach((obj:any) =>
        obj.isMesh && Object.assign(obj, { castShadow: true,  })), [nodes])
    return <primitive object={scene} dispose={null} />;
}

const Lights = () => {
    return (
      <>
        <ambientLight intensity={1.5} castShadow />
      </>
    );
  };


const MeshWorld : React.FC<{ terminalAnimationComplete : boolean }> = ({ terminalAnimationComplete }) => {
    const [ zoom, setZoom ] = useState(false);
    const { scale } = useSpring({ scale: zoom ? 3: 0 })
    const mesh = useRef<any>(null);

    const { progress } = useProgress();

    const handleModelLoad = useCallback(() => {
        if (progress == 100 && terminalAnimationComplete ) setZoom(true); 
    }, [ progress, terminalAnimationComplete ]);

    useEffect(() => {
        handleModelLoad();
    }, [ handleModelLoad]);

    return (
        <Suspense fallback={null}>
            <animated.mesh 
                rotation={[0, -140 * (Math.PI / 180), 0]} 
                scale={scale} ref= {mesh} 
                position={[0, -5, 0]}
            >
                <Model url={"./assets/desk.glb"} />
            </animated.mesh>
            {/* <Model /> */}
        </Suspense>
    )
}

const World = () => {
    gsap.registerPlugin(ScrollTrigger);
   
    const viewRef = useRef<HTMLElement | null>(null);
    const { progress, } = useProgress();
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((state:IRootReducer) => state);
    const terminalAnimationComplete = getTerminalAnimationComplete(state);

    const handleModelLoad = useCallback(() => {
        dispatch(setModelLoadedPercent(progress));
    }, [ progress ]);

    useEffect(() => {
        handleModelLoad();
    }, [ handleModelLoad]);

    return (
        <section style={{ opacity: 1  }} ref={viewRef} className={classes.container}>
            <Canvas
                gl={{ 
                    antialias: true,
                    autoClear: true,
                }}
                onCreated={(ctx) => { 
                    ctx.gl.physicallyCorrectLights = true;
                }}
                className={classes.canvas}
                dpr={(Math.min(window.devicePixelRatio), 2)}
                camera={{ position: [0, 70, 150], fov: 20, zoom: 1 }}>
                {/* Lights Component */}
                <OrbitControls
                    enableZoom={true}
                    rotateSpeed={0.5}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                />
                <Lights />
                <MeshWorld terminalAnimationComplete={terminalAnimationComplete}/>
            </Canvas>
        </section>
    )
}

export default World; 
