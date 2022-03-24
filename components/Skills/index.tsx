import React, { useMemo, useRef, useState } from "react";
import { useStyles } from "./styles";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useTheme } from "@mui/styles";
import useDimensions from "../../hooks/useDimensions";
import clsx from "clsx";
import Button from "../Button";
import Image from "next/image";
import { getCloudinaryURL } from "../../utils/getCloudinaryURL";

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
    const { classes } = useStyles();
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
            <div className={classes.picture}>
                { currentSkill?.src && (
                    <Image 
                        quality={100}
                        objectFit="contain" 
                        className={classes.image} 
                        layout="fill" 
                        src={currentSkill?.src} 
                    />
                )}
            </div>
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
        label: "React",
        src: getCloudinaryURL("skills/react"),
    },
    {
        years: 2,
        label: "MongoDB",
        src: getCloudinaryURL("skills/mongodb"),
    },
    {
        years: 2,
        label: "AWS",
        src: getCloudinaryURL("skills/aws"),
    },
    {
        years: 3,
        label: "Firebase",
        src: getCloudinaryURL("skills/firebase"),
    },
    {
        years: 1,
        label: "GCP",
        src: getCloudinaryURL("skills/gcp"),
    },
    {
        years: 3,
        label: "JavaScript",
        src: getCloudinaryURL("skills/javascript"),
    },
    {
        years: 1.5,
        label: "TypeScript",
        src: getCloudinaryURL("skills/typescript"),
    },
    {
        years: 2,
        label: "Java",
        src: getCloudinaryURL("skills/java"),
    },
    {
        years: 3,
        label: "Python",
        src: getCloudinaryURL("skills/python"),
    },
    {
        years: 3,
        label: "HTML5",
        src: getCloudinaryURL("skills/html5"),
    },
    {
        years: 1,
        label: "GraphQL",
        src: getCloudinaryURL("skills/graphql"),
    },
    {
        years: 3,
        label: "CSS3",
        src: getCloudinaryURL("skills/css3"),
    },
    {
        years: 1,
        label: "Docker",
        src: getCloudinaryURL("skills/docker"),
    },
    {
        years: 2,
        label: "Node.js",
        src: getCloudinaryURL("skills/nodejs"),
    },
    {
        years: 1,
        label: "Figma",
        src: getCloudinaryURL("skills/figma"),
    },
    {
        years: 2.5,
        label: "Github",
        src: getCloudinaryURL("skills/github"),
    },
];

const MAX_CARDS_MOBILE = 6; 
const MAX_CARDS_DESKTOP = 12; 

const Skills = () => {
    const { classes } = useStyles();

    const [ expanded, setExpanded ] = useState(false);

    const { width } = useDimensions();
    
    const isMobile = useMemo(() => {
        return width < 750; 
    }, [ width ]);

    const { palette } = useTheme();

    const skillsFiltered = useMemo(() => {
        if (!expanded) {
            return skills.slice(0, isMobile ? MAX_CARDS_MOBILE : MAX_CARDS_DESKTOP);
        } 
        return skills; 
    }, [ expanded, isMobile ]);

    return (
        <section 
            className={classes.skills}>
            <div className={clsx(classes.skillsContentWrapper, expanded && classes.skillsExpanded)}>
                <h1 className={classes.skillsHeader}>
                    <span style={{ color: palette.secondary.main }}>Skill</span>&nbsp;Toolkit
                </h1>
                <span className={classes.headerDivider}></span>
                <p className={classes.skillsCaption}>Explore My Expanding Group of Skills.</p>
                <div className={classes.skillsComponents}>
                    <div>
                        <div className={classes.skillsContainer}>
                            {
                                skillsFiltered.map((skill, index) => {
                                    return <SkillCard key={index} skill={skill} />
                                })
                            }
                        </div>
                    <div>
                    </div>
                    </div>
                </div>
            </div>
            <Button 
                onClick={(e) => { 
                    setExpanded(!expanded) 
                    e.currentTarget.blur();
                }}
                style={{ 
                    transform: !expanded ? "translateY(-50%)" : "initial",
                    marginTop: 15,
                }}
            >
                { expanded ? "Show Less.": "See Some More." }
            </Button>
        </section>
    )
}

export default Skills; 
