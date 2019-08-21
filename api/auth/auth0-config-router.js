const router = require("express").Router();

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

module.exports = router;

// Set up Auth0 configuration
const authConfig = {
    domain: "mympy-dreamer.auth0.com",
    audience: "YOUR_API_IDENTIFIER"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
router.get("/", checkJwt, (req, res) => {
    res.send({
        msg: "Your Access Token was successfully validated!"
    });
});