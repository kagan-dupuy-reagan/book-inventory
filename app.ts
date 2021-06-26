var mysql = require('mysql');
interface Book {
    id: number,
    title: string,
    authors: string,
    isbn: number,
    page_length: number,
    year_of_publication: number;
  };
var con = mysql.createConnection({
    host: "db-book-inventory.coodnbz5qeqa.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "book_inventory"
  });
console.log(con);
con.connect(function(err: any) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "select * from books;";
    con.query(sql, function (err: any, result: Array<Book>) {
        if (err) throw err;
        result.forEach(book => {
            console.log("Result: " + JSON.stringify(book));
        });
      });
});
