import '../styles/globals.css'
import React from 'react';
import { store } from '../redux';
import { Provider as ReduxProvider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import ThemeProvider from "../providers/ThemeProvider";
import { NextSeo } from 'next-seo';
import ApolloClientProvider from '../providers/ApolloClientProvider';
import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from "@emotion/react";

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
    muiCache = createCache({
        "key": "mahitm",
        "prepend": true
    });
     

export default class PortfolioApp extends App<{}> {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <CacheProvider value={muiCache ?? createMuiCache()}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#0B0B0B" />
          <meta name="description" content="Explore Mahit Mehta's 2022 Portfolio." />
          <title>Mahit Mehta&apos;s Portfolio</title>
        </Head>
        <NextSeo
            key={"root"}
            title="Mahit Mehta's Portfolio"
            additionalMetaTags={[
              {
                name: "keywords",
                content: "mahit mehta,mahit,mehta,portfolio"
              }
            ]}
            description="Explore Mahit Mehta's 2022 Portfolio."
            openGraph={{
              url: "https://www.mahitm.com/",
              title: "Mahit Mehta's Portfolio",
              description: "Explore Mahit Mehta's 2022 Portfolio",
              images: [
                {
                  url: "./logo.png",
                  width: 512,
                  height: 512,
                  alt: "Mahit's Logo",
                  type: 'image/jpeg',
                }
              ],
              site_name: "Mahit Mehta's Portfolio",
            }}
            twitter={{
              site: 'https://www.mahitm.com/',
              cardType: 'summary_large_image',
            }}
        />
        <React.StrictMode>
            <ReduxProvider store={store}>
              <ApolloClientProvider>
                <ThemeProvider>
                  <Component {...pageProps} /> 
                </ThemeProvider>
              </ApolloClientProvider>
            </ReduxProvider>
        </React.StrictMode>
      </CacheProvider>
    )
  }
}
