# Hospital Management System

## Overview
A PostgreSQL database system for managing hospital operations.

## Project Structure
- `/docs`: Database documentation generated with SchemaSpy
- `/scripts`: SQL scripts for database setup and seeding
- `/src`: Source code for database connection and testing

## Getting Started

1. Start the database:
docker-compose up -d
2. Initialize the database:
cd scripts psql -h localhost -U postgres -d hospitaldb -f init.sql
3. View documentation:
- Browse to `docs/output/index.html` for complete database documentation
- Diagrams are available in `docs/output/diagrams` directory

# Hospital Management System Documentation

## Database Schema
The database schema for our Hospital Management System includes the following tables:
- departments
- staff
- patients
- medical_records
- appointments

## Entity Relationship Diagram
An interactive diagram of the database relationships can be found in:
- `docs/output/diagrams/summary/relationships.real.large.svg`

![Database Schema](./docs/output/diagrams/summary/relationships.real.large.svg)

## Database Tables
Detailed information about each table, including columns, constraints, and relationships, is available in the HTML documentation:
- `docs/output/index.html`

## Database Design Decisions
This repository contains a SQL Server database for a Hospital Management System, created as part of the SI KEA 10a assignment. The database models a hospital with departments, staff, patients, appointments, and prescriptions.

## Entity-Relationship Diagram

```
┌─────────────┐       ┌─────────┐       ┌───────────────┐
│ Departments │       │  Staff  │       │ Medications   │
├─────────────┤       ├─────────┤       ├───────────────┤
│ DepartmentID│◄──┐   │ StaffID │       │ MedicationID  │
│ Name        │   └──┼─DepartmentID     │ Name          │
│ Description │      │ FirstName│       │ Description   │
│ Location    │      │ LastName │       │ Dosage        │
└─────────────┘      │ Title    │       │ Manufacturer  │
                     │ Special. │       └───────┬───────┘
                     │ Contact  │               │
                     │ Email    │               │
                     │ HireDate │               │
                     └────┬─────┘               │
                          │                     │
                 ┌────────┴─────┐               │
                 │              │               │
        ┌────────┴────┐ ┌───────┴────┐ ┌───────┴──────────┐
        │ Appointments│ │ MedRecords  │ │ Prescriptions   │
        ├─────────────┤ ├────────────┤ ├──────────────────┤
        │ AppointID   │ │ RecordID   │ │ PrescriptionID   │
┌───────┼─PatientID   │ │ PatientID  │ │ PatientID        │
│       │ StaffID     │ │ StaffID    │ │ StaffID          │
│       │ AppDate     │ │ VisitDate  │ │ MedicationID     │
│       │ AppTime     │ │ Diagnosis  │ │ PrescriptionDate │
│       │ Status      │ │ Treatment  │ │ Dosage           │
│       │ Notes       │ │ Notes      │ │ Frequency        │
│       └──────┬──────┘ └────────┬───┘ │ Duration         │
│              │                 │     │ Notes            │
│              │                 │     └──────────────────┘
│              │                 │
│       ┌──────┴─────────────────┴────┐
└───────┤ Patients                    │
        ├───────────────────────────┬─┤
        │ PatientID                 │ │
        │ FirstName                 │ │
        │ LastName                  │ │
        │ DateOfBirth               │ │
        │ Gender                    │ │
        │ ContactNumber             │ │
        │ Email                     │ │
        │ Address                   │ │
        │ EmergencyContact          │ │
        │ BloodType                 │ │
        │ RegistrationDate          │ │
        └───────────────────────────┘ │
```

## Database Schema

### Departments
Stores information about hospital departments.

| Column | Type | Description |
|--------|------|-------------|
| DepartmentID | INT | Primary Key, Auto-increment |
| Name | NVARCHAR(100) | Department name (required) |
| Description | NVARCHAR(500) | Department description |
| Location | NVARCHAR(100) | Physical location within hospital |

### Staff
Stores information about hospital staff members.

| Column | Type | Description |
|--------|------|-------------|
| StaffID | INT | Primary Key, Auto-increment |
| FirstName | NVARCHAR(50) | First name (required) |
| LastName | NVARCHAR(50) | Last name (required) |
| Title | NVARCHAR(50) | Job title (required) |
| DepartmentID | INT | Foreign Key to Departments |
| Specialization | NVARCHAR(100) | Medical specialization |
| ContactNumber | NVARCHAR(20) | Phone number |
| Email | NVARCHAR(100) | Email address (unique) |
| HireDate | DATE | Employment start date |

