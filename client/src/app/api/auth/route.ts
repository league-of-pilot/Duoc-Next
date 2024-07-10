// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-functions
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
export async function POST(request: Request) {
  const res = await request.json()
  const sessionToken = res.data?.token

  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được session token' },
      {
        status: 400
      }
    )
  }

  return Response.json(res, {
    status: 200,
    // Set path cụ thể nếu ko default sẽ là path /api
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/;`
    }
  })
}
