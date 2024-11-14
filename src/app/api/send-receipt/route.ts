import nodemailer from 'nodemailer'
import { NextRequest } from 'next/server'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify().then(() => {
  console.log('Ready for send emails')
}).catch(err => console.error(err))

export async function POST (req: NextRequest) {
  const formData = await req.formData()
  const email = formData.get('email') as string
  const receipt = formData.get('file')

  console.log(formData)

  if (!email) {
    return Response.json({ error: 'El email no fue proporcionado' }, { status: 400 })
  }

  if (receipt && receipt instanceof Blob) {
    const arrayBuffer = await receipt.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    try {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Hello world',
        html: '<p>hello world</p>',
        attachments: [
          {
            filename: 'receipt.pdf',
            content: buffer,
            contentType: 'application/pdf'
          }
        ]
      })

      console.log('Correo enviado:', info.response)
      return Response.json({ message: 'Correo enviado exitosamente' })
    } catch (error) {
      console.error('Error al enviar correo:', error)
      return Response.json({ error: 'Error al enviar correo' }, { status: 500 })
    }
  } else {
    return Response.json({ error: 'El archivo no es válido o no fue proporcionado' }, { status: 400 })
  }
}
