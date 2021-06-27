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
var http = require('http');

const pathTemplate = '/api/books?bibkeys=ISBN:{isbn-placeholder}&jscmd=details&format=json';
const options = {
  host: 'www.openlibrary.org',
  path: ''
};
con.connect(function(err: Error) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "select * from books;";
    con.query(sql, function (err: any, result: Array<Book>) {
        if (err) throw err;
        result.forEach(async book => {
            //console.log("Result: " + JSON.stringify(book));
            var path = pathTemplate.replace('{isbn-placeholder}',book.isbn.toString());
            options.path = path;
            console.log(options.host + options.path);
            var callback = function(response: any) {
              response.on('data', function (chunk: string) {
                console.log('BODY: ' + chunk);
              });
            };
            http.request(options, callback).end();
        });
      });
    con.end();
});