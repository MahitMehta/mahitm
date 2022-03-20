import React, { useEffect, useMemo, useRef } from "react";
import useDimensions from "../../hooks/useDimensions";
import { useStyles } from "./styles";

const Cursor = () => {
    const classes = useStyles();
    const cursorRef = useRef<HTMLDivElement | null>(null);

    const { width } = useDimensions();

    const handleMouseMove = (e:MouseEvent) => {
        if (!cursorRef.current) return; 
        const { clientX, clientY } = e;
        const { width, height } = cursorRef?.current?.getBoundingClientRect(); 
        const cursorX = clientX - (width / 2); 
        const cursorY = clientY - (height / 2);
        
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`; 
    };  

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
        <div ref={cursorRef} className={classes.cursor} />
    )
}

export default Cursor; 