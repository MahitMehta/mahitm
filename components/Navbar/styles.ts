import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(({ palette }) => ({
    nav: {
        width: "100vw",
        height: 60,
        display: 'flex',
        padding: 10,
        position: 'fixed',
        zIndex: 100,
        justifyContent: 'space-between',
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        WebkitBackdropFilter: "blue(8px)",
        backdropFilter: "blur(8px)",
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    logo: {
        minWidth: 55,
        width: "5vw",
        maxWidth: 75,
    },
    ul: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: "0px 25px",
    },
    li: {
        listStyle: 'none',
        color: "#fff",
        padding: "10px 15px",
        display: 'flex',
    },
    function: {
    
    },
    iconContainer: {
        width: 40,
        height: 40,
    },
    icon: {
        color: "#fff",
        fontSize: 25,
    },
    itemContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: "0px 15px",
    }
}));