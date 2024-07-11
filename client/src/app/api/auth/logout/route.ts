import authApiRequest from '@/nextApp/apiRequest/auth.api'
import { HttpError } from '@/nextApp/nextApp.type'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  // ==========================================
  // Xử lý ko tốt, lẽ ra ở server phải validate ít nhất là token hợp lệ
  // Đoạn này code theo course chứ ko hay, chủ yếu học tiếp
  // TODO - fix trên BE là đủ
  // Logic chỉ cần client gửi vào server FE force là tự logout
  // Flow đang hiểu là khi FE gọi gì đó vào server, server trả 401 thì FE tự force logout
  // Tuy nhiên do dính header, client ko modified trực tiếp được
  // Phải gọi về server FE để reset cookie dùm (HTTP only)
  // logic có hơi sai vì đáng ra BE chỉ có tác dụng trả 401 chứ chưa chắc tự xóa token đang lưu -> FE tự xóa gọi gọi về BE lại
  // Rất rối
  const res = await request.json()
  const force = res.force as boolean | undefined
  if (force) {
    return Response.json(
      {
        message: 'Buộc đăng xuất thành công'
      },
      {
        status: 200,
        headers: {
          // Xóa cookie sessionToken
          'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
        }
      }
    )
  }

  // ==========================================

  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được session token' },
      {
        status: 401
      }
    )
  }

  try {
    const result = await authApiRequest.logoutFromNextServerToServer(
      sessionToken.value
    )
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Xóa cookie sessionToken
        'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
      }
    })
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        {
          message: 'Lỗi không xác định'
        },
        {
          status: 500
        }
      )
    }
  }
}
