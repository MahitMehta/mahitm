import Head from "next/head";
import Image from "next/image";
import React from "react";
import Cursor from "../components/Cursor";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Resume = () => {
    return (
        <>
            <Head>
                <title>Resume | Mahit Mehta</title>
            </Head>
            <Navbar />
            <Cursor />
            <main className="pt-[65px] px-4 min-h-screen flex justify-center items-center">
            <embed
                src="https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume.pdf#toolbar=1"
                className="md:w-[500px] rounded-md md:h-[700px] w-screen h-[500px]" />
                {/* <div className="relative md:w-screen rounded-md md:h-[1000px] w-screen h-[500px]" >
                    <Image 
                        draggable={false}
                        quality={100}
                        layout="fill"
                        objectFit="contain"
                        src="https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume.png"
                    />
                </div> */}
            </main>
           
            <Footer />
        </>
    )
}   

export default Resume;