import React, { useMemo, useState } from "react";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStyles } from "./styles";
import SocialButton from "../SocialButton";
import { faGithub, faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
import InputField from "../InputField";
import { useTheme } from "@mui/styles";
import Button from "../Button";
import dynamic from "next/dynamic";
import axios from "axios";
import Modal from "../Modal";
import Image from "next/image";

const Portrait = dynamic(() => import("../Portrait"), { ssr: false });

const FORM_ID = "ccf9a9b8-558c-4c05-abb8-1206f9418c03";
const ACCEPTED_FILE_TYPES = `.pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .key, .pages, .numbers, .psd, .ai, .eps, .epub, .mobi, .azw, .tar, .zip, .rar, .7z, .png, .jpg, .jpeg, .tiff, .tif, .gif, .webp, .scm, .mp3, .mp4, .flv, .avi, .webm, .mov, .html, .htm, .xml, .sketch, .txt, .rtf`;

interface IFormData {
    fullName?: string; 
    email?: string; 
    message?: string; 
    files: File[];
}

const Contact = () => {
    const { classes } = useStyles();
    const { palette } = useTheme();

    const [ formData, setFormData ] = useState<IFormData>({
        files: [],
    });

    const updateFormData = (key:keyof IFormData) => (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [ key ]: e.target.value });
    };

    const [ sendingNote, setSendingNote ] = useState(false);
    const [ successModalOpen, setSuccessModalOpen ] = useState(false);
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);

    const handleSubmit = (e:any) => {
        e.stopPropagation();
        e.preventDefault();
        
        if (!formData.fullName || !formData.message || !formData.email) return; 

        const body = new FormData();

        body.append("name", formData.fullName);
        body.append("email", formData.email);
        body.append("message", formData.message);

        formData.files.forEach((file, index) => {
            body.append(`File ${index + 1}`, file);
        });

        setSendingNote(true);

        axios({
            method: "POST",
            url: `https://getform.io/f/${FORM_ID}`,
            data: body,
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
        }).then(() => {
            setFormData({ files: [] });
            setSuccessModalOpen(true);
        }).catch(() => {
            setErrorModalOpen(true);
        }).finally(() => {
            setSendingNote(false);
        });
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

    const [ dragging, setDragging ] = useState(false);

    const handleDrag = (e:React.DragEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e:React.DragEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e:React.DragEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setDragging(false);

        const files = Array.from(e?.dataTransfer?.files).filter((file) => !!file);
        setFormData({ ...formData, files });
    };

    return (
        <section id="contact" className={classes.container}>
            <Modal title="Message Sent." open={successModalOpen} setOpen={setSuccessModalOpen}>
                <div className="p-4 max-w-[350px] flex flex-col items-center">
                    <Image 
                        objectFit="contain"
                        src="/svg/sent.svg"
                        width={275}
                        height={275}
                    />
                    <p style={{ color:"rgba(255, 255, 255, 0.5)"}} className="text-center my-4">
                        I have recieved your form and I'll get back to you as soon as possible!
                    </p>
                </div>
            </Modal>
            <Modal title="Whoops. Message Failed." open={errorModalOpen} setOpen={setErrorModalOpen}>
                <div className="p-4 max-w-[350px] flex flex-col items-center">
                    <Image 
                        objectFit="contain"
                        src="/svg/error.svg"
                        width={275}
                        height={275}
                    />
                    <p style={{ color:"rgba(255, 255, 255, 0.5)"}} className="text-center my-4">
                        Please try again in a few minutes or email me at&nbsp;
                        <a 
                            rel="noreferrer noopener"
                            target={"_blank"}
                            style={{ color:"rgba(255, 255, 255, 0.5)"}} 
                            className="underline"
                            href="mailto:contact@mahitm.com?subject=Message%20for%20Mahit">
                                contact@mahitm.com
                        </a>.
                    </p>
                </div>
            </Modal>
            <div className={classes.messageContainer}>
                <h1 className={classes.messagingHeader}>
                    Let&apos;s&nbsp;
                    <span style={{ color: palette.secondary.main }}>Connect.</span>
                </h1>
                <span className={classes.headerDivider}></span>
                <p className={classes.headerCaption}>Leave me a note and let&apos;s callabortate.</p>
                <div className={classes.contentSections}>
                <div style={{ width: "min-content", height: "100%" }}>
                </div>
                    <div className={classes.profilePictureContainer}>
                        <div className={classes.profilePictureWrapper}>
                            <Portrait />
                        </div>
                    </div>
                    <form 
                        onDrop={handleDrop}
                        onDragOver={handleDrag}
                        onDragLeave={handleDragLeave}
                        className={classes.form}
                        style={{ 
                            background: dragging ? "rgba(0, 0, 0, 0.25)" : "transparent" 
                        }}
                        >
                        <div className={classes.formFields}>
                            <InputField 
                                className={classes.input}
                                id="client-full-name"
                                label="Full Name"
                                value={formData.fullName || ""}
                                placeholder="Elon Musk"
                                onChange={updateFormData("fullName")}
                            />
                            <InputField 
                                className={classes.input}
                                label="Email"
                                type={"email"}
                                value={formData.email || ""}
                                id="client-email"
                                placeholder="elon.musk@tesla.com"
                                onChange={updateFormData("email")}
                            />
                            <InputField 
                                className={classes.input}
                                label="Message"
                                id="client-message"
                                value={formData.message || ""}
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
                                    name="contact-attach-files" 
                                    id="contact-attach-files"
                                    multiple 
                                    type="file"
                                    accept={ACCEPTED_FILE_TYPES}
                                    onChange={handleFileChange} 
                                />
                            </div>
                    </div>
                    <Button 
                        disabled={sendingNote} 
                        loading={sendingNote} 
                        style={{ 
                            marginTop: 10, 
                            columnGap: 10,
                            height: 50,
                            width: 140,
                        }} 
                        onClick={handleSubmit}>
                        Send Note.
                    </Button>
                    </form>
                </div>
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
        </section>
    )
}

export default Contact;