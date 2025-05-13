# Order Webhook System

A webhook registration system for e-commerce order events, allowing integrators to subscribe to various order-related events.

## Overview

This system provides a simple API for registering, managing, and testing webhooks. It's designed to notify external services about events in an order processing workflow.

## Getting Started

1. Install dependencies:
npm install

2. Start the server:
npm start

3. The server will run on port 3000 by default.

## Event Types

The following event types are supported:

- `order.created` - Triggered when a new order is placed
- `order.payment_received` - Triggered when payment is received
- `order.processing` - Triggered when order fulfillment begins
- `order.shipped` - Triggered when an order ships
- `order.delivered` - Triggered when delivery is confirmed
- `order.cancelled` - Triggered when an order is cancelled

## API Documentation and Testing

The API comes with Swagger UI for easy documentation and testing:

1. Start the server:
2. Navigate to http://localhost:3000/api-docs in your browser

3. Use the Swagger UI to explore and test the API endpoints directly from your browser

## API Documentation

### Endpoints

#### Webhook Registration
- **POST /webhooks/register**
  - Register a new webhook
  - Request body:
 ```json
 {
   "url": "https://example.com/webhook",
   "events": ["order.created", "order.shipped"],
   "description": "My order events webhook"
 }
 ```
  - Response:
 ```json
 {
   "id": "550e8400-e29b-41d4-a716-446655440000",
   "url": "https://example.com/webhook",
   "events": ["order.created", "order.shipped"],
   "description": "My order events webhook",
   "created_at": "2025-05-13T14:30:45.123Z"
 }
 ```

#### Webhook Unregistration
- **DELETE /webhooks/:id**
  - Unregister a webhook by ID
  - Response (success):
 ```json
 {
   "success": true,
   "message": "Webhook unregistered"
 }
 ```
  - Response (not found):
 ```json
 {
   "error": "Webhook not found"
 }
 ```

#### List Webhooks
- **GET /webhooks**
  - List all registered webhooks
  - Response:
 ```json
 [
   {
     "id": "550e8400-e29b-41d4-a716-446655440000",
     "url": "https://example.com/webhook",
     "events": ["order.created", "order.shipped"],
     "description": "My order events webhook",
     "created_at": "2025-05-13T14:30:45.123Z"
   }
 ]
 ```

#### List Valid Events
- **GET /webhooks/events**
  - List all valid event types
  - Response:
 ```json
 {
   "events": [
     "order.created",
     "order.payment_received",
     "order.processing",
     "order.shipped",
     "order.delivered",
     "order.cancelled"
   ]
 }
 ```

#### Ping Webhooks
- **GET /ping**
  - Send test ping event to all registered webhooks
  - Response:
 ```json
 {
   "message": "Ping sent to all registered webhooks",
   "results": [
     {
       "webhook_id": "550e8400-e29b-41d4-a716-446655440000",
       "success": true,
       "status": 200
     }
   ]
 }
 ```

## Webhook Payload Format

When events occur, webhooks will receive a POST request with a JSON payload:

```json
{
  "event_type": "order.created",
  "timestamp": "2025-05-13T14:32:10.123Z",
  "data": {
 "order_id": "ORD12345",
 "customer": "customer123",
 "items": [
   {"product_id": "prod1", "quantity": 2}
 ],
 "total": 59.98
  }
}
```

For ping events, the payload will look like:

```json
{
  "event_type": "ping",
  "timestamp": "2025-05-13T14:35:22.123Z",
  "data": {
    "message": "This is a test ping"
  }
}
```
Integration Guidelines
Register a webhook with the events you want to listen for
Implement an HTTP endpoint at your specified URL that accepts POST requests
Your endpoint should respond with a 2xx status code upon successful receipt
For testing, use the /ping endpoint to verify your webhook is receiving events properly
