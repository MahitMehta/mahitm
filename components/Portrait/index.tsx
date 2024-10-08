import { isNull } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getCloudinaryURL } from "../../utils/getCloudinaryURL";

const PARTICLE_SPEED = 100; 
const PARTICLE_COMEBACK_SPEED = 10; 
const PARTICLE_MAX_DISTANCE = 10000;
const MOUSE_RADIUS = 35;
const CANVAS_RESET = 1500; // arbitrary value; should find a better value dynamically

interface ICursor {
    x: number; 
    y: number;
    onCanvas: boolean;  
    shouldRender: boolean;
}

class Particle {
    x:number; 
    y:number; 
    color:string; 
    canvas:HTMLCanvasElement;
    ctx:CanvasRenderingContext2D
    size:number; 
    baseX:number; 
    baseY:number; 
    density:number; 

    constructor(x:number, y:number, color:string, canvas:HTMLCanvasElement, graphic:HTMLImageElement, ctx:CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x + this.canvas.width / 2 - graphic.width * (2 / 1), // Center X
        this.y = y + this.canvas.height / 2 - graphic.height * (2 / 1), // Center Y 
        this.size=2; 
        this.color = color; 
        this.baseX = x + this.canvas.width / 2 - graphic.width * (2 / 1), // original x
        this.baseY = y + this.canvas.height / 2 - graphic.height * (2 / 1), // original y 
        this.density = 	(Math.random() * PARTICLE_SPEED)+2;
    }
    public draw() : void {
        // this.ctx.lineWidth = this.size * 2;
        // this.ctx.lineCap = 'round';
        // this.ctx.beginPath();
        // this.ctx.moveTo(this.x, this.y);
        // this.ctx.lineTo(this.x, this.y);
        // this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.ctx.closePath();
        this.ctx.fill();
    }
    public update(cursor:ICursor) : void {
        // this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;

        let dx= cursor.x-this.x;
        let dy= cursor.y-this.y;
        let distance = Math.sqrt(dx*dx+dy*dy);
        
        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;
        
        // distance --> maxDistance; force --> 1
        // more distance = more force
        // les distance = less force 
        
        let force = (PARTICLE_MAX_DISTANCE - distance)/ PARTICLE_MAX_DISTANCE;
        if(force<0)force=0;

        let directionX = (forceDirectionX*force*this.density*0.6);
        let directionY = (forceDirectionY*force *this.density*0.6);
        
        // distance < circle radius + pixel c

        if((distance < MOUSE_RADIUS + this.size + PARTICLE_MAX_DISTANCE * 0) && cursor.onCanvas) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if(this.x !== this.baseX){
                let dx=this.x-this.baseX;
                this.x-=dx / PARTICLE_COMEBACK_SPEED;
            }if(this.y !== this.baseY){
                let dy=this.y-this.baseY;
                this.y-=dy / PARTICLE_COMEBACK_SPEED;
            }
        }

        this.draw();
    }
}

