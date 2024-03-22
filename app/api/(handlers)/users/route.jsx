export function GET(Request) {
  // console.log(Request);

  return Response.json({
    error: {
      status_code: 404,
      message: 'I am GET message',
    },
  });
}

// export function POST(Request) {
//   const { body } = Request.body;

//   return Response.json({ data: body });
// }
