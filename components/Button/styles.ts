import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: "button" })(({ palette }) => ({
    container: {
        padding: 15,
        borderRadius: 5,
        color: "#fff",
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        columnGap: 5,
        fontWeight: 500,
        border: `2px solid ${palette.grey[700]}`, 
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        boxShadow: `0px 0px 0px 0px ${palette.secondary.main}, 
                     0px 0px 15px 0px rgba(0, 0, 0, 0.35)`,
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.03)",
        },
        "&:focus": {
            boxShadow: `0px 0px 0px 2px ${palette.secondary.main}, 
                        0px 0px 15px 0px rgba(0, 0, 0, 0.35)`,
        }
    }
}));