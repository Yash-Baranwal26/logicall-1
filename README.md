A simple REST API built with **Node.js**, **Express**, and **Prisma (PostgreSQL)**  
for managing a list of movies and TV shows.

## 🚀 Features

- Add a new movie or TV show entry  
- Edit, delete, and list entries  
- Pagination support  
- Search by title  
- PostgreSQL with Prisma ORM  
- Data validation using **Zod**

-------------------------------------------------------------------------------
## ⚙️ Setup Instructions

### 1️⃣ Clone and install dependencies
``bash'
git clone repo_url
cd Logicall
npm install
--------------------------------------------------------------------------------
.env

DATABASE_URL=postgresql://neondb_owner:npg_Wno0K2iQsuhF@ep-blue-river-ad5721ra-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

PORT=4000
--------------------------------------------------------------------------------
Run

npx prisma generate      # Generate Prisma client

npx prisma db push       # Apply schema to database
---------------------------------------------------------------------------------

* Seed Database
To add sample data (2 movies + 2 TV shows):

"npm run seed"

This will insert demo records into your Entry table.
-------------------------------------------------------------------------------
1. Add New Entry
   POST: http://localhost:4000/api/entries/
   
   body: {
  "title": "Inception",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": 160000000,
  "location": "Los Angeles",
  "duration": "148",
  "yearOrTime": "2010"
}

3. List Entries (with Pagination)
   GET: http://localhost:4000/api/entries?page=1&limit=10
   
   Response: {
  "success": true,
  "currentPage": 1,
  "totalPages": 2,
  "totalRecords": 8,
  "data": [ ... ]
}

5. Update Entries
   PATCH: http://localhost:4000/api/entries/:id
   
   Body: {
  "location": "New York",
  "budget": 170000000
}

7. Delete Entries
   DELETE: http://localhost:4000/api/entries/:id
   
   Remove entries permanently

9. Search By title
   GET: http://localhost:4000/api/entries/search?title=inception
   
   Returns all entries containing the given title.
   
-----------------------------------------------------------------------------

Tech Stack
Backend: Node.js, Express
ORM: Prisma
Database: PostgreSQL (Neon)
Validation: Zod
Language: ES Modules (import/export syntax)
   














