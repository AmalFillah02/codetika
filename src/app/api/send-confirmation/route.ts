// src/app/api/send-confirmation/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const phoneNumber = "6282138199126";

  const confirmationMessage = `Halo, saya ${body.name} telah melakukan pemesanan aplikasi jenis ${body.app_type} dengan total Rp${body.total.toLocaleString()} dan telah membayar DP sebesar Rp${(body.total / 2).toLocaleString()}. Berikut bukti transfer saya.`;

  const confirmationUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    confirmationMessage
  )}`;

  try {
    const data = await resend.emails.send({
      from: "CODETIKA <noreply@amalfillah.my.id>",
      to: body.email,
      subject: "Konfirmasi Pemesanan Anda",
      html: `
        <p>Halo ${body.name},</p>
        <p>Terima kasih telah melakukan pemesanan aplikasi.</p>
        <p><strong>Jenis Aplikasi:</strong> ${body.app_type}</p>
        <p><strong>Fitur:</strong></p>
        <ul>
          ${body.features.map((f: string) => `<li>${f}</li>`).join("")}
        </ul>
        <p><strong>Total Estimasi:</strong> Rp${body.total.toLocaleString()}</p>
        <p><strong>DP (50%):</strong> Rp${(body.total / 2).toLocaleString()}</p>
        <br/>
        <p>Silakan konfirmasi pembayaran DP Anda melalui link berikut:</p>
        <p><a href="${confirmationUrl}" style="color: blue;">Konfirmasi via WhatsApp</a></p>
        <br/>
        <p>Salam,</p>
        <p><strong>CODETIKA</strong></p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
