import express from "express";
import cors from "cors";
import pool from "./database.js";
import { QueryResult } from "pg";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("Server started on port 5000");
})

/* ################# ADD REQUESTS ################# */
app.post("/file_info", async (req, res) => {
    try {
        const { title, file_path, file_description, category_id } = req.body;
        let newFile = await pool.query(
            "INSERT INTO file_info (title, file_path, file_description, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, file_path, file_description, category_id]
        );
        res.json(newFile.rows[0]);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
})

app.post("/category", async (req, res) => {
    try {
        const { category_name, icon_url } = req.body;
        let newCategory: QueryResult<any>;

        if (icon_url) {
            newCategory = await pool.query(
                "INSERT INTO category (category_name, icon_url) VALUES ($1, $2) RETURNING *",
                [category_name, icon_url]
            );
        } else {
            newCategory = await pool.query(
                "INSERT INTO category (category_name) VALUES ($1) RETURNING *",
                [category_name]
            );
        }

        res.json(newCategory.rows[0]);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.message });
    }
})

/* ################# GET REQUESTS ################# */

app.get("/file_info", async (req, res) => {
    try {
        let file = await pool.query("SELECT * FROM file_info")
        res.json(file.rows);
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})
app.get("/category", async (req, res) => {
    try {
        let subject = await pool.query("SELECT * FROM category")
        res.json(subject.rows);
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})

app.get("/file_overview/", async (req, res) => {
    try {
        const category = await pool.query("SELECT * FROM file_overview");

        res.json(category.rows);
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})

app.get("/file_info/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const file = await pool.query("SELECT * FROM file_info WHERE id = $1", [id]);

        res.json(file.rows[0]);
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})
app.get("/category/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const category = await pool.query("SELECT * FROM category WHERE id = $1", [id]);

        res.json(category.rows[0]);
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})
app.get("/file_overview/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const category = await pool.query("SELECT * FROM file_overview WHERE file_info_id = $1", [id]);

        res.json(category.rows[0]);
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})

/* ################# UPDATE REQUESTS ################# */

function createUpdateQuery(tableName: string, columns: string[], primaryColumnName: string): string {
    let query = `UPDATE ${tableName} SET `;

    let i = 0;
    for (i = 0; i < columns.length; i++) {
        query += `${columns[i]} = $${(i + 1)}`;
        if (i < columns.length - 1) {
            query += ", ";
        }
    }

    query += ` WHERE ${primaryColumnName} = $${i + 1}`;
    return query;
}

app.put("/file_info/:id", async (req, res) => {
    try {
        // Get params and body
        const { id } = req.params;
        const body = req.body;

        //Get columns and values to update
        const columns = Object.keys(body);
        const values = Object.values(body);

        if (columns.length === 0) {
            res.status(400).json({ error: "No values provided" });
        }

        // Create query command
        let query = createUpdateQuery("file_info", columns, "id");

        // Execute query
        await pool.query(query, values.concat([id]));

        res.status(200).json();
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})

app.put("/category/:id", async (req, res) => {
    try {
        // Get params and body
        const { id } = req.params;
        const body = req.body;

        //Get columns and values to update
        const columns = Object.keys(body);
        const values = Object.values(body);

        if (columns.length === 0) {
            res.status(400).json({ error: "No values provided" });
        }

        // Create query command
        let query = createUpdateQuery("category", columns, "id");

        // Execute query
        await pool.query(query, values.concat([id]));

        res.status(200).json();
    } catch (e) {
        console.log(e);

        res.status(400).json({ error: e.message });
    }
})



/* ################# DELETE REQUESTS ################# */
app.delete("/file_info/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM file_info WHERE id = $1", [id]);

        res.status(200).json();
    } catch (e) {
        console.log(e);

        res.status(400).json({error: e.message});
    }
})

app.delete("/category/:id", async (req, res) => {
    try {
        const { id } = req.params;

        let c = await pool.query("DELETE FROM category WHERE id = $1", [id]);
        res.status(200).json();
    } catch (e) {
        console.log(e);

        res.status(400).json({e});
    }
})