import clsx from 'clsx';
import React, { useCallback, useEffect, useRef } from 'react';
import { useStyles } from './styles';
import gsap from 'gsap';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import SocialButton from '../SocialButton';

interface INavItem extends React.HTMLProps<HTMLAnchorElement> { 
    label: string, route:string, href?:string 
}

const NavItem : React.FC<INavItem> = ({ label, route, href, ...props }) => {
    const classes = useStyles();
    const functionLeftRef = useRef<HTMLSpanElement | null>(null);
    const functionRightRef = useRef<HTMLSpanElement | null>(null);

    const currentRoute = "about";

    const handleFunctionActive = useCallback(() => {
            gsap.fromTo(
                functionLeftRef.current, { opacity: 0, x: 10, }, {
                    opacity: currentRoute == route ? 1 : 0,
                    duration: 0.5,
                    x: 0,
                }
            )
            gsap.fromTo(
                functionRightRef.current, { opacity: 0, x: 35 }, {
                    opacity: currentRoute == route ? 1 : 0,
                    duration: 0.75,
                    x: 0,
                }
            )
    }, [ currentRoute, route, functionLeftRef, functionRightRef ]);

    useEffect(handleFunctionActive, [ handleFunctionActive ]);

    return (
        <li className={classes.li}>
            <Link href={href || "/"} passHref>
                <a style={{ color: "#fff" }} { ...props }>
                    <span>.</span>{ label }
                    {/* <span 
                        ref={functionLeftRef}
                        className={
                            clsx(classes.function)}
                    >(</span>
                    <span 
                        style={{ display: "block" }}
                        ref={functionRightRef}
                        className={
                            clsx(classes.function)}
                    >)</span> */}
                </a>
            </Link>
        </li>
    )
}

const Navbar = () => {
    const classes = useStyles();

    return (
        <nav className={classes.nav}>
            <Link href={"/"} passHref>
                <a>
                    <picture>
                        <img className={classes.logo} src={"./svg/logo.svg"} alt="Logo"/>
                    </picture>
                </a>
            </Link>
            <div className={classes.itemContainer}>
                <ul className={classes.ul}>
                    <NavItem route="about" label="about" />
                    {/* <NavItem route="projects" label="projects" /> */}
                    <NavItem 
                        route="resume" 
                        label="resume" 
                        target='_blank'
                        rel="noreferrer noopener"
                        href='https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/resume.pdf'
                    />
                </ul>
                <SocialButton 
                    icon={faGithub}
                    link="https://github.com/MahitMehta"
                    className={classes.iconContainer}
                />
            </div>
        </nav>
    )
}

export default Navbar;