# Database Design

This document defines the database schema and relationships for **StockPilot**.



# Entity Relationship Diagram (ERD)


                     Category
                         │
                         │
                         ▼
Supplier ───────────► Product ◄────────── Warehouse
                         │
                         │
                         ▼
                  Stock Movement
                         │
                         ▼
                        User
```

---

# Collections

## 1. Users

Stores information about users who can access the application.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique identifier |
| fullName | String | User's full name |
| email | String | Unique email address |
| password | String | Hashed password |
| role | String | Admin / Manager / Staff |
| avatar | String | Profile image URL (optional) |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last updated timestamp |



## 2. Categories

Stores different product categories.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique identifier |
| name | String | Category name |
| description | String | Category description |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last updated timestamp |

Examples:

- Medicines
- Electronics
- Cosmetics
- Grocery



## 3. Suppliers

Stores supplier/vendor information.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique identifier |
| companyName | String | Supplier company |
| contactPerson | String | Contact person |
| email | String | Supplier email |
| phone | String | Phone number |
| address | String | Supplier address |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last updated timestamp |



## 4. Warehouses

Stores warehouse information.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique identifier |
| name | String | Warehouse name |
| location | String | Warehouse location |
| manager | String | Warehouse manager |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last updated timestamp |



## 5. Products

Stores inventory items.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique identifier |
| name | String | Product name |
| sku | String | Unique Stock Keeping Unit |
| description | String | Product description |
| category | ObjectId | Reference to Category |
| supplier | ObjectId | Reference to Supplier |
| warehouse | ObjectId | Reference to Warehouse |
| purchasePrice | Number | Buying price |
| sellingPrice | Number | Selling price |
| quantity | Number | Available stock |
| minimumStock | Number | Minimum stock threshold |
| unit | String | Piece, Box, Bottle, Kg, etc. |
| image | String | Product image URL (optional) |
| barcode | String | Barcode (optional) |
| trackExpiry | Boolean | Whether expiry tracking is enabled |
| expiryDate | Date | Product expiry date (optional) |
| status | String | Active / Inactive |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last updated timestamp |



## 6. Stock Movements

Maintains inventory history.

| Field | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Unique identifier |
| product | ObjectId | Reference to Product |
| warehouse | ObjectId | Reference to Warehouse |
| quantity | Number | Quantity changed |
| type | String | IN / OUT / TRANSFER |
| reason | String | Purchase / Sale / Return / Damage / Transfer |
| createdBy | ObjectId | Reference to User |
| createdAt | Date | Movement timestamp |



# Relationships

### Category → Product

One category can contain multiple products.


Category (1)
      │
      ▼
Product (Many)




### Supplier → Product

One supplier can supply multiple products.

```
Supplier (1)
      │
      ▼
Product (Many)
```

---

### Warehouse → Product

One warehouse can store multiple products.

```
Warehouse (1)
       │
       ▼
Product (Many)
```

---

### Product → Stock Movement

Each inventory update creates a new stock movement record.

```
Product (1)
      │
      ▼
Stock Movement (Many)
```

---

### User → Stock Movement

Each stock movement is performed by a user.

```
User (1)
    │
    ▼
Stock Movement (Many)
```

---

# Design Decisions

## Why use references?

Instead of storing category names, supplier details, or warehouse information inside every product, we store their ObjectIds. This avoids data duplication and keeps the database normalized.

---

## Why `trackExpiry`?

Not every product has an expiry date.

Examples:

- Medicines habe 
- Dairy Products have
- Cosmetics have
- Laptops does not have
- Furniture does not have

A boolean flag allows the application to enable expiry tracking only when applicable.

---

## Why don't we store expiry status?

Fields like **Expired**, **Expiring Soon**, or **Healthy** are not stored in the database.

They are calculated dynamically based on the current date and the product's expiry date.

This ensures the status always remains accurate without requiring daily database updates.

---

## Why use Stock Movements?

Updating only the product quantity would lose inventory history.

The **Stock Movement** collection maintains an audit trail of every inventory change, including:

- Stock Added
- Stock Removed
- Transfers
- Returns
- Damaged Items

This improves traceability and accountability.

---

## Why store quantity inside Product?

For the MVP, the current stock quantity is stored directly in the Product document for fast access and simpler queries.

Every stock update also creates a corresponding Stock Movement record.

This keeps the design simple while preserving inventory history.

---

# Future Enhancements

- Multiple warehouses per product
- Batch/Lot management
- Barcode scanning
- Product image uploads
- Purchase Orders
- Sales Orders
- Inventory forecasting
- Email notifications for low stock
- Automatic expiry alerts
- CSV/Excel import and export