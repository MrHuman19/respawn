import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email que recibe las notificaciones — cámbialo por el tuyo
const NOTIFY_EMAIL = 'joinrespawn@gmail.com'

// Email desde el que se envía — debe coincidir con tu dominio verificado en Resend
const FROM_EMAIL = 'send@joinrespawn.com'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // Validación básica
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      )
    }

    // 1. Email de confirmación al usuario
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your sidequest is loading. 🎮',
      html: `
        <div style="background:#0A0A0A;color:#F0EDE6;font-family:'Courier New',monospace;padding:40px;max-width:560px;margin:0 auto;">
          <p style="color:#D97B3A;font-size:13px;letter-spacing:0.2em;margin-bottom:24px;">RESPAWN</p>
          <h1 style="font-size:28px;font-weight:700;margin-bottom:16px;line-height:1.2;">
            Access granted.
          </h1>
          <p style="color:#B8A88A;font-size:15px;line-height:1.8;margin-bottom:32px;">
            You're on the waitlist. Your first sidequest is loading.<br/>
            We'll reach out when it's time to respawn.
          </p>
          <div style="border-left:2px solid #D97B3A;padding-left:16px;margin-bottom:32px;">
            <p style="color:#D97B3A;font-size:11px;letter-spacing:0.15em;margin-bottom:4px;">// REMEMBER</p>
            <p style="color:#F0EDE6;font-size:14px;font-style:italic;">
              "You can leave Friday evening and return Monday morning completely changed."
            </p>
          </div>
          <p style="color:#4A4238;font-size:11px;letter-spacing:0.08em;">
            © 2026 RESPAWN · joinrespawn.com
          </p>
        </div>
      `,
    })

    // 2. Notificación a ti con el email del nuevo signup
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `New waitlist signup: ${email}`,
      html: `
        <div style="font-family:monospace;padding:24px;">
          <p style="color:#D97B3A;font-size:13px;">RESPAWN · New signup</p>
          <p style="font-size:16px;margin-top:12px;">📍 <strong>${email}</strong> just joined the waitlist.</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}