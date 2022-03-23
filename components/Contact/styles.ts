import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    container: {
        display: "flex",
        padding: 25,
        width: "100%",
        height: "auto",
        maxWidth: "100vw",
        marginTop: 100,
        "@media (max-width: 900px)": {
            flexDirection: "column",
            rowGap: 75,
        }
    },
    headerDivider: {
        height: 2,
        width: 45,
        background: "#fff",
        display: "block",
        marginLeft: "2vw",
    },
    headerCaption: {
        margin: "25px 0px",
        marginLeft: "2vw",
        color: "rgba(255, 255, 255, 0.25)",
        textAlign: "center",
        fontSize: "clamp(17.5px, 1.5vw, 1.5vw)",
    },
    input: {
        width: "100%",
        "@media (max-width: 900px)": {
            width: "clamp(250px, 100%, 100%)",
        }
    },  
    messageContainer: {
        flex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Helvetica Neue',
        fontSize: "clamp(2.5rem, 4vw, 4vw)",
        flexDirection: "column",

    },
    messagingHeader: {
        color: "#fff",
        fontFamily: "Old Standard TT",
        fontSize: "clamp(65px, 10.5vw, 10.5vw)",
        //fontSize: "clamp(45px, 5.5vw, 5.5vw)",
        fontWeight: "200",
        fontStyle: "italic",
        display: 'flex',
        flexWrap: "wrap",
        justifyContent: 'center',
        
    },  
    detailsContainer: {
        flex: 2,
        //backgroundColor: "#4158D0",
       // backgroundImage: `linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)`,
        borderRadius: 5,
        padding: 25,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "column",
        alignItems: 'center',
    },
    detailsWrapper: {
        display: 'flex',
        position: "relative",
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        border: `2px solid ${palette.general.grey}`,
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.35)",
        //boxShadow: `0px 0px 0px 5px ${palette.secondary.main}`,
        padding: 25,
        flexDirection:"column",
        height: "100%",
        justifyContent: "center",
        alignItems: 'center',
    },
    profilePictureContainer: {
        width: "100%",
        height: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        padding: 45,
        overflow: "hidden",
        "@media (max-width: 900px)": {
            padding: 5,
         }
    },
    profilePictureWrapper: {
        width: "100%",
        height: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "#000",
        borderRadius: 5,
        border: `1px solid ${palette.general.grey}`,
        overflow: "hidden",
        boxShadow: `0px 0px 15px 0px rgba(0, 0, 0, 0.35)`,
        maxWidth: 500,
    },
    subHeader: {
        color: "#fff",
        marginBottom: 10,
        "@media (max-width: 900px)": {
           textAlign: "center"
        }
    },
    methodsList: {
        display: 'flex',
        flexDirection: "column",
        padding: 2.5,
        alignItems: 'center',
        width: "100%",
    },
    methodItem: {
        listStyle: "none",
        color: "rgba(255, 255, 255, 0.25)",
        margin: "15px 0px",
        display: 'flex',
        flex: 1,
        justifyContent: "space-between",
        width: "100%",
    },
    methodTitle: {
        margin: "0px 15px",
        marginLeft: 35,
    },
    socialMediaContainer: {
        display: 'flex',
        "@media (max-width: 900px)": {
            marginTop: "45px",
        }
    },
    socialButton: {
        marginLeft: 0,
        marginRight: 20,
        "@media (max-width: 900px)": {
           margin: "10px",
         }
    },
    form: {
        display: 'flex',
        flexDirection: "column",
        width: "100%",
        padding: 25,
        alignItems: 'center',
        "@media (max-width: 900px)": {
            padding: "25px 0px",
        }
    },
    formFields: {
        display: 'flex',
        maxWidth: 500,
        width: "100%",
        flexDirection: "column",
    },
    caption: { 
        color:  "rgba(255, 255, 255, 0.25)", 
        marginBottom: 15,
        maxWidth: 300,
        textAlign: "center",
        "@media (max-width: 900px)": {
            marginBottom: 25,
         }
    },
    label: {
        color: "#fff",
        fontSize: "1rem",
        marginLeft: 10,
    },
    icon: {
        fontSize: 17.5,
    },
    fileInputCover: {
        marginTop: 10,
        width: "100%",
        height: "min-content",
        display: "flex",
        position: "relative",
    },
    fileInput: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        opacity: 0,
    },
    contentSections: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: 'center',
        "& > *": {
            //width: "min-content",
        },
        "@media (max-width: 900px)": {
            flexDirection: "column-reverse",
        }
    }
}), {
    classNamePrefix: "contact",
});