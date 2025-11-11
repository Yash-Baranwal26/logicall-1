import { z } from 'zod';


const EntryCreateSchema = z.object({
title: z.string().min(1, 'Title is required'),
type: z.enum(['Movie', 'TV Show']),
director: z.string().min(1, 'Director is required'),
budget: z.number().nonnegative().optional(),
location: z.string().min(1, 'Location is required'),
duration: z.string().min(1, 'Duration is required'),
yearOrTime: z.string().min(1, 'Year/Time is required')
});


const EntryUpdateSchema = EntryCreateSchema.partial();


export { EntryCreateSchema, EntryUpdateSchema };