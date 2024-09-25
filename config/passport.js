const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;
const UserDB = require("../model/googleUser");

const clientid = process.env.GOOGLE_CLIENT_ID;
const clientsecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientid || !clientsecret) {
    throw new Error("Missing Google OAuth client ID or client secret in environment variables.");
}

passport.use(
    new OAuth2Strategy(
        {
            clientID: clientid,
            clientSecret: clientsecret,
            callbackURL: "http://localhost:4000/api/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await UserDB.findOne({ googleId: profile.id });

                if (!user) {
                    user = new UserDB({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value,
                    });

                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done("problem of fetched", null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


