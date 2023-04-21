import React, { useState } from "react";
import Image from "next/image";

interface NftCardProps {
  title: string;
  price: number;
  img: string;
  collectionTitle: string;
  owner: string;
}

const NftCard = ({
  title,
  price,
  img,
  collectionTitle,
  owner,
}: NftCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function shortenAddress(address: string, chars: number = 4): string {
    if (!address) return "";
    const start = address.slice(0, 2 + chars);
    const end = address.slice(-chars);
    return `${start}...${end}`;
  }

  return (
    <div className=" w-auto cursor-pointer rounded-lg border border-gray-700 bg-[#59368B] shadow transition duration-300 ease-in-out hover:scale-105 hover:transform">
      <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
        {!isImageLoaded && (
          <div className="flex flex-col items-center">
            <Image
              src="/rings.svg"
              alt="loader"
              className="rounded-t-lg"
              loading="lazy"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        )}
        <div className="flex flex-col items-center">
          <Image
            src={img}
            alt="user NFT"
            className="rounded-t-lg"
            onLoad={() => setIsImageLoaded(true)}
            loading="lazy"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
      </div>
      <div className="p-5">
        <h5 className=" text-light mr-1 line-clamp-1 text-2xl font-bold tracking-tight text-[#FF99FF]">
          {collectionTitle}
        </h5>
        <p className="mt mb-3 line-clamp-1 font-normal text-white">{title}</p>
        <div className="mt-4 flex flex-row items-center justify-between">
          <p className="text-white">Price: {price} SOL</p>
          <p className="invisible">Owner: {shortenAddress(owner)}</p>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
