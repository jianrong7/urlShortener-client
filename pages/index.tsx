import type { NextPage } from "next";

import React, { useState } from "react";
import Head from "next/head";

import UrlOutput from "../components/UrlOutput";
import UrlForm from "../components/UrlForm";
import Description from "../components/Description";

export interface UrlResponse {
  clicks: number;
  date: string;
  id: string;
  origUrl: string;
  qrCode: string;
  shortUrl: string;
  urlId: string;
}

const Home: NextPage = () => {
  const [urlResponse, setUrlResponse] = useState<UrlResponse | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(urlResponse!.shortUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  // useEffect(() => {
  //   let timer1 = setTimeout(() => setIsCopied(true), 1000);
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  // }, [isCopied]);

  return (
    <div>
      <Head>
        <title>short.er</title>
        <meta name="description" content="Shorten your URLs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center">
        <div className="w-full lg:w-3/4 my-10">
          <h1 className="text-3xl font-bold text-center mb-10">
            Shorten your URL and create a QR code!
          </h1>
          <div className="border-2 rounded-lg border-purple-500 p-10 m-3">
            <UrlForm setUrlResponse={setUrlResponse} />
          </div>
          <Description />
          {urlResponse && (
            <UrlOutput
              handleCopy={handleCopy}
              urlResponse={urlResponse}
              isCopied={isCopied}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
