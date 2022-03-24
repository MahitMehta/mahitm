import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    container: {
        display: 'flex',
        overflowY: 'hidden',
        width: "100vw",
        minHeight: "100vh",
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'flex-start',
        paddingLeft: 25,
        width: "100vw",
        zIndex: 1,
        height: '100vh',
        marginLeft: "10vw",
        justifyContent: 'center',
        "& > *": {
            pointerEvents: "initial"
        },
        "@media(max-width:900px)": {
            marginLeft: 10,
        }
    },
    text: {
        fontSize: "clamp(4rem, 6.5vw, 6.5vw)",      
        fontWeight: 500,
        color: "#fff",
        mixBlendMode: "multiply",
    },
    world: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    bg: {
        position: 'fixed',
        top: 0,
        left: 0,
        background: "radial-gradient(circle, rgba(37,37,37,1) 0%, rgba(0,0,0,1) 100%)",
        width: "100vw",
        minHeight: "100vh",
        zIndex: -1,
    },
    footer: {
        width: "100vw",
        minHeight: 50,
        padding: "35px 35px",
        bottom: 0,
        zIndex: 1,
        position: 'absolute',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: "clamp(1rem, 2vw, 2vw)",
    },
    content: {
        height: "100vh",
        position: 'relative',
        width: "100vw",
    },
    footerCaption: {
        position: "absolute",
        color: "#fff",
        right: "2vw",
    },
    greeting: {
        color: "#fff",
        fontSize: "clamp(1.15rem, 1.5vw, 1.5vw)",
    },  
    headerCaption: {
        fontSize: "clamp(1.15rem, 1.25vw, 1.25vw)",
        // color: 'transparent',
        marginTop: "25px",
        fontWeight: 400,
        color: "#fff",
    },
    contentSection: {
        maxWidth: "100vw",
        overflow: "hidden",
        pointerEvents: "none",
        transition: '1150ms ease',
        opacity: 0,
    },
    contentSectionDisplay: {
        pointerEvents: "initial",
        opacity: 1,
    }
}));