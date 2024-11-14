import nodemailer from 'nodemailer'
import { NextRequest } from 'next/server'

// Crea un transporter utilizando el servicio SMTP de Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Usamos Gmail
  port: 465, // Puerto para SSL
  secure: true, // Usamos SSL
  auth: {
    user: process.env.GMAIL_USER, // Tu correo de Gmail
    pass: process.env.GMAIL_PASS // Tu contraseña de aplicación (ver más abajo)
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify().then(() => {
  console.log('Ready for send emails')
})

export async function POST (req: NextRequest) {
  const formData = await req.formData()
  const email = formData.get('email') as string
  const receipt = formData.get('file')

  console.log(formData)

  if (!email) {
    return Response.json({ error: 'El email no fue proporcionado' }, { status: 400 })
  }

  if (receipt && receipt instanceof Blob) {
    // Convierte el archivo a un array buffer y luego a un buffer de Node.js
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
