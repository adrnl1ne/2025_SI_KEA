import express from 'express';
import bodyParser from 'body-parser';
import { parseCSV } from './parsers/parseCSV.js';
import { parseXML } from './parsers/parseXML.js';
import { parseYAML } from './parsers/parseYAML.js';
import { parseTXT } from './parsers/parseTXT.js';
import { parseJSON } from './parsers/parseJSON.js';

const app = express();
app.use(bodyParser.text({ type: '*/*' }));

app.post('/parse/csv', (req, res) => {
    const data = req.body;
    parseCSV(data)
        .then(parsedData => res.send(parsedData))
        .catch(err => res.status(500).send(err.message));
});

app.post('/parse/xml', (req, res) => {
    const data = req.body;
    parseXML(data)
        .then(parsedData => res.send(parsedData))
        .catch(err => res.status(500).send(err.message));
});

app.post('/parse/yaml', (req, res) => {
    const data = req.body;
    try {
        const parsedData = parseYAML(data);
        res.send(parsedData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/parse/txt', (req, res) => {
    const data = req.body;
    try {
        const parsedData = parseTXT(data);
        res.send(parsedData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/parse/json', (req, res) => {
    const data = req.body;
    try {
        const parsedData = parseJSON(data);
        res.send(parsedData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});