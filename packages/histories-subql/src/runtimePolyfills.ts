import { TextDecoder, TextEncoder } from "util";

export const installRuntimePolyfills = () => {
  const runtime = globalThis as any;

  if (typeof runtime.TextEncoder === "undefined") {
    runtime.TextEncoder = TextEncoder;
  }

  if (typeof runtime.TextDecoder === "undefined") {
    runtime.TextDecoder = TextDecoder;
  }
};

installRuntimePolyfills();
