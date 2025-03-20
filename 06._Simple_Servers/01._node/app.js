import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send({data: "Root route"});

});

app.listen(8080);