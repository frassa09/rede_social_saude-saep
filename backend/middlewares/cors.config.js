import cors from 'cors'

 
export const corsConfig = cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    origin: '*'
})