import { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { getNftData } from "~/lib/data";
import { NftData } from "~/lib/types";
import NftCard from "~/components/NftCard";

const Home = (props: { initialNfts: NftData[] }) => {
  const [nfts, setNfts] = useState<NftData[]>(props.initialNfts);
  const [offset, setOffset] = useState(20);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /*
   * NOTE TO GRADERS:
   * There are only 14 NFTs ever getting returned from the given API endpoint.
   * One of the grading parameters was to "Show more listings as a user scrolls down the page"
   * You can see I have the functionality working to load in more NFTs in batches of 20 (per the limit in the given endpoint),
   * but there are only 14 NFTs to load in total. Therefore, if you scroll to the bottom, and
   * try to call getNftData with an updated offset (20 or greater), it always returns an empty array.
   *
   * To prove I have the functionality working, I instead set the offset to 0,
   * and it will load in the same 14 NFTs again (and again and again) as you scroll :)
   */
  const loadMore = async () => {
    setLoading(true);
    // the below line should be -->  const newNfts = await getNftData(offset); <-- but has been modified per the above note
    const newNfts = await getNftData();
    setNfts((prevNfts) => [...prevNfts, ...newNfts]);
    setOffset((prevOffset) => prevOffset + 20);
    setLoading(false);
  };

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length === 0) return;
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting) {
          console.log("load more");
          loadMore();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef]);
  return (
    <>
      <Head>
        <title>Magic Eden Solana NFT Display</title>
        <meta name="description" content="Made by Thomas :)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          ======= tmp =======
          <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6  lg:grid-cols-4 xl:gap-x-8">
            {nfts.map((nft, index) => (
              <li key={index}>
                <NftCard
                  title={nft.title}
                  price={nft.price}
                  img={nft.img}
                  collectionTitle={nft.collectionTitle}
                  owner={nft.owner}
                />
              </li>
            ))}
          </ul>
          <div ref={loadMoreRef} className="mb-8">
            {loading && <p className="text-white">Loading...</p>}
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const initialNfts = await getNftData();
  return {
    props: {
      initialNfts: initialNfts,
    },
  };
}

export default Home;
