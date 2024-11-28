# **Created Role-Based Access Control (RBAC) UI as a Backend Assignment for VRV Security**

## **Features**

**1.User Login & Signup:**
- Secure login system with validation.
- Password hashing using libraries like bcrypt for secure storage.
- JWT-based token authentication.

**2.Role-Based Access Control:**
- Users are assigned specific roles such as Admin, User, or Manager.
- Role-specific permissions restrict access to certain features or pages.

**3.Authentication & Authorization:**
- Secure methods such as JWT for managing sessions and user authentication.
- Implementation of Role-Based Access Control (RBAC), where the access to resources is determined based on the user's assigned role.

## **How to Use**

## **To use the project, follow these steps for both the frontend and backend:**

## **Install Dependencies ( Frontend & Backend both )**

run the following command to install the necessary dependencies:
- npm install

## **Start the Development Server ( Frontend and Backend both)**

After installing the dependencies, start the development server by running:
- npm run dev

## **.env ( Frontend )**
- VITE_API_URL = "http://localhost:3000/api/v1"

## **.env ( Backend )**
- PORT = 3000

**Use below URL to connect with Database or you can use your own MongoDb URL**

- MONGODB_URL = "mongodb+srv://amantoordpps:kO9R4KR8STokK9V8@cluster0.a8ifn.mongodb.net/VRV-Security" 

- JWT_SECRET = tdoubleor

## **Handling CORS in the Server**
In the index.js file of your server, ensure the allowedOrigins array includes the URL your frontend is running on. For example:


```javascript
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}));
```

Simply add your frontend's URL (e.g., http://localhost:3000) to the allowedOrigins array to avoid CORS issues.

## **API Routes**
The following are the API routes used in this project:

- **Login**

  POST - http://localhost:3000/api/v1/login

  Use this route to log in a user.

- **Sign Up**
  
  POST - http://localhost:3000/api/v1/signup

  Use this route to create a new user.

- **Get All Users**
  
  GET - http://localhost:3000/api/v1/getallUsers

  Use this route to retrieve a list of all users.

- **Get User by ID**
  
  GET - http://localhost:3000/api/v1/getuser/:id

  Use this route to retrieve a user by their unique ID.

- **Delete User**
  
  DELETE - http://localhost:3000/api/v1/deleteUser/:id

  Use this route to delete a user by their unique ID.

- **Create User**
  
  POST - http://localhost:3000/api/v1/createUser

  Use this route to create a new user.

- **Update User**
  
  PUT - http://localhost:3000/api/v1/updateUser/:id

  Use this route to update a user's information by their unique ID.

You can replace localhost:3000 with your deployed backend URL when you are ready to deploy your application.













