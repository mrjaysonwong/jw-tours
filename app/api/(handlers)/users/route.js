export async function GET(Request) {
  return Response.json({ message: 'foo' }, { status: 200 });
}