const Portrait : React.FC<{}> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particleArray = useRef<Particle[]>([]);

    const [ mouseCoords, setMouseCoords ] = useState({ x: 0, y: 0 }); 
    const assistantCoords = useRef({ x: 0, y: 0 });
    const cursor = useRef<ICursor>({ x: 0, y: 0, onCanvas: false, shouldRender: false });

    const portraitRequestAnimationFrameId = useRef<number>(0);
    const cursorRequestAnimationFrameId = useRef<number>(0);

    const graphic = useMemo(() : HTMLImageElement => {
        const src = getCloudinaryURL("portrait_v7.png", { 
            resize: {
                type: 'scale',
                width: 100,
            },
            format: "png"
        });
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src; 
        img.loading = "eager";
        return img; 
    }, []);

    const init = useCallback(( data, ctx ) => {
        const canvas = canvasRef.current; 
        if (!canvas) return; 
        particleArray.current = [];
    
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX=x;
                    let positionY=y + 7;
    
                    let rVal = data.data[(y * 4 * data.width) + (x * 4)];
                    let gVal = data.data[(y * 4 * data.width) + (x * 4) + 1];
                    let bVal = data.data[(y * 4 * data.width) + (x * 4) + 2];
                        
                    if (rVal <= 4 && gVal <= 4 && bVal <= 4) continue;

                    let color= `rgb(${rVal},${gVal},${bVal})`;
                    particleArray.current.push(new Particle(positionX * (4 / 1), positionY * (4 / 1), color, canvas, graphic, ctx));
                }
            }
        }
    }, [ canvasRef.current ]);

    const animationAllowed = useMemo(() => {
        return !!!navigator.userAgent.match(/(webOS|iPhone|iPad|iPod|Blackberry|Android|CrOS)/)?.length;
    }, [ navigator.userAgent ]);

    const drawPixels = useCallback(() => {
        for(let i=0; i < particleArray.current.length; i++){
            particleArray.current[i].update(cursor.current);
        }
    }, []);

    const animate = useCallback((ctx, frameId) => {
        if (animationAllowed) {
            const requestId = requestAnimationFrame(animate.bind(undefined, ctx, ));
            portraitRequestAnimationFrameId.current = requestId;
        }

        if (isNull(ctx) || ctx === undefined || !cursor.current) return; 
  
        if (!frameId) {
            drawPixels();
            drawPixels();
        }

        if (!cursor.current.shouldRender) return; 
        else {
            ctx.fillStyle='rgba(0,0,0,0.25)';
            ctx.fillRect(0,0,innerWidth,innerHeight);
        }

        drawPixels();
    }, [ portraitRequestAnimationFrameId, animationAllowed ]);

    const drawGraphic = useCallback((ctx:CanvasRenderingContext2D | null) => {
        if (!!portraitRequestAnimationFrameId.current) window.cancelAnimationFrame(portraitRequestAnimationFrameId.current);

        const canvas = canvasRef.current; 
        if (isNull(ctx) || !canvas) return; 

        let width = graphic.width;
	    let height = graphic.height;

        const data = ctx.getImageData(0,0, width,height);
        ctx.clearRect(0,0, canvas.width, canvas.height);

        init(data, ctx);
        animate(ctx, undefined);

    }, [ graphic, canvasRef, animationAllowed ]);

    const handleMouseMove = (e:MouseEvent) => {
        if (!canvasRef.current) return; 
        const { clientX, clientY } = e;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        const updatedCoords = { x: clientX - left, y: clientY - top };  
        setMouseCoords(updatedCoords);
        assistantCoords.current = updatedCoords;
        cursor.current = { ...cursor.current, onCanvas: true, shouldRender: true };
    };  

    useEffect(() => {
        if (!canvasRef.current) return; 
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        return () => {
            if (!canvasRef.current) return; 
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
        }
    }, [ canvasRef ]);

    const renderTO = useRef<number>(-1);

    const handleMouseLeave = () => {
        cursor.current = { ...cursor.current, onCanvas: false };

        if (renderTO.current !== -1) {
            clearTimeout(renderTO.current);
        }

        renderTO.current = setTimeout(() => {
            const particle = particleArray.current.find(({ baseX, baseY, x, y }) => {
                return baseX != Math.round(x) || baseY != Math.round(y); 
            });

            if (particle) {
                handleMouseLeave(); 
                return;
            }

            if (cursor.current.onCanvas) return;

            cursor.current = { ...cursor.current, shouldRender: false };
        }, CANVAS_RESET) as unknown as number; 
    }

    useEffect(() => {
        if (!canvasRef.current) return; 
        canvasRef.current.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            if (!canvasRef.current) return; 
            canvasRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
    }, [ canvasRef ]);

    const updateMousePosition = useCallback(() => {
        mouseCoords.x += (assistantCoords.current.x - mouseCoords.x) / 8;
        mouseCoords.y += (assistantCoords.current.y - mouseCoords.y) / 8;

        cursor.current = { ...cursor.current, x: mouseCoords.x, y: mouseCoords.y };
        requestAnimationFrame(updateMousePosition);
    }, [ cursorRequestAnimationFrameId ]); // eslint-disable-line

    useEffect(() => { 
        if (!!cursorRequestAnimationFrameId.current) window.cancelAnimationFrame(cursorRequestAnimationFrameId.current);
        cursorRequestAnimationFrameId.current = requestAnimationFrame(updateMousePosition) 

        return () => {
            window.cancelAnimationFrame(cursorRequestAnimationFrameId.current);
        }
    }, [ updateMousePosition ]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current?.getContext("2d");
        if (graphic.complete) {
            ctx?.drawImage(graphic, 0, 0);
            drawGraphic(ctx);
        } else {
            graphic.onload = () => {
                ctx?.drawImage(graphic, 0, 0);
                drawGraphic(ctx);
            };
        }

        return () => {
            window.cancelAnimationFrame(portraitRequestAnimationFrameId.current);
        };
    }, [ canvasRef, graphic, animationAllowed ]);

    return (
        <canvas height={500} width={350} ref={canvasRef}></canvas>
    )
}

export default React.memo(Portrait);