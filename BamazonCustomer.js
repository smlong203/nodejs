var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

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

function inquirepurchase() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "What is the ID of the product they would like to buy?"
        }, {
            name: 'quantity',
            type: 'input',
            message: "How many units of the product they would like to buy?"
        },

    ]).then(function (answers) {
        var quantity = answers.quantity;
        var ID = answers.ID;
        purchasedatabase(ID, quantity);
    });

};

function purchasedatabase(ID, quantity) {
    connection.query('SELECT * FROM Products WHERE ITEMID = ' + ID, function (error, response) {
        if (error) { console.log(error) };
        if (quantity <= response[0].STOCKQUANTITY) {
            var totalcost = response[0].PRICE * quantity;
            console.log("We have your products. Order will be out soon.");
            console.log("Total cost for " + quantity + " " + response[0].PRODUCTNAME + " is " + totalcost);
            connection.query('UPDATE Products SET STOCKQUANTITY = STOCKQUANTITY - ' + quantity + ' WHERE ITEMID = ' + ID);
        } else {
            console.log("Insufficient quantity!" + response[0].PRODUCTNAME);
        };
        displayall();
    });

};
displayAll();