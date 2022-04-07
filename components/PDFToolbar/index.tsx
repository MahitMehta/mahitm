import { faFileDownload, faPrint, faExpand } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SocialButton from "../SocialButton";

const RESUME_URL_ORIGINAL = "https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume.pdf";

const PDFToolbar = () => {
    const handlePrint = (e:React.MouseEvent<HTMLLIElement>) => {
        const printJS = require("print-js");

        e.preventDefault();
        e.stopPropagation();

        printJS({ printable: RESUME_URL_ORIGINAL, type: "pdf"});
    }

    const handleDownload = async (e:React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        e.stopPropagation();
    
        const file = await fetch(RESUME_URL_ORIGINAL);
        const data = await file.arrayBuffer();
     
        const blob = new Blob([ data ], { type: "application/pdf" });

        const blobUrl = URL.createObjectURL(blob);
        const resumeLink = document.createElement('a');
        resumeLink.href = blobUrl;
        resumeLink.download = "resume.pdf";

        resumeLink.dispatchEvent(new MouseEvent('click', { 
            bubbles: true, 
            cancelable: true, 
            view: window 
        }));
    };
    
    return (
        <ul className="flex">
            <li title="Download" style={{ listStyle: "none" }} onClick={handleDownload}>
                <SocialButton icon={faFileDownload}/>
            </li>
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