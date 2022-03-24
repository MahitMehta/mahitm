import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
    container: {
        transition: "opacity 250ms ease",
        width: 625, 
        height: "100vh",
        maxWidth: "50vw",
        transform: "scale(1)",
        "@media (max-width: 750px)": {
            maxWidth: "100vw",
            height: 400,
        }
    }
}));