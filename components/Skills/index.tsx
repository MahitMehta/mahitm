import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStyles } from "./styles";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ButtonBase } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ToolsSVG from "../../assets/svg/tools.svg"; 
import { useTheme } from "@mui/styles";

gsap.registerPlugin(ScrollTrigger);

interface ISkill {
    label: string; 
    src: string; 
    years: number; 
}

interface ISkillCardProps {
    skill: ISkill | undefined;
}

const SkillCard : React.FC<ISkillCardProps> = ({ skill }) => {
    const classes = useStyles();
    const [ currentSkill, setCurrentSkill ] = useState<ISkill | undefined>(undefined);
    const skillCardRef = useRef<HTMLDivElement | null>(null)

    const flipAniamtion = () => {
        if (!skillCardRef.current) return; 

        gsap.timeline({
            repeat: 0,
        }).fromTo(skillCardRef.current, {
            opacity: 0,
        }, { opacity: 1, duration: 0.5 });
    };

    useMemo(() => {
        setCurrentSkill(skill);
        flipAniamtion();
    }, [ skill ]);

    return (
        <div className={classes.skillContainer}>
            <picture className={classes.picture} ref={skillCardRef} style={{ zIndex: 1 }}>
                { currentSkill?.src && <img className={classes.image} src={currentSkill?.src} alt={currentSkill.label} /> }
            </picture>
            <div className={classes.skillDetails}>
                <h1 className={classes.skillLabel}>{ skill?.label }</h1>
                <h2 className={classes.skillExperience}>{ skill?.years } Years</h2>
            </div>
        </div>
    )
}

const skills:ISkill[] = [
    {
        years: 2,
        label: "AWS",
        src: "https://pbs.twimg.com/profile_images/1473756532827246593/KRgw2UkV_400x400.jpg",
    },
    {
        years: 3,
        label: "Firestore",
        src: "https://www.gstatic.com/devrel-devsite/prod/v870be6fb6841f3532cd3aec5bc0b3146031642f2794ae8ba7f51ebf843a655f9/firebase/images/touchicon-180.png",
    },
    {
        years: 2,
        label: "S3",
        src: "https://pbs.twimg.com/profile_images/1473756532827246593/KRgw2UkV_400x400.jpg",
    },
    {
        years: 3,
        label: "Firebase",
        src: "https://www.gstatic.com/devrel-devsite/prod/v870be6fb6841f3532cd3aec5bc0b3146031642f2794ae8ba7f51ebf843a655f9/firebase/images/touchicon-180.png",
    },
    {
        years: 3,
        label: "Firebase",
        src: "https://www.gstatic.com/devrel-devsite/prod/v870be6fb6841f3532cd3aec5bc0b3146031642f2794ae8ba7f51ebf843a655f9/firebase/images/touchicon-180.png",
    },
    {
        years: 1,
        label: "GCP",
        src: "https://www.gstatic.com/devrel-devsite/prod/v870be6fb6841f3532cd3aec5bc0b3146031642f2794ae8ba7f51ebf843a655f9/cloud/images/social-icon-google-cloud-1200-630.png",
    },
    {
        years: 2,
        label: "JavaScript",
        src: "data:image/png;base64,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",
    },
    {
        years: 1,
        label: "TypeScript",
        src: "https://iconape.com/wp-content/png_logo_vector/typescript.png",
    },
    {
        years: 2,
        label: "Java",
        src: "https://pngimage.net/wp-content/uploads/2018/06/python-logo-png-8.png",
    },
    {
        years: 3,
        label: "Python",
        src: "https://pngimage.net/wp-content/uploads/2018/06/python-logo-png-8.png",
    },
    {
        years: 3,
        label: "HTML",
        src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4850de49604597.5608607aaab6c.png",
    },
    {
        years: 3,
        label: "HTML",
        src: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4850de49604597.5608607aaab6c.png",
    },    
];

const MAX_CARDS = 8; 

const Skills = () => {
    const classes = useStyles();

    const [ skillStartIndex, setSkillStartIndex ] = useState(0);

    const selectedSkills = useMemo(() => { 
        const selectedSkillsInitial =  skills.slice(skillStartIndex, skillStartIndex + MAX_CARDS);
        if (selectedSkillsInitial.length >= MAX_CARDS) return selectedSkillsInitial;
        return selectedSkillsInitial.concat(Array.from({ length: MAX_CARDS - selectedSkillsInitial.length }));
    }, [ skillStartIndex ]);

    const handleNext = () => {
        if (skillStartIndex + MAX_CARDS > skills.length + MAX_CARDS - 2) return; 
        setSkillStartIndex(skillStartIndex + MAX_CARDS);
    }

    const handlePrevious = () => {
        if (skillStartIndex - MAX_CARDS < 0) return; 
        setSkillStartIndex(skillStartIndex - MAX_CARDS);
    }

    const { palette } = useTheme();

    return (
        <section style={{ minHeight: "100vh" }} className={classes.skills}>
            {/* <div>
                <img width={"50%"} src={ToolsSVG} alt="tools" />
            </div> */}
            <h1 className={classes.skillsHeader}>
                <span style={{ color: palette.secondary.main }}>Skill</span>&nbsp;Toolkit
            </h1>
            <span className={classes.headerDivider}></span>
            <p className={classes.skillsCaption}>Explore My Expanding Group of Skills.</p>
            <div className={classes.skillsComponents}>
                
                <div>
                    <div className={classes.skillsContainer}>
                        {
                            skills.map((skill, index) => {
                                return <SkillCard key={index} skill={skill} />
                            })
                        }
                    </div>
                    {/* <div className={classes.buttonGroup}>
                        <ButtonBase onClick={handlePrevious} sx={{ borderRadius: "50%" }} className={classes.buttonContainer}>
                            <FontAwesomeIcon className={classes.buttonIcon} icon={faAngleLeft} />
                        </ButtonBase>
                        <ButtonBase onClick={handleNext} sx={{ borderRadius: "50%" }} className={classes.buttonContainer}>
                            <FontAwesomeIcon className={classes.buttonIcon} icon={faAngleRight} />
                        </ButtonBase>
                    </div>   */}
                </div>
            </div>
        </section>
    )
}

export default Skills; 
