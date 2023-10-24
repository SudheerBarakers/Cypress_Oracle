# Cypress_Postgres

To integrate Cypress with a PostgreSQL database, you'll need to follow a few steps. This involves setting up a test environment, writing tests, and configuring Cypress to interact with your database.

# Here's a step-by-step guide:

## 1. Install Cypress:

Make sure you have Cypress installed. You can do this via npm:

      npm install cypress --save-dev
      
## 2. Set Up a Test Environment:

Create a separate database specifically for testing. You don't want your Cypress tests to interfere with your production data.

You can create a test database using a tool like pg or using a command-line tool like psql.

## 3. Install Necessary Libraries:

You'll need a library to interact with your PostgreSQL database. One popular choice is pg.

      npm install pg

## 4. Write Cypress Tests:

In your Cypress test files, you can now write tests that interact with your database. 

            describe('Cypress with Postgres', () => {
                it('Database Test', () => {
                    cy.task("SqlQueryPS", "select * from employee").then((res) => {
                        console.log(res)
                    })
               })
            })

## 5. Configure Cypress to Access the Database:

You'll need to set up a connection to your test database within your Cypress configuration. This typically involves creating a file, such as cypress.config.js, to configure Cypress plugins.

            const { Client } = require('pg')
            const connectDB = async (querys) => {

              const client = new Client({
              user: "postgres",
              host: "localhost",
              database: "Emp",
              password: "postgres",
              port: "5432"
              })

           await client.connect()
           console.log("NOTE===>DB Connection Established");
           return await client.query(querys);
         };


        module.exports = defineConfig({
        e2e: {
          setupNodeEvents(on, config) {
            // implement node event listeners here

            on('task', {
              SqlQueryPS: (query) => {
                return connectDB(query);
              }
            })
          },
        },
      });

## 6. Run Your Tests:

Start your application and then run Cypress

      npx cypress open

This will open the Cypress Test Runner, where you can select and run your database integration tests.

## 7. Result

![image](https://github.com/SudheerBarakers/Cypress_Postgres/assets/120264688/6d16cb9d-d026-49ef-9b98-6afb38c62781)

