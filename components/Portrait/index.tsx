import { isNull } from "lodash";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getCloudinaryURL } from "../../utils/getCloudinaryURL";

const PARTICLE_SPEED = 100; 
const PARTICLE_COMEBACK_SPEED = 10; 
const PARTICLE_MAX_DISTANCE = 10000;
const MOUSE_RADIUS =35;

interface ICursor {
    x: number; 
    y: number;
    onCanvas: boolean;  
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

    constructor(x:number, y:number, color:string, canvas:HTMLCanvasElement, graphic:HTMLImageElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.x = x + this.canvas.width / 2 - graphic.width * 2, // Center X
        this.y = y + this.canvas.height / 2 - graphic.height*2, // Center Y 
        this.size=2; 
        this.color = color; 
        this.baseX = x + this.canvas.width / 2 - graphic.width*2, // original x
        this.baseY = y + this.canvas.height / 2 - graphic.height*2, // original y 
        this.density = 	(Math.random() * PARTICLE_SPEED)+2;
    }
    public draw() : void {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    public update(cursor:ICursor) : void {
        this.ctx.fillStyle=this.color;

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
    const cursor = useRef<ICursor>({ x: 0, y: 0, onCanvas: false });

    const graphic = useMemo(() : HTMLImageElement => {
        const src = getCloudinaryURL("self_portrait.png", { 
            resize: {
                type: 'scale',
                width: 100,
            }
        });
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src; 
        img.loading = "eager";
        return img; 
    }, []);

    const init = useCallback(( data ) => {
        const canvas = canvasRef.current; 
        if (!canvas) return; 
        particleArray.current = [];
    
        for (let y = 0; y < data.height; y++) {
            for (let x = 0; x < data.width; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX=x;
                    let positionY=y;
    
                    let rVal = data.data[(y * 4 * data.width) + (x * 4)];
                    let gVal = data.data[(y * 4 * data.width) + (x * 4) + 1];
                    let bVal = data.data[(y * 4 * data.width) + (x * 4) + 2];
                        
                    let color= `rgb(${rVal}, ${gVal},${bVal})`;
                    particleArray.current.push(new Particle(positionX * 4, positionY * 4, color, canvas, graphic));
                }
            }
        }
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current; 
        const ctx = canvas?.getContext("2d"); 

        requestAnimationFrame(animate);
        if (isNull(ctx) || ctx === undefined || !cursor.current) return; 

        ctx.fillStyle='rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,innerWidth,innerHeight);

        for(let i=0; i < particleArray.current.length; i++){
            particleArray.current[i].update(cursor.current);
        }
                
    }, []);

    const drawGraphic = useCallback((ctx:CanvasRenderingContext2D | null) => {
        const canvas = canvasRef.current; 
        if (isNull(ctx) || !canvas) return; 

        let width = graphic.width;
	    let height = graphic.height;

        const data = ctx.getImageData(0,0, width,height);
        ctx.clearRect(0,0, canvas.width, canvas.height);

        init(data);
        animate();

    }, [ graphic, canvasRef ]);

    const handleMouseMove = (e:MouseEvent) => {
        if (!canvasRef.current) return; 
        const { clientX, clientY } = e;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        const updatedCoords = { x: clientX - left, y: clientY - top };  
        setMouseCoords(updatedCoords);
        assistantCoords.current = updatedCoords;
        cursor.current = { ...cursor.current, onCanvas: true };
    };  

    useEffect(() => {
        if (!canvasRef.current) return; 
        canvasRef.current.addEventListener("mousemove", handleMouseMove);
        return () => {
            if (!canvasRef.current) return; 
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
        }
    }, [ canvasRef ]);

    const handleMouseLeave = () => {
        cursor.current = { ...cursor.current, onCanvas: false };
    }

    useEffect(() => {
        if (!canvasRef.current) return; 
        canvasRef.current.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            if (!canvasRef.current) return; 
            canvasRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
    }, [ canvasRef ]);

    const requestRef = useRef<number | undefined>();

    const updateMousePosition = useCallback(() => {
        mouseCoords.x += (assistantCoords.current.x - mouseCoords.x) / 8;
        mouseCoords.y += (assistantCoords.current.y - mouseCoords.y) / 8;

        cursor.current = { ...cursor.current, x: mouseCoords.x, y: mouseCoords.y };
        requestAnimationFrame(updateMousePosition);
    }, [ requestRef ]); // eslint-disable-line

    useEffect(() => { requestRef.current = requestAnimationFrame(updateMousePosition) }, [ updateMousePosition ]);

    useEffect(() => {
        if (!canvasRef.current) return; 

        const ctx = canvasRef.current?.getContext("2d");

        graphic.onload = () => {
            ctx?.drawImage(graphic, 0, 0);
            drawGraphic(ctx);
        };

    }, [ canvasRef, graphic ]);

    return (
        <canvas height={500} width={350} ref={canvasRef}></canvas>
    )
}

export default React.memo(Portrait);