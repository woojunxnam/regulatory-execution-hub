import { describe, expect, it } from "vitest";
import { securityHeaders } from "@/lib/security/headers";

describe("public response security headers", () => {
  const headers = Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value]));

  it("prevents framing, MIME sniffing, and broad referrer leakage", () => {
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
  });

  it("sets a restrictive public-site content security policy", () => {
    const policy = headers["Content-Security-Policy"];

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("connect-src 'self'");
  });
});
