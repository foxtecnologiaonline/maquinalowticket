interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

/**
 * Thin wrapper over the Resend REST API. Email is a delivery channel, not a
 * core dependency: a missing RESEND_API_KEY logs a warning and returns false
 * instead of throwing, so report generation never fails because email isn't configured.
 */
export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[EmailService] RESEND_API_KEY not set — skipping email send');
    return false;
  }

  const from = process.env.MARKETING_REPORT_EMAIL_FROM || 'Maquina Low Ticket <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[EmailService] Resend API error (${response.status}): ${errorBody}`);
    return false;
  }

  return true;
}
