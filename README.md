# SaveAMedia Backend

SaveAMedia is a production-minded, modular, and stateless FastAPI backend for processing Instagram Reel links. It is designed to be deployed across two independent Render Web Services (Primary and Secondary/Failover) behind a Cloudflare Worker API gateway with Cloudflare Pages serving the frontend.

---

## 1. Architecture Overview

```
                               ┌────────────────────────┐
                               │    Cloudflare Pages    │
                               │  (Frontend Application)│
                               └───────────┬────────────┘
                                           │
                                           ▼ HTTPS
                         ┌────────────────────────────────────┐
                         │         Cloudflare Worker          │
                         │ (API Gateway, Routing & Failover)  │
                         └───────┬────────────────────┬───────┘
                                 │                    │
                      Primary    ▼                    ▼ Secondary / Failover
             ┌─────────────────────────┐        ┌─────────────────────────┐
             │     Render Server 1     │        │     Render Server 2     │
             │   (SaveAMedia Primary)  │        │  (SaveAMedia Secondary) │
             └─────────────────────────┘        └─────────────────────────┘
```

- **Stateless Operation**: Both Render instances execute the exact same codebase from the same repository. Neither server assumes persistent local disk storage.
- **Provider Abstraction**: Decouples API endpoints from the extraction mechanism, providing safe mock data for testing and explicit `PROVIDER_NOT_CONFIGURED` errors when no provider is active.
- **Security & SSRF Guard**: Enforces strict HTTPS Instagram reel path validation, blocks internal IP targets, rate limits abuse, and limits request payload sizes to 64 KB.

---

## 2. Technology Stack

- **Python 3.12+**
- **FastAPI**: Modern, high-performance web framework.
- **Uvicorn**: Lightweight ASGI web server.
- **Pydantic v2 & Pydantic-Settings**: Strict input validation and environment configuration.
- **HTTPX**: Async HTTP client for provider communications.
- **Pytest & Pytest-Asyncio**: Comprehensive test suite without network dependencies.

---

## 3. Directory Layout

```text
.
├── app/
│   ├── main.py                # FastAPI app factory, middleware & exception handlers
│   ├── core/
│   │   ├── config.py          # Environment settings loader
│   │   ├── logging.py         # Structured logging with correlation IDs
│   │   └── security.py        # Instagram URL validator & SSRF IP filters
│   ├── api/
│   │   ├── dependencies.py    # Sliding window rate limiter & IP resolver
│   │   ├── routes.py          # GET /, GET /health, GET /api/v1/status, POST /api/v1/extract
│   │   └── schemas.py         # Request and response contract schemas
│   ├── services/
│   │   ├── base.py            # BaseExtractionProvider abstract interface & custom errors
│   │   ├── mock_provider.py   # Mock provider for development and CI/CD
│   │   └── extractor.py       # Extractor orchestrator with URL safety validation
│   └── middlewares/
│       ├── correlation.py     # X-Request-ID propagation & correlation
│       └── size_limit.py      # 64 KB request body size guard
├── tests/
│   ├── test_health.py         # Health and status tests
│   ├── test_validation.py     # URL validation and SSRF tests
│   ├── test_extract.py        # Extraction provider scenarios
│   └── test_security.py       # Body size, rate limit, and error shape tests
├── .env.example               # Environment variables template
├── pytest.ini                 # Pytest configuration
├── render.yaml                # Render Blueprint (Server 1 & Server 2)
└── requirements.txt           # Python dependencies
```

---

## 4. Local Installation & Execution

### Prerequisites
- Python 3.12+
- `pip` and `venv`

### Step 1: Clone and Set Up Virtual Environment
```bash
git clone <your-repo-url>
cd Download-site

python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 2: Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Step 3: Run the Local Development Server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The server will be reachable at `http://localhost:8000`.
Interactive Swagger API documentation is available at `http://localhost:8000/docs`.

---

