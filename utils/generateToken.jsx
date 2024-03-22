import jwt from 'jsonwebtoken';

export function generateToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '60s', // 300s = 5mins
  });
}
