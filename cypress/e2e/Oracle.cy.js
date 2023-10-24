describe('Cypress with Oracle Database', () => {

    it('Database Test', () => {

        const query = "select * from customers"; 

        cy.task("sqlQuery", query).then((result) => {
          let data = Object.values(result.rows)
          console.log(data)
        })
    })

})