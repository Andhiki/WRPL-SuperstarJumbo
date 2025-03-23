import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, company, email, phone, message } = body

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: email, // Email pengirim yang diisi di form
    to: `${process.env.MY_CUSTOM_EMAIL}, ${email}`, // Penerima: email Hostinger dan email pengirim (jika diinginkan)
    subject: `Message from ${name} via Renjana Furniture's website!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #0070f3; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message Received</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 16px;">${message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 14px; color: #777;">
          This message was sent via the Renjana Furniture website contact form.
        </p>
      </div>
    `,
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (!err) {
          resolve('Email sent')
        } else {
          reject(err.message)
        }
      })
    })

  try {
    await sendMailPromise()

    // Send data to Google Sheets API
    if (!process.env.GOOGLE_SHEETS_API_URL) {
      throw new Error('Google Sheets API URL is not configured')
    }
    await fetch(process.env.GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GOOGLE_SHEETS_API_KEY}`,
      },
      body: JSON.stringify({ name, company, email, phone, message }),
    })

    return new Response(
      JSON.stringify({ message: 'Email sent and logged in Google Sheets' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err: unknown) {
    console.error('Send email or Sheets API error:', err)
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
