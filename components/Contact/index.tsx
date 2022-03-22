import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faGlobe, faGlobeAmericas, faMobileAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyles } from "./styles";
import SocialButton from "../SocialButton";
import { faGithub, faInstagram, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import InputField from "../InputField";
import Image from "next/image";
import { useTheme } from "@mui/styles";
import Button from "../Button";

interface ContactDetailItemProps {
    icon: IconProp,
    title: string; 
}

const ContactDetailItem : React.FC<ContactDetailItemProps> = ({ title, icon }) => {
    const classes = useStyles();

    return (
        <li className={classes.methodItem}>
            <FontAwesomeIcon icon={icon} color={"rgba(255, 255, 255, 0.25)"} />
            <span className={classes.methodTitle}>{ title }</span>
        </li>
    )
}

const Contact = () => {
    const classes = useStyles();
    const { palette } = useTheme();

    const handleSubmit = (e:any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <section className={classes.container}>
            <div className={classes.messageContainer}>
                <h1 className={classes.messagingHeader}>
                    Let&apos;s&nbsp;
                    <span style={{ color: palette.secondary.main }}>Connect.</span>
                </h1>
                <span className={classes.headerDivider}></span>
                <p className={classes.headerCaption}>Leave me a note and let&apos;s callabortate.</p>
                <div className={classes.contentSections}>
                <div style={{ width: "min-content", height: "100%" }}>
                    <div style={{
                            //backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
                            height: "100%",
                            width: "min-content",
                            borderRadius: 5,
                        }}>
                           
                        </div>
                    </div>
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
                            <div className={classes.fileInputCover}>
                                <FontAwesomeIcon className={classes.icon} icon={faPaperclip} color="#fff" />
                                <label className={classes.label} htmlFor="attach-files">attach</label>
                                <input 
                                    className={classes.fileInput}
                                    name="attach-files" 
                                    id="attach-files"
                                    multiple 
                                    type="file"
                                />
                            </div>
                    </div>
                    <Button onClick={handleSubmit}>
                        Send Note.
                    </Button>
                    </form>
                </div>
            </div>
            {/* <div className={classes.detailsContainer}>
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
                                link="https://www.linkedin.com/in/mahit-mehta-068603203/"
                                icon={faLinkedinIn}
                            />
                            <SocialButton 
                                className={classes.socialButton}
                                link="https://www.instagram.com/mahit_mehta/"
                                icon={faInstagram}
                            />
                            <SocialButton 
                                className={classes.socialButton}
                                link="https://www.youtube.com/channel/UC_OXbojolphpidcIr4GRD4w"
                                icon={faYoutube}
                            />
                            <SocialButton 
                                className={classes.socialButton}
                                link="https://github.com/MahitMehta"
                                icon={faGithub}
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
            </div> */}
        </section>
    )
}

export default Contact;