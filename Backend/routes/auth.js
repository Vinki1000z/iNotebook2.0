const express = require("express");
const router = express.Router();

// importing express validators
const { body, validationResult } = require("express-validator");

// importing the auth schema
const auth = require("../models/auth_schema.js");

// bcrypt session
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Jwt Token Work
var jwt = require("jsonwebtoken");
const jwt_word = "thisisjwttoken";

// importing the middlewarer fetchuser
const fetchuser = require("../middleware/fetchUser.js");

// routing work
// route 1. api/auth/signup
router.post(
  "/signup",
  [
    // Validate name
    body("name").notEmpty().withMessage("Name is required"),

    // Validate password
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),

    // Validate email
    body("email").isEmail().withMessage("Email is not valid"),
  ],
  async (req, res) => {
    let success = false;
    //  logging the error if comes in validating the form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success });
    }

    try {
      // checking for the unique email address
      let user = await auth.findOne({ email: req.body.email });
      if (user) {
        return res.json({ msg: "User Exist, Try New Email Id", success });
      }

      //   Hashing the Password
      let hash_pass = bcrypt.hashSync(req.body.password, saltRounds);
      const NewUser = new auth({
        name: req.body.name,
        password: hash_pass,
        email: req.body.email,
      });

      // saving in the db
      await NewUser.save();

      // sending msg that data is saved
      success = true;

      //   Jwt Token Session
      let data = {
        user: {
          id: NewUser._id,
        },
      };

      const token = jwt.sign(data, jwt_word);
      res.json({ token, success });
    } catch (error) {
      //  sending if any internal error comes in saving the data
      res.json({ msg: "Internal Error Comes", error });
    }
  }
);


// route 2. api/auth/login
router.post(
  "/login",
  [
    // Validate name
    body("name").notEmpty().withMessage("Name is required"),

    // Validate password
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),

    // Validate email
    body("email").isEmail().withMessage("Email is not valid"),
  ],
  async (req, res) => {
    let success = false;
    //  logging the error if comes in validating the form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success });
    }

    try {
      // Bringing the User From The Databse
      let user = await auth.findOne({ email: req.body.email });
      if (!user) {
        return res.json({
          msg: "Please Login With Correct Parameters",
          success,
        });
      }

      // checking the password
      const password = req.body.password;
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          Msg: "PLease Login With Correct Parameters",
          success,
        });
      }

      //   Jwt Token Session
      let data = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(data, jwt_word);

      //    Marking The Succes True
      success = true;
      res.json({ token, success });
    } catch (error) {
      //  sending if any internal error comes in saving the data
      res.json({ msg: "Internal Error Comes", error });
    }
  }
);

// router 3. api/auth/getlogin
router.get("/getlogin",fetchuser,async(req,res)=>{
    try {
        let userid = req.user.id;
        const client = await auth.findById(userid).select("-password");
        res.send(client);
      }  catch (error) {
        res.json({msg:"Error comes in the Getting Id From The Token",error});
    }
})


//  exporting the router to the index.js
module.exports = router;