## 5. Environment Variables Reference

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8000` | Port for Uvicorn to bind to (Render sets this dynamically). |
| `HOST` | `0.0.0.0` | Network interface to bind. |
| `ENVIRONMENT` | `development` | Environment mode (`development` enables `/docs`, `production` disables). |
| `LOG_LEVEL` | `INFO` | Logging level (`DEBUG`, `INFO`, `WARNING`, `ERROR`). |
| `ALLOWED_ORIGINS` | `*` | Comma-separated list of approved frontend origins for CORS. |
| `MAX_REQUEST_BODY_BYTES` | `65536` | Maximum allowed request body size in bytes (default: 64 KB). |
| `REQUEST_TIMEOUT_SECONDS` | `10.0` | Timeout threshold for outgoing provider requests. |
| `RATE_LIMIT_PER_MINUTE` | `60` | Maximum requests permitted per minute per client IP. |
| `EXTRACTION_PROVIDER` | `mock` | Configured provider (`mock`, `none`, or custom). |

---

## 6. API Endpoints

### 1. `GET /`
Returns service metadata.
```json
{
  "service": "SaveAMedia Backend",
  "version": "1.0.0",
  "environment": "development",
  "docs": "/docs"
}
```

### 2. `GET /health`
Render health check probe.
```json
{
  "status": "healthy",
  "service": "saveamedia-backend"
}
```

### 3. `GET /api/v1/status`
Gateway operational status probe.
```json
{
  "status": "operational",
  "version": "1.0.0"
}
```

### 4. `POST /api/v1/extract`
Validates an Instagram Reel link and dispatches extraction to the configured provider.

**Request Payload:**
```json
{
  "url": "https://www.instagram.com/reel/C8k_example123/"
}
```

**Success Response (`200 OK`):**
```json
{
  "success": true,
  "video": {
    "url": "https://media.saveamedia.net/mock-cdn/C8k_example123.mp4",
    "thumbnail": "https://media.saveamedia.net/mock-cdn/C8k_example123-thumb.jpg",
    "title": "Instagram Reel C8k_example123",
    "availableFormats": [
      {
        "format_id": "hd",
        "quality": "1080p",
        "extension": "mp4",
        "url": "https://media.saveamedia.net/mock-cdn/C8k_example123-1080p.mp4"
      },
      {
        "format_id": "sd",
        "quality": "720p",
        "extension": "mp4",
        "url": "https://media.saveamedia.net/mock-cdn/C8k_example123-720p.mp4"
      }
    ]
  }
}
```

**Failure Response (`400`, `404`, `502`, `503`, `504`):**
```json
{
  "success": false,
  "error": {
    "code": "PROVIDER_NOT_CONFIGURED",
    "message": "Media extraction provider is not configured."
  }
}
```

---

## 7. Running Automated Tests

Run the full test suite without any external network calls:
```bash
pytest -v
```

All 16 tests cover:
- Valid Instagram Reel URLs (canonicalized to `/reel/SHORTCODE/`).
- Invalid schemes (HTTP), invalid paths, and unsupported domains (TikTok, YouTube, arbitrary hosts).
- SSRF prevention (blocking localhost, private IP subnets, cloud metadata IPs).
- Mock provider extraction, timeout handling, unavailable media simulation, and unconfigured states.
- Rate limiting enforcement (`429 Too Many Requests`).
- Request body payload size limits (`413 Payload Too Large`).
- Service health and status endpoints.

---

## 8. Deployment Guide

### A. GitHub Setup
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete SaveAMedia backend implementation"
   git branch -M main
   git remote add origin https://github.com/<your-username>/saveamedia-backend.git
   git push -u origin main
   ```

### B. Render Deployment (Server 1 & Server 2)
The repository includes `render.yaml` which automatically configures both services:

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Blueprint**.
3. Connect your GitHub repository.
4. Render will parse `render.yaml` and provision two Web Services:
   - **`saveamedia-backend-primary`** (Server 1)
   - **`saveamedia-backend-secondary`** (Server 2)
5. Under service settings, Render will automatically:
   - Run build command: `pip install --upgrade pip && pip install -r requirements.txt`
   - Run start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Monitor the health check endpoint: `/health`

---

## 9. Cloudflare Worker API Gateway & Failover Setup

The frontend connects to your Cloudflare Worker URL, which routes requests to Render Server 1 and automatically fails over to Render Server 2 if Server 1 encounters an error or timeout.

Create a Cloudflare Worker with the following script:

```javascript
/**
 * SaveAMedia Cloudflare Worker Gateway with Failover
 */
const PRIMARY_ORIGIN = "https://saveamedia-backend-primary.onrender.com";
const SECONDARY_ORIGIN = "https://saveamedia-backend-secondary.onrender.com";
const TIMEOUT_MS = 6000; // 6-second timeout before failing over

async function fetchWithTimeout(url, init, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const clientRequestId = request.headers.get("x-request-id") || crypto.randomUUID();

    // Clone request headers and inject correlation ID
    const forwardHeaders = new Headers(request.headers);
    forwardHeaders.set("x-request-id", clientRequestId);

    const body = request.method !== "GET" && request.method !== "HEAD" 
      ? await request.clone().arrayBuffer() 
      : null;

    const requestInit = {
      method: request.method,
      headers: forwardHeaders,
      body: body,
      redirect: "follow",
    };

    // 1. Attempt Primary Render Server
    try {
      const primaryUrl = `${PRIMARY_ORIGIN}${url.pathname}${url.search}`;
      const primaryResponse = await fetchWithTimeout(primaryUrl, requestInit, TIMEOUT_MS);

      // If primary responds with 500, 502, 503, or 504, attempt failover
      if (primaryResponse.status >= 500) {
        throw new Error(`Primary returned status ${primaryResponse.status}`);
      }
      return primaryResponse;
    } catch (primaryErr) {
      console.warn("Primary backend failed, failing over to secondary:", primaryErr.message);

      // 2. Attempt Secondary (Failover) Render Server
      try {
        const secondaryUrl = `${SECONDARY_ORIGIN}${url.pathname}${url.search}`;
        return await fetchWithTimeout(secondaryUrl, requestInit, TIMEOUT_MS);
      } catch (secondaryErr) {
        return new Response(
          JSON.stringify({
            success: false,
            error: {
              code: "GATEWAY_TIMEOUT",
              message: "Both primary and secondary backend services are currently unavailable."
            }
          }),
          {
            status: 504,
            headers: {
              "Content-Type": "application/json",
              "x-request-id": clientRequestId
            }
          }
        );
      }
    }
  }
};
```

