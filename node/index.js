const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Artur 3')`
connection.query(sql)

connection.connect(err => {
    const select = 'SELECT name FROM people';

    connection.query(select, (err, results) => {
        if (err) {
            console.error('Erro ao buscar nomes:', err);
            connection.end();
            return;
        }

        const nomes = results.map(result => result.name);

        app.get('/', (req, res) => {
            res.send(
                `
                    <h1>Full Cycle Rocks!</h1>
                    <ul>
                      ${nomes.map(nome => `<li>${nome}</li>`).join('')}
                    </ul>
                `
            );
        });

        app.listen(port, () => {
            console.log('Rodando na porta ' + port);
        });

        connection.end();
    });
});