### Patients
Stores information about hospital patients.

| Column | Type | Description |
|--------|------|-------------|
| PatientID | INT | Primary Key, Auto-increment |
| FirstName | NVARCHAR(50) | First name (required) |
| LastName | NVARCHAR(50) | Last name (required) |
| DateOfBirth | DATE | Date of birth (required) |
| Gender | NVARCHAR(10) | Patient gender |
| ContactNumber | NVARCHAR(20) | Phone number |
| Email | NVARCHAR(100) | Email address |
| Address | NVARCHAR(200) | Physical address |
| EmergencyContact | NVARCHAR(100) | Emergency contact information |
| BloodType | NVARCHAR(5) | Blood type |
| RegistrationDate | DATE | Date of registration (default: current date) |

### Appointments
Stores scheduled appointments between staff and patients.

| Column | Type | Description |
|--------|------|-------------|
| AppointmentID | INT | Primary Key, Auto-increment |
| PatientID | INT | Foreign Key to Patients |
| StaffID | INT | Foreign Key to Staff |
| AppointmentDate | DATE | Date of appointment (required) |
| AppointmentTime | TIME | Time of appointment (required) |
| Status | NVARCHAR(20) | Status (Scheduled, Completed, Cancelled) |
| Notes | NVARCHAR(500) | Additional notes |

### MedicalRecords
Stores patient medical records.

| Column | Type | Description |
|--------|------|-------------|
| RecordID | INT | Primary Key, Auto-increment |
| PatientID | INT | Foreign Key to Patients |
| StaffID | INT | Foreign Key to Staff |
| VisitDate | DATE | Date of visit (required) |
| Diagnosis | NVARCHAR(500) | Medical diagnosis |
| Treatment | NVARCHAR(500) | Treatment plan |
| Notes | NVARCHAR(1000) | Additional notes |

### Medications
Stores information about available medications.

| Column | Type | Description |
|--------|------|-------------|
| MedicationID | INT | Primary Key, Auto-increment |
| Name | NVARCHAR(100) | Medication name (required) |
| Description | NVARCHAR(500) | Medication description |
| Dosage | NVARCHAR(50) | Available dosages |
| Manufacturer | NVARCHAR(100) | Manufacturer name |

### Prescriptions
Stores prescription information.

| Column | Type | Description |
|--------|------|-------------|
| PrescriptionID | INT | Primary Key, Auto-increment |
| PatientID | INT | Foreign Key to Patients |
| StaffID | INT | Foreign Key to Staff |
| MedicationID | INT | Foreign Key to Medications |
| PrescriptionDate | DATE | Date prescribed (default: current date) |
| Dosage | NVARCHAR(50) | Prescribed dosage |
| Frequency | NVARCHAR(50) | How often to take |
| Duration | NVARCHAR(50) | How long to take |
| Notes | NVARCHAR(500) | Additional notes |

## Relations
- Each Department can have multiple Staff members (One-to-Many)
- Each Staff member belongs to one Department (Many-to-One)
- Each Staff member can have multiple Appointments (One-to-Many)
- Each Patient can have multiple Appointments (One-to-Many)
- Each Staff member can create multiple MedicalRecords (One-to-Many)
- Each Patient can have multiple MedicalRecords (One-to-Many)
- Each Staff member can create multiple Prescriptions (One-to-Many)
- Each Patient can have multiple Prescriptions (One-to-Many)
- Each Medication can be in multiple Prescriptions (One-to-Many)

## Getting Started

### Prerequisites
- Docker and Docker Compose
- SQL Server Management Studio (or equivalent) for viewing the database

### Setup
1. Clone this repository
2. Update the `.env` file with your preferred password
3. Run `docker-compose up -d` to start the database
4. Connect to the database using SQL Server Management Studio:
   - Server: localhost,1433
   - Authentication: SQL Server Authentication
   - Username: sa
   - Password: (from .env file)

## Documentation

Generated database documentation is available in the `docs` folder:

- [Complete Documentation](docs/output/index.html)
- [Database Diagrams](docs/hospital-docs.html) - A visual overview of the database schema

## Documentation Generation
This documentation was created using database documentation best practices and manual entity-relationship diagramming.