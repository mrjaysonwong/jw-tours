import { customAlphabet } from 'nanoid';

// Custom alphabet for nanoid
const nanoidGenerator = customAlphabet('123456', 6);

// Helper function to generate a unique ID
export const generateUniqueId = async (Model, fieldName, retries = 10) => {
  let attempts = 0;
  let id;

  while (attempts < retries) {
    id = nanoidGenerator();
    const existingDoc = await Model.findOne({ [fieldName]: id });

    if (!existingDoc) {
      return id;
    }

    console.warn(
      `[Unique ID Helper] Duplicate ID found for ${fieldName}: ${id}. Retrying... (Attempt ${
        attempts + 1
      }/${retries})`
    );
    attempts++;
  }

  throw new Error(
    `[Unique ID Helper] Failed to generate a unique nanoid for ${fieldName} after ${retries} attempts.
     Consider increasing the nanoid alphabet/length or adjusting retry count if this happens frequently.`
  );
};
