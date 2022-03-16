import '../styles/globals.css'
import React from 'react';
import { store } from '../redux';
import { Provider as ReduxProvider } from 'react-redux';
import Head from 'next/head';
import App from 'next/app';
import ThemeProvider from "../providers/ThemeProvider";

export default class PortfolioApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Explore Mahit Mehta's 2022 Portfolio." />
          <title>Mahit Mehta's Portfolio</title>
        </Head>
        <React.StrictMode>
          <ReduxProvider store={store}>
            <ThemeProvider>
              <Component {...pageProps} />
            </ThemeProvider>
          </ReduxProvider>
        </React.StrictMode>
      </>
    )
  }
}
