import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    label:{
        fontSize: 15,
        color: "#fff",
        margin: "10px",
        fontWeight: 500,
    },
    input: {
        fontFamily: "Readex Pro !important",
        marginBottom: 10,
        transition: "all 100ms ease",
        minWidth: 200,
        height: 50,
        width: "100%",
        borderRadius: 5,
        border: `2px solid ${palette.general.grey}`,
        padding: 10,
        color: palette.grey?.[500],   
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        resize: "none",
        boxShadow: `0px 0px 0px 0px #fff, 
                    0px 0px 15px 0px rgba(0, 0, 0, 0.35)`,
        "&::placeholder": {
            color: palette.grey?.[700],
        },
        "&:focus": {
            border: `2px solid ${palette.general.grey}`,
            boxShadow: `0px 0px 0px 3px ${palette.secondary.main}, 
                        0px 0px 15px 0px rgba(0, 0, 0, 0.35)`,
        },
    }
}));