import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    container: {
        transition: "opacity 250ms ease",
        width: 625, 
        height: "100vh",
        maxWidth: "50vw",
        "@media (max-width: 750px)": {
            maxWidth: "100vw"
        }
    }
}));