import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    container: {
        display: "flex",
        padding: 25,
        width: "100%",
        height: "auto",
        maxWidth: 1600,
        marginTop: 100,
        "@media (max-width: 900px)": {
            flexDirection: "column",
        }
    },
    input: {
        width: "clamp(250px, 40vw, 40vw)",
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
        fontSize: "clamp(45px, 5.5vw, 5.5vw)",
        fontWeight: "200",
        fontStyle: "italic",
        
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
        flexDirection:"column",
        height: "100%",
        justifyContent: "space-around",
        "@media (max-width: 900px)": {
            alignItems: 'center',
        }
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
        "@media (max-width: 900px)": {
            alignItems: 'center',
        }
    },
    methodItem: {
        listStyle: "none",
        color: "rgba(255, 255, 255, 0.25)",
        margin: "15px 0px",
    },
    methodTitle: {
        margin: "0px 15px",
    },
    socialMediaContainer: {
        display: 'flex',
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
        flexDirection: "column",
        width: 500,
        "@media (max-width: 900px)": {
            width: "100%",
        }
    },
    caption: { 
        color:  "rgba(255, 255, 255, 0.25)", 
        marginBottom: 15,
        "@media (max-width: 900px)": {
            textAlign: "center",
            marginBottom: 25,
         }
    }
}), {
    classNamePrefix: "contact",
});