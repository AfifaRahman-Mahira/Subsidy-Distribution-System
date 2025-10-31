# Subsidy Distribution System (SDS)

A web-based platform designed to manage and distribute government or NGO subsidies efficiently and transparently.

## Team Members
- Farjana Hosen Moumita (223071001)
- Afifa Rahman Mahira (223071002)
- Purobi Akter (223071003)

## Database

We have designed the database with the following tables:

### Tables:

1. **USERS**
   - **Purpose:** Stores user login and basic information
   - **Columns:** user_id (PK), name, email, password, role, created_at

2. **BENEFICIARIES**
   - **Purpose:** Stores beneficiary-specific information
   - **Columns:** beneficiary_id (PK), user_id (FK → USERS.user_id), nid_number, address, phone, district

3. **SUBSIDY_PROGRAMS**
   - **Purpose:** Stores information about subsidy programs
   - **Columns:** program_id (PK), program_name, description, fund_amount, start_date, end_date

4. **APPLICATIONS**
   - **Purpose:** Stores beneficiary applications for subsidies
   - **Columns:** application_id (PK), beneficiary_id (FK → BENEFICIARIES.beneficiary_id), program_id (FK → SUBSIDY_PROGRAMS.program_id), income, family_size, application_date, status

5. **TRANSACTIONS**
   - **Purpose:** Records disbursed aid for approved applications
   - **Columns:** transaction_id (PK), application_id (FK → APPLICATIONS.application_id), distributed_by, disbursed_amount, distribution_type, distribution_date

6. **NOTIFICATIONS**
   - **Purpose:** Stores notifications sent to users
   - **Columns:** notification_id (PK), user_id (FK → USERS.user_id), message, status, created_at

### ER Diagram

The ER Diagram visualizes the database structure and relationships between tables.  
All diagram files are available in the `diagrams/` folder:

- `er_diagram.png` → Image version of the ER Diagram  

**Relationships:**  
- USERS → BENEFICIARIES (1-to-many)  
- BENEFICIARIES → APPLICATIONS (1-to-many)  
- APPLICATIONS → TRANSACTIONS (1-to-many)  
- SUBSIDY_PROGRAMS → APPLICATIONS (1-to-many)  
- USERS → NOTIFICATIONS (1-to-many)

### How to Run SQL:
1. Open MySQL or any SQL client.
2. Execute the `schema.sql` file located in `db/` folder to create all tables.
3. (Optional) Execute `sample_data.sql` to insert dummy data for testing.


