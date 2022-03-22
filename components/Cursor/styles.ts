import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    cursor: {
        width: 20,
        height: 20,
        position: "fixed",
        backgroundColor: "transparent",
        top: 0,
        left: 0,
        borderRadius: "50%",
        border: `2px solid ${theme.palette.secondary.main}`,
        zIndex: 999,
        pointerEvents: "none",
        mixBlendMode: "difference",
       // boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}`,
    }
}));