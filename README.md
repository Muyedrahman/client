#  Blood Donation Application

## 📌 Project Name
**Blood Donation Application (B12-A11-C01)**

##  Purpose
The Blood Donation Application is a MERN stack based web platform designed to connect blood donors with recipients efficiently.  
This system helps manage blood donation requests, donor profiles, and role-based dashboards (Admin, Donor, Volunteer) with a clean, recruiter-friendly UI and secure authentication.

This project is developed as part of **B12 A11 Category-01 Assignment** following all provided guidelines and deployment rules.

---

##  Live Website
 Front-end Live Link:  
<!-- https://blood-donation-client-a11.netlify.app/ -->

---

## 🧑‍🤝 User Roles

### 👤 Donor (Default)
- Register & login
- Create blood donation requests
- View, edit, delete own requests
- Update profile information
- Search donors

### 🤝 Volunteer
- View all blood donation requests
- Update donation status only

### 🌐 Admin
- Full system access
- Manage users (block/unblock, role change)
- Manage all donation requests
- View statistics (users, funds, donation requests)

 *Admin role is assigned manually from the database.*

---

##  Authentication & Security
- Email & Password based authentication
- JWT implemented for protecting private APIs
- Firebase Authentication
- Firebase configuration secured using environment variables
- MongoDB credentials secured using environment variables

---

##  Key Features

###  Public Features
- Home page with banner, featured section & contact form
- Search donors by blood group, district & upazila
- View all pending blood donation requests

###  Private Dashboard Features
- Fully responsive sidebar dashboard
- Profile management with edit & save toggle
- Role-based access control

####  Donor Dashboard
- Dashboard home with recent 3 donation requests
- My Donation Requests page (pagination & filtering)
- Create donation request (blocked users restricted)

####  Admin Dashboard
- Statistics cards (total users, total funds, total donation requests)
- All Users management
- All Blood Donation Requests management

####  Volunteer Dashboard
- View all donation requests
- Update donation status only

---

##  Funding (Challenge Requirement)
- Private funding page
- Stripe payment integration
- Funding history table
- Total funding displayed on Admin & Volunteer dashboards

---

##  UI & UX Highlights
- Unique, non-generic design (no gobindo UI)
- Consistent color theme and typography
- Fully responsive for mobile, tablet & desktop
- Equal height cards and grid layouts
- Clean spacing and alignment

---

##  Additional Implementations
- Pagination where required
- Filtering by status (users & donation requests)
- Protected private routes (no redirect on reload)
- Firebase domain authorization configured

---

##  Technology Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Firebase Authentication
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Stripe

---

##  NPM Packages Used
- react-router-dom
- firebase
- axios
- jsonwebtoken
- stripe
- dotenv
- cors

---

##  Submission Info

**Admin Email:** admin@example.com  
**Admin Password:** admin123  

**Front-end Live Site:** https://blood-donation-client-a11.netlify.app/  
**Client Side GitHub Repository:** (add your client repo link)  
**Server Side GitHub Repository:** (add your server repo link)

---

##  Notes
- Minimum 20 meaningful commits on client side
- Minimum 12 meaningful commits on server side
- No project similarity with module/assignment work
- All deployment rules followed
