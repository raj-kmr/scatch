const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;

        let user = await userModel.findOne({email: email});
        if(user) {
            req.flash("error", "you already have an account, please Login!");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("user created successfully");
                }

            })
        })

    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginUser = async function (req, res) {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) {
        req.flash("error", "Email or Password Incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function(err, result) {
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        } else {
            req.flash("error", "Email is Password incorrect");
            return res.redirect("/");
        }
    })
}

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
};