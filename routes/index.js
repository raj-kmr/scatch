const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
})

router.get("/shop", isloggedin, async function(req, res) {
    let products = await productModel.find();
    let name= "popular";
    let success = req.flash("success");
    res.render("shop", { products, success, sortby: name });
})

router.get("/sortby", isloggedin, async (req, res) => {
    let name = req.query.sortby;
    let products = await productModel.find();

    // In-memory sorting
    if (name === "newest") {
        products = products.reverse(); // simulate newest
    }

    let success = req.flash("success");
    res.render("shop", { products, success, sortby: name });
});

router.get("/shop/discounted", isloggedin, async function(req, res) {
    let products = await productModel.find({discount: { $gt: 0 }}); 
    let name = "popular";
    
    if (name === "newest") {
        products = products.reverse(); // simulate newest
    }

    let success = req.flash("success");
    res.render("shop", { products, success, sortby: name });
})


router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    let bill = 0;
    let totalMrp = 0;
    let totalDiscount = 0;
    
    let remove = req.flash("remove");

    user.cart.forEach((product) => {
        bill += Number(product.price) - Number(product.discount);
        totalMrp += Number(product.price);
        totalDiscount += Number(product.discount);
    })
    bill += 20;

    res.render("cart", {user, bill, totalMrp, totalDiscount, remove  });
})

router.post("/removefromcart/:index", isloggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });

        const index = parseInt(req.params.index);
        if (!isNaN(index) && index >= 0 && index < user.cart.length) {
            user.cart.splice(index, 1);
            await user.save();
            req.flash("remove", "Item removed")
            // res.render('/cart')
            return res.status(200).send("Item removed");
        } else {
            return res.status(400).send("Invalid index");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});

router.get("/addtocart/:productid", isloggedin, async function(req, res) {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
})  

router.get("/logout", isloggedin, function(req, res) {
    res.render("shop");
})

module.exports = router;
