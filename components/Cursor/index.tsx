import { useTheme } from "@mui/styles";
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
        
        setTimeout(() =>{
            if (!cursorRef.current) return; 
            cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`; 
        }, 0);
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

    const { palette } = useTheme();

    return (
        <div 
            style={{ 
                display: isMobile ? "none" : "initial",
                transition: "200ms ease",
                width: 20,
                height: 20,
                position: "fixed",
                backgroundColor: "transparent",
                top: 0,
                left: 0,
                borderRadius: "50%",
                border: `2px solid ${palette.secondary.main}`,
                zIndex: 999,
                pointerEvents: "none",
                mixBlendMode: "difference",
            }}
            ref={cursorRef} className={classes.cursor}>    
        </div>
    )
}

export default Cursor; 