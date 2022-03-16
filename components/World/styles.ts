import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(theme => ({
    container: {
        width: "100vw", 
        height: "100vh",
    },
    canvas: {
        marginLeft: "12.5vw",
        "@media(max-width:900px)": {
            marginLeft: 0,
        }
    }
}));