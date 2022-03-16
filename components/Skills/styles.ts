import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    skills: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
    },
    skillsHeader: {
        fontFamily: "Old Standard TT",
        color: "#fff",
        fontSize: "clamp(65px, 10.5vw, 10.5vw)",
        fontWeight: "200",
        fontStyle: "italic",
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: "row",
    },
    headerDivider: {
        height: 2,
        width: 45,
        background: "#fff",
        display: "block",
        marginLeft: "2vw",
    },
    skillsCaption: {
        margin: "25px 0px",
        marginLeft: "2vw",
        color: "rgba(255, 255, 255, 0.25)",
        fontSize: "clamp(17.5px, 1.5vw, 1.5vw)",
    },
    skillsComponents: {
        display: 'flex',
        justifyContent: "space-around",
    },
    skillsContainer: {
        flex: 1,
        display: 'grid',
        width: "100%",
        columnGap: 15,
        justifyContent: 'center',
        borderRadius: 5,
        rowGap: 15,
        gridTemplateRows: "repeat(2, 125px)",
        gridTemplateColumns: "repeat(4, 250px)",
        "@media all and (max-width:900px)": {
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 250px))",
        }
    },
    skillContainer: {
        transition: "150ms ease",
        borderRadius: 5,
        width: 250,
        height: 125,
        display: "flex",
        position: 'relative',
        background: "rgba(39, 39, 42, 1)",
        boxShadow:  `0px 0px 15px 0px rgba(0, 0, 0, 0.5)`,
        "&:hover": {
            transform: "rotateZ(10deg) scale(1.1)",
            zIndex: 1,
        },
        "&:hover $image": {
            filter: "grayscale(0%)",
            transform: "scale(1.1)",
        }
    },
    picture: {
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        flex: 2,
        padding: 10,
        borderRadius: 5,
        overflow: "hidden",
    },
    skillDetails: {
        flex: 2,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "column",
    },
    skillExperience: {
        color: palette.grey?.[500],
        fontSize: 15,
        fontWeight: "400",
        marginTop: 7.5,
    },
    skillLabel: {
        color: "#fff",
        fontSize: 20,
    },
    image: {
        transition: "250ms ease",
        width: "100%",
        height: "100%",
        objectFit: 'contain',
        borderRadius: 5,
        zIndex: -1,
        filter: "grayscale(100%)",
    },
    buttonContainer: {
        width: 45,
        height: 45,
        display:'flex',
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.15) !important",
    },
    buttonIcon:{ 
        color: "#fff",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10, 
        gap: 10,
    }
}));