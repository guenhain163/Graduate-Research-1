const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// Create router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing routers
app.get('/api/test', (req, res) => {
    res.send("API IS RUNNING")
})

// C Router
app.use('/api/c', require('./api/cApi'));

// C++ Router
app.use('/api/cpp', require('./api/cppApi'));

// Python Router
app.use('/api/python', require('./api/pythonApi'));

// Java Router
app.use('/api/java', require('./api/javaApi'))


// Serve static files
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
