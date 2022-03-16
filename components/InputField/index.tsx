import clsx from "clsx";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { useStyles } from "./styles";

interface InputFieldProps<T extends ElementType = "input" | "textarea"> {
    label?: string; 
    className?: string; 
    as?: T,
}

const InputField = <T extends ElementType = "input" | "textarea">({ label, id, as, className, ...props } : InputFieldProps<T> & ComponentPropsWithoutRef<T>) => {
    const classes = useStyles();
    const Component = as || "input";

    return (
       <>
           { label && <label className={classes.label}>{ label }</label> }
            <Component
                placeholder="Type Something..."
                className={clsx(classes.input, className && className)}
                { ...props }
            />
       </>
    )
}

export default InputField;