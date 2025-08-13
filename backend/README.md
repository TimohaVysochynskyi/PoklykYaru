# Payments (Monobank) setup

Environment variables (set in .env or your hosting dashboard):

- PORT=3000
- CLIENT_DOMAIN=http://localhost:5173
- APP_PUBLIC_URL=http://localhost:3000
- MONOBANK_TOKEN=your_acquiring_x_token

Endpoints

- POST /api/merch/payments/invoice (auth: customer)
  - Body: { orderProducts: [{ product, variation: { size?: string[], color?: string[] }, quantity: number, price: number }], totalPrice: number }
  - Response: { invoiceUrl, invoiceId, reference, orderId }
- POST /api/merch/payments/webhook (raw body; called by Monobank)
- GET /api/merch/payments/ (auth: customer) — list my orders
- GET /api/merch/payments/all (auth: admin) — list all orders

Local run

- Start backend: set the envs above. If port 3000 is busy, override with another port: PORT=3001
- Start frontend on 5173.

Webhook testing locally

1. Expose your backend with a tunnel and set APP_PUBLIC_URL to that public URL.
2. In Monobank acquiring settings, set webhook URL to: APP_PUBLIC_URL/api/merch/payments/webhook
3. Create an invoice from the site and complete a test payment; statuses will update in DB.

Notes

- Legacy LiqPay code has been removed/replaced.
- Webhook uses raw body for signature verification; do not add body parsers on that route.
