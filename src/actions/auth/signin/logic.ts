import { prisma } from "@/lib/prisma";
import { signinInput } from "./schema";
import bcrypt from "bcryptjs";
import { error, Result, success } from "@/lib/result";
import { getSession } from "@/lib/session";
import type { User } from "@prisma/client";

export async function signin(input: signinInput): Promise<Result<Omit<User, 'password'>>> {
    const { email, password } = input;

    const normalisedEmail = email.toLowerCase().trim();

    //Find user by email
    const user = await prisma.user.findUnique({
        where: {
            email: normalisedEmail
        }
    })
    if (!user) {
        console.error('signin error: User not found');
        return error('Invalid credentials');
    }

    //Verify Password
    const isValidPassword = await bcrypt.compare(password, user.password!);
    
    if (!isValidPassword) {
        console.error('signin error: Invalid Password');
        return error('Invalid credentials');
    }

    // Omit password from returned user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    //Session
    const session = await getSession();
    session.user = { id: userWithoutPassword.id };
    await session.save();

    return success(userWithoutPassword);
}