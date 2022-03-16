import React from "react";

export function isComponentSameType<T, P>(child:React.ReactElement<T>, component:React.FC<P>) {
    const componentDisplayName = component.name || component.displayName; 
    const componentName = (child.type as any).name; 
    return componentDisplayName === componentName
}