import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/api';
import { GET } from '../app/api/v1/(handlers)/places/route';

const mockGetResponse = (statusText, status) => ({
  json: jest.fn().mockResolvedValue({ statusText }),
  status,
});

const createMockRequest = (queryParams = {}) => ({
  nextUrl: {
    searchParams: new URLSearchParams(queryParams),
  },
});

const validateResponse = async (
  Response,
  expectedStatusText,
  expectedStatus
) => {
  const result = await Response.json();

  expect(result.statusText).toBe(expectedStatusText);
  expect(Response.status).toBe(expectedStatus);
};

jest.mock('../app/api/v1/(handlers)/places/route', () => ({
  GET: jest.fn(), // mock the GET function
}));

describe('mock GET function', () => {
  // isolated tests
  beforeEach(() => {
    // reset the mock before each test
    GET.mockReset();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 400 if namePrefix is missing', async () => {
    GET.mockResolvedValue(
      mockGetResponse('Missing parameter namePrefix.', 400)
    );

    const Request = createMockRequest();
    const Response = await GET(Request);

    await validateResponse(
      Response,
      'Missing parameter namePrefix.',
      STATUS_CODES.BAD_REQUEST
    );
  });

  // Additional test cases here
  it('return an error if the fetch fails', async () => {
    // mock fetch to simulate a failed response
    GET.mockResolvedValue(mockGetResponse('Internal Server Error', 500));

    // mock valid request
    const Request = createMockRequest('test');
    const Response = await GET(Request);

    await validateResponse(
      Response,
      ERROR_MESSAGES.SERVER_ERROR,
      STATUS_CODES.SERVER_ERROR
    );
  });
});
