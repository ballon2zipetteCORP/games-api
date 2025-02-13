import redis from "redis";

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!)
    }
})
client.on('error', (err: any) => 
    console.error('Redis Client Error', err)
)

await client.connect();

export default client;