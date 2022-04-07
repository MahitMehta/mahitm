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

    const handleDownload = (e:React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const resumeLink = document.createElement('a');
        resumeLink.href = RESUME_URL_ORIGINAL;
        resumeLink.download = 'resume.pdf';
        resumeLink.dispatchEvent(new MouseEvent('click'));
    };
    
    return (
        <ul className="flex">
            <li style={{ listStyle: "none" }} onClick={handleDownload}>
                <SocialButton icon={faFileDownload}/>
            </li>
            <li style={{ listStyle: "none" }}  onClick={handlePrint}>
                <SocialButton icon={faPrint}/>
            </li>
            <li style={{ listStyle: "none" }}>
                <SocialButton link={RESUME_URL_ORIGINAL} icon={faExpand}/>
            </li>
        </ul>
    )
}

export default PDFToolbar;