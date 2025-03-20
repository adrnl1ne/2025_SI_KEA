import { Router } from 'express';

const router = Router();

const users = [
    {
        id: 1,
        name: 'John Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    },
    {
        id: 3,
        name: 'Jim Doe'
    }
];

// Add this line to define nextId for the POST route
let nextId = 4;

/**
 * @openapi
 * /api/users:
 *  get:
 *    description: Get all users
 *    responses:
 *     200:
 *      description: A list of users
 */
router.get('/api/users', (req, res) => {
    res.json({ data: users});
});

/**
 * @openapi
 * /api/users:
 *  post:
 *    description: Create a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *    responses:
 *      200:
 *        description: The created user
 */
router.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = nextId++;
    users.push(newUser);
    res.send({ data : newUser});
});

export default router;