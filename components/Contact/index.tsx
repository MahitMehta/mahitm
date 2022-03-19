import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faGlobe, faGlobeAmericas, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyles } from "./styles";
import SocialButton from "../SocialButton";
import { faInstagram, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import InputField from "../InputField";
import Image from "next/image";

interface ContactDetailItemProps {
    icon: IconProp,
    title: string; 
}

const ContactDetailItem : React.FC<ContactDetailItemProps> = ({ title, icon }) => {
    const classes = useStyles();
    // const { palette } = useTheme();

    return (
        <li className={classes.methodItem}>
            <FontAwesomeIcon icon={icon} color={"rgba(255, 255, 255, 0.25)"} />
            <span className={classes.methodTitle}>{ title }</span>
        </li>
    )
}

const Contact = () => {
    const classes = useStyles();

    return (
        <section className={classes.container}>
            <div className={classes.messageContainer}>
                <h1 className={classes.messagingHeader}>Let&apos;s Connect.</h1>
                <form className={classes.form}>
                   <div className={classes.formFields}>
                        <InputField 
                                className={classes.input}
                                id="client-full-name"
                                label="Full Name"
                                placeholder="Elon Musk"
                            />
                        <InputField 
                            className={classes.input}
                            label="Email"
                            id="client-email"
                            placeholder="elon.musk@tesla.com"
                        />
                        <InputField 
                            className={classes.input}
                            label="Message"
                            id="client-message"
                            style={{ minHeight: 100 }}
                            placeholder="Message For Me..."
                            as="textarea"
                        />
                   </div>
                </form>
            </div>
            <div className={classes.detailsContainer}>
                <div className={classes.detailsWrapper}>
                    <div className={classes.profilePicture}>
                        <Image 
                            layout="fill"
                            src={"/svg/logo.svg"}
                        />
                    </div>
                    <div style={{ marginTop: 75 }}>
                        <p className={classes.caption}>
                            You&apos;ve reached the end, but I would love to collaborate so don&apos;t be shy to reach 
                            out!
                        </p>
                    </div>
                    <div>
                        <ul className={classes.socialMediaContainer}>
                            <SocialButton 
                                className={classes.socialButton}
                                link="/"
                                icon={faLinkedinIn}
                            />
                            <SocialButton 
                                className={classes.socialButton}
                                link="/"
                                icon={faInstagram}
                            />
                            <SocialButton 
                                className={classes.socialButton}
                                link="/"
                                icon={faYoutube}
                            />
                            <SocialButton 
                                className={classes.socialButton}
                                link="/"
                                icon={faTwitter}
                            />
                        </ul> 
                    </div>
                    <div style={{ marginTop: "auto" }}>
                        <ul className={classes.methodsList}>
                            <ContactDetailItem 
                                icon={faMobileAlt} 
                                title="+1 732 822 0795" 
                            />
                            <ContactDetailItem 
                                icon={faGlobeAmericas} 
                                title="mahitm.com" 
                            />
                            <ContactDetailItem 
                                icon={faEnvelope} 
                                title="mahit.py@gmail.com" 
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;