import { promises as fs } from "fs";
import path from "path";
import { Socket } from "net";
import tls from "tls";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type InquiryPayload = {
  name?: string;
  email?: string;
  whatsapp?: string;
  country?: string;
  product?: string;
  quantity?: string;
  requirement?: string;
};

const inquiryEmail = process.env.INQUIRY_TO_EMAIL || "ida@asiaweigh.com";
const fromEmail = process.env.INQUIRY_FROM_EMAIL || "Asia Weighing <ida@asiaweigh.com>";
const inquiriesFile = path.join(process.cwd(), "data", "inquiries.json");

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailAddress(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] || value).trim();
}

function buildHtml(payload: Required<InquiryPayload>) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["WhatsApp", payload.whatsapp || "-"],
    ["Country", payload.country],
    ["Product", payload.product || "-"],
    ["Quantity", payload.quantity || "-"],
    ["Requirement", payload.requirement],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#10283d;line-height:1.6">
      <h2>New inquiry from asiaweighing.com</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #d9e6ef;background:#f4f8fb;font-weight:700;width:160px">${label}</td>
                <td style="border:1px solid #d9e6ef">${escapeHtml(String(value)).replace(/\n/g, "<br />")}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function buildText(payload: Required<InquiryPayload>) {
  return [
    "New inquiry from asiaweighing.com",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `WhatsApp: ${payload.whatsapp || "-"}`,
    `Country: ${payload.country}`,
    `Product: ${payload.product || "-"}`,
    `Quantity: ${payload.quantity || "-"}`,
    "",
    "Requirement:",
    payload.requirement,
  ].join("\r\n");
}

async function saveInquiry(record: Record<string, unknown>) {
  try {
    await fs.mkdir(path.dirname(inquiriesFile), { recursive: true });
    const existing = await fs.readFile(inquiriesFile, "utf8").catch(() => "[]");
    const inquiries = JSON.parse(existing) as Record<string, unknown>[];
    inquiries.unshift(record);
    await fs.writeFile(inquiriesFile, JSON.stringify(inquiries.slice(0, 500), null, 2));
    return true;
  } catch (error) {
    console.warn("Inquiry local save skipped:", error);
    return false;
  }
}

function waitForSmtp(socket: Socket, expected: number[]) {
  return new Promise<string>((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("SMTP server response timed out."));
    }, 20000);
    const cleanup = () => {
      clearTimeout(timer);
      socket.off("data", onData);
      socket.off("error", onError);
    };
    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };
    const onData = (data: Buffer) => {
      buffer += data.toString("utf8");
      const lines = buffer.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1] || "";
      if (!/^\d{3}\s/.test(last)) return;
      const code = Number(last.slice(0, 3));
      cleanup();
      if (expected.includes(code)) {
        resolve(buffer);
      } else {
        reject(new Error(`SMTP server returned ${code}: ${buffer}`));
      }
    };
    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function smtpCommand(socket: Socket, command: string, expected: number[]) {
  socket.write(`${command}\r\n`);
  return waitForSmtp(socket, expected);
}

async function sendSmtpEmail(payload: Required<InquiryPayload>) {
  const host = process.env.SMTP_HOST || "smtp.qiye.aliyun.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER || "ida@asiaweigh.com";
  const pass = process.env.SMTP_PASS;
  if (!pass) return { sent: false, reason: "SMTP_PASS is not configured" };

  const socket = tls.connect({ host, port, servername: host });
  await new Promise<void>((resolve, reject) => {
    socket.once("secureConnect", resolve);
    socket.once("error", reject);
  });

  try {
    await waitForSmtp(socket, [220]);
    await smtpCommand(socket, "EHLO asiaweighing.com", [250]);
    await smtpCommand(socket, "AUTH LOGIN", [334]);
    await smtpCommand(socket, Buffer.from(user).toString("base64"), [334]);
    await smtpCommand(socket, Buffer.from(pass).toString("base64"), [235]);
    await smtpCommand(socket, `MAIL FROM:<${emailAddress(fromEmail)}>`, [250]);
    await smtpCommand(socket, `RCPT TO:<${inquiryEmail}>`, [250, 251]);
    await smtpCommand(socket, "DATA", [354]);

    const subject = `New quote inquiry from ${payload.name}`;
    const html = buildHtml(payload);
    const text = buildText(payload);
    const boundary = `asia-weighing-${Date.now()}`;
    const message = [
      `From: ${fromEmail}`,
      `To: ${inquiryEmail}`,
      ...(payload.email ? [`Reply-To: ${payload.email}`] : []),
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      text,
      "",
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "",
      html,
      "",
      `--${boundary}--`,
      "",
    ].join("\r\n");

    socket.write(`${message.replace(/^\./gm, "..")}\r\n.\r\n`);
    await waitForSmtp(socket, [250]);
    await smtpCommand(socket, "QUIT", [221]);
    return { sent: true, id: `smtp-${Date.now()}` };
  } finally {
    socket.end();
  }
}

async function sendEmail(payload: Required<InquiryPayload>) {
  const smtpResult = await sendSmtpEmail(payload);
  if (smtpResult.sent || process.env.SMTP_PASS) return smtpResult;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY is not configured" };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: inquiryEmail,
      reply_to: payload.email,
      subject: `New quote inquiry from ${payload.name}`,
      html: buildHtml(payload),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Email service rejected the inquiry.");
  }
  return { sent: true, id: data.id };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;
    const payload = {
      name: clean(body.name) || "Quick website inquiry",
      email: clean(body.email),
      whatsapp: clean(body.whatsapp),
      country: clean(body.country),
      product: clean(body.product),
      quantity: clean(body.quantity),
      requirement: clean(body.requirement),
    };

    if ((!payload.email && !payload.whatsapp) || !payload.country) {
      return NextResponse.json({ error: "Please complete email or WhatsApp and country." }, { status: 400 });
    }

    const emailResult = await sendEmail(payload);
    const saved = await saveInquiry({
      ...payload,
      recipient: inquiryEmail,
      emailSent: emailResult.sent,
      emailId: "id" in emailResult ? emailResult.id : null,
      createdAt: new Date().toISOString(),
    });

    if (!emailResult.sent) {
      return NextResponse.json(
        {
          error: "Inquiry email is not configured on the server.",
          recipient: inquiryEmail,
          saved,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      recipient: inquiryEmail,
      emailSent: emailResult.sent,
      saved,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Inquiry submission failed." },
      { status: 500 },
    );
  }
}
