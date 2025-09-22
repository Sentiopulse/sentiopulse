import { prisma } from "@/lib/prisma";
import { SigninInput } from "./schema";
import bcrypt from "bcryptjs";
import { error, Result, success } from "@/lib/result";
import { getSession } from "@/lib/session";
import type { Role } from "@prisma/client";

type UserWithoutPassword = {
    id: string;
    email?: string | null;
    name?: string | null;
    role: Role;
    createdAt: Date;
    emailVerified?: Date | null;
    subscriptionType: string;
    lastLoginAt?: Date | null;
    image?: string | null;
}

export async function Signin(input: SigninInput): Promise<Result<UserWithoutPassword>> {
    const { email, password } = input;

    const normalisedEmail = email.toLowerCase().trim();

    //Find user by email
    const user = await prisma.user.findUnique({
        where: {
            email: normalisedEmail
        },
        select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            createdAt: true,
            isActive: true,
            emailVerified: true,
            subscriptionType: true,
            lastLoginAt: true,
            image: true,
        }
    })
    if (!user) {
        console.error('Signin error: User not found');
        return error('Invalid credentials');
    }

    //Verify Password
    if (!user.password) {
        console.error('Signin error: No password set for user');
        return error('Invalid credentials');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        console.error('Signin error: Invalid Password');
        return error('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    //Session

    const session = await getSession();
    session.user = { id: userWithoutPassword.id };
    await session.save();

    return success(userWithoutPassword);
}