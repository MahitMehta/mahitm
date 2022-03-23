import { gql } from "@apollo/client"

export interface IContactFormArguments {
    files: File[],
    input: {
        fullName: string; 
        email: string; 
        message: string; 
    }
}

export const sendContactFormMutation =  gql`
    mutation sendContactForm($files: [ Upload! ], $input:IContactFormDTO!) {
        sendContactForm(files: $files, input:$input) 
    }
`