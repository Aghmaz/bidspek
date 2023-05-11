const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

// const { config } = require("config");
const passport = require("passport");
const Engineer = require("./models/Engineer");

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     function (accessToken, refreshToken, profile, callback) {
//       callback(null, profile);
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "939680617126-saq66dsvq6d7adf436vjofalh6a5q6tm.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const engineer = await Engineer.findOne(
          { email: profile.emails[0].value },
          "_id"
        );
        if (engineer) {
          profile["id"] = engineer;
        }
        if (!engineer) {
          // create new Engineer with profile information and save to database
          const newEngineer = new Engineer({
            email: profile.emails[0].value,
            // add any other relevant fields from the profile object
          });
          if (newEngineer) {
            profile["id"] = newEngineer;
          }
          await newEngineer.save();
          callback(null, profile, newEngineer);
        } else {
          callback(null, profile, engineer);
        }
      } catch (err) {
        callback(err);
      }
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: "77q7xrn32mmv0d",
      clientSecret: "MyAC0HJfyj3fRQtL",
      callbackURL: "/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
      profileFields: ["id", "first-name", "last-name", "email-address"],
    },
    // function (token, tokenSecret, profile, done) {
    //   return done(null, profile);
    // }
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
