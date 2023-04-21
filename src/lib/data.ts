/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getNftData(offset = 0) {
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
