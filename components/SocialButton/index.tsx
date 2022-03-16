import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useStyles } from "./styles";

interface SocialButtonProps {
    icon: IconProp | IconDefinition;
    link?: string; 
    style?: React.CSSProperties;
    className?: string; 
}

const SocialButton : React.FC<SocialButtonProps> = ({ icon, link, style, className }) => {
    const classes = useStyles();

    return (
        <Link href={link ? link : "/" } passHref>
            <a target="_blank" rel="noreferrer noopener">
                <button style={style} className={clsx(classes.iconContainer, className && className)}>
                    <FontAwesomeIcon className={classes.icon} icon={icon as IconProp} />
                </button>
            </a>
        </Link>
    )
}

export default SocialButton;