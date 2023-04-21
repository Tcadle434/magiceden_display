async function getNftData() {
  try {
    const url =
      "https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=degods&onChainCollectionAddress=&direction=1&field=2&limit=20&offset=0";
    const response = await fetch(url);
    const responseObject = await response.json();
    const nftData = responseObject.results;
    // console.log("NFT data:", nftData);

    return nftData.map((nft: any) => {
      return {
        title: nft.title,
        price: nft.price,
        img: nft.img,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
