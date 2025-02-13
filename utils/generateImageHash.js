import crypto from 'crypto';

export function generateImageHash(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex'); 
}
