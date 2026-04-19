// app/api/test-env/route.ts
export async function GET() {
  return Response.json({
    test: process.env.NEXT_PUBLIC_TEST,
  });
}