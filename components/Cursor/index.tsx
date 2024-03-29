import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useDimensions from "../../hooks/useDimensions";
import { IRootReducer } from "../../redux/reducers";
import { getTerminalAnimationComplete } from "../../redux/selectors/bootstrap.selectors";
import { useStyles } from "./styles";

const Cursor = () => {
    const { classes } = useStyles();
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorInnerRef = useRef<HTMLDivElement | null>(null);

    const coords = useRef({ x: 0, y: 0 });

    const state = useSelector((state:IRootReducer) => state);
    const terminalAnimationComplete = getTerminalAnimationComplete(state);

    const coordX = useRef(0);
    const coordY = useRef(0);

    const { width } = useDimensions();

    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);


    const handleMouseMove = (e:MouseEvent) => {
        if (!cursorRef.current || !cursorInnerRef.current) return; 

        const { clientX, clientY } = e;

        const { width, height } = cursorRef?.current?.getBoundingClientRect(); 
        const { width:innerWidth, height:innerHeight } = cursorInnerRef?.current?.getBoundingClientRect(); 

        const cursorX = clientX - (width / 2); 
        const cursorY = clientY - (height / 2);

        const cursorInnerX = clientX - (innerWidth / 2); 
        const cursorInnerY = clientY - (innerHeight / 2);

        cursorInnerRef.current.style.transform = `translate(${cursorInnerX}px, ${cursorInnerY}px)`; 

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

    //const previousTime = useRef<number | undefined>();

    const updateMousePosition = useCallback(() => {
        if (!cursorRef.current) return; 

       /* if (previousTime.current) {
            console.log(performance.now() - previousTime.current);
        }

        previousTime.current = performance.now();*/

        coords.current.x += (coordX.current - coords.current.x) / 4;
        coords.current.y += (coordY.current - coords.current.y) / 4;

        cursorRef.current.style.transform = `translate(${coords.current.x}px, ${coords.current.y}px)`; 
        requestRef.current = window.requestAnimationFrame(updateMousePosition);
    }, [ requestRef, coords ]); // eslint-disable-line

    useEffect(() => { 
        requestRef.current = window.requestAnimationFrame(updateMousePosition) 

        return () => {
            if (!!requestRef.current) {
                window.cancelAnimationFrame(requestRef.current);
            }
        }
    }, [ updateMousePosition, requestRef ]);

   
    useEffect(() => {
        document.body.style.cursor = isMobile || (window.location.pathname === "/" && !terminalAnimationComplete) ? "initial" : "none";
    }, [ isMobile, terminalAnimationComplete ]);

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
                opacity: terminalAnimationComplete || window.location.pathname !== "/" ? 1 : 0
            }}
        >
            <div 
                ref={cursorRef} className={clsx(classes.cursor, mouseActive && classes.active)}>    
            </div>
            <div 
                ref={cursorInnerRef} 
                className={clsx(classes.cursorInner, mouseActive && classes.activeInner)} 
            />
        </div>
    )
}

export default Cursor; 