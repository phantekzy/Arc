--------------------------------------------------------------------------------
ARC WEB FRAMEWORK | VERSION 1.0.2
--------------------------------------------------------------------------------

OVERVIEW
Arc is a tool for building web servers with Node.js. I built it from zero 
using only TypeScript and the basic tools inside Node.js. It has no hidden 
code and no "magic" libraries. It gives you 100% control over how your 
website or app talks to the internet.

--------------------------------------------------------------------------------
HOW TO INSTALL
--------------------------------------------------------------------------------
1. Open your terminal.
2. Type: npm install @phantekzy/arc
3. IMPORTANT: Arc uses modern JavaScript (ESM). Open your package.json file 
   and add this line: "type": "module"

--------------------------------------------------------------------------------
QUICK START EXAMPLE
--------------------------------------------------------------------------------
import { Arc } from "@phantekzy/arc";
const app = new Arc();

// This tells the server what to do when someone visits /api/status
app.get("/api/status", (req, res) => {
  res.json({ 
    status: "online", 
    message: "Running on Fedora/Linux" 
  });
});

// This starts the engine
app.listen(3000, () => {
  console.log("Arc engine is spinning on port 3000");
});

--------------------------------------------------------------------------------
THE ENGINE PARTS (CORE)
--------------------------------------------------------------------------------
Arc takes the raw data from the web and makes it easy to read:

- req.params: Used for IDs in the URL. If you visit /user/12, then 
  req.params.id will be "12".
- req.query: Used for search terms like /search?name=test.
- req.body: This holds the data sent by the user (like a password or email).
- req.cookies: This holds the login data stored in the browser.

Response Helpers:
- res.status(404): Tells the user "Not Found".
- res.json({ msg: "Hi" }): Sends data back as a clean object.
- res.send("<h1>Hello</h1>"): Sends text or HTML directly.

--------------------------------------------------------------------------------
ROUTING AND DYNAMIC PATHS
--------------------------------------------------------------------------------
Arc uses "Regex" logic to find the right page. You can use standard methods 
like GET (to read), POST (to save), PUT (to update), and DELETE (to remove).

Example of a dynamic path:
app.get("/profile/:username", (req, res) => {
  res.send("Welcome " + req.params.username);
});

--------------------------------------------------------------------------------
MIDDLEWARE (THE PIPELINE)
--------------------------------------------------------------------------------
Middlewares are like "checkpoints" that a request passes through.
1. Logger: Records every visit to the console.
2. Auth: Checks if the user is logged in before showing a page.
3. CORS: Allows or blocks other websites from talking to your server.

You use the next() function to tell Arc to move to the next checkpoint.

--------------------------------------------------------------------------------
BUILT-IN TOOLS (NO EXTRA NPM INSTALLS NEEDED)
--------------------------------------------------------------------------------
- jsonParser: Reads JSON data sent to the server.
- urlencodedParser: Reads data from HTML forms.
- cookieParser: Reads the small data files in the user's browser.
- rateLimiter: Stops hackers from spamming your server.
- jwtAuth: A secure way to check user passwords using tokens.
- staticFiles: Makes it easy to show your HTML, CSS, and Images.

--------------------------------------------------------------------------------
INPUT VALIDATION (SECURITY)
--------------------------------------------------------------------------------
You can tell Arc exactly what kind of data you want. If the data is wrong, 
Arc stops the request immediately to keep your server safe.

Example:
const myRule = { name: "string", age: "number" };
app.post("/add", validate(myRule), (req, res) => {
  res.send("Data is safe!");
});

--------------------------------------------------------------------------------
THE PLAN FOR THE FUTURE
--------------------------------------------------------------------------------
I am still building this engine. Next, I will add:
- Multi-core support: To make it run faster on powerful CPUs.
- Benchmarking: To prove how fast it is compared to Express.
- Better testing: To make sure nothing ever breaks.

You are welcome to help! Go to the GitHub link and contribute code.

--------------------------------------------------------------------------------
GITHUB: github.com/phantekzy/Arc | NPM: @phantekzy/arc
--------------------------------------------------------------------------------
