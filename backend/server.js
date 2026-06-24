require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();

app.use(cors());
app.use(express.json());

// SQL CONFIG
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
options: {
    encrypt: true,
    trustServerCertificate: true,
    connectTimeout: 30000,
    requestTimeout: 30000
}
};

let pool;

// ---------------------- START SERVER & CONNECT DB ----------------------
async function startServer() {
    try {
        pool = await sql.connect(config);

        console.log("✅ Connected to SQL Server");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ SQL Connection Error:", err);
        process.exit(1);
    }
}

startServer();

// ---------------------- TEST ROUTE ----------------------
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// ---------------------- USER FORM SUBMISSION ----------------------
app.post("/api/users", async (req, res) => {
    try {
        console.log("User form received:", req.body);

        const {
            name,
            surname,
            cell,
            email,
            address,
            gender,
            date,
            message
        } = req.body;

        await pool.request()
            .input("name", sql.VarChar, name)
            .input("surname", sql.VarChar, surname)
            .input("cell", sql.VarChar, cell)
            .input("email", sql.VarChar, email)
            .input("address", sql.VarChar, address)
            .input("gender", sql.VarChar, gender)
            .input("date", sql.Date, date)
            .input("message", sql.VarChar, message)
            .query(`
                INSERT INTO form_details
                (
                    Name,
                    Surname,
                    Cell,
                    Email,
                    Address,
                    Gender,
                    [Date],
                    Message
                )
                VALUES
                (
                    @name,
                    @surname,
                    @cell,
                    @email,
                    @address,
                    @gender,
                    @date,
                    @message
                )
            `);

        res.json({
            success: true,
            message: "Data saved successfully!"
        });

    } catch (err) {
        console.error("FORM ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

//login
app.post("/api/admin-login", async (req, res) => {
    try {

        const { username, password } = req.body;

        const result = await pool.request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .query(`
                SELECT TOP 1 username, password, role
                FROM admin_users
                WHERE username = @username
                AND password = @password
            `);

        if (!result.recordset.length) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const user = result.recordset[0];

        console.log("DB USER:", user);

        return res.json({
            success: true,
            message: "Login successful",
            role: user.role.trim().toLowerCase()   // 🔥 makes routing 100% safe
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// ---------------------- ADMIN PANEL DATA ----------------------
app.get("/api/users-data", async (req, res) => {
    try {
        const result = await pool.request().query(`
            SELECT *
            FROM form_details
            ORDER BY [Date] DESC
        `);

        res.json(result.recordset);

    } catch (err) {
        console.error("ADMIN DATA ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// ---------------------- UPDATE FORM RECORD ----------------------
app.put("/api/users-data/:id", async (req, res) => {
    try {

        console.log("UPDATE PARAM ID:", req.params.id);
        console.log("UPDATE BODY:", req.body);

        const id = parseInt(req.params.id);

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID"
            });
        }

        const Name = req.body.Name ?? req.body.name;
        const Surname = req.body.Surname ?? req.body.surname;
        const Cell = req.body.Cell ?? req.body.cell;
        const Email = req.body.Email ?? req.body.email;
        const Address = req.body.Address ?? req.body.address;
        const Gender = req.body.Gender ?? req.body.gender;
        const DateValue = req.body.Date ?? req.body.date;
        const Message = req.body.Message ?? req.body.message;

        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("name", sql.VarChar, Name)
            .input("surname", sql.VarChar, Surname)
            .input("cell", sql.VarChar, Cell)
            .input("email", sql.VarChar, Email)
            .input("address", sql.VarChar, Address)
            .input("gender", sql.VarChar, Gender)
            .input("date", sql.Date, DateValue)
            .input("message", sql.VarChar, Message)
            .query(`
                UPDATE form_details
                SET
                    Name = @name,
                    Surname = @surname,
                    Cell = @cell,
                    Email = @email,
                    Address = @address,
                    Gender = @gender,
                    [Date] = @date,
                    Message = @message
                WHERE ID = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                success: false,
                message: "No record updated (ID not found)"
            });
        }

        res.json({
            success: true,
            message: "Record updated successfully"
        });

    } catch (err) {
        console.error("FORM UPDATE ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// ---------------------- DELETE FORM RECORD ----------------------
app.delete("/api/users-data/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.request()
            .input("id", sql.Int, id)
            .query(`
                DELETE FROM form_details
                WHERE ID = @id
            `);

        res.json({
            success: true,
            message: "Record deleted successfully."
        });

    } catch (err) {

        console.error("FORM DELETE ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// ---------------------- GET ALL ADMINS ----------------------
app.get("/api/admins", async (req, res) => {

    try {

        const result = await pool.request().query(`
            SELECT ID, Username, Password, Role
            FROM admin_users
            ORDER BY Username
        `);

        res.json(result.recordset);

    } catch (err) {

        console.error("ADMINS FETCH ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ---------------------- UPDATE ADMIN ----------------------
app.put("/api/admins/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { username, password, role } = req.body;

        await pool.request()
            .input("id", sql.Int, id)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .input("role", sql.VarChar, role)
            .query(`
                UPDATE admin_users
                SET
                    Username = @username,
                    Password = @password,
                    Role = @role
                WHERE ID = @id
            `);

        res.json({
            success: true,
            message: "Admin updated successfully."
        });

    } catch (err) {

        console.error("ADMIN UPDATE ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// ---------------------- DELETE ADMIN ----------------------
app.delete("/api/admins/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const check = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT Role
                FROM admin_users
                WHERE ID = @id
            `);

        if (!check.recordset.length) {
            return res.status(404).json({
                success: false,
                message: "Admin not found."
            });
        }

        const role = (check.recordset[0].Role || "").trim().toLowerCase();

        // 🔥 SAFE CHECK (handles "superadmin" OR "super admin")
        if (role === "superadmin" || role === "super admin") {
            return res.status(403).json({
                success: false,
                message: "Super Admin cannot be deleted."
            });
        }

        await pool.request()
            .input("id", sql.Int, id)
            .query(`
                DELETE FROM admin_users
                WHERE ID = @id
            `);

        res.json({
            success: true,
            message: "Admin deleted successfully."
        });

    } catch (err) {

        console.error("ADMIN DELETE ERROR:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ---------------------- CREATE ADMIN ----------------------
// ---------------------- CREATE ADMIN ----------------------
app.post("/api/admins", async (req, res) => {

    try {

        const username = (req.body.username || "").trim();
        const password = (req.body.password || "").trim();
        const role = (req.body.role || "").trim();

        // 1. Validate fields
        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }

        // 2. CHECK IF USERNAME EXISTS
        const existingUser = await pool.request()
            .input("username", sql.VarChar, username)
            .query(`
                SELECT TOP 1 username
                FROM admin_users
                WHERE username = @username
            `);

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username already exists"
            });
        }

        // 3. INSERT NEW ADMIN
        await pool.request()
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, password)
            .input("role", sql.VarChar, role)
            .query(`
                INSERT INTO admin_users (username, password, role)
                VALUES (@username, @password, @role)
            `);

        return res.json({
            success: true,
            message: "Admin added successfully"
        });

    } catch (err) {

        console.error("ADMIN ADD ERROR:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

// ================= ADMIN SEARCH =================
app.get("/api/admins/search", async (req, res) => {

    try {

        const q = (req.query.q || "").trim();

        const result = await pool.request()
            .input("q", sql.VarChar, `%${q}%`)
            .query(`
                SELECT *
                FROM admin_users
                WHERE 
                    username LIKE @q
                    OR role LIKE @q
            `);

        res.json(result.recordset);

    } catch (err) {
        console.error("ADMIN SEARCH ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// ================= FORM SEARCH =================
app.get("/api/users-data/search", async (req, res) => {

    try {

        const q = (req.query.q || "").trim();

        const result = await pool.request()
            .input("q", sql.VarChar, `%${q}%`)
            .query(`
                SELECT *
                FROM form_details
                WHERE 
                    Name LIKE @q
                    OR Surname LIKE @q
                    OR Email LIKE @q
                    OR Cell LIKE @q
                    OR Message LIKE @q
            `);

        res.json(result.recordset);

    } catch (err) {
        console.error("FORM SEARCH ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});