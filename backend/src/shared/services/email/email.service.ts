import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import Mailjet = require('node-mailjet');

@Injectable()
export class EmailService {
  private mailjet: ReturnType<typeof Mailjet.apiConnect>;

  constructor() {
    this.mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY || '',
      process.env.MAILJET_SECRET_KEY || '',
    );
  }

  async sendAppointmentNotification(
    toEmail: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    await this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: 'Fine Line Tattoo',
          },
          To: [{ Email: toEmail }],
          ReplyTo: {
            Email: toEmail,
          },
          Subject: subject,
          HTMLPart: htmlContent,
        },
      ],
    });
  }
}
