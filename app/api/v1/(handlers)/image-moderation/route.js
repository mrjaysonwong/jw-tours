import FormData from 'form-data';
import axios from 'axios';
import NodeCache from 'node-cache';

// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import { generateImageHash } from '@/utils/generateImageHash';

// Cache for 30mins
const cache = new NodeCache({ stdTTL: 1800, maxKeys: 25 });

export async function POST(Request) {
  try {
    const formData = await Request.formData();
    const file = formData.get('media');

    if (!file) {
      return Response.json(
        { statusText: 'Image file is required' },
        { status: 400 }
      );
    }

    // Convert `file` to Buffer (required for FormData in Node.js)
    const buffer = await file.arrayBuffer();
    const blob = Buffer.from(buffer);

    const imageHash = generateImageHash(blob);
    const cachedResponse = cache.get(imageHash);
    if (cachedResponse) {
      return Response.json(cachedResponse, { status: 200 });
    }

    const data = new FormData();
    data.append('media', blob, file.name);
    data.append('workflow', process.env.SIGHTENGINE_WORKFLOW_ID);
    data.append('api_user', process.env.SIGHTENGINE_USER_ID);
    data.append('api_secret', process.env.SIGHTENGINE_MODERATION_API_KEY);

    const url = 'https://api.sightengine.com/1.0/check-workflow.json';

    const response = await axios.post(url, data, {
      headers: data.getHeaders(),
    });

    if (response.data.status !== 'success') {
      return Response.json(
        { statusText: 'Unexpected error occured.' },
        { status: 500 }
      );
    }


    // Cache the response
    cache.set(imageHash, response.data);

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
