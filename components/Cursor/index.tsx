import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDimensions from "../../hooks/useDimensions";
import { useStyles } from "./styles";

const Cursor = () => {
    const classes = useStyles();
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const [ coords, setCoords ] = useState({ x: 0, y: 0 });

    const coordX = useRef(0);
    const coordY = useRef(0);

    const { width } = useDimensions();

    const handleMouseMove = (e:MouseEvent) => {
        if (!cursorRef.current) return; 
        const { clientX, clientY } = e;
        const { width, height } = cursorRef?.current?.getBoundingClientRect(); 
        const cursorX = clientX - (width / 2); 
        const cursorY = clientY - (height / 2);

        setCoords({ x: cursorX, y: cursorY });

        coordX.current = cursorX;
        coordY.current = cursorY;
    };  

    const requestRef = useRef<number | undefined>();

    const updateMousePosition = useCallback(() => {
        if (!cursorRef.current) return; 

        coords.x += (coordX.current - coords.x) / 8;
        coords.y += (coordY.current - coords.y) / 8;

        cursorRef.current.style.transform = `translate(${coords.x}px, ${coords.y}px)`; 
        requestAnimationFrame(updateMousePosition);
    }, [ requestRef ]); // eslint-disable-line

    useEffect(() => { requestRef.current = requestAnimationFrame(updateMousePosition) }, [ updateMousePosition ]);

    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);

    useEffect(() => {
        document.body.style.cursor = isMobile ? "initial" : "none";
    }, [ isMobile ]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => { 
            window.removeEventListener("mousemove", handleMouseMove) 
        };
    }, [ cursorRef ]);

    return (
        <div 
            style={{ display: isMobile ? "none" : "initial" }}
            ref={cursorRef} className={classes.cursor}>    
        </div>
    )
}

export default Cursor; 