// user login
//  file name =>>> user.js
// _________________________________________
const userSchema = require("../../Model/Peoples/user");
const bcrypt = require("bcrypt");
const generateToken = require("../../Configuration/generate-jwt");

async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const token = generateToken(user._id);
      // Return JWT token
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }


// Generate JWT
// file name =>>> generate-jwt.js
//  ________________________________________
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = generateToken;


// ----------------NOTE-------------

//  PROCESS
// user login with JWT and bcrypt involves a few steps:
// ____________________________________________________________
// 1.Validate User Credentials: Verify the user's credentials (email/username and password).
// 2.Generate JWT: If the credentials are valid, generate a JWT token.
// 3.Return JWT Token: Return the JWT token to the client.
// 4.Protect Routes: Use the JWT token to protect routes that require authentication
// ..................................................

// 1. Create a Login Endpoint: Implement a login endpoint in your user.js controller.
// 2. Client-side Login Form: Create a login form in your client application to collect the user's email and password.
// 3. Make a POST Request: When the user submits the login form, make a POST request to your login endpoint with the user's email and password.
// 4. Handle JWT Token: Once you receive the JWT token in the response, store it securely on the client-side (e.g., in local storage or a cookie) and use it to authenticate future requests to protected routes.
// ..................................................

// LOGIN  ENDPOINT EXAMPLE
 {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmM5MzJmNTZmYjUwZGMyZWJkODAxOSIsImlhdCI6MTcxNDE5ODQyNSwiZXhwIjoxNzE2NzkwNDI1fQ.jEQDFc7RtnBOWJY9bfe8XG5PQrl7OWffNzi3-bx7MRo"
}

//The token consists of three parts separated by dots: the header, the payload, and the signature. Each part is base64 encoded and separated by a period.
// Here's a breakdown of the token you provided:
Header:
{
    "alg": "HS256",
    "typ": "JWT"
  }

payload:
  {
    "id": "662c932f56fb50dc2ebd8019",
    "iat": 1714198425, // Issued at (Unix timestamp)
    "exp": 1716790425 // Expiration time (Unix timestamp)
  }

  Signature:

jEQDFc7RtnBOWJY9bfe8XG5PQrl7OWffNzi3-bx7MRo

// The payload contains the user's ID (id), the time at which the token was issued (iat), and the expiration time (exp). The token is signed using the HS256 algorithm and the secret key specified in your .env file.