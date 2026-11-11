/**
 * SaveAMedia Cloudflare Worker API Gateway
 *
 * Responsibilities:
 * 1. CORS Preflight & Security Headers
 * 2. Correlation Tracking (X-Request-ID propagation)
 * 3. Primary Origin Routing (Render Server 1 - Account 1)
 * 4. Automatic Transparent Failover (Render Server 2 - Account 2)
 * 5. Timeout Circuit Breaking
 */

// Replace these placeholders with your actual Render service URLs:
const PRIMARY_ORIGIN = "https://saveamedia-backend-primary.onrender.com";    // Render Account 1
const SECONDARY_ORIGIN = "https://saveamedia-backend-secondary.onrender.com"; // Render Account 2

// Time to wait on primary before triggering failover (in milliseconds)
const TIMEOUT_MS = 6000;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-request-id",
  "Access-Control-Max-Age": "86400",
};

/**
 * Fetch wrapper with timeout abort
 */
async function fetchWithTimeout(url, init, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (error) {
    clearTimeout(timer);
    throw error;
  }
}

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    const url = new URL(request.url);
    const clientRequestId = request.headers.get("x-request-id") || crypto.randomUUID();

    // Prepare headers for upstream Render services
    const forwardHeaders = new Headers(request.headers);
    forwardHeaders.set("x-request-id", clientRequestId);
    
    // Pass real client IP so backend rate limiter works accurately
    const clientIp = request.headers.get("cf-connecting-ip") || "";
    if (clientIp) {
      forwardHeaders.set("cf-connecting-ip", clientIp);
    }

    // Read body once for POST requests
    const body = request.method !== "GET" && request.method !== "HEAD"
      ? await request.clone().arrayBuffer()
      : null;

    const requestInit = {
      method: request.method,
      headers: forwardHeaders,
      body: body,
      redirect: "follow",
    };

    // Helper to append CORS headers to upstream response
    const wrapResponse = (upstreamResponse) => {
      const responseHeaders = new Headers(upstreamResponse.headers);
      for (const [key, value] of Object.entries(CORS_HEADERS)) {
        responseHeaders.set(key, value);
      }
      responseHeaders.set("x-request-id", clientRequestId);
      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: responseHeaders,
      });
    };

    // 2. Attempt Primary Render Server (Account 1)
    try {
      const primaryUrl = `${PRIMARY_ORIGIN}${url.pathname}${url.search}`;
      const primaryResponse = await fetchWithTimeout(primaryUrl, requestInit, TIMEOUT_MS);

      // If primary returns a 5xx server error, trigger failover to secondary
      if (primaryResponse.status >= 500) {
        throw new Error(`Primary returned status ${primaryResponse.status}`);
      }

      return wrapResponse(primaryResponse);
    } catch (primaryErr) {
      console.warn("Primary Render server failed or timed out. Failing over to secondary:", primaryErr.message);

      // 3. Failover to Secondary Render Server (Account 2)
      try {
        const secondaryUrl = `${SECONDARY_ORIGIN}${url.pathname}${url.search}`;
        const secondaryResponse = await fetchWithTimeout(secondaryUrl, requestInit, TIMEOUT_MS);
        return wrapResponse(secondaryResponse);
      } catch (secondaryErr) {
        // Both servers failed
        return new Response(
          JSON.stringify({
            success: false,
            error: {
              code: "GATEWAY_TIMEOUT",
              message: "Both primary and secondary backend services are temporarily unavailable. Please retry in a moment.",
            },
          }),
          {
            status: 504,
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS,
              "x-request-id": clientRequestId,
            },
          }
        );
      }
    }
  },
};

