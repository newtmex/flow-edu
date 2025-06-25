"use client";

import Script from "next/script";

export default function GTag() {
  if (process.env.NODE_ENV === "production") {
    return (
      <>
        <Script id="gtag-manager" async src="https://www.googletagmanager.com/gtag/js?id=G-C18ZRGBD20" />
        <Script id="gtag">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-C18ZRGBD20');`}
        </Script>
      </>
    );
  }
  return null;
}
