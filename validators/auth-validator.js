const { z } = require("zod");
const loginSchema = z.object({
    email: z
    .string({required_error: "E-mail is required"}).trim().email({message: "Invalid E-mail"}).min(3, {message: "E-mail must be atleast 3 chars"})
    .max(255, {message: "E-mail must not be mores than 255 chars"}),
    password: z
    .string({required_error: "Password is required"}).trim().min(7, {message: "Passsword must be atleast 6 chars"})
    .max(1024, {message: "Name must not be mores than 1024 chars"}),
    userType: z
    .string({required_error: "User Type is required"}).trim(),
});
const signupSchema = loginSchema.extend({
    username: z
    .string({required_error: "Name is required"}).trim().min(3, {message: "Name must be atleast 3 chars"})
    .max(255, {message: "Name must not be mores than 255 chars"}),   
});

const contactSchema = z.object({
    username: z
    .string({required_error: "Name is required"}).trim().min(3, {message: "Name must be atleast 3 chars"})
    .max(255, {message: "Name must not be mores than 255 chars"}),   
    email: z
    .string({required_error: "E-mail is required"}).trim().email({message: "Invalid E-mail"}).min(3, {message: "E-mail must be atleast 3 chars"})
    .max(255, {message: "E-mail must not be mores than 255 chars"}),
    message: z
    .string({required_error: "Message is required"}).trim().min(10, {message: "Message must be atleast 10 chars"})
    .max(1024, {message: "Message must not be mores than 1024 chars"}),
    
});
const listingSchema = z.object({
    company: z
    .string({required_error: "Comany Name is required"}).trim().min(3, {message: "Comany Name must be atleast 3 chars"})
    .max(255, {message: "Comany Name must not be mores than 255 chars"}), 
    location: z
    .string({required_error: "Location is required"}).trim().min(3, {message: "Location must be atleast 3 chars"})
    .max(255, {message: "Location must not be mores than 255 chars"}),   
    title: z
    .string({required_error: "Title is required"}).trim().min(3, {message: "Title must be atleast 3 chars"})
    .max(20, {message: "Title must not be mores than 20 chars"}),
    description: z
    .string({required_error: "Description is required"}).trim().min(10, {message: "Description must be atleast 10 chars"})
    .max(1024, {message: "Description must not be mores than 1024 chars"}),
    requirements: z
    .string({required_error: "Requirements is required"}).trim().min(10, {message: "Requirements must be atleast 10 chars"})
    .max(1024, {message: "Requirements must not be mores than 1024 chars"}),
    posted_at: z
    .string({required_error: "Posted At is required"}).trim().min(3, {message: "Date must be atleast 3 chars"})
    .max(10, {message: "Date must not be mores than 10 chars"}),
    deadline: z
    .string({required_error: "Deadline is required"}).trim().min(3, {message: "Date must be atleast 3 chars"})
    .max(10, {message: "Date must not be mores than 10 chars"}),
    
});
const resumeSchema = z.object({
    name: z
    .string({required_error: "Name is required"}).trim().min(3, {message: "Name must be atleast 3 chars"})
    .max(255, {message: "Name must not be mores than 255 chars"}),   
    pdf: z
    .string({required_error: "Message is required"}).trim().min(10, {message: "Message must be atleast 10 chars"})
    .max(1024, {message: "Message must not be mores than 1024 chars"}),
    
});
module.exports = {signupSchema, loginSchema, contactSchema, listingSchema, resumeSchema};