const router = require("express").Router();
const passport = require("passport");
// const config = require("./config");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", ["r_emailaddress", "r_liteprofile"])
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  // =============new code========
  function (req, res) {
    // Check if the user has granted permission to access their email address
    if (req.user.emails && req.user.emails.length > 0) {
      const email = req.user.emails[0].value;
      console.log("User email:", email);
      // Do something with the email address
    } else {
      console.log("User has not granted permission to access email address");
      // Handle the case where the user has not granted permission to access email address
    }
  }
);

router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/");
// }

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
