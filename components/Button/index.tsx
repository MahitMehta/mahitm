import React, { ButtonHTMLAttributes, ComponentPropsWithoutRef, CSSProperties, DetailedHTMLProps, ElementType } from "react";
import { useStyles } from "./styles";
import clsx from "clsx";
import Loader from "../Loader";

interface IButtonProps<T extends ElementType = "button" | "input"> extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    as?: T,
    title?: string; 
    className?: string; 
    style?: CSSProperties; 
    loading?: boolean; 
}

const Button = <T extends ElementType = "button" | "input">({ loading = false, title, children, as:elementAs, className, style, ...props }: IButtonProps<T> & ComponentPropsWithoutRef<T>) => {
    const { classes } = useStyles();

    const Component = elementAs || "button";

    return (
        <Component 
            type={elementAs === "input" ? "submit" : undefined}
            style={style}
            value={title}
            className={clsx(classes.container, className && className)}
            { ...props }
        >
            { loading &&  <Loader /> }
            { children }
        </Component>
    )
}

export default Button; 