const Router = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = Router();
const authMiddleware = require("../middelware/authMiddleware");
const File = require("../models/File");
const FileService = require('./services/fileServices');

router.post(
  "/registration",
  [
    check("email", "Unccorecd email").isEmail(),
    check("password", "Unccorected password").isLength({ min: 4, max: 12 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: "The field is empty", error });
    }
    try {
      const { email, password } = req.body;
      const username = await User.findOne({ email });

      if (username) {
        res.status(400).json({ message: `This ${username} exist ` });
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const user = new User({ email, password: hashPassword });
      await user.save();
      await FileService.createDir(new File({user: user.id, name: ''}))
      return res.json({ message: "The user was created" });

    } catch (e) {
      console.log(e)
      // res.send({ message: "Server erro1r" });
    }
  }
);
router.post(
  "/login",

  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "The user not found" });
      }
      const isValid = await bcrypt.compareSync(password, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "The invalid password" });
      }
      const token = jwt.sign({ id: user.id }, config.get("secret_key"), {
        expiresIn: "24h",
      });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskUsage: user.diskSpace,
          usageDisk: user.usageDisk,
        },
      });
    } catch (e) {
      res.send({ message: "User error login" });
    }
  }
);

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const token = jwt.sign({ id: user.id }, config.get("secret_key"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});



module.exports = router;
