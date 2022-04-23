import React, { useEffect, useMemo, useRef } from "react";
import useDimensions from "../../../../hooks/useDimensions";
import useSizeClamp from "../../../../hooks/useSizeClamp";
import { useStyles } from "./styles";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { CharacterReveal, Reveal } from "react-text-reveal";
import clsx from "clsx";
import NextImage from "../../../NextImage";
import Button from "../../../Button";
import Link from "next/link";
import { IProject } from "../../interfaces/project";
import { getCloudinaryURL } from "../../../../utils/getCloudinaryURL";

gsap.registerPlugin(ScrollTrigger);


interface IProjectSlideProps {
    index: number; 
    selected: boolean; 
    project: IProject; 
    setSlide: (e:number | undefined) => void; 
}

const ProjectSlide : React.FC<IProjectSlideProps> = ({ selected, index, setSlide, project }) => {
    const { classes } = useStyles();

    const setSlideWrapper = (index:number) => {
        setSlide(index);
    }

    const slideRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {   
        if (!slideRef.current) return; 
        
        const timeline = gsap.timeline({
            repeat: 0,
            scrollTrigger: {
                trigger: slideRef.current,
                onEnter: () => {
                    setSlideWrapper(index);
                },
                onLeaveBack: () => {
                    if (index > 0) {
                        setSlideWrapper(index - 1);
                    } else setSlide(undefined);
                },
            }
        })

        return () => {
            timeline.kill();
        }
    }, [ slideRef ]);

    const { width } = useDimensions({ enableDebounce: true });
    const pictureClampedWidth = useSizeClamp({ minSize: 300, size: width * 0.55, maxSize: width * 0.55 });

    const isMobile = useMemo(() => {
        return width < 900; 
    }, [ width ]);

    const projectImageURL = useMemo(() => {
        return getCloudinaryURL(project.imageId);
    }, [ project.imageId ]);

    return (
        <div id={project?.projectId} className={classes.container}>
            <span ref={slideRef}></span>
            <div className={classes.projectTitleContainer}>
                <header 
                    style={{ visibility: selected ? "visible" : "hidden"}}
                    className={classes.projectHeader}>
                    <span style={{ opacity: selected ? 1 : 0 }} className={classes.projectNumber}>
                        { (index + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }) }
                    </span>
                    <h1 className={classes.projectTitle}>
                        {
                            project.title.split("+").map((word:string, index:number) => (
                                <CharacterReveal 
                                    key={index}
                                    animateOpacity={true}
                                    canPlay={selected}
                                    copy={[ word ]}
                                    direction={"bottom"}
                                    duration={750}
                                    ease={"cubic-bezier(0,0.4,0.4,1)"}
                                    offset={"225px"}
                                    perspective={true}
                                    perspectiveFOV={1000}
                                    perspectiveX={158}
                                    perspectiveY={13}
                                    perspectiveZ={0}
                                    wordOffsetDelay={200}
                                />
                            ))
                        }
                    </h1>
                   <p className={classes.projectCaption}>
                        <Reveal 
                            animateOpacity={true}
                            canPlay={selected}
                            direction={"bottom"}
                            duration={750}
                            ease={"cubic-bezier(0,0.4,0.4,1)"}
                            offset={"225px"}
                            perspective={true}
                            perspectiveFOV={1000}
                            perspectiveX={158}
                            perspectiveY={13}
                            perspectiveZ={0}
                            wordOffsetDelay={200}
                        >
                            { project.description }
                            { !!project.projectLink && (
                                 <Button style={{ marginTop: 20 }}>
                                    <Link href={project.projectLink} passHref>
                                        <a target={"_blank"} rel="noopener noreferrer">
                                            Visit Project.
                                        </a>
                                    </Link>
                                </Button>
                            )}
                        </Reveal>
                   </p>
                  
                </header>
                <div className={clsx(classes.pictureContainer, selected && classes.featuredPictureSelected)}>
                    <NextImage   
                        quality={100}
                        maxHeight={isMobile ? 400 : undefined}
                        className={classes.featuredPicture}
                        draggable={false}
                        objectFit="contain"
                        width={pictureClampedWidth || 0}
                        src={projectImageURL} 
                        alt="Stay Wise Rentals" 
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectSlide;