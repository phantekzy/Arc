# Arc: High Performance Strictly Typed HTTP Engine

<p align="left">
  <img src="https://raw.githubusercontent.com/phantekzy/Arc/main/Arclogo.png" width="400" alt="Arc Logo">
</p>

Arc is a lightweight, low level web framework built from scratch using TypeScript and Node.js native modules.
It is created for developers who require absolute control over the request lifecycle without the overhead of heavy external dependencies. 
By focusing on a strictly typed architecture and native performance, Arc provides a robust foundation for building scalable microservices and enterprise applications.

### KEY ARCHITECTURAL FEATURES
- **Vertical Scalability:** Built in support for Node.js clustering to utilize every CPU core on the host machine.
- **Strictly Typed Pipeline:** Full TypeScript support for request, response, and middleware objects.
- **Zero Dependency Core:** Engineered using native Node.js modules to minimize the attack surface and supply chain risks.
- **Integrated Security:** Native support for JWT authentication, CORS, and rate limiting out of the box.

---

### INSTALLATION AND SETUP
Arc requires Node.js version 18.0.0 or higher.

1. Install the package via NPM:
   npm install @phantekzy/arc

2. Ensure your project is configured for ECMAScript Modules (ESM) by adding the following to your package.json:
   ```javascript
   "type": "module"
    ```
---

### RAPID DEPLOYMENT EXAMPLE
The following example demonstrates how to initialize the engine and define a protected, validated route.

import { Arc, jwtAuth, validate } from "@phantekzy/arc";

const app = new Arc();
const port = 3000;

// Data Validation Schema
const userSchema = { name: "string", age: "number" };

// Protected and Validated Route
app.post("/api/user", jwtAuth, validate(userSchema), (req, res) => {
  res.json({ 
    success: true, 
    message: "Data validated and user authenticated" 
  });
});

app.listen(port, () => {
  console.log(`Arc engine operational on port ${port}`);
});

---

### CORE ENGINE COMPONENTS
Arc abstracts raw HTTP streams into manageable, typed objects while maintaining high performance data access.

#### Request Context (req)
- req.params: Access dynamic URL segments (e.g., /user/:id).
- req.query: Parse URL search parameters.
- req.body: Access parsed JSON or URL encoded payloads.
- req.cookies: Retrieve client side state and session identifiers.

#### Response Orchestration (res)
- res.status(code): Set explicit HTTP response codes.
- res.json(data): Send structured JSON responses with automatic headers.
- res.send(content): Dispatch raw text, buffers, or HTML.
- res.setHeader(name, value): Manage custom HTTP headers directly.

---

### DISTRIBUTED SYSTEMS AND CLUSTERING
Arc is designed for high availability environments. By utilizing the built in clustering module, the engine can fork multiple worker processes to balance incoming traffic.

- Primary Process: Orchestrates the lifecycle of the application and monitors worker health.
- Worker Processes: Independent instances of the server running on separate CPU cores to maximize throughput.
- Self Healing: The system automatically detects worker failure and spawns replacement processes to ensure zero downtime.

---

### ADVANCED MIDDLEWARE PIPELINE
The framework utilizes a linear execution pipeline, allowing developers to chain logic as "checkpoints" before reaching the final handler.

1. Authentication: Integrated JWT verification to protect sensitive endpoints.
2. Input Validation: A schema based validator that scrubs both request bodies and URL parameters.
3. Rate Limiting: Protects the system against brute force attacks and request flooding.
4. CORS: Configurable headers to manage cross origin resource sharing safely.

---

### NATIVE TOOLKIT (BUILT-IN)
Arc includes essential tools required for modern web development, removing the need for third party utility libraries:
- jsonParser: High speed JSON payload decoding.
- urlencodedParser: Standard form data processing.
- cookieParser: Secure cookie extraction and management.
- staticFiles: High performance serving of assets like CSS, JS, and images.

---

### PROJECT ROADMAP
The Arc engine is in active development. Future releases will focus on:
- Benchmarking Suites: Comparative performance analysis against Express and Fastify.
- Automated Testing: Implementation of a comprehensive unit and integration testing suite.
- Enhanced Telemetry: Internal metrics for monitoring engine performance in real time.

Contributions: Arc is an open source project. Developers are encouraged to submit pull requests or report issues on the official GitHub repository.

GitHub: github.com/phantekzy/Arc | NPM: @phantekzy/arc
