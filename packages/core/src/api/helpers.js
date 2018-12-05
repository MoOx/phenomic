// @flow

export const encode = (text: string) => Buffer.from(text).toString("base64");
export const decode = (text: string) => Buffer.from(text, "base64").toString();
