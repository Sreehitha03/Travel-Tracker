# Travel - Tracker

This project is a web application that allows users to highlight countries they have visited on an interactive world map. It uses a PostgreSQL database to store the countries visited by the user and provides an intuitive interface for adding new countries.

---

## Features
- Interactive SVG world map with countries dynamically highlighted.
- Backend powered by Express.js with PostgreSQL database integration.
- Add new countries to the "visited" list through a form.
- Highlights visited countries in a specific color on the map.
- Displays the total number of countries visited.

---

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript Templates)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
  
---

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a database named `world`.
   - Import the required tables countries and visited_countries.
     ```sql
     CREATE TABLE countries (
         country_code VARCHAR(3) PRIMARY KEY,
         country_name VARCHAR(50)
     );

     CREATE TABLE visited_countries (
         id SERIAL PRIMARY KEY,
         country_code VARCHAR(3) REFERENCES countries(country_code)
     );
     ```
   - Populate the `countries` table with country codes and names.

4. Update the database connection in `index.js`:

5. Start the server:
   ```bash
   node index.js
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---
