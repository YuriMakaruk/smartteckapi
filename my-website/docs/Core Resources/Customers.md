# Customers

## **The Customer object**

attributes

….

Example

```json
{
  "id": "cus_NffrFeUfNV2Hib",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1680893993,
  "currency": null,
  "default_source": null,
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": "jennyrosen@example.com",
  "invoice_prefix": "0759376C",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null,
    "rendering_options": null
  },
  "livemode": false,
  "metadata": {},
  "name": "Jenny Rosen",
  "next_invoice_sequence": 1,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none",
  "test_clock": null
}
```

## Create a customer

### **Description**

Create a new customer object.
A customer represents an individual or business that you can bill for products and services.
Customers can have associated payment methods, subscriptions, and invoices.

The API returns the created customer object on success.

### **Endpoint**

`POST v1/customers`

### **Example Request (curl)**

```bash
curl https://api.chaching.io/v1/customers \
  -u sk_test_12345: \
  -d "name=Jane Doe" \
  -d "email=jane.doe@example.com" \
  -d "phone=+123456789" \
  -d "description=Premium plan customer"

```

### **Parameters**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | dictionary | Required if calculating taxes | The customer’s billing address.  **Child parameters:** `line1`, `line2`, `city`, `state`, `postal_code`, `country`. |
| `description` | string | optional | An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard. |
| `email` | string | optional | Customer’s email address. Displayed in the dashboard and useful for searching. Up to 512 characters. |
| `metadata` | dictionary | optional | Set of key-value pairs you can attach to the object. Useful for storing additional structured information. Individual keys can be unset by posting an empty value. Posting an empty object clears all metadata. |
| `name` | string | optional | The customer’s full name or business name. |
| `payment_method` | string | optional | The ID of a PaymentMethod to attach to the customer. |
| `phone` | string | optional | The customer’s phone number. |
| `shipping` | dictionary | optional | The customer’s shipping information. Appears on invoices emailed to the customer.  **Child parameters:** `name`, `address`, `phone`. |
| `tax` | dictionary | Recommended if calculating taxes | Tax details about the customer.  **Child parameters:** `ip_address`, `tax_ids`. |
| `balance` | integer | optional | An integer amount in cents representing the customer’s current balance. Negative values are credits (reduce future invoice amounts), positive values increase the amount due. |
| `cash_balance` | dictionary | optional | Balance information and default balance settings for the customer. |
| `invoice_prefix` | string | optional | Prefix used to generate unique invoice numbers. Must be 3–12 uppercase letters or numbers. |
| `invoice_settings` | dictionary | optional | Default invoice settings for this customer.  **Child parameters:** `default_payment_method`, `footer`. |
| `next_invoice_sequence` | integer | optional | Sequence number to use on the customer’s next invoice. Defaults to 1. |
| `preferred_locales` | array of strings | optional | Customer’s preferred languages, ordered by preference. |
| `source` | string | optional | When using payment sources created via the Token or Sources APIs, passing `source` creates a new source object, sets it as default, and removes the previous default (if one exists). To add multiple sources, use the card creation API. |
| `tax_exempt` | enum | optional | The customer’s tax exemption status. One of: `none`, `exempt`, `reverse`. |
| `tax_id_data` | array of dictionaries | optional | The customer’s tax IDs.  **Child parameters:** `type`, `value`. |
| `test_clock` | string | optional | ID of the test clock to attach to the customer (for simulating time in test mode). |

### **Response**

```json
{
  "id": "cus_123456789",
  "object": "customer",
	"address": null,
  "balance": 0,
  "created": 1680893993,
  "currency": null,
  "default_source": null,
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": "jennyrosen@example.com",
  "invoice_prefix": "0759376C",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null,
    "rendering_options": null
  },
  "livemode": false,
  "metadata": {},
  "name": "Jenny Rosen",
  "next_invoice_sequence": 1,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none",
  "test_clock": null
}
```

### **Returns**

