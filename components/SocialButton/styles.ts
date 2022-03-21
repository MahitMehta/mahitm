import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(({ palette }) => ({
    iconContainer: {
        width: 45,
        height: 45,
        transition: "150ms ease",
        backgroundColor: palette.general.grey,
        padding: 5,
        borderRadius: 5,
        border: "none",
        margin: 10,
        cursor: "pointer",
        boxShadow: "0px 0px 0px 0px rgba(255, 255, 255, 0)",
        "&:focus": {
            boxShadow: "0px 0px 0px 3px rgba(255, 255, 255, 1)",
        }
    },
    icon: {
        color: "#fff",
        fontSize: 25,
    },
}));