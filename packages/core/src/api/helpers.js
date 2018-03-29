export const encode = (text: string) => new Buffer(text).toString("base64");
export const decode = (text: string) => new Buffer(text, "base64").toString();
