import {z} from 'zod';

export const usersSchema = z.object({
    username: z.string().min(3, "Username is required.").max(255),
    password: z.string().min(6, "Password is required.").max(255).optional().or(z.literal("")),
    role: z.string().min(3,"Role is required.").max(10),
    email: z.string().email("Invalid email address.").optional().or(z.literal(""))
});