require('dotenv').config();
const express = require('express');
const db = require('./db');
const cors = require("cors");
const morgan = require("morgan"); 
const app = express();

app.use(cors());
app.use(express.json()); // this attatches the body content to the 'req' in the post method
// create a restaurant
app.post("/api/v1/restaurants", async(req, res) => {
    try {
        const queryResults = await db.query(`INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;`, [
            req.body.name,
            req.body.location,
            req.body.price_range
        ]);
        console.log(queryResults);
        res.status(201).json({
            data: {
                restaurant: queryResults.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    }
});

// update a restaurant
app.put("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const queryResults = await db.query(`UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;`, [
            req.body.name,
            req.body.location,
            req.body.price_range,
            req.params.id
        ]);
        console.log(queryResults);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: queryResults.rows[0],
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.use(cors());
app.use(express.json());
app.get("/api/v1/restaurants", async(req, res) => {
    try {
        const queryResults = await db.query("SELECT * FROM restaurants;");
        res.status(200).json({
            status: "success",
            results: queryResults.rows.length,
            data: {
                restaurant: queryResults.rows,
            },
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const restaurants = await db.query(`SELECT * FROM restaurants WHERE id = $1;`, [req.params.id]);
        const reviews = await db.query(`SELECT * FROM reviews WHERE restaurant_id = $1;`, [req.params.id]);
        
        //console.log("Query results:", reviews.rows);
        res.status(200).json({
            data: {
                restaurant: restaurants.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query(`INSERT INTO reviews (restaurant_id, name, comment, rating) VALUES ($1, $2, $3, $4) RETURNING *;`, 
        [req.params.id, req.body.name, req.body.comment, req.body.rating]);
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch(err) {
        console.log(err);
    }
});

// 204 Postman auto removes the body
app.delete("/api/v1/restaurants/:id", async(req, res) => {
    try {
        const queryResults = await db.query("DELETE FROM restaurants WHERE id = $1;", [
            req.params.id,
        ]);

        res.status(204).json({
            status: "success",
        });
    } catch(error) {
        console.log(error);
    }
});

const port = process.env.PORT || 3000; // stored in .env file
// http://localhost:4000/
app.listen(port, ()=>{
    console.log(`server is up and listening on port ${port}.`);
});


// React => Request => Node/Express
// Node/Express has multiple Middlewares => Route-Handler
// Node/Express has Route-Handler => Response => React

// third party middleware morgan