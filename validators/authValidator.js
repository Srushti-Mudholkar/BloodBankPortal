import {z} from 'zod';

export const registerSchema = z.object({
     role : z.enum(['donor','hospital','organisation','admin'],{
        required_error : 'u didnt selected the role'
     }),
     name : z.string().min(2,'minimum 2 characters are rquired').optional(),
     organisationName : z.string().min(2,'minimum 2 chracters are rquired').optional(),
     hospitalName : z.string().min(2,'minimum 2 characters are rquired').optional(),
     email : z.string().email('Invalid email format'),
     password :  z.string().min(6,'minimum 6 characters are rquired'),
     website : z.string().url().optional().or(z.literal("")),
     address : z.string().min(2,'minimum 2 chracters are rquired'),
     phone : z.string().min(10,'minimum 10 characters are rquired'),
     bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional()
})

export const loginSchema = z.object({
    role : z.enum(['donor','hospital','organisation','admin'],{
        required_error : 'role is required'
    }),
    email : z.string().email('Invalid email format'),
    password :  z.string().min(6,'minimum 6 characters are rquired'),
})