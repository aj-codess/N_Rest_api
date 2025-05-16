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


