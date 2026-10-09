export const welcomeEmailTemplate = (name: string) => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8f4eb; font-family: Arial, Helvetica, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f4eb; padding: 40px 16px;">
        <tr>
            <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #eadfc9; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(107, 79, 29, 0.12);">

                <tr>
                    <td style="background-color: #6b4f1d; border-bottom: 5px solid #d4a843; padding: 40px 32px; text-align: center;">
                        <p style="margin: 0 0 8px; color: #f4d98d; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">UmuraraShop</p>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Welcome aboard, ${name}!</h1>
                    </td>
                </tr>

                <tr>
                    <td style="padding: 32px; color: #1f2937; font-size: 16px; line-height: 1.6;">
                    <p style="margin: 0 0 16px;">Hi ${name},</p>
                    <p style="margin: 0 0 24px;">Welcome to UmuraraShop! We're excited to have you on board. </p>
                    <p style="margin: 0 0 8px; font-weight: bold; color: #6b4f1d;">What's next?</p>
                    <ul style="margin: 0 0 24px; padding-left: 20px; color: #374151;">
                    <li style="margin-bottom: 6px;">Log in with your email and password</li>
                    <li style="margin-bottom: 6px;">Keep your password safe and never share it</li>
                    <li>Forgot it? Request a reset code anytime</li>
                </ul>

                    <p style="margin: 0;">Cheers,<br /><strong style="color: #a8791f;">UmuraraShop Team</strong></p>
                </td>
                </tr>

            <tr>
                <td style="background-color: #fcfaf5; border-top: 1px solid #eadfc9; padding: 20px 32px; text-align: center; color: #806f50; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0 0 4px;">If you didn't create this account, you can safely ignore this email.</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} UmuraraShop. All rights reserved.</p>
                </td>
            </tr>

        </table>
        </td>
        </tr>
    </table>
    </body>
    </html>
`;