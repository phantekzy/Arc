import { IncomingMessage } from "http";

export interface ArcRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string>;
  params?: Record<string, string>;
  cookies?: Record<string, string>;
  user?: any;
}
