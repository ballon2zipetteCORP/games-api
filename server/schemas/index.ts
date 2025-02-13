import fs from "fs"

const schemas = []
for(const file of fs.readdirSync("./server/schemas/resolvers")) {
    const resolvers = (await import(`./resolvers/${file}`)).default;
    const typeDefs = (await import(`./typeDefs/${file}`)).default;
    schemas.push({ resolvers, typeDefs })
}

export default schemas as any;