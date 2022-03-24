import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { withEmotionCache } from "tss-react/nextJs";
import { createMuiCache } from './_app';

class RootDocument extends Document {
    static async getInitialProps(ctx:DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
          <Html lang="en">
            <Head key="document">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap" rel="stylesheet" />
                <link rel="icon" href="favicon.ico" /> 
                <link rel="apple-touch-icon" href="logo.png" />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }
}

export default withEmotionCache({
  "Document": RootDocument,
  "getCaches": ()=> [ createMuiCache() ]
});
