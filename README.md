# Mondoer Community Portal Website (Full Stack)
Here, I have created a full stack web app. This website is essentially a community portal that connects people by giving them the latest alerts and also allowing them to voice any complains through a contact form. Along with this website I have also added a secure admin portal & super admin portal which can both be accessed through a <b>admin login page</b> in the website. The intent behind the creation of the portals was to allow administrators to easily view these complaints through visualisation of the database table where these messages are stored and furthermore, the super admin portal not only allows the administrator to view complaints it also gives allowance to see current admins through visualisation of the database table storing admin_users in a dashboard. The superadmin can also manipulate the database table on the dashboard by add or delete admin_users on this dashboard except themselves obviously. This is a portal for everyone.

<h3>Full stack:</h3>
<pre>
-Frontend (HTML/CSS/JS)
-Backend (Server.js/package.json/package-lock.json)
-Database (Tables)
-CI/CD (to connct everything)
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
<p><b>Project Architectural diagram:</b><p>

<img src="frontend/Architectural diagram.jpg">
