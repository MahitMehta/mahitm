import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    container: {
        transition: "opacity 250ms ease",
        width: 625, 
        height: "100vh",
        "@media (max-width: 750px)": {
            width: "100vw"
        }
    }
}));