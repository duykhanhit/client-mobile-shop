import Head from "next/head";
import React from "react";

export default function MetaData(props) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <meta name="author" content="TaiGameApk.Com" />
      <meta name="robots" content="index, follow" />
      <link
        rel="icon"
        href="https://cdn.cellphones.com.vn/media/favicon/default/logo-cps.png"
      />

      <meta itemProp="name" content={props.title} />
      <meta itemProp="description" content={props.description} />
      <meta itemProp="image" content={props.image} />

      <meta property="og:url" content="https://taigameapk.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
    </Head>
  );
}
