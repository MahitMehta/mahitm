import React, { ReactChild, useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import styles from "./styles.module.css";

export interface ModalProps {
    open: boolean,
    setOpen: (e:boolean) => void; 
    children?: ReactChild,
    title?: string; 
}

const Modal : React.FC<ModalProps> = ({ title, open, setOpen, children }) => {
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflowY = "auto";
    }, [ open ]);

    return (
        <div 
            aria-hidden={!open}
            style={{ 
                WebkitPerspective: 1000,
                WebkitFontSmoothing: "antialiased",
                WebkitTransformStyle: "preserve-3d",
                WebkitBackfaceVisibility: "hidden",
                MozTransition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                WebkitTransition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundColor: "rgba(0, 0, 0, 0.25)"
            }} 
            className={`flex top-0 left-0 scrollbar-hide ${ open ? styles.modal_open : "pointer-events-none" } opacity-0 overflow-hidden transition-all overflow-y-auto fixed h-screen right-0 left-0 z-50 justify-center items-center md:inset-0 h-modal"`}>
            <div className="flex justify-center relative px-4 md:px-0 py-[15px] h-screen w-full max-w-md">
                <div 
                    style={{
                        WebkitPerspective: 1000,
                        WebkitFontSmoothing: "antialiased",
                        WebkitTransformStyle: "preserve-3d",
                        WebkitBackfaceVisibility: "hidden",
                        transform: `${open ? "translateY(0)" : "translateY(100px)"} translateZ(0)`,
                        WebkitTransform: `${open ? "translateY(0)" : "translateY(100px)"} translateZ(0)`,
                    }}
                    className={`transition-transform flex items-center overflow-auto relative rounded-lg`}>
                    <div style={{ backgroundColor: "#111111", borderColor: "rgba(255, 255, 255, 0.1)" }} className="h-min my-autorounded-lg shadow rounded-md border-[1px] border-solid">
                        <div className="flex justify-between items-center p-3 px-5  border-b border-gray-600">
                            <h1 className="text-xl font-medium capitalize text-white">
                                { title }
                            </h1>
                            <button 
                                aria-label="hide modal"
                                name="hide modal"
                                onClick={() => { setOpen(false) }} 
                                type="button" 
                                className="text-gray-400 bg-transparent border-b-4 border-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="small-modal">
                                <XIcon style={{ width: 22.5 }} />  
                            </button>
                        </div>
                        {
                            children && children
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Modal; 