import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from "util";

type RuntimeWithTextEncoding = typeof globalThis & {
  TextDecoder?: typeof NodeTextDecoder;
  TextEncoder?: typeof NodeTextEncoder;
};

export const installRuntimePolyfills = () => {
  const runtime = globalThis as RuntimeWithTextEncoding;

  if (typeof runtime.TextEncoder === "undefined") {
    runtime.TextEncoder = NodeTextEncoder;
  }

  if (typeof runtime.TextDecoder === "undefined") {
    runtime.TextDecoder = NodeTextDecoder;
  }
};

installRuntimePolyfills();
