import { Link } from "@mui/material";
import clsx from "clsx";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import ProjectSlide from "./components/ProjectSlide";
import { useStyles } from "./styles";
import gsap from "gsap";
import { useTheme } from "@mui/styles";
import Chest from "../Chest";
import { getCloudinaryURL } from "../../utils/getCloudinaryURL";
import { IProject } from "./interfaces/project";


const SSR = typeof window === 'undefined'

gsap.registerPlugin(ScrollTrigger);

// const projects = [
//     {
//         id: "genesus",
//         url: getCloudinaryURL("genesus-showcase.png"),
//         title: "Genesus",
//         caption: "Founded Genesus which provides 375+ Students with Fast & Easy Access to Grades.",
//         link: "https://gradebook.mahitm.com",
//     },
//     {
//         id: "haul",
//         url: getCloudinaryURL("haul-showcase.png"),
//         title: "Haul",
//         caption: "Worked as a Full Stack JavaScript Developer building an Electronic Logging Device Integration.",
//         link: "https://www.haulwith.us",
//     },
//     {
//         id: "staywise",
//         url: getCloudinaryURL("staywise-showcase.png"),
//         title: "Stay Wise+Rentals",
//         caption: "Built Marketing Page & Admin Portal to Display Properties of Stay Wise Rentals.",
//         link: "https://www.staywiserent.com",
//     },

   
// ]

type IProjectsPreviewProps = {
    projects: IProject[]
}

const ProjectsPreview : React.FC<IProjectsPreviewProps> = ({ projects }) => {
    const { classes } = useStyles();

    const [ dotSelected, setDotSelected ] = useState<number | undefined>(undefined);
    const dotsRef = useRef<HTMLDivElement | null>(null);
    const projectsPreviewEndRef = useRef<HTMLSpanElement | null>(null);
    const [ showDots, setShowDots ] = useState(false);

    useEffect(() => {   
        if (!dotsRef.current) return; 
        
        const timeline = gsap.timeline({
            repeat: 0,
            scrollTrigger: {
                trigger: dotsRef.current,
                onEnter: () => {
                    setShowDots(true);
                },
                onLeaveBack: () => {
                    setShowDots(false);
                }
            }
        });

        return () => {
            timeline.kill();
        }
    }, [ dotsRef ]);

    useEffect(() => {
        if (!projectsPreviewEndRef.current) return;

        const timeline = gsap.timeline({
            repeat: 0,
            scrollTrigger: {
                trigger: projectsPreviewEndRef.current,
                start: "center 70%",
                onEnter: () => {
                    setShowDots(false);
                },
                onLeaveBack: () => {
                    setShowDots(true);
                }
            }
        });

        return () => {
            timeline.kill();
        }
    }, [ projectsPreviewEndRef ]);

    const { palette } = useTheme();

    const handleSetSlide = (slideNumber:number | undefined) => {
        setDotSelected(slideNumber);
    }

    return (
        <section className={classes.container}>
            <div className={classes.introduction}>
                { !SSR && <Chest /> }
                <div className={classes.headerContainer}>
                    <h1 className={classes.header}>
                        2022
                        <br /><span style={{ color: palette.secondary.main }}>Featured.</span>
                    </h1>
                    <span className={classes.divider}></span>
                    <p className={classes.subHeader}>
                        Just something special so others can admire.
                    </p>
                </div>
            </div>
            <div style={{ pointerEvents: showDots ? "initial" : "none"}}>
                <div ref={dotsRef}></div>
                { 
                    projects.map((project, index) => (
                        <ProjectSlide 
                            project={project} 
                            setSlide={handleSetSlide} 
                            selected={ dotSelected === index && showDots }
                            index={index} 
                            key={index} 
                        />
                    ))
                }
            </div>
            <span ref={projectsPreviewEndRef}></span>
             <div className={clsx(classes.dotsContainer, showDots && classes.showDots)}>
                {
                    projects.map((project, index) => (
                        <Link key={index} href={`/#${project.projectId}`}>
                            <div
                                key={index} 
                                onClick={() => { 
                                    handleSetSlide(index) 
                                }}
                                className={clsx(classes.dot, index === dotSelected && classes.dotSelected)}>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default ProjectsPreview;