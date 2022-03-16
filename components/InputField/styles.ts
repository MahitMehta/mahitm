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
        minWidth: 300,
        height: 50,
        width: "100%",
        borderRadius: 10,
        border: `1px solid ${palette.grey?.[900]}`,
        padding: 10,
        color: palette.grey?.[500],
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        resize: "none",
        boxShadow: `0px 0px 0px 0px ${palette.secondary.main}`,
        "&::placeholder": {
            color: palette.grey?.[700],
        },
        "&:focus": {
            border: `1px solid #fff`,
            boxShadow: `0px 0px 0px 3px ${palette.secondary.main}`,
        }
    }
}));