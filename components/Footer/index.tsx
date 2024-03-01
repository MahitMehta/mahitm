import React from "react";
import { useStyles } from "./styles";

const Footer = () => {
    const { classes } = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.footerCredits}>
                <picture>
                    <img className={classes.logo} src={"./svg/logo.svg"} alt="Logo"/>
                </picture>
                <p className={classes.copyright}>©2024 Mahit Mehta. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer; 