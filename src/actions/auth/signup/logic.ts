import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signupInput } from "./schema";
import { error, Result, success } from "@/lib/result";
import { getSession } from "@/lib/session";
import type { User } from "@prisma/client";

export async function Signup(input: signupInput): Promise<Result<User>> {
    const { email, name, password } = input;

    const normalisedEmail = email.toLowerCase().trim();

    const exisitingUser = await prisma.user.findUnique({
        where: {
            email: normalisedEmail
        }
    });
    if (exisitingUser) {
        console.error('Singup error: User with this email already exists')
        return error('Something went wrong')
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            name,
            email: normalisedEmail,
            password: hashedPassword
        }
    });
    const session = await getSession();
    session.user = { id: user.id };
    await session.save();

    return success(user);
}