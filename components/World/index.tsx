import React, { useRef, Suspense, useState, useCallback, useEffect, useMemo } from 'react';
import { useProgress, useGLTF } from "@react-three/drei";
import { useFrame, Canvas, useLoader } from "@react-three/fiber"
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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import useDimensions from '../../hooks/useDimensions';
//import Model from "./Model";
gsap.registerPlugin(ScrollTrigger);

function Model({ url } : { url: string }) {
    const { scene, nodes }:any = useLoader(
        GLTFLoader,
        url,
        (loader:any) => {
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderConfig({ type: 'js' });
          dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);
        }
    );

    useMemo(() => Object.values(nodes).forEach((obj:any) =>
        obj.isMesh && Object.assign(obj, { castShadow: true, receiveShadow:true  })), [nodes])
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

   // const { scene, nodes }:any = useGLTF("./assets/desk.glb", true);
  //  console.log(nodes, nodes?.Cube010?.geometry);

    return (
        <Suspense fallback={null}>
            {/* <group dispose={null}>
                <mesh geometry={nodes?.Cube010?.geometry} material-color="#f0bf94" position={[0.89, 1.07, -0.14]} scale={[0.07, 0.11, 0.07]}></mesh>
            </group> */}
            <animated.mesh 
                rotation={[0, -100 * (Math.PI / 180), 0]} 
                scale={scale} ref= {mesh} 
                position={[0, -5, 0]}
                castShadow 
                receiveShadow
            >
                <Model url={"./assets/desk.glb"} />
            </animated.mesh>
            {/* <Model /> */}
        </Suspense>
    )
}

const World = () => {
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

    const { width } = useDimensions();

    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);

    return (
        <section style={{ 
            opacity: 1,
            pointerEvents: isMobile ? "none" : "initial"  
        }} ref={viewRef} className={classes.container}>
            <Canvas
                frameloop='demand'
                gl={{ 
                    antialias: true,
                    autoClear: true,
                }}
                onCreated={(ctx) => { 
                    ctx.gl.physicallyCorrectLights = true;
                    ctx.gl.toneMapping = THREE.ACESFilmicToneMapping
                }}
                className={classes.canvas}
                dpr={2}
                camera={{ position: [0, 70, 150], fov: 20, zoom: 1 }}>
                {/* Lights Component */}
                <OrbitControls
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.75}
                    maxPolarAngle={Math.PI / 2.75}
                    rotateSpeed={0.5}
                    enableRotate={true}
                    autoRotate={false}
                    enablePan={false}
                    autoRotateSpeed={0.5}
                />
                <Lights />
                <MeshWorld terminalAnimationComplete={terminalAnimationComplete}/>
            </Canvas>
        </section>
    )
}

export default World; 

useGLTF.preload('./assets/desk.glb')