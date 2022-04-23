import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles({ name: "cursor" })((theme) => ({
    cursor: {
        transition: `background 200ms ease, box-shadow 250ms ease, opacity 150ms ease`,
        width: 20,
        height: 20,
        position: "fixed",
        backgroundColor: "transparent",
        top: 0,
        left: 0,
        borderRadius: "50%",
        border: `2px solid ${theme.palette.secondary.main}`,
        zIndex: 999,
        pointerEvents: "none",
        mixBlendMode: "difference",
        boxShadow: `0px 0px 0px 0px ${theme.palette.secondary.main}`
    },
    active: {
        background: theme.palette.secondary.main,
        boxShadow: `0px 0px 0px 10px ${theme.palette.secondary.main}`,
    }
}));