import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignupInput } from "./schema";
import { error, Result, success } from "@/lib/result";
import { getSession } from "@/lib/session";
import type { Role } from "@prisma/client";

interface User {
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

export async function Signup(input: SignupInput): Promise<Result<User>> {
    const { email, name, password } = input;

    const normalisedEmail = email.toLowerCase().trim();

    const exisitngUser = await prisma.user.findUnique({
        where: {
            email: normalisedEmail
        }
    });
    if (exisitngUser) {
        console.error('Singup error: User with this email already exists')
        return error('Something went wrong')
    };

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: {
            name,
            email: normalisedEmail,
            password: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            emailVerified: true,
            subscriptionType: true,
            lastLoginAt: true,
            image: true,
        }
    });
    const session = await getSession();
    session.user = { id: user.id };
    await session.save();

    return success(user);
}