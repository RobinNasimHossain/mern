# MERN CRUD Debugging Guide — Step by Step

# MERN CRUD ডিবাগিং গাইড — ধাপে ধাপে

> **🇧🇩 বাংলা** এবং **🇬🇧 English** — দুটো ভাষাতেই লেখা হয়েছে।
> Written in both **Bangla** and **English** for learning purposes.

---

## Table of Contents (সূচিপত্র)

1. [What is Debugging? (ডিবাগিং কী?)](#1-what-is-debugging-ডিবাগিং-কী)
2. [Project Setup Errors (প্রজেক্ট সেটআপ ত্রুটি)](#2-project-setup-errors-প্রজেক্ট-সেটআপ-ত্রুটি)
3. [MongoDB Connection Errors (MongoDB সংযোগ ত্রুটি)](#3-mongodb-connection-errors-mongodb-সংযোগ-ত্রুটি)
4. [Express Server Errors (Express সার্ভার ত্রুটি)](#4-express-server-errors-express-সার্ভার-ত্রুটি)
5. [API/CRUD Errors (API/CRUD ত্রুটি)](#5-apicrud-errors-apicrud-ত্রুটি)
6. [React Frontend Errors (React ফ্রন্টএন্ড ত্রুটি)](#6-react-frontend-errors-react-ফ্রন্টএন্ড-ত্রুটি)
7. [CORS Errors (CORS ত্রুটি)](#7-cors-errors-cors-ত্রুটি)
8. [Mongoose Validation Errors (Mongoose ভ্যালিডেশন ত্রুটি)](#8-mongoose-validation-errors-mongoose-ভ্যালিডেশন-ত্রুটি)
9. [Debugging Tools (ডিবাগিং টুলস)](#9-debugging-tools-ডিবাগিং-টুলস)
10. [Common Mistakes & Fixes (সাধারণ ভুল ও সমাধান)](#10-common-mistakes--fixes-সাধারণ-ভুল-ও-সমাধান)

---

## 1. What is Debugging? (ডিবাগিং কী?)

### 🇧🇩 বাংলা
ডিবাগিং হলো কোডে ত্রুটি (bug) খুঁজে বের করে সেগুলো ঠিক করার প্রক্রিয়া।

**ডিবাগিংয়ের মূল ধাপ:**
1. **ত্রুটি চিনুন** — কী ত্রুটি হচ্ছে? error message পড়ুন
2. **ত্রুটির অবস্থান খুঁজুন** — কোন ফাইলে, কোন লাইনে?
3. **কারণ বুঝুন** — কেন হচ্ছে?
4. **সমাধান করুন** — ফিক্স করুন
5. **পরীক্ষা করুন** — ফিক্স কাজ করছে কি না দেখুন

### 🇬🇧 English
Debugging is the process of finding and fixing errors (bugs) in your code.

**Core Debugging Steps:**
1. **Identify the error** — What error is happening? Read the error message
2. **Locate the error** — Which file, which line?
3. **Understand the cause** — Why is it happening?
4. **Fix it** — Apply the fix
5. **Verify** — Test that the fix works

---

## 2. Project Setup Errors (প্রজেক্ট সেটআপ ত্রুটি)

### Error: `Cannot find module 'express'`

**🇧🇩 বাংলা:**
এই ত্রুটি মানে — আপনি dependencies install করেননি।

**সমাধান:**
```bash
# learning-crud ফোল্ডারে যান
cd learning-crud

# সব dependencies install করুন
npm run install:all
```

**🇬🇧 English:**
This error means — you haven't installed dependencies.

**Fix:**
```bash
cd learning-crud
npm run install:all
```

---

### Error: `SyntaxError: Cannot use import statement outside a module`

**🇧🇩 বাংলা:**
package.json-এ `"type": "module"` নেই।

**সমাধান:**
package.json ফাইলে যোগ করুন:
```json
{
  "type": "module"
}
```

**🇬🇧 English:**
`"type": "module"` is missing in package.json.

**Fix:**
Add to package.json:
```json
{
  "type": "module"
}
```

---

### Error: `node: command not found`

**🇧🇩 বাংলা:**
Node.js install করা নেই।

**সমাধান:**
```bash
# Node.js version চেক করুন
node --version

# Install না থাকলে: https://nodejs.org থেকে download করুন
# অথবা nvm ব্যবহার করুন:
nvm install 18
nvm use 18
```

**🇬🇧 English:**
Node.js is not installed.

**Fix:**
```bash
node --version
# If not installed: download from https://nodejs.org
# Or use nvm:
nvm install 18
nvm use 18
```

---

## 3. MongoDB Connection Errors (MongoDB সংযোগ ত্রুটি)

### Error: `MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`

**🇧🇩 বাংলা:**
MongoDB সার্ভার চালু নেই।

**ধাপে ধাপে সমাধান:**
```bash
# ধাপ ১: MongoDB চালু আছে কি না দেখুন
mongosh --eval "db.runCommand({ ping: 1 })"

# ধাপ ২: Docker ব্যবহার করলে
docker ps | grep mongo
# যদি না দেখা যায়:
docker start mern-mongo
# অথবা নতুন container চালু করুন:
docker run -d --name mern-mongo -p 27017:27017 mongo:7

# ধাপ ৩: Local MongoDB ব্যবহার করলে
# macOS:
brew services start mongodb-community
# Linux:
sudo systemctl start mongod
# Windows:
net start MongoDB
```

**🇬🇧 English:**
MongoDB server is not running.

**Step-by-step fix:**
```bash
# Step 1: Check if MongoDB is running
mongosh --eval "db.runCommand({ ping: 1 })"

# Step 2: If using Docker
docker ps | grep mongo
# If not visible:
docker start mern-mongo
# Or create a new container:
docker run -d --name mern-mongo -p 27017:27017 mongo:7

# Step 3: If using local MongoDB
# macOS:
brew services start mongodb-community
# Linux:
sudo systemctl start mongod
# Windows:
net start MongoDB
```

---

### Error: `MongooseServerSelectionError: connection timed out`

**🇧🇩 বাংলা:**
MONGODB_URI ভুল, অথবা MongoDB Atlas ব্যবহার করলে IP whitelist করা নেই।

**সমাধান:**
```bash
# .env ফাইলে URI চেক করুন
cat server/.env

# সঠিক ফরম্যাট:
# Local: mongodb://127.0.0.1:27017/learning_crud
# Atlas: mongodb+srv://user:password@cluster.xxxxx.mongodb.net/dbname

# Atlas হলে: Network Access → Add Current IP Address
```

**🇬🇧 English:**
MONGODB_URI is wrong, or if using MongoDB Atlas, your IP isn't whitelisted.

**Fix:**
```bash
# Check URI in .env
cat server/.env

# Correct formats:
# Local: mongodb://127.0.0.1:27017/learning_crud
# Atlas: mongodb+srv://user:password@cluster.xxxxx.mongodb.net/dbname

# For Atlas: Network Access → Add Current IP Address
```

---

## 4. Express Server Errors (Express সার্ভার ত্রুটি)

### Error: `EADDRINUSE: address already in use :::4000`

**🇧🇩 বাংলা:**
Port 4000 ইতিমধ্যে অন্য একটি প্রোগ্রাম ব্যবহার করছে।

**সমাধান:**
```bash
# ধাপ ১: কোন প্রোগ্রাম port 4000 ব্যবহার করছে দেখুন
lsof -i :4000

# ধাপ ২: সেই প্রোগ্রামটি বন্ধ করুন
kill -9 <PID>
# PID = lsof কমান্ড থেকে পাওয়া নম্বর

# অথবা: .env তে অন্য port ব্যবহার করুন
# PORT=4001
```

**🇬🇧 English:**
Port 4000 is already being used by another program.

**Fix:**
```bash
# Step 1: Find what's using port 4000
lsof -i :4000

# Step 2: Kill that process
kill -9 <PID>
# PID = the number from lsof command

# Or: use a different port in .env
# PORT=4001
```

---

### Error: `TypeError: app.use() requires a middleware function`

**🇧🇩 বাংলা:**
আপনি ভুল জিনিস middleware হিসেবে pass করেছেন।

**সাধারণ কারণ ও সমাধান:**
```javascript
// ❌ ভুল — default export ভুলে গেছেন
import studentRoutes from "./routes/students.js";
// যদি students.js তে export default না থাকে, এটি undefined আসবে

// ✅ সঠিক — routes ফাইলে export default আছে কি না চেক করুন
// routes/students.js:
const router = Router();
// ... routes ...
export default router;  // ← এটি অবশ্যই থাকতে হবে!
```

**🇬🇧 English:**
You passed something wrong as middleware.

**Common cause & fix:**
```javascript
// ❌ Wrong — forgot default export
import studentRoutes from "./routes/students.js";
// If students.js doesn't have export default, this will be undefined

// ✅ Correct — check if routes file has export default
// routes/students.js:
const router = Router();
// ... routes ...
export default router;  // ← This MUST be present!
```

---

## 5. API/CRUD Errors (API/CRUD ত্রুটি)

### CREATE — `req.body is undefined`

**🇧🇩 বাংলা:**
`express.json()` middleware নেই, তাই সার্ভার JSON body পড়তে পারছে না।

**সমাধান:**
```javascript
// index.js এ যোগ করুন (routes-এর আগে!):
app.use(express.json());

// Postman এ চেক করুন:
// Headers → Content-Type: application/json
// Body → raw → JSON
```

**🇬🇧 English:**
`express.json()` middleware is missing, so the server can't read JSON body.

**Fix:**
```javascript
// Add to index.js (before routes!):
app.use(express.json());

// In Postman:
// Headers → Content-Type: application/json
// Body → raw → JSON
```

---

### READ — API returns empty array `[]`

**🇧🇩 বাংলা:**
ডাটাবেসে কোনো ডেটা নেই।

**ডিবাগিং ধাপ:**
```bash
# ধাপ ১: mongosh দিয়ে সরাসরি ডাটাবেস চেক করুন
mongosh
> use learning_crud
> db.students.find()
# খালি হলে → প্রথমে POST request দিয়ে ডেটা তৈরি করুন

# ধাপ ২: Postman দিয়ে POST request পাঠান
# URL: http://localhost:4000/api/students
# Body:
# {
#   "name": "Rahim",
#   "email": "rahim@example.com",
#   "age": 20,
#   "subject": "Mathematics"
# }
```

**🇬🇧 English:**
No data in the database.

**Debugging steps:**
```bash
# Step 1: Check database directly with mongosh
mongosh
> use learning_crud
> db.students.find()
# If empty → create data first with a POST request

# Step 2: Send POST request via Postman
# URL: http://localhost:4000/api/students
# Body:
# {
#   "name": "Rahim",
#   "email": "rahim@example.com",
#   "age": 20,
#   "subject": "Mathematics"
# }
```

---

### UPDATE — Old data returned instead of new

**🇧🇩 বাংলা:**
`findByIdAndUpdate()` এ `{ new: true }` option দেননি।

**সমাধান:**
```javascript
// ❌ ভুল — পুরাতন ডেটা ফেরত দেয়
const updated = await Student.findByIdAndUpdate(id, data);

// ✅ সঠিক — নতুন (আপডেটেড) ডেটা ফেরত দেয়
const updated = await Student.findByIdAndUpdate(id, data, {
  new: true,           // আপডেটের পরের ডেটা ফেরত দাও
  runValidators: true, // validation চালাও
});
```

**🇬🇧 English:**
Missing `{ new: true }` option in `findByIdAndUpdate()`.

**Fix:**
```javascript
// ❌ Wrong — returns old data
const updated = await Student.findByIdAndUpdate(id, data);

// ✅ Correct — returns updated data
const updated = await Student.findByIdAndUpdate(id, data, {
  new: true,           // return updated document
  runValidators: true, // run schema validations
});
```

---

### DELETE — `CastError: Cast to ObjectId failed`

**🇧🇩 বাংলা:**
আপনি ভুল ID ফরম্যাট পাঠিয়েছেন।

**সমাধান:**
```bash
# MongoDB ObjectId হলো ২৪ অক্ষরের hexadecimal string
# সঠিক: 507f1f77bcf86cd799439011
# ভুল:  123, abc, undefined

# React থেকে সঠিক id পাঠানো হচ্ছে কি না চেক করুন:
console.log("Deleting ID:", id);
# id যদি undefined হয় → student object থেকে _id নিন, id নয়
# ❌ student.id  (এটি কখনো কখনো কাজ করে না)
# ✅ student._id (এটি সবসময় কাজ করে)
```

**🇬🇧 English:**
You sent a wrong ID format.

**Fix:**
```bash
# MongoDB ObjectId is a 24-character hexadecimal string
# Correct: 507f1f77bcf86cd799439011
# Wrong:   123, abc, undefined

# Check if correct id is being sent from React:
console.log("Deleting ID:", id);
# If id is undefined → use _id from student object, not id
# ❌ student.id  (may not work sometimes)
# ✅ student._id (always works)
```

---

## 6. React Frontend Errors (React ফ্রন্টএন্ড ত্রুটি)

### Error: Blank/White Page (সাদা/খালি পেজ)

**🇧🇩 বাংলা:**

**ডিবাগিং ধাপ:**
```
ধাপ ১: Browser Console খুলুন (F12 → Console tab)
ধাপ ২: লাল ত্রুটি বার্তা পড়ুন
ধাপ ৩: সাধারণ কারণ ও সমাধান:

• "Module not found" → import path ভুল
  → ফাইলের নাম ও path ঠিকমতো লিখেছেন কি না দেখুন
  → .jsx extension আছে কি না চেক করুন

• "X is not defined" → variable/function নাম ভুল বা import করেননি
  → বানান (spelling) চেক করুন
  → import statement আছে কি না দেখুন

• "Cannot read properties of undefined" → ডেটা লোডের আগে access করছেন
  → loading state ব্যবহার করুন
  → optional chaining (?.) ব্যবহার করুন: data?.name
```

**🇬🇧 English:**

**Debugging steps:**
```
Step 1: Open Browser Console (F12 → Console tab)
Step 2: Read the red error message
Step 3: Common causes & fixes:

• "Module not found" → wrong import path
  → Check file name and path spelling
  → Verify .jsx extension is included

• "X is not defined" → wrong variable/function name or not imported
  → Check spelling
  → Verify import statement exists

• "Cannot read properties of undefined" → accessing data before it loads
  → Use loading state
  → Use optional chaining (?.) : data?.name
```

---

### Error: `Too many re-renders. React limits the number of renders`

**🇧🇩 বাংলা:**
অসীম লুপ (infinite loop) তৈরি হয়েছে।

**সাধারণ কারণ ও সমাধান:**
```javascript
// ❌ ভুল — useEffect এ dependency array নেই (প্রতি render-এ চলে)
useEffect(() => {
  fetchStudents();
}); // ← [] নেই!

// ✅ সঠিক — খালি array মানে শুধু একবার চলবে
useEffect(() => {
  fetchStudents();
}, []); // ← [] আছে

// ❌ ভুল — onClick-এ সরাসরি ফাংশন call
<button onClick={handleDelete(id)}>Delete</button>
// এটি render-এ সাথে সাথে call হয় → loop!

// ✅ সঠিক — arrow function দিয়ে wrap করুন
<button onClick={() => handleDelete(id)}>Delete</button>
```

**🇬🇧 English:**
An infinite loop has been created.

**Common causes & fixes:**
```javascript
// ❌ Wrong — no dependency array in useEffect (runs every render)
useEffect(() => {
  fetchStudents();
}); // ← missing []

// ✅ Correct — empty array means runs only once
useEffect(() => {
  fetchStudents();
}, []); // ← has []

// ❌ Wrong — calling function directly in onClick
<button onClick={handleDelete(id)}>Delete</button>
// This calls immediately on render → loop!

// ✅ Correct — wrap with arrow function
<button onClick={() => handleDelete(id)}>Delete</button>
```

---

### Error: `Each child in a list should have a unique "key" prop`

**🇧🇩 বাংলা:**
`.map()` দিয়ে list render করার সময় key prop দেননি।

**সমাধান:**
```jsx
// ❌ ভুল — key নেই
{students.map((student) => (
  <div>{student.name}</div>
))}

// ❌ ভুল — index কে key হিসেবে ব্যবহার (সমস্যা তৈরি করতে পারে)
{students.map((student, index) => (
  <div key={index}>{student.name}</div>
))}

// ✅ সঠিক — unique _id কে key হিসেবে ব্যবহার
{students.map((student) => (
  <div key={student._id}>{student.name}</div>
))}
```

**🇬🇧 English:**
Missing key prop when rendering list with `.map()`.

**Fix:**
```jsx
// ❌ Wrong — no key
{students.map((student) => (
  <div>{student.name}</div>
))}

// ❌ Wrong — using index as key (can cause issues)
{students.map((student, index) => (
  <div key={index}>{student.name}</div>
))}

// ✅ Correct — use unique _id as key
{students.map((student) => (
  <div key={student._id}>{student.name}</div>
))}
```

---

## 7. CORS Errors (CORS ত্রুটি)

### Error: `Access to XMLHttpRequest has been blocked by CORS policy`

**🇧🇩 বাংলা:**
ব্রাউজার ভিন্ন origin (port/domain) থেকে API call ব্লক করছে।

**কেন হয়:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- এরা ভিন্ন port → ভিন্ন origin → CORS ব্লক!

**সমাধান (৩টি উপায়):**

```javascript
// উপায় ১: Backend-এ CORS সেট করুন (index.js)
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));

// উপায় ২: Vite proxy ব্যবহার করুন (vite.config.js)
// এটি আমরা ইতিমধ্যে করেছি — /api কল গুলো
// স্বয়ংক্রিয়ভাবে port 4000 এ যায়

// উপায় ৩: সব origin অনুমতি দিন (শুধু development-এ!)
app.use(cors()); // সব origin অনুমতি দেয় — production-এ ব্যবহার করবেন না!
```

**🇬🇧 English:**
The browser blocks API calls from different origins (port/domain).

**Why it happens:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Different ports → different origins → CORS blocked!

**Fix (3 ways):**

```javascript
// Way 1: Set CORS on backend (index.js)
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
}));

// Way 2: Use Vite proxy (vite.config.js)
// We've already done this — /api calls are
// automatically forwarded to port 4000

// Way 3: Allow all origins (development only!)
app.use(cors()); // Allows all origins — DO NOT use in production!
```

---

## 8. Mongoose Validation Errors (Mongoose ভ্যালিডেশন ত্রুটি)

### Error: `ValidationError: Student validation failed`

**🇧🇩 বাংলা:**
পাঠানো ডেটা schema-র নিয়ম মানছে না।

**ডিবাগিং:**
```javascript
// Error object থেকে বিস্তারিত জানুন:
catch (err) {
  if (err.name === "ValidationError") {
    // প্রতিটি ভুল ফিল্ড দেখুন:
    console.log(err.errors);
    // উদাহরণ output:
    // {
    //   name: { message: "Name is required (নাম আবশ্যক)" },
    //   email: { message: "Invalid email format (ইমেইল ফরম্যাট ভুল)" }
    // }

    // সব ত্রুটি বার্তা এক array-তে:
    const messages = Object.values(err.errors).map(e => e.message);
    console.log(messages);
    // ["Name is required (নাম আবশ্যক)", "Invalid email format (ইমেইল ফরম্যাট ভুল)"]
  }
}
```

**🇬🇧 English:**
Sent data doesn't match schema rules.

**Debugging:**
```javascript
catch (err) {
  if (err.name === "ValidationError") {
    // See each invalid field:
    console.log(err.errors);

    // Get all error messages in one array:
    const messages = Object.values(err.errors).map(e => e.message);
    console.log(messages);
  }
}
```

---

### Error: `E11000 duplicate key error`

**🇧🇩 বাংলা:**
`unique: true` ফিল্ডে একই মান দুইবার দেওয়া হয়েছে (যেমন: একই email)।

**সমাধান:**
```bash
# কোন ফিল্ড duplicate তা দেখুন:
# err.keyValue → { email: "rahim@example.com" }

# ডাটাবেসে চেক করুন:
mongosh
> use learning_crud
> db.students.find({ email: "rahim@example.com" })

# সমাধান: অন্য email ব্যবহার করুন
# অথবা: পুরাতন record আগে delete করুন
```

**🇬🇧 English:**
Same value used twice in a `unique: true` field (e.g., same email).

**Fix:**
```bash
# See which field is duplicate:
# err.keyValue → { email: "rahim@example.com" }

# Check in database:
mongosh
> use learning_crud
> db.students.find({ email: "rahim@example.com" })

# Fix: use a different email
# Or: delete the old record first
```

---

## 9. Debugging Tools (ডিবাগিং টুলস)

### 🇧🇩 বাংলা / 🇬🇧 English

| Tool (টুল)              | Usage (ব্যবহার)                                        |
| ------------------------ | ------------------------------------------------------ |
| `console.log()`         | যেকোনো মান print করুন / Print any value               |
| Browser DevTools (F12)  | Network, Console, Elements দেখুন / View network & logs |
| Postman                 | API পরীক্ষা করুন / Test APIs independently             |
| `mongosh`               | ডাটাবেস সরাসরি দেখুন / Query database directly        |
| `node --check file.js`  | Syntax ত্রুটি খুঁজুন / Find syntax errors             |
| VS Code Debugger        | Breakpoint দিয়ে ধাপে ধাপে দেখুন / Step through code  |

### console.log() Tips:

```javascript
// 🇧🇩 কোথায় console.log রাখবেন / 🇬🇧 Where to put console.log:

// ১. Route handler এর শুরুতে — request ডেটা দেখতে
router.post("/", async (req, res) => {
  console.log("📥 req.body:", req.body);      // কী ডেটা এলো?
  console.log("📥 req.params:", req.params);  // URL parameter কী?
  console.log("📥 req.query:", req.query);    // Query string কী?
  // ...
});

// ২. Database operation-এর পরে — result দেখতে
const student = await Student.findById(id);
console.log("🔍 Found:", student); // null হলে পাওয়া যায়নি

// ৩. catch block-এ — ত্রুটির বিস্তারিত দেখতে
catch (err) {
  console.error("❌ Error name:", err.name);       // ত্রুটির ধরন
  console.error("❌ Error message:", err.message); // ত্রুটির বার্তা
  console.error("❌ Error stack:", err.stack);     // কোন লাইনে হয়েছে
}
```

### Browser Network Tab:
```
🇧🇩 বাংলা:
  F12 → Network tab → API call এ click করুন
  • Headers: Request URL ও method দেখুন
  • Payload: কী ডেটা পাঠানো হয়েছে দেখুন
  • Response: সার্ভার কী ফেরত দিয়েছে দেখুন
  • Status: 200 (সফল), 400 (ভুল ডেটা), 404 (পাওয়া যায়নি), 500 (সার্ভার ত্রুটি)

🇬🇧 English:
  F12 → Network tab → Click on API call
  • Headers: See request URL and method
  • Payload: See what data was sent
  • Response: See what server returned
  • Status: 200 (success), 400 (bad data), 404 (not found), 500 (server error)
```

---

## 10. Common Mistakes & Fixes (সাধারণ ভুল ও সমাধান)

| # | Mistake (ভুল) | Fix (সমাধান) |
|---|---------------|-------------|
| 1 | `express.json()` ভুলে যাওয়া | `app.use(express.json())` routes-এর আগে | 
| 2 | MongoDB চালু না করা | `docker start mern-mongo` বা `mongod` |
| 3 | `.jsx` extension না দেওয়া import-এ | `import App from "./App.jsx"` |
| 4 | `useEffect` এ `[]` না দেওয়া | `useEffect(() => {...}, [])` |
| 5 | `key` prop না দেওয়া `.map()` এ | `<div key={item._id}>` |
| 6 | `student.id` লেখা `student._id` এর বদলে | MongoDB তে `_id` ব্যবহার করুন |
| 7 | `new: true` ভুলে যাওয়া update-এ | `findByIdAndUpdate(id, data, { new: true })` |
| 8 | Port conflict | `lsof -i :4000` দিয়ে চেক ও `kill` করুন |
| 9 | CORS সেটআপ না করা | `app.use(cors({ origin: "..." }))` |
| 10 | `async/await` ভুলে যাওয়া | Database call-এ `await` অবশ্যই দিন |

---

## Quick Start (দ্রুত শুরু)

```bash
# ধাপ ১: Dependencies install করুন / Step 1: Install dependencies
cd learning-crud
npm run install:all

# ধাপ ২: MongoDB চালু করুন / Step 2: Start MongoDB
docker start mern-mongo
# অথবা: mongod

# ধাপ ৩: সার্ভার চালু করুন / Step 3: Start server (terminal 1)
npm run dev:server
# ✅ দেখবেন: "Server running: http://localhost:4000"

# ধাপ ৪: ক্লায়েন্ট চালু করুন / Step 4: Start client (terminal 2)
npm run dev:client
# ✅ দেখবেন: "Local: http://localhost:5173"

# ধাপ ৫: ব্রাউজারে যান / Step 5: Open browser
# http://localhost:5173
```

---

**Happy Debugging! শুভ ডিবাগিং! 🎯**

> মনে রাখবেন: প্রতিটি ত্রুটি আপনাকে আরও ভালো ডেভেলপার বানায়।
> Remember: Every error makes you a better developer.
