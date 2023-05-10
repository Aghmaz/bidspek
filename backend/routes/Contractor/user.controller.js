const express = require("express");
const errorHandler = require("../../middleware/error");
const Contractor = require("../../models/Contractor");
const createUserSchema = require("./validationSchema"); //.default;

//const upload = require("../../middleware/upload");
// const { FormateUserObj } = require("./UserFormatter");
const router = express.Router();
const upload = require("../../utils/multer");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dimh97csd",
  api_key: "627913742987235",
  api_secret: "RUDvEY5HaUJomc6_LUgg4LwClac",
});

// get all contractor

router.get(
  "/",
  errorHandler(async (req, res) => {
    const contractor = await Contractor.find();
    res.status(200).send(contractor);
  })
);

// get specific contractor

router.get(
  "/:contractorId",
  errorHandler(async (req, res) => {
    const contractor = await Contractor.findOne({
      _id: req.params.contractorId,
    });
    const UserObj = FormateUserObj(contractor);
    res.status(200).send(UserObj);
  })
);

// Register User with Email
router.post(
  "/emailregister",
  errorHandler(async (req, res) => {
    const payload = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    payload["password"] = hashedPassword;
    //console.log(payload);
    const { error } = createUserSchema(payload);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    let contractor = new Contractor(payload);

    contractor = await contractor.save();
    res.status(200).send({ contractor });
  })
);

// profile image upload

router.patch(
  "/profileupload/:contractorId",
  upload.single("image"),
  async (req, res) => {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    const updatedUser = await Contractor.findByIdAndUpdate(
      req.params.contractorId,
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
    }
  }
);

// build profile API

router.patch(
  "/updateprofile/:contractorId",
  upload.single("image"),
  async (req, res) => {
    console.log(req.body.firstName);
    const updatedUser = await Contractor.findByIdAndUpdate(
      req.params.contractorId,
      {
        firstName: req.body.firstName,
        LastName: req.body.LastName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        hourlyRate: req.body.hourlyRate,
        advisor: req.body.advisor,
        subscription: req.body.subscription,
        priceProject: req.body.priceProject,
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

// Login route
router.post("/login", async (req, res) => {
  try {
    // Find the user with the specified email address
    const contractor = await Contractor.findOne({ email: req.body.email });
    if (!contractor) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the password with the hashed password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      contractor.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ email: contractor.email }, "abcdef");

    // Send the token in the response
    res.status(200).json({ token: token, data: { email: contractor.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
