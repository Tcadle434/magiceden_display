/* eslint-disable @typescript-eslint/no-explicit-any */

async function getNftData(offset = 0) {
  try {
    const url = `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=degods&onChainCollectionAddress=&direction=1&field=2&limit=20&offset=${offset}`;
    const response = await fetch(url);
    const responseObject = await response.json();
    const nftData = responseObject.results;

    return nftData.map((nft: any) => {
      return {
        title: nft.title,
        price: nft.price,
        img: nft.img,
        collectionTitle: nft.collectionTitle,
        owner: nft.owner,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function getNftDataWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await getNftData();
      return data;
    } catch (error) {
      console.error(`Error fetching NFT data (attempt ${i + 1}):`, error);
      if (i === retries - 1) {
        throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
