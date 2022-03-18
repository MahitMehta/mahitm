import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    container: {
        paddingTop: 25,
        minHeight: 500,
        height: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        "@media (max-width: 900px)": {
            justifyContent: "center",
        }
    },
    featuredPicture: {
        transform: "scale(1)",
        transition: "500ms ease",
        overflow: "hidden",
        filter: "grayscale(100%)",
    },
    featuredPictureSelected: {
        transform: "scale(1.15)",
        "& img": {
            filter: "grayscale(0%)",
        },
        "@media (max-width: 900px)": {
            transform: "scale(1)",
        }
    },
    pictureContainer: {
        transition: "transform 500ms ease",
        marginRight: 100,
       // background: palette.secondary.main,
        position: "relative",
        "& img": {
            transition: "clip-path 500ms ease, transform 500ms ease",
        },
        "&:hover $clippedPicture": {
            clipPath: "circle(0%)",
        },
        "@media (max-width: 900px)": {
            marginRight: 0
        }
    },
    clippedPicture: {
        position: "absolute",
        top: 0,
        left: 0,
        clipPath: "circle(0%)",
    },
    projectHeader: {
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        left: "10%",
        zIndex: 1,
        "@media (max-width: 900px)": {
            position: "initial",
            transform: "translateY(0%)",
        }
    },
    projectNumber: {
        transition: "250ms ease",
        color: palette.secondary.main,
    },
    projectCaption: {
        transition: "250ms ease",
        marginTop: 15,
        color: palette.grey?.[600],
        maxWidth: "25vw",
        lineHeight: "25px",
        "@media (max-width: 900px)": {
            maxWidth: "calc(100vw - 25px)",
        }
    },
    projectTitle: {
        color: "#fff",
        fontSize: "clamp(50px, 8.5vw, 8.5vw)",
        fontWeight: "500",
    },
    projectTitleContainer: {
        position: "relative"
    }
}), {
    classNamePrefix: "featured"
});