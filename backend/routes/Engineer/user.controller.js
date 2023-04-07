const express = require("express");
const errorHandler = require("../../middleware/error");
const Engineer = require("../../models/Engineer");
// const NewUser = require("../../models/NewUser");
const createUserSchema = require("./validationSchema"); //.default;

//const upload = require("../../middleware/upload");
const { FormateUserObj } = require("./UserFormatter");
const router = express.Router();
const upload = require("../../utils/multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dimh97csd",
  api_key: "627913742987235",
  api_secret: "RUDvEY5HaUJomc6_LUgg4LwClac",
});

// const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get all engineers

router.get(
  "/",
  errorHandler(async (req, res) => {
    const engineer = await Engineer.find();
    res.status(200).send(engineer);
  })
);

// search a specific engineer

router.get(
  "/:engineerId",
  errorHandler(async (req, res) => {
    const engineer = await Engineer.findOne({ _id: req.params.engineerId });
    const UserObj = FormateUserObj(engineer);
    res.status(200).send(UserObj);
  })
);

// register a engineer

router.post(
  "/emailregister",
  errorHandler(async (req, res) => {
    // console.log(req.body.password);
    const payload = req.body;
    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    payload["password"] = hashedPassword;
    //console.log(payload);
    // const { error } = createUserSchema(payload);

    // if (error) {
    //   return res.status(400).send({ message: error.details[0].message });
    // }

    // ===========Sahil code======
    // Check if an engineer with the given email already exists
    const existingEngineer = await Engineer.findOne({ email: payload.email });
    if (existingEngineer) {
      return res.status(409).send({ message: "Email is already in use" });
    }

    let engineer = new Engineer(payload);

    engineer = await engineer.save();
    res.status(200).send({ engineer });
  })
);

//  profile image upload

router.patch(
  "/profileupload/:engineerId",
  upload.single("image"),
  async (req, res) => {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    const updatedUser = await Engineer.findByIdAndUpdate(
      req.params.engineerId,
      { profileImage: result.secure_url },
      {
        new: true,
        runValidators: true,
      }
    );
    try {
      res.status(200).json({
        status: "Success",
        data: {
          updatedUser,
        },
      });
    } catch (err) {
      console.log(err);
      m;
    }
  }
);

//  build profile API

router.patch(
  "/updateprofile/:engineerId",
  upload.single("image"),
  async (req, res) => {
    console.log(req.body.firstName);
    const updatedUser = await Engineer.findByIdAndUpdate(
      req.params.engineerId,
      {
        firstName: req.body.firstName,
        LastName: req.body.LastName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        role: req.body.role,
        hourlyRate: req.body.hourlyRate,
        licensePE: req.body.licensePE,
        corrosionEngineer: req.body.corrosionEngineer,
        buildingPermits: req.body.buildingPermits,
        permitsRegion: req.body.permitsRegion,
        permitsCountry: req.body.permitsCountry,
        permitsStates: req.body.permitsStates,
        preferences: req.body.preferences,
        services: req.body.services,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    try {
      res.status(200).json({
        status: "Success",
        data: {
          updatedUser,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.get(
  "/:engineerId",
  errorHandler(async (req, res) => {
    const engineer = await Engineer.findOne({ _id: req.params.engineerId });
    const UserObj = FormateUserObj(engineer);
    res.status(200).send(UserObj);
  })
);

// Login route
// router.post("/login", async (req, res) => {
//   try {
//     // Find the user with the specified email address
//     const engineer = await Engineer.findOne({ email: req.body.email });
//     if (!engineer) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Compare the password with the hashed password
//     const passwordMatch = await bcrypt.compare(
//       req.body.password,
//       engineer.password
//     );
//     if (!passwordMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Create and sign a JWT token
//     const token = jwt.sign({ email: engineer.email }, "abcdef");

//     // Send the token in the response
//     res.status(200).json({ token: token, data: { email: engineer.email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    // Find the user with the specified email address
    const engineer = await Engineer.findOne({ email: req.body.email });
    if (!engineer) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the password with the hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      engineer.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      {
        email: engineer.email,
        engineerId: engineer._id,
        password: engineer.password,
      },
      "abcdef"
    );

    // Send the token and engineerId in the response
    res.status(200).json({
      token: token,
      password: engineer.password,
      email: engineer.email,
      engineerId: engineer._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
