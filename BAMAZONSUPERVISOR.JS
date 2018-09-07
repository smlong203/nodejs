var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

//NOTE: full disclosure, this is not complete


function displayall() {
    connection.query('SELECT * FROM Products', function (error, response) {
        if (error) { console.log(error) };
        var displaytable = new Table({
            head: ['ITEMID', 'PRODUCTNAME', 'DEPARTMENTNAME', 'PRICE', 'STOCKQUANTITY'],
            colWidths: [20, 20, 20, 10, 20]
        });
        for (i = 0; i < response.length; i++) {
            displaytable.push(
                [response[i].ITEMID, response[i].PRODUCTNAME, response[i].DEPARTMENTNAME, response[i].PRICE, response[i].STOCKQUANTITY]
            );
        }
        console.log(displaytable.toString());
        inquirepurchase();
    });

};
