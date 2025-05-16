Node.js Auth API with JWT and Role-Based Access
This project is a Node.js REST API for user authentication and role-based access control using JWT. 
It includes user registration, login, protected routes, refresh token functionality, and basic observability.


Features
	•	User Registration and Login
	•	Password hashing with bcrypt
	•	JWT-based authentication with 15-minute expiry
	•	Refresh token mechanism
	•	Role-based access (user, admin)
	•	Token invalidation on logout
	•	Rate limiting (to prevent brute force)
	•	Observability with /metrics endpoint

 instruction

 clone repo :
 git clone git@github.com:aj-codess/N_Rest_api.git

Install Dependencies:
npm install


create env in the root directory with this:
PORT=3000
MONGO_URI=mongodb://localhost:27017/nerasol




create a directory in root directory with name:"assets"
create another directory within the "assets" directory with name "keys"
in there, the system will create both private and public key files for crypto related.


start server with : **npm run dev**


API ENDPOINT

Entry
	/api/v1

Authentication
	•	POST /register
		Register a new user or admin (requires name, email, password, role)
	•	POST /login
		Login and receive an access token (JWT)
	•	POST /refresh-token
		Use a refresh token to obtain a new access token
	•	POST /logout
		Clears the refresh token cookie and invalidates session


Protected Routes
	•	GET /profile
		Access protected user profile (requires valid JWT)
	•	GET /admin/data
		Only accessible by users with role admin


Metrics
	•	GET /metrics
		Returns system stats: total registered users, login attempts (success/fail), protected route accesses
