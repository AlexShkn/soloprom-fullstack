import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/telegram`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return NextResponse.json({
      message: 'Сообщение успешно отправлено',
      data: data,
    })
  } catch (error) {
    console.error('Ошибка отправки сообщения в Telegram:', error)
    return NextResponse.json(
      { message: 'Ошибка отправки сообщения в Telegram' },
      { status: 500 },
    )
  }
}
