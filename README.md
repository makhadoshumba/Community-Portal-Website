# Mondoer Community Portal Website (Full Stack)
### What is this?
Here, I have created a full stack web app. This website is essentially a community portal that connects people by giving them the latest alerts and also allowing them to voice any complains through a contact form. Along with this website I have also added a secure admin panel & super admin panel which can both be accessed through a <b>admin login page</b> in the website. 
### Why was it created?
The intent behind the creation of the panels was to allow administrators to easily view these complaints through a dashboard connected to the database table where these messages are stored and furthermore, the super admin panel not only allows the administrator to view complaints it also gives allowance to see current admins through visualisation of the database table storing admin_users in a dashboard. The superadmin can also manipulate the database table on the dashboard by add or delete admin_users on this dashboard except themselves obviously. This is a solution for a community

<h3>Full stack:</h3>
<pre>
-Frontend (VERCEL[HTML/CSS/JS])
-Backend (RENDER [Server.js/package.json/package-lock.json])
-Database (AZURE SQL DATABSE [Tables])
-CI/CD (Workflows[YAML])
</pre>

<h3>Technologies used:</h3>
<pre>
-<b>VERCEL</b>(front-end)- The frontend file was hosted on <b>Vercel</b> due it its fast, efficient <b>CDN</b>.
-<b>RENDER</b>(backend)- For the backend I used <b>Render</b> to deploy a server for cost optimization(free option for developers).
-<b>Azure SQL Database</b>(database)- I hosted my database on Azure because it allows for online communication with server so table info can be served into my live website through Rest Api. My local server doesn't allow me to do this. 
-<b>Github</b>- I used Github to create a Continuous Ingestion/ Continuous Deployment pipeline to easily deploy into repository from my local folder, from there github updates frontend in VERCEL and backend in RENDER automatically creating a pipeline that goes throughout the project.
-<b>SQL Server Management Studio</b>- I used SSMS to manage my cloud database locally, allowing me to check if information is flowing in or out. 
-<b>Visual Studio Code</b>- I used this to compile all my code (Essentially to code).
</pre>

<br>

## Architecture
<img src="frontend/Architectural diagram.jpg" width="600" height="500">
<br>
<h3>Project Structure:</h3>
<pre>
Community Portal Website
│
├── Frontend
│   ├── Home
│   ├── About Us
│   ├── Achievements
│   ├── Events
│   ├── Contact Form
│   └── Admin Login
│
├── Admin System
│   ├── Admin Dashboard
│   │   ├── View Forms
│   │   ├── Edit Forms
│   │   ├── Delete Forms
│   │   └── Search Forms
│   │
│   └── Super Admin Dashboard
│       ├── Manage Admins
│       ├── Add Admin
│       ├── Edit Admin
│       ├── Delete Admin
│       └── Search Admins
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── REST API
│   └── Authentication
│
└── Database
    └── Azure SQL Database
        ├── Users Table
        └── Admins Table
</pre>
<br>
<h3>Databse Table Entity Relationship Diagram:</h3>
<img src="frontend/Screenshot (25).png" >
<br>
<h3>Contact form architecture:</h3>
<img src="frontend/Contact form.jpg" width="600" height="500">
<br>
<h3>Admin System Architecture (Admin Login):</h3>
<img src="frontend/Admin Page.jpg" width="600" height="500">
<br>
<h3>Admin System Architecture (Admin Panel/Super Admin Panel):</h3>
<img src="frontend/Super,admin panel.jpg" width="600" height="500">
<br>
