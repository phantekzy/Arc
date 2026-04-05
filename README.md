# Arc: Minimalist Multi-Core Web Framework for Node.js

<p align="left">
  <img src="https://raw.githubusercontent.com/phantekzy/Arc/main/Arclogo.png" width="400" alt="Arc Logo">
</p>

Arc is a lightweight low level web framework built from scratch using TypeScript and Node.js native modules.
It is created for developers who require absolute control over the request lifecycle without the overhead of heavy external dependencies.
By focusing on a strictly typed architecture and native performance, Arc provides a robust foundation for building scalable microservices and enterprise applications.

## Table of Contents

* [Installation](#installation)
* [Key Architectural Features](#key-architectural-features)
* [Rapid Deployment Example](#rapid-deployment-example)
* [Core Philosophy](#core-philosophy)
* [Core Engine Components](#core-engine-components)
* [Advanced Middleware Pipeline](#advanced-middleware-pipeline)
* [Distributed Systems and Clustering](#distributed-systems-and-clustering)
* [Project Roadmap](#project-roadmap)
* [Contributing](#contributing)
* [Security Policy](#security-policy)
* [Running Tests](#running-tests)
* [Current Project Team Members](#current-project-team-members)
* [License](#license)

## Installation
Arc requires Node.js version 18.0.0 or higher.

1. Install the package via NPM:
```bash
   npm install @phantekzy/arc
```
2. Ensure your project is configured for ECMAScript Modules (ESM) by adding the following to your package.json:
```javascript
   "type": "module"
```

## Key Architectural Features
* Vertical Scalability: Built in support for Node.js clustering to utilize every CPU core on the host machine.
* Strictly Typed Pipeline: Full TypeScript support for request, response, and middleware objects.
* Zero Dependency Core: Engineered using native Node.js modules to minimize the attack surface and supply chain risks.
* Integrated Security: Native support for JWT authentication, CORS, and rate limiting out of the box.

## Rapid Deployment Example
The following example demonstrates how to initialize the framework and define a protected, validated route.
```javascript
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
  console.log(`Arc framework operational on port ${port}`);
});
```

## Core Philosophy
The development of Arc is guided by three fundamental principles:
1. Developer Autonomy: Zero hidden magic or forced dependencies.
2. Vertical Performance: Native multi core utilization by default.
3. Type Integrity: First class TypeScript support across the entire request lifecycle.

## Core Engine Components
Arc abstracts raw HTTP streams into manageable typed objects while maintaining high performance data access.

### Request Context (req)
* req.params: Access dynamic URL segments (e.g., /user/:id).
* req.query: Parse URL search parameters.
* req.body: Access parsed JSON or URL encoded payloads.
* req.cookies: Retrieve client side state and session identifiers.

### Response Orchestration (res)
* res.status(code): Set explicit HTTP response codes.
* res.json(data): Send structured JSON responses with automatic headers.
* res.send(content): Dispatch raw text, buffers, or HTML.

## Advanced Middleware Pipeline
The framework utilizes a linear execution pipeline allowing developers to chain logic as checkpoints before reaching the final handler.

1. Authentication: Integrated JWT verification to protect sensitive endpoints.
2. Input Validation: A schema based validator that scrubs both request bodies and URL parameters.
3. Rate Limiting: Protects the system against brute force attacks and request flooding.
4. CORS: Configurable headers to manage cross origin resource sharing safely.

## Distributed Systems and Clustering
Arc is designed for high availability environments. By utilizing the built in clustering module, the framework can fork multiple worker processes to balance incoming traffic.

* Primary Process: Orchestrates the lifecycle of the application and monitors worker health.
* Worker Processes: Independent instances of the server running on separate CPU cores to maximize throughput.
* Self Healing: The system automatically detects worker failure and spawns replacement processes to ensure zero downtime.

## Project Roadmap
The Arc framework is in active development. Future releases will focus on:
* Benchmarking Suites: Comparative performance analysis against Express and Fastify.
* Automated Testing: Implementation of a comprehensive unit and integration testing suite.
* Enhanced Telemetry: Internal metrics for monitoring performance in real time.

## Contributing
The Arc project welcomes all contributors. Whether you are fixing a bug or suggesting a new feature, please feel free to fork the repository and submit a pull request.

## Security Policy
To report a security vulnerability, please do not open a public issue. Instead, please open a private security advisory on GitHub or contact the maintainer directly.

## Running Tests
To run the internal test suite, ensure you have the devDependencies installed and run:
npm test

## Current Project Team Members
* Maini Lotfi Abdelkader (@phantekzy) — Lead Architect & Maintainer

## License
The Arc framework is licensed under the [MIT License](LICENSE).

---
**GitHub:** [github.com/phantekzy/Arc](https://github.com/phantekzy/Arc) | **NPM:** [@phantekzy/arc](https://www.npmjs.com/package/@phantekzy/arc)
