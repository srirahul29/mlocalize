import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private configService: ConfigService) {}

  async sendEmail(to: string, subject: string, body: string) {
    // In a real app, use Nodemailer or an external service like SendGrid/SES
    console.log(`Sending email to ${to}: ${subject}`);
    console.log(`Body: ${body}`);
    // implementation with nodemailer:
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({ from: '"MLocalize" <noreply@mlocalize.com>', to, subject, text: body });
  }

  async sendOrderUpdate(email: string, orderId: string, status: string) {
    await this.sendEmail(
      email,
      `Order ${orderId} Update`,
      `Your order status has been updated to: ${status}`,
    );
  }
}
