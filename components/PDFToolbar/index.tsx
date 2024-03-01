import { faFileDownload, faPrint, faExpand } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";
import SocialButton from "../SocialButton";

const RESUME_URL_ORIGINAL = "https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume-2024-v1.pdf";

const PDFToolbar = () => {
    const handlePrint = (e:React.MouseEvent<HTMLLIElement>) => {
        const printJS = require("print-js");

        e.preventDefault();
        e.stopPropagation();

        printJS({ printable: RESUME_URL_ORIGINAL, type: "pdf"});
    }

    return (
        <ul className="flex">   
            <li title="Download" style={{ listStyle: "none" }}>
                <Link href={"/download/resume"} passHref>
                    <a download>
                        <SocialButton icon={faFileDownload}/>
                    </a>
                </Link>
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