import React, { useMemo, useState } from "react";
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

interface IFormData {
    fullName?: string; 
    email?: string; 
    message?: string; 
    files: File[];
}

const Contact = () => {
    const classes = useStyles();
    const { palette } = useTheme();

    const [ formData, setFormData ] = useState<IFormData>({
        files: [],
    });

    const updateFormData = (key:keyof IFormData) => (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [ key ]: e.target.value });
    };

    const handleSubmit = (e:any) => {
        e.stopPropagation();
        e.preventDefault();
    };
    
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files; 
        if (!newFiles) return; 
        const newFileArray = [];
        for (let i = 0; i < newFiles.length; i++) {
            let file = newFiles.item(i); 
            if (file && file instanceof File) {
                newFileArray.push(file);
            }
        }
        setFormData({ ...formData, files: newFileArray });
    }

    const inputLabel = useMemo(() => {
        if (formData.files.length > 1) {
            return formData.files.map(file => file.name).join(", ")
        } else if (formData.files.length === 1) {
            return  formData.files.map(file => file.name).join("");
        } else {
            return "attach"; 
        }
    }, [ formData.files ]);

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
                                onChange={updateFormData("fullName")}
                            />
                            <InputField 
                                className={classes.input}
                                label="Email"
                                id="client-email"
                                placeholder="elon.musk@tesla.com"
                                onChange={updateFormData("email")}
                            />
                            <InputField 
                                className={classes.input}
                                label="Message"
                                id="client-message"
                                style={{ minHeight: 100 }}
                                placeholder="Message For Me..."
                                onChange={updateFormData("message")}
                                as="textarea"
                            />
                            <div className={classes.fileInputCover}>
                                <FontAwesomeIcon className={classes.icon} icon={faPaperclip} color="#fff" />
                                <label className={classes.label} htmlFor="attach-files">
                                    {
                                       inputLabel
                                    }
                                </label>
                                <input 
                                    className={classes.fileInput}
                                    name="attach-files" 
                                    id="attach-files"
                                    multiple 
                                    type="file"
                                    onChange={handleFileChange} 
                                />
                            </div>
                    </div>
                    <Button style={{ marginTop: 10 }} onClick={handleSubmit}>
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