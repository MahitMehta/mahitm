export interface ITheme {
    background: string; 
    text: string; 
}

export interface IGeneralTheme {
    purple: string;
    beige: string;  
    grey: string; 
}

export const darkTheme:ITheme = {
    background: "#000",
    text: "#fff",
}

export const lightTheme:ITheme = {
    background: "#fff",
    text: "#000",
}

export const generalTheme:IGeneralTheme = {
    purple: "#242538",
    beige: "#F5F5DC",
    grey: "rgba(39, 39, 42, 1)"
}