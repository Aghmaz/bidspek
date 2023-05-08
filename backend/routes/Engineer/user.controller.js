const express = require("express");
const errorHandler = require("../../middleware/error");
const Engineer = require("../../models/Engineer");
// const NewUser = require("../../models/NewUser");
const createUserSchema = require("./validationSchema"); //.default;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
//const upload = require("../../middleware/upload");
const { FormateUserObj } = require("./UserFormatter");
const router = express.Router();
const upload = require("../../utils/multer");
const cloudinary = require("cloudinary").v2;
const MailtrapClient = require("mailtrap");
const { msgDetails } = require("../../utils/email");
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

// router.post(
//   "/emailregister",
//   errorHandler(async (req, res) => {
//     // console.log(req.body.password);
//     const payload = req.body;
//     const salt = await bcrypt.genSalt(1);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     payload["password"] = hashedPassword;

//     const existingEngineer = await Engineer.findOne({ email: payload.email });
//     if (existingEngineer) {
//       return res.status(409).send({ message: "Email is already in use" });
//     }

//     let engineer = new Engineer(payload);

//     engineer = await engineer.save();
//     res.status(200).send({ engineer, message: "Registration successful!" });
//   })
// );
router.post(
  "/emailregister",
  errorHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const existingEngineer = await Engineer.findOne({ email });
    if (existingEngineer) {
      return res.status(409).send({ message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newEngineer = new Engineer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedEngineer = await newEngineer.save();

    res.status(200).send({
      message: "Registration successful!",
      engineer: {
        firstName: savedEngineer.firstName,
        lastName: savedEngineer.lastName,
        email: savedEngineer.email,
      },
    });
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
    }
  }
);

// Delete Image
router.delete("/deleteimage/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const engineer = await Engineer.findById(id);
    if (!engineer) {
      return res.status(404).json({ msg: "Engineer not found" });
    }

    const { profileImage } = engineer;

    // check if profile image exists
    if (!profileImage) {
      return res.status(400).json({ msg: "Profile image does not exist" });
    }

    // delete profile image from cloudinary
    const public_id = profileImage.split("/").slice(-1)[0].split(".")[0];
    await cloudinary.uploader.destroy(public_id);

    // remove profile image from engineer document
    engineer.profileImage = undefined;
    await engineer.save();

    return res.status(200).json({ msg: "Profile image deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
});
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
        company: req.body.company,
        companyName: req.body.companyName,
        switchPhone: req.body.switchPhone,
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
        hasSubmittedForm: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    try {
      res.status(200).json({
        message: "Form submitted successfully",
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

router.get("/check-form-submission/:useremail", async (req, res) => {
  try {
    const user = await Engineer.findOne({ email: req.params.useremail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ hasSubmittedForm: user.hasSubmittedForm });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
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
      firstName: engineer.firstName,
      lastName: engineer.lastName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  // Check if user with this email exists
  const user = await Engineer.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Engineer not found" });
  }

  // Generate password reset token
  const token = crypto.randomBytes(20).toString("hex");

  // Save password reset token in database
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();
  password = `<p>You have requested a password reset. Please click the following link to reset your password:</p>
  //          <p><a href="${process.env.CLIENT_URL}login/reset-password/${token}">Reset Password</a></p>`;

  msgDetails(email, password)
    .then((result) => {
      return res
        .status(200)
        .send({ message: "Email has been Sent Successfully" });
    })
    .catch((error) => {
      return res.status(400).send({ message: `Error sending email` });
    });
});

// Route to handle password reset request
router.put("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  // Check if password reset token is valid and has not expired
  const user = await Engineer.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).send({ message: "Invalid or expired token" });
  }

  // Update user's password in the database
  const salt = await bcrypt.genSalt(1);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.send({ message: "Password reset successful" });
});

//add file

router.patch(
  "/addfile/:engineerId",
  upload.single("file"),
  async (req, res) => {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type:
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "application/pdf" ||
        req.file.mimetype === "application/vnd.ms-powerpoint" ||
        req.file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        req.file.mimetype === "text/plain"
          ? "raw"
          : "auto",
      format: req.file.originalname.split(".").pop(),
    });
    const secure_url_file = result.secure_url;
    // Create new user
    const fileId = result.public_id; // Store the file ID in a variable
    const updatedUser = await Engineer.findByIdAndUpdate(
      req.params.engineerId,
      {
        $push: {
          caseImage: {
            url: result.secure_url,
            public_id: fileId, // Use the file ID in the database update
            format: result.format,
          },
        },
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
          fileId,
          secure_url_file,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//updateFile

// router.patch(
//   "/updatefile/:engineerId/:fileId",
//   upload.single("file"),
//   async (req, res) => {
//     console.log("Update file API called");
//     console.log("req.params.engineerId of update file", req.params.engineerId);
//     console.log("req.params.fileId of update file", req.params.fileId);
//     console.log("req.file of update file", req.file);

//     // Upload new file to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "auto",
//     });

//     console.log("Cloudinary response of update file", result);

//     // Update the existing file in the database
//     const query = {
//       _id: req.params.engineerId,
//       "caseImage.public_id": req.params.fileId,
//     };
//     const update = {
//       $set: {
//         "caseImage.$.url": result.secure_url,
//         "caseImage.$.public_id": result.public_id,
//       },
//     };
//     const options = { new: true, runValidators: true };

//     console.log("Query:", query);
//     console.log("Update:", update);

//     const updatedUser = await Engineer.findOneAndUpdate(query, update, options);

//     console.log("Updated user of update file", updatedUser);

//     if (!updatedUser) {
//       return res.status(404).json({
//         status: "Error",
//         message: "User not found or file not associated with user",
//       });
//     }

//     try {
//       res.status(200).json({
//         status: "Success",
//         data: {
//           updatedUser,
//           fileId: result.public_id,
//         },
//       });
//     } catch (err) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ status: "Error", message: "Internal server error" });
//     }
//   }
// );
router.patch(
  "/updatefile/:engineerId/:fileId",
  upload.single("file"),
  async (req, res) => {
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type:
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "application/pdf" ||
        req.file.mimetype === "application/vnd.ms-powerpoint" ||
        req.file.mimetype ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        req.file.mimetype === "text/plain"
          ? "raw"
          : "auto",
      format: req.file.originalname.split(".").pop(),
    });

    console.log("result of update file", result);

    // Update user
    const updatedUser = await Engineer.findByIdAndUpdate(
      req.params.engineerId,
      {
        $set: {
          "caseImage.$[elem].url": result.secure_url,
          "caseImage.$[elem].public_id": result.public_id,
          "caseImage.$[elem].format": result.format,
        },
      },
      {
        new: true,
        runValidators: true,
        arrayFilters: [
          { "elem.public_id": req.params.fileId },
          { "elem.url": req.body.url }, // add this condition to match the original url
        ],
      }
    );

    console.log("req.params.engineerId of update file", req.params.engineerId);
    console.log("result.secure_url of update file", result.secure_url);

    if (!updatedUser) {
      return res.status(404).json({
        status: "Error",
        message: "User not found or file not associated with user",
      });
    }
    console.log("updatedUser of update file", updatedUser);
    try {
      res.status(200).json({
        status: "Success",
        data: {
          updatedUser,
          fileId: req.params.fileId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

//===========================================
//==========================================

router.delete("/deletefile/:engineerId/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  console.log("req.params.fileId", req.params.fileId);
  try {
    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(fileId);

    // Remove file from user record
    const updatedUser = await Engineer.findByIdAndUpdate(
      req.params.engineerId,
      { $pull: { caseImage: { public_id: fileId } } },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "Success",
      data: {
        message: "File successfully deleted",
        updatedUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error",
      message: "Failed to delete file",
    });
  }
});

//==========================================
//==========================================

//delete Case Files
// router.patch("/deletefile/:engineerId/:fileId", async (req, res) => {
//   const updatedUser = await Engineer.findById(req.params.engineerId);
//   const fileUrl = updatedUser.caseImage[req.params.fileId];
//   // Delete the file from Cloudinary, if it exists
//   if (fileUrl) {
//     const publicId = fileUrl.split("/").pop().split(".")[0];
//     await cloudinary.uploader.destroy(publicId);
//     // Remove the file URL from the caseImage array
//     updatedUser.caseImage.splice(req.params.fileId, 1);
//     await updatedUser.save();
//   }
//   res.status(200).json({
//     status: "Success",
//     data: {
//       updatedUser,
//     },
//   });
// });

module.exports = router;
