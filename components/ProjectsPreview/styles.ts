import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    container: {
        minHeight: "100vh",
        padding: 25,
        display: 'flex',
        flexDirection: "column",
        position: "relative",
        "@media (max-width: 900px)": {
            padding: 0,
        }
    },
    introduction: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        "@media (max-width: 900px)": {
            flexDirection: "column",
            padding: 0,
        }
    },
    header: {
        fontFamily: "Old Standard TT",
        color: "#fff",
        fontSize: "clamp(65px, 10.5vw, 10.5vw)",
        fontWeight: "200",
        fontStyle: "italic",
    },
    headerContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        padding: 5,
    },
    divider: {
        height: 2,
        width: 45,
        background: "#fff",
        display: "block",
        marginLeft: "2vw",
    },
    subHeader: {
        margin: "25px 0px",
        marginLeft: "2vw",
        color: "rgba(255, 255, 255, 0.25)",
        fontSize:"clamp(1.15rem, 1.5vw, 1.5vw)",
    },
    dotsContainer: {
        transition: "250ms ease",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 50,
        top: "50%",
        transform: "translateY(-50%)",
        opacity: 0,
        pointerEvents: "none",
        "@media (max-width: 900px)": {
           right: 25,
        }
    },
    dot: {
        transition: `background-color 250ms ease`,
        width: 12.5,
        height: 12.5,
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderRadius: "50%",
        marginTop: 25,
        position: "relative",
        "&::after": {
            transition: `all 250ms ease, box-shadow 500ms ease `,
            content: "''",
            width: "100%",
            borderRadius: "50%",
            boxShadow: "0px 0px 0px 1px rgba(255, 255, 255, 0.5)",
            height: "100%",
            background: 'transparent',
            display: "block",
        }
    },
    dotSelected: {
        backgroundColor: palette.secondary.main,
        "&::after": {
            transform: "scale(2)",
            boxShadow: "0px 0px 0px 0.5px #fff ",
        }
    },
    showDots: {
        opacity: 1,
        pointerEvents: "initial",
    },
}), { 
    classNamePrefix: "featured"
});