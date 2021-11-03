const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Marketplace", function () {
  it("should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits("100", "ether") // Matic not ether

    await nft.createToken("https://www.mytokenurilocation.com")
    await nft.createToken("https://myothertokenurilocation.com")

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {value: listingPrice})

    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, {value: auctionPrice})

    // query for existing market items

    let items = await market.fetchMarketItems()

    items = await Promise.all(items.map(async token => {
      const tokenUri = await nft.tokenURI(token.tokenId)
      let item = {
        price: token.price.toString(), // parse BigNumber to string
        tokenId: token.tokenId.toString(), // parse BigNumber to string
        seller: token.seller,
        owner: token.owner,
        tokenUri
      }
      return item
    }))
    console.log("items: ", items)
  });
});
