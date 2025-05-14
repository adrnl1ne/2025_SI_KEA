# Hospital Management System Database Migration

This project demonstrates a data migration from a PostgreSQL relational database to a MongoDB document database for a hospital management system.

## Overview

The migration follows an Extract-Transform-Load (ETL) approach:

1. **Extract**: Data is extracted from PostgreSQL tables
2. **Transform**: Relational data is transformed into document format
3. **Load**: Transformed data is loaded into MongoDB collections

## Key Data Model Changes

### PostgreSQL (Relational Model)
- Tables with foreign key relationships
- Normalized data structure

### MongoDB (Document Model)
- Collections with embedded documents
- Denormalized data structure
- References used where appropriate

## Schema Transformation Examples

**PostgreSQL Relational Schema:**
- `departments` table
- `staff` table with `department_id` foreign key

**MongoDB Document Schema:**
- `departments` collection
- `staff` collection with embedded department information

## Getting Started

1. Start the databases:
   ```
   docker-compose up -d
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the migration:
   ```
   npm run migrate
   ```

4. Verify data in MongoDB:
   ```
   mongosh mongodb://localhost:27017/hospitaldb
   db.departments.find()
   ```

## Migration Scripts

- `extract_from_postgres.js`: Extracts data from PostgreSQL tables
- `transform_data.js`: Transforms relational data to document format
- `load_to_mongodb.js`: Loads transformed data into MongoDB
- `run_migration.js`: Orchestrates the entire migration process