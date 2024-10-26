import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/dbConnection/dbConnect";
import userModel from "@/Models/user.model";
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google";

export const authOptions : NextAuthOptions = {
    providers : [
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID?.toString() || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET?.toString() || '',
        }),

        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
              email: { label: "email", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials : any) : Promise<any> {
                await dbConnect()
                try {
                    const user = await userModel.findOne({
                        $or : [
                            {email : credentials.identifier},
                            {userName : credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error('No user found with this email');
                    }
                    if(!user.isVerified){
                        throw new Error('please verify your email before login');
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if(!isPasswordCorrect){
                        throw new Error('wrong password');
                    }
                    return user;

                } catch (error : any) {
                    console.log("error while signin");
                    throw new Error(error);
                }
            }
          })
    
    ],
    pages :{
        signIn : "/sign-in"
    },
    session : {
        strategy : 'jwt'
    },
    secret : process.env.NEXT_AUTH_SECRET,
}