Returns the Customer object after successful customer creation. Returns [**an error**](https://docs.stripe.com/api/customers/create?lang=curl&api-version=2025-04-30.preview#errors) if create parameters are invalid (for example, specifying an invalid coupon or an invalid source).

## Update a customer

### **Description**

Update an existing customer object.

You can update most fields on a customer, including metadata, billing information, invoice settings, or payment sources.

The API returns the updated customer object on success.

### **Endpoint**

`POST /v1/customers/{CUSTOMER_ID}`

### **Example Request (curl)**

```bash
curl https://api.chaching.io/v1/customers/cus_123456789 \
  -u sk_test_12345: \
  -X POST \
  -d "name=Jane Doe Updated" \
  -d "email=jane.updated@example.com" \
  -d "phone=+1987654321" \
  -d "metadata[plan]=premium" \
  -d "address[line1]=123 Updated St" \
  -d "address[city]=New York" \
  -d "address[country]=US" \
  -d "shipping[name]=Jane Doe" \
  -d "shipping[address][line1]=123 Updated St" \
  -d "shipping[address][city]=New York"

```

### **Path Parameters**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `CUSTOMER_ID` | string | required | The identifier of the customer to update (e.g., `cus_123456789`). |

### **Body Parameters**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | dictionary | optional | The customer’s billing address.  **Child parameters:** `line1`, `line2`, `city`, `state`, `postal_code`, `country`. |
| `description` | string | optional | An arbitrary string that you can attach to a customer object. It is displayed alongside the customer in the dashboard. |
| `email` | string | optional | Customer’s email address. Useful for searching and tracking. Up to 512 characters. |
| `metadata` | dictionary | optional | Set of key-value pairs to attach to the object. Individual keys can be unset by posting an empty value. Posting an empty object clears all metadata. |
| `name` | string | optional | The customer’s full name or business name. |
| `payment_method` | string | optional | The ID of a PaymentMethod to attach to the customer. |
| `phone` | string | optional | The customer’s phone number. |
| `shipping` | dictionary | optional | Customer’s shipping information. Appears on invoices.  **Child parameters:** `name`, `address`, `phone`. |
| `tax` | dictionary | optional | Tax details about the customer.  **Child parameters:** `ip_address`, `tax_ids`. |
| `balance` | integer | optional | An integer amount in cents representing the customer’s current balance. |
| `cash_balance` | dictionary | optional | Balance information and default balance settings for this customer. |
| `invoice_prefix` | string | optional | Prefix for customer’s invoices. Must be 3–12 uppercase letters or numbers. |
| `invoice_settings` | dictionary | optional | Default invoice settings for this customer.  **Child parameters:** `default_payment_method`, `footer`. |
| `next_invoice_sequence` | integer | optional | Sequence number to use on the customer’s next invoice. |
| `preferred_locales` | array of strings | optional | Customer’s preferred languages, ordered by preference. |
| `source` | string | optional | When using payment sources created via the Token or Sources APIs, passing `source` creates a new source object, sets it as default, and removes the previous default. |
| `tax_exempt` | enum | optional | The customer’s tax exemption status. One of: `none`, `exempt`, `reverse`. |
| `tax_id_data` | array of dictionaries | optional | The customer’s tax IDs.  **Child parameters:** `type`, `value`. |
| `test_clock` | string | optional | ID of the test clock to attach to the customer (test mode only). |

### **Response**

```json
{
  "id": "cus_123456789",
  "object": "customer",
  "name": "Jane Doe Updated",
  "email": "jane.updated@example.com",
  "phone": "+1987654321",
  "description": null,
  "metadata": {
    "plan": "premium"
  },
  "address": {
    "line1": "123 Updated St",
    "city": "New York",
    "country": "US"
  },
  "shipping": {
    "name": "Jane Doe",
    "address": {
      "line1": "123 Updated St",
      "city": "New York"
    }
  },
  "created": 1692739200,
  "updated": 1693344000
}

```

### **Errors**

| Error Code | Description |
| --- | --- |
| `invalid_request` | The request parameters are missing or invalid. |
| `resource_missing` | No customer with the given ID was found. |
| `authentication_error` | The API key is missing or invalid. |
| `rate_limit` | Too many requests hit the API too quickly. Try again later. |
| `server_error` | An error occurred on Chaching’s servers. |

## Retrieve a customer

### **Description**

Retrieves the details of an existing customer.

You only need to supply the unique customer ID that was returned when the customer was created.

### **Endpoint**

`GET /v1/customers/{CUSTOMER_ID}`

### **Example Request (curl)**

```bash
curl https://api.chaching.io/v1/customers/cus_123456789 \
  -u sk_test_12345:

```

### **Parameters**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `CUSTOMER_ID` | string | required | The identifier of the customer to retrieve (e.g., `cus_123456789`). |

### **Response**

```json
{
  "id": "cus_NffrFeUfNV2Hib",
  "object": "customer",
  "address": null,
  "balance": 0,
  "created": 1680893993,
  "currency": null,
  "default_source": null,
  "delinquent": false,
  "description": null,
  "discount": null,
  "email": "jennyrosen@example.com",
  "invoice_prefix": "0759376C",
  "invoice_settings": {
    "custom_fields": null,
    "default_payment_method": null,
    "footer": null,
    "rendering_options": null
  },
  "livemode": false,
  "metadata": {},
  "name": "Jenny Rosen",
  "next_invoice_sequence": 1,
  "phone": null,
  "preferred_locales": [],
  "shipping": null,
  "tax_exempt": "none",
  "test_clock": null
}
```

## Delete a customer

### **Description**

Permanently deletes a customer.

It cannot be undone.

When deleted, the customer object will be marked as deleted and no longer usable for future operations.

### **Endpoint**

`DELETE /v1/customers/{CUSTOMER_ID}`

### **Example Request (curl)**

```bash
curl https://api.chaching.io/v1/customers/cus_123456789 \
  -u sk_test_12345: \
  -X DELETE

```

### **Parameters**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `CUSTOMER_ID` | string | required | The identifier of the customer to delete (e.g., `cus_123456789`). |

### **Response**

```json
{
  "id": "cus_123456789",
  "object": "customer",
  "deleted": true
}

```

