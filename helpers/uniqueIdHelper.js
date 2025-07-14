import { customAlphabet } from 'nanoid';

// Custom alphabet for nanoid
const nanoid = customAlphabet('123456', 6);

// Helper function to generate a unique ID
export const generateUniqueId = async (model, fieldName) => {
  let uniqueId = nanoid();
  let isUnique = false;

  // Loop until we get a unique ID
  while (!isUnique) {
    const existingRecord = await model.findOne({ [fieldName]: uniqueId });
    if (!existingRecord) {
      isUnique = true;
    } else {
      uniqueId = nanoid(); // Regenerate if the ID already exists
    }
  }

  return uniqueId;
};
