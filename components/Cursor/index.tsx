import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDimensions from "../../hooks/useDimensions";
import { useStyles } from "./styles";

const Cursor = () => {
    const { classes } = useStyles();
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const [ coords, setCoords ] = useState({ x: 0, y: 0 });

    const coordX = useRef(0);
    const coordY = useRef(0);

    const { width } = useDimensions();

    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);


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

    const [ mouseActive, setMouseActive ] = useState(false);

    const handleMouseOver = () => {
        setMouseActive(true);
    };

    const handleMouseLeave = () => {
        setMouseActive(false);
    };

    useEffect(() => {
        const elements = document.querySelectorAll("a, button"); 
        
        if (!isMobile) {
            elements.forEach((ele) => {
                ele.addEventListener("mouseover", handleMouseOver);
                ele.addEventListener("mouseleave", handleMouseLeave)
            });
        } else {
            elements.forEach((ele) => {
                ele.removeEventListener("mouseover", handleMouseOver);
                ele.removeEventListener("mouseleave", handleMouseLeave);
            });
        }

        return () => {
            elements.forEach((ele) => {
                ele.removeEventListener("mouseover", handleMouseOver);
                ele.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [ isMobile ]);

    const requestRef = useRef<number | undefined>();

    const updateMousePosition = useCallback(() => {
        if (!cursorRef.current) return; 

        coords.x += (coordX.current - coords.x) / 8;
        coords.y += (coordY.current - coords.y) / 8;

        cursorRef.current.style.transform = `translate(${coords.x}px, ${coords.y}px)`; 
        requestAnimationFrame(updateMousePosition);
    }, [ requestRef ]); // eslint-disable-line

    useEffect(() => { requestRef.current = requestAnimationFrame(updateMousePosition) }, [ updateMousePosition ]);

   
    useEffect(() => {
        document.body.style.cursor = isMobile ? "initial" : "none";
    }, [ isMobile ]);

    useEffect(() => {
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            window.removeEventListener("mousemove", handleMouseMove) 
        }
        return () => { 
            window.removeEventListener("mousemove", handleMouseMove) 
        };
    }, [ cursorRef, isMobile ]);

    return (
        <div 
            style={{ 
                display: isMobile ? "none" : "initial",
            }}
            ref={cursorRef} className={clsx(classes.cursor, mouseActive && classes.active)}>    
        </div>
    )
}

export default Cursor; 