require('dotenv').config();
const express = require('express');
var cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

// App
const app = express();
app.disable('x-powered-by')
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}))
app.use(morgan("tiny"));

// Routes
app.use('/api/management', require('./routes/management.route'));
app.use('/api/agent', require('./routes/agent.route'));
// Dashboard
app.use(express.static('www'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'www', 'index.html')))

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: "Unexpected Error" });
})

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));