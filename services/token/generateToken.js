import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export function generateToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '300s', // 300s = 5mins
  });
}

export function generateOpaqueToken(ms = 300000) {
  const token = crypto.randomBytes(16).toString('hex');
  const expireTimestamp = Date.now() + ms; // default 5mins

  return { token, expireTimestamp };
}