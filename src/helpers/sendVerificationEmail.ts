// Import dependencies
import mailgun from 'mailgun-js';
import { apiResponse } from './response';
const DOMAIN = 'sandbox983cdfa61ebd4763809eb851ce1c694f.mailgun.org'; 
const api_key = '26712b6e8349a8df1123e10656e0928e-1b5736a5-bd286256'; 

const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

export async function sendVerificationEmail (userName: string, userEmail:string, verificationToken:string): Promise<apiResponse>  {
  try {
    const data = {
      from: 'YourApp <noreply@yourapp.com>', // Use your email or Mailgun domain
      to: userEmail,
      subject: 'Verify Your Email',
      text: `your verification code is ${verificationToken}`
    };
  
    const response = await new Promise<apiResponse>((resolve, reject) => {
        mg.messages().send(data, (error, body) => {
          if (error) {
            console.log('Error sending email:', error);
            reject({ success: false, message: 'Failed to send verification email.' });
          } else {
            console.log('Email sent:', body);
            resolve({ success: true, message: 'Email sent successfully.' });
          }
        });
      });
  
      return response;
  } catch (error) {
        console.log('error while sending verification email');
        return { success: false, message: 'Failed to send verification email.' };
  }
};