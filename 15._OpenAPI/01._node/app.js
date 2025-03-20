import express from 'express';
const app = express();

app.use(express.json());

import usersRouter from './routers/usersRouter.js';
app.use(usersRouter);

import swaggerJsdoc from 'swagger-jsdoc';
const swaggerDefinition = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            version: '1.0.0',
            description: 'A simple API to get information about users'
        }
    }, apis: ['./routers/*Router.js']
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routers/*Router.js']
};

import swaggerUi from 'swagger-ui-express';
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
