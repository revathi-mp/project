const wishListItem = require("../models/WishListitem");
const Product = require("../models/Product");

const addToWishList = async (req, res)=> {
    try{
        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
    }
    const exists = await wishListItem.findOne({
        userId: req.user.id,
        productId,
    });
    if (exists) {
        return res.status(404).json({
            message: "Product already exist in wishlist",
        });
    }
    const wishListItem = await wishListItem.create({
        userId: req.user.id,
        productId,
    });
    res.status(201).json({
        message: "Product added to WishList",
    });
} catch (error) {
    res.status(500).json({
        message: error.message || "Internal server error",
    });
}
};

 const getWishList = async (req,res) => {
    try {
        const WishListitems = await wishListItem.find({
            userId: req.user.id,

        }).populate("productId");

        res.status(200).json({
            message: "WishList fetched",
            wishList: wishListItem,
        });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
 };

 const removeListItem = async (req, res) => {
    try {
        const { itmedId } = req.params;

        await wishListItem.findByIdAndDelete(itmedId);

        res.status(200).json({
            message: "Item removed from the wishlist",
        });
    }   catch (error) {
        res.status(500).json({
            message: error.message || "Internal server errror",
        });
    }
};
 

module.exports = { addToWishList, getWishList, removeListItem};