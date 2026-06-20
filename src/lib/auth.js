import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("ideavault");

export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
    }, 
    database: mongodbAdapter(db, {
        client
    }),
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60
        }
    },
    plugins: [
        jwt(), 
    ]
});