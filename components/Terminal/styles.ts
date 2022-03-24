import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    container: {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    terminal: {
        minWidth: 350,
        minHeight: 275,
        width: "45vw",
        height: "30vw",
        backgroundColor: "#111111",
        border: "1px solid #333333",
        borderRadius: 5,
        overflow: 'hidden',
        "@media (max-width: 900px)": {
            width: "95vw",
            height: "60vw",
        }
    },
    navbar: {
        width: "100%",
        height: 25,
        backgroundColor: "#333333",
        padding: "0px 5px",
        position: 'relative',
        marginBottom: 25,
    },
    navDots: {
        display: 'flex',
        alignItems: 'center',
        height: 25,
    },
    navDot: {
        margin: "0px 2.5px",
        display: 'block',
        width: 12.5,
        height: 12.5,
        borderRadius: '50%',
        backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
    userContainer: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    userAgent: {
        color: "rgba(255, 255, 255, 0.35)",
        fontWeight: 500,
        fontSize: 12,
        whiteSpace: "nowrap"
    },
    terminalLine: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 12,
        display: 'block',
        margin: "2.5px 0px",
    },
    terminalLines: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        padding: "0px 15px",
    },
    dockerCommand: {
        display: 'inline',
    },
    commandDone: {
        color: "#32FF6D",
    },
    dockerLine: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%",
        margin: "2.5px 0px",
        color: "#fff",
        fontSize: 12,
    }
}));