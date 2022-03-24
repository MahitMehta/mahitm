import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: "footer" })(() => ({
    footer: {
        width: "100vw",
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 25,
        paddingBottom: 5,
    },
    header: {
        color: "#fff",
        fontSize: "clamp(25px, 3vw, 3vw)",
    },
    socialMediaContainer: {
        display: 'flex',
        margin: 15,
        marginBottom: 50,
    },
    logo: {
        width: 55,
    },
    footerCredits: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: 'center',
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        padding: 5,
    },
    copyright: {
        color: "#fff",
        fontSize: 12.5,
    },
}));