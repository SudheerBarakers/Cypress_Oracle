const { defineConfig } = require("cypress");

const oracledb = require("oracledb");

//oracledb.initOracleClient({ libDir: "cypress/instantclient_21_11" });

// Oracle DB credentials 
const db_config = {
  user: "SYSTEM",
  password: "SYSTEM",
  connectString: "localhost:1521/XE"
}

const queryData = async (query, db_config) => {
  let conn;
  try {
    // It's failing on this getConnection line
    conn = await oracledb.getConnection(db_config);
    console.log("NOTE===>connect established")
    return await conn.execute(query);
  } catch (err) {
    console.log("Error===>" + err)
    return err
  } finally {
    if (conn) {
      try {
        conn.close();
      } catch (err) {
        console.log("Error===>" + err)
      }
    }
  }
}


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        sqlQuery: (query) => {
          return queryData(query, db_config);
        }
      })
    },
  },
});
