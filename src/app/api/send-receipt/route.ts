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

  // Crea el contenido del correo electrónico

  try {
    // Enviar el correo
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER, // Dirección de correo de envío
      to: email, // Dirección de destino
      subject: 'Hello world', // Asunto del correo
      html: '<p>hello world</p>', // Contenido del correo en HTML
      attachments: [
        {
          filename: 'receipt.pdf'
          // content: receipt
        }
      ]
    })

    console.log('Correo enviado:', info.response)
    return Response.json({ message: 'Correo enviado exitosamente' })
  } catch (error) {
    console.error('Error al enviar correo:', error)
    return Response.json({ error: 'Error al enviar correo' }, { status: 500 })
  }
}
