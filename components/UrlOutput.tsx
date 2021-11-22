import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UrlResponse } from "../pages";

export default function UrlOutput({
  handleCopy,
  urlResponse,
  isCopied,
}: {
  handleCopy: () => void;
  urlResponse: UrlResponse;
  isCopied: boolean;
}) {
  return (
    <div className="border-2 rounded-lg border-purple-500 p-10 m-3">
      <div>
        <span className="font-semibold text-xl">Your link:</span>
        <br />
        <div className="rounded mt-2 flex flex-wrap justify-between items-center">
          <div
            className="relative flex-1 max-w-xs sm:max-w-2xl"
            onClick={handleCopy}
          >
            <div className="rounded bg-gray-300 cursor-pointer items-center p-3 overflow-ellipsis">
              <Link href={urlResponse.shortUrl} passHref>
                <span className="font-semibold text-lg">
                  {urlResponse.shortUrl}
                </span>
              </Link>
            </div>
            {isCopied && (
              <div className="bg-gray-200 p-3 text-lg font-semibold rounded absolute right-0 top-0">
                Copied!
              </div>
            )}
          </div>

          <Image
            src={urlResponse.qrCode}
            height={150}
            width={150}
            alt="QR Code"
          />
        </div>
      </div>
    </div>
  );
}
