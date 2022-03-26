import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: "chest" })(() => ({
    container: {
        transition: "opacity 250ms ease",
        width: "100%",
        height: "100vh",
        maxWidth: "50vw",
        transform: "scale(1)",
        "@media (max-width: 900px)": {
            maxWidth: "100vw",
        },
        "@media (max-width: 750px)": {
            height: 400,
        }
    }
}));