require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DEBUG = process.env.DEBUG || false;

// Express
const express = require('express');
// const Middleware = require("./middleware");
var cors = require('cors');
const Middleware = require('./middleware');
const app = express();
// Config
app.disable('x-powered-by')
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}))

// Routes
app.use('/api/management', require('./routes/management.route'));
app.use('/api/agent', require('./routes/agent.route'));

// 404 handler
app.get('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
})
app.post('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
})
app.patch('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
})
app.put('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
})
app.delete('*', (req, res) => {
    res.status(404).json({ error: "Not Found" });
})

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: "Unexpected Error" });
})

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));