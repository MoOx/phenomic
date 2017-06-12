import color from "chalk";
import logSymbols from "log-symbols";

const INFO = "info";
const SUCCESS = "success";
const WARN = "warning";
const ERROR = "error";

// from log-symbols
type TypeType = "info" | "success" | "warning" | "error" | null;
type WriterType = false | ((msg: string) => void);

const log = (
  sender: string,
  symbol: TypeType,
  message: string,
  writer: WriterType
): string => {
  const msg = `${symbol ? logSymbols[symbol] : " "} ${color.gray(
    sender + ": "
  )} ${message}`;
  if (writer) {
    writer(msg);
  }
  return msg;
};

export default (sender: string, writer: WriterType = console.log) => {
  const logger = (msg: string) => log(sender, INFO, msg, writer);
  logger.debug = (msg: string) => log(sender, null, msg, writer);
  logger.info = (msg: string) => log(sender, INFO, msg, writer);
  logger.success = (msg: string) => log(sender, SUCCESS, msg, writer);
  logger.warn = (msg: string) => log(sender, WARN, msg, writer);
  logger.error = (msg: string) => log(sender, ERROR, msg, writer);
  return logger;
};
