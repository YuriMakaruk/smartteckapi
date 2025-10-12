# Invoices

## **The Invoice object**

**Attributes**

```bash
{
  "id": "in_1MtHbELkdIwHu7ixl4OzzPMv",
  "object": "invoice",
  "account_country": "US",
  "account_name": "Stripe Docs",
  "account_tax_ids": null,
  "amount_due": 0,
  "amount_paid": 0,
  "amount_overpaid": 0,
  "amount_remaining": 0,
  "amount_shipping": 0,
  "application": null,
  "attempt_count": 0,
  "attempted": false,
  "auto_advance": false,
  "automatic_tax": {
    "enabled": false,
    "liability": null,
    "status": null
  },
  "billing_reason": "manual",
  "collection_method": "charge_automatically",
  "created": 1680644467,
  "currency": "usd",
  "custom_fields": null,
  "customer": "cus_NeZwdNtLEOXuvB",
  "customer_address": null,
  "customer_email": "jennyrosen@example.com",
  "customer_name": "Jenny Rosen",
  "customer_phone": null,
  "customer_shipping": null,
  "customer_tax_exempt": "none",
  "customer_tax_ids": [],
  "confirmation_secret": null,
  "default_payment_method": null,
  "default_source": null,
  "default_tax_rates": [],
  "description": null,
  "discounts": [],
  "due_date": null,
  "ending_balance": null,
  "footer": null,
  "from_invoice": null,
  "hosted_invoice_url": null,
  "invoice_pdf": null,
  "issuer": {
    "type": "self"
  },
  "last_finalization_error": null,
  "latest_revision": null,
  "lines": {
    "object": "list",
    "data": [],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/invoices/in_1MtHbELkdIwHu7ixl4OzzPMv/lines"
  },
  "payments": {
    "object": "list",
    "data": [],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/invoice_payments"
  },
  "livemode": false,
  "metadata": {},
  "next_payment_attempt": null,
  "number": null,
  "on_behalf_of": null,
  "paid": false,
  "paid_out_of_band": false,
  "parent": null,
  "payment_intent": null,
  "payment_settings": {
    "default_mandate": null,
    "payment_method_options": null,
    "payment_method_types": null
  },
  "period_end": 1680644467,
  "period_start": 1680644467,
  "post_payment_credit_notes_amount": 0,
  "pre_payment_credit_notes_amount": 0,
  "receipt_number": null,
  "shipping_cost": null,
  "shipping_details": null,
  "starting_balance": 0,
  "statement_descriptor": null,
  "status": "draft",
  "status_transitions": {
    "finalized_at": null,
    "marked_uncollectible_at": null,
    "paid_at": null,
    "voided_at": null
  },
  "subtotal": 0,
  "subtotal_excluding_tax": 0,
  "test_clock": null,
  "total": 0,
  "total_discount_amounts": [],
  "total_excluding_tax": 0,
  "total_taxes": [],
  "transfer_data": null,
  "webhooks_delivered_at": 1680644467
}
```

## Create an invoice

### **Description**

Creates a new invoice object.
Invoices are statements of amounts owed by a customer. They can contain line items, discounts, tax information, and payment instructions.

### **Endpoint**

`POST /v1/invoices`

### **Example Request (curl)**

```bash
curl https://api.chaching.io/v1/invoices \
  -u sk_test_12345: \
  -d "customer=cus_123456789" \
  -d "description=Invoice for August subscription" \
  -d "auto_advance=true"

```

### **Parameters**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `customer` | string | required | The ID of the customer to bill. |
| `description` | string | optional | Description of the invoice. |
| `auto_advance` | boolean | optional | If true, automatically finalizes the invoice after ~1 hour. |
| `metadata` | dictionary | optional | Set of key-value pairs to attach to the invoice. |
| `collection_method` | enum | optional | Either `charge_automatically` (default) or `send_invoice`. |
| `days_until_due` | integer | optional | Required if `collection_method` is `send_invoice`. The number of days until payment is due. |

### **Response**

```json
{
  "id": "inv_123456789",
  "object": "invoice",
  "customer": "cus_123456789",
  "description": "Invoice for August subscription",
  "status": "draft",
  "auto_advance": true,
  "amount_due": 5000,
  "currency": "usd",
  "created": 1692739200
}
```