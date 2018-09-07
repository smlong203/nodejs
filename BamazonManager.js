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

//NOTE: Full disclosure, I'm aware this code is (clearly) not complete nor properly done. I will be finishing on my own since it's past hmk deadline already. Hopefully you can at least see I'm going in the right direction. 

function inquireupdates() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose an option",
        choices: ["view low inventory", "add to inventory", "add new product"]
    }]).then(function (answers) {
        switch (answers.action) {

            case 'view low inventory':
                viewlow();
                break;

            case 'add to inventory':
                add();
                break;

            case 'add new product':
                addnew();
                break;

        }
    });
};

function viewlow() {
    inquirer.prompt([
        connection.query('SELECT * FROM products WHERE STOCKQUANTITY < 5', function (err, res) {
            if (err) throw err;
            for (i = 0; i < res.length; i++) {
                console.log('Name: ' + res[i].PRODUCTNAME);
                console.log('ItemID: ' + res[i].ITEMID);
                console.log('Quantity in Stock: ' + res[i].STOCKQUANTITY);
            }


            function addnew() {
                inquirer.prompt([
                    {
                        name: 'productname',
                        type: 'input',
                        message: "What is the name of the product you would like?"
                    },
                    {
                        name: 'deparmentname',
                        type: 'input',
                        message: "What department is this product in?"
                    },
                    {
                        name: 'price',
                        type: 'input',
                        message: "How much is this product listed for?"
                    },
                    {
                        name: 'quantity',
                        type: 'input',
                        message: "How many do you want?"
                    },
                ]).then(function (answers) {
                    var productname = answers.productname;
                    var departmentname = answers.departmentname;
                    var price = answers.price;
                    var quantity = answers.quantity;
                    addnew(productname, departmentname, price, quantity);
                });
            };

            function addnew(productname, departmentname, price, quantity) {
                connection.query('INSERT INTO Products (PRODUCTNAME,DEPARTMENTNAME,PRICE,STOCKQUANTITY) VALUES(' + productname + ',' + departmentname + ',' + price + ', + 'quantity');

        displayAll();

            };

            displayAll();



