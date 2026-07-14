import { z } from "zod";

export const createRequestSchema = z.object({
    bloodGroup : z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],{
        required_error : ' bloodGroup is required '
    }),
    quantity : z.number({ required_error : 'quantity is required'}).min(1,'minimum 1ml is required'),
    organisation : z.string({ required_error : 'This field is required '}),
    message : z.string().optional()
})

export const updateRequestStatusSchema =  z.object({
    status : z.enum(['rejected','approved'],{
        required_error : ' status is required '
    })
})