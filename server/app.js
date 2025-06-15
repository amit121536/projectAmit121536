const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/list');
const clientPath = path.join(__dirname, '..', 'client');
const port = 3000
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors({ origin: "*" }));


app.use('/api/users', userRoutes);
app.use('/api/list', listRoutes);

// משרת קבצים סטטיים מהתיקייה client
app.use(express.static(clientPath));
// שולח את index.html כברירת מחדל כאשר נכנסים ל-root
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'index.html'));
});
app.get('/:page', (req, res) => {
    const page = req.params.page + '.html';
    const filePath = path.join(clientPath, 'pages', page);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Page not found');
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
