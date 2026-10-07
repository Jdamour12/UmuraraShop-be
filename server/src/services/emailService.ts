// import {transporter} from "../config/mail";
import { resend } from "../config/mail";
import { orderReceivedEmailTemplate } from "../templates/orders.template";
import { resetEmailTemplate } from "../templates/resetEmail.template";
import { welcomeEmailTemplate } from "../templates/welcome.template";

export const sendEmail =  async (to: string, subject: string, html: string) => {
    if (!to?.trim()) {
        console.error("Email Not Sent! Recipient email is required.");
        return;
    }

    try {
        await resend.emails.send({
            from: `UmuraraShop <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        })
    } catch (error) {
        console.error("Email Not Sent!", error);
    }
}

export const sendWelcomeEmail = async (to: string, name: string) => {
    const subject = "Welcome to UmuraraShop!";
    const html = welcomeEmailTemplate(name);
    await sendEmail(to, subject, html);
}

export const sendResetEmail = async (to: string, name: string, resetCode: string) => {
    const subject = "Password Reset Request";
    const html = resetEmailTemplate(name, resetCode);
    await sendEmail(to, subject, html);
}

export const sendOrderReceivedEmail = async (to: string, name: string, orderNumber: string) => {
    const subject = "Order Received";
    const html = orderReceivedEmailTemplate(name, orderNumber);
    await sendEmail(to, subject, html);
}