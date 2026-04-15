export async function GET() {
  return Response.json(
    { message: "NextAuth has been removed. Use Firebase Auth instead." },
    { status: 410 }
  );
}

export const POST = GET;
