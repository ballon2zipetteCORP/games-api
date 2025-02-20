import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { IMe } from "../types";

const PUBLIC_KEY = fs.readFileSync(path.join("./keys", "public.key"));
const PRIVATE_KEY = fs.readFileSync(path.join("./keys", "private.key"));

async function unserialize(
  authorization: string | undefined
): Promise<IMe | null> {
  const token = authorization!?.split(/\s+/g)?.pop();
  try {
    // faut faire belek ça retourne une erreur
    return jwt.verify(token!, PUBLIC_KEY, { algorithms: ["RS256"] }) as IMe;
  } catch(e) {
    return null;
  }
}

async function serialize(payload: IMe): Promise<string> {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "300m",
    algorithm: "RS256",
  });
}

export default {
  serialize,
  unserialize,
};
