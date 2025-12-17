import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
    },
});

export const sendLoginEmail = async (to, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Heyy!! New Login Alert to yuhnie❤️!! Contacts",
        text: `Hello ${name},\n\nYour account was just logged into.\nIf this was not you, please secure your account immediately.\n\nRegards,\nSupport Team`
    };
    try{
        await transporter.sendMail(mailOptions);
    }catch(error){
        throw new Error("Error sending login email");
    }
    
};

export const sendRegistrationEmail = async (to, name, password) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Welcome to yuhniee❤️!! Contacts",
        text: `Hello ${name},\n\nWelcome to PhoneBook! Your account has been created successfully.\n\nYour temporary password is: ${password}\n\nPlease login and change your password immediately.\n\nRegards,\nSupport Team`
    };
    try{
        await transporter.sendMail(mailOptions);
    }catch(error){
        throw new Error("Error sending registration email");
    }
}