import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    container: {
        width: "100vw", 
        height: "100vh",
        "@media(max-width:900px)": {
            filter: "blur(0px) brightness(75%)"
        }
    },
    canvas: {
        marginLeft: "12.5vw",
        "@media(max-width:900px)": {
            marginLeft: 0,
        }
    }
}));