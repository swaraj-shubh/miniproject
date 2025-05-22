// File: backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
// This function generates a JWT token using the user's ID and a secret key.
// The token is set to expire in 30 days. The generated token can be used for authentication in subsequent requests.
// The token is signed using the secret key defined in the environment variables.
// The function is exported as the default export of the module, allowing it to be imported and used in other files.
// This is a utility function that simplifies the process of generating JWT tokens for user authentication.
// It abstracts away the complexity of token creation and expiration management.