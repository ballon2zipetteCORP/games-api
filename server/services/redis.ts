import redis from "redis";

const connection = {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!)
};

const client = redis.createClient({ socket: connection })

client.on('error', (err: any) => 
    console.error('Redis Client Error', err)
)

await client.connect();

export default client;