import { expect, test } from "bun:test";
import { installRuntimePolyfills } from "../src/runtimePolyfills";

test("installs TextEncoder and TextDecoder when the SubQL runtime does not provide them", () => {
  const runtime = globalThis as any;
  const previousTextEncoder = runtime.TextEncoder;
  const previousTextDecoder = runtime.TextDecoder;

  try {
    delete runtime.TextEncoder;
    delete runtime.TextDecoder;

    installRuntimePolyfills();

    expect(runtime.TextEncoder).toBeFunction();
    expect(runtime.TextDecoder).toBeFunction();
  } finally {
    runtime.TextEncoder = previousTextEncoder;
    runtime.TextDecoder = previousTextDecoder;
  }
});
