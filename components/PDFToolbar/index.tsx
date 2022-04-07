import { faFileDownload, faPrint, faExpand } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import SocialButton from "../SocialButton";

const RESUME_URL_ORIGINAL = "https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume.pdf";

const PDFToolbar = () => {
    const router = useRouter();

    const handlePrint = (e:React.MouseEvent<HTMLLIElement>) => {
        const printJS = require("print-js");

        e.preventDefault();
        e.stopPropagation();

        printJS({ printable: RESUME_URL_ORIGINAL, type: "pdf"});
    }
 
    const iosDevice = useMemo(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any)?.opera; 
        return /iPad|iPhone|iPod/i.test(userAgent) && !(window as any)?.MSStream;
    }, []);


    const handleDownload = async (e:React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        e.stopPropagation();
    
        

        const file = await fetch(RESUME_URL_ORIGINAL);
        const data = await file.arrayBuffer();
     
        const blob = new Blob([ data ], { type: "application/pdf" });

        let blobURL:string; 

        if (iosDevice) {
            return;
            // const reader = new FileReader();
        
            // reader.readAsDataURL(blob); 
            // const dataURL:string | null = await new Promise((resolve, _reject) => {
                
            //     reader.onload = (e) => {
            //         !!reader.result ? resolve(reader.result.toString()) : resolve(null);
            //     }
            // });

            // blobURL = dataURL ?? URL.createObjectURL(blob);
        } else {
            blobURL = URL.createObjectURL(blob);
        }

        const resumeLink = document.createElement('a');
        resumeLink.href = blobURL;
        resumeLink.download = "resume.pdf";

        resumeLink.dispatchEvent(new MouseEvent('click', { 
            bubbles: true, 
            cancelable: true, 
            view: window,
        }));
    };
    
    return (
        <ul className="flex">
            <Link href={RESUME_URL_ORIGINAL} passHref>
               <a download>
                    <li title="Download" style={{ listStyle: "none" }}>
                        <SocialButton icon={faFileDownload}/>
                    </li>
               </a>
            </Link>
            <li title="Print" style={{ listStyle: "none" }}  onClick={handlePrint}>
                <SocialButton icon={faPrint}/>
            </li>
            <li title="Open" style={{ listStyle: "none" }}>
                <SocialButton link={RESUME_URL_ORIGINAL} icon={faExpand}/>
            </li>
        </ul>
    )
}

export default PDFToolbar;