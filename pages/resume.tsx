import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import React, { useMemo } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
//import PDFToolbar from "../components/PDFToolbar";
import { getCloudinaryURL } from "../utils/getCloudinaryURL";

const Cursor = dynamic(() => import("../components/Cursor"), { ssr: false });
const PDFToolbar = dynamic(() => import("../components/PDFToolbar"), { ssr: true });


const Resume = () => {
    const resumeURL = useMemo(() => getCloudinaryURL("v1676086361/resume.webp"), []);

    return (
        <>
            <Head>
                <title>Resume | Mahit Mehta</title>
            </Head>
            <Navbar />
            <Cursor />
            <main className="px-4 min-h-screen flex justify-center flex-col items-center">
                <div className="mt-[100px] h-full w-full flex flex-col items-center">
                    <div className="min-h-[100px] flex justify-center items-center">
                        <PDFToolbar />
                    </div>
                    <div 
                        style={{ 
                            transformStyle: "preserve-3d",
                            transform: "perspective(1000px)"
                        }}
                        className="relative md:min-h-screen h-[500px] min-w-full" >
                        <span 
                            className="relative block w-full h-full">
                            <Image 
                                draggable={false}
                                layout="fill"
                                objectFit="contain"
                                src={resumeURL}
                            />
                        </span>
                    </div>
                </div>
            </main>
           
            <Footer />
        </>
    )
}   

export default Resume;