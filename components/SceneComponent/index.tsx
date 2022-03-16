import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

type SceneComponentProps = {
    antialias?: any
    engineOptions?: any 
    adaptToDeviceRatio?: any
    sceneOptions?: any
    onRender?: any
    onSceneReady?: any
}

const SceneComponent : React.FC<SceneComponentProps> = ({ 
    antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
      const scene = new Scene(engine, sceneOptions);
      if (scene.isReady()) {
        onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }
        scene.render();
      });

      const resize = () => {
        scene.getEngine().resize();
      };

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [ reactCanvas ]);

  return <canvas ref={reactCanvas} {...rest} />;
};

export default SceneComponent; 