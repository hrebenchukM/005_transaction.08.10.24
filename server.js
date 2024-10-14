var express = require('express');
var mssql = require('mssql');

var app = express();
var port = 8080;

// параметры соединения с бд
var config = {
	user: 'admin',           // пользователь базы данных
	password: '12345',          // пароль пользователя 
	server: 'LENOVO\\SQLEXPRESS',       // хост
	database: 'Library',          // имя бд
	port: 1433,             // порт, на котором запущен sql server
	  options: {
		  encrypt: true,  // Использование SSL/TLS
		  trustServerCertificate: true // Отключение проверки самоподписанного сертификата
	  },
 }
// var connection = new mssql.ConnectionPool(config);

// app.get('/', function (req, res) {
// 	connection.connect(function (err) {
// 		// транзакция - безопасная операция над бд с возможностью отката изменений в случае ошибки при выполнении запроса  
// 		var transaction = new mssql.Transaction(connection);

// 		transaction.begin(function (err) {
// 			var request = new mssql.Request(transaction);
// 			request.query("INSERT INTO Groups (Name, Id_Faculty,Counts) VALUES ('KN-P-221',3, 13)", function (err, data) {

// 				if (err) {
// 					console.log(err);
// 					transaction.rollback(function (err) {
// 						console.log('rollback successful');
// 						res.send('transaction rollback successful');
// 					});
// 				} 
// 				else {
// 					transaction.commit(function (err, data) {
// 							console.log('data commit success');
// 							res.send('transaction successful');
// 					});
// 				};
// 			});
// 		});
// 	});
// });

app.get('/Faculties',function(req, res) { 

	var connection = new mssql.ConnectionPool(config);

	connection.connect(function (err) {
		// Для выполнения запросов к бд используется метод request.query(command, callback(err, data))
		// метод query принимает такие аргументы: 

		// command - выражение t-sql 
		// callback - функция с параметрами err(ошибка) и data(результат запроса к бд) 
		var request = new mssql.Request(connection);
		request.query(`
    SELECT 
        Faculties.Id, 
        Faculties.Name
    FROM 
        Faculties 
		 `, function (err, data) {
			if (err) console.log(err);
			else {
				var allItems = data.recordset;

				var html = ` 
			<table border="1">
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
			`;
			
				for (let i = 0; i < allItems.length; i++) {
					html += `
		 <tr>
            <td>${allItems[i].Id}</td>
            <td>${allItems[i].Name}</td>
        </tr>`
				}
				res.send(html);
				// завершить соединение 
				connection.close();
			}
		});
	});
});


app.get('/Students',function(req, res) { 

	var connection = new mssql.ConnectionPool(config);

	connection.connect(function (err) {
		// Для выполнения запросов к бд используется метод request.query(command, callback(err, data))
		// метод query принимает такие аргументы: 

		// command - выражение t-sql 
		// callback - функция с параметрами err(ошибка) и data(результат запроса к бд) 
		var request = new mssql.Request(connection);
		request.query(`
			SELECT 
				Students.Id, 
				Students.FirstName, 
				Students.LastName, 
				Groups.Name AS GroupName,  
				Students.Term
			FROM 
				Students 
			 JOIN 
				Groups ON Students.Id_Group = Groups.Id 
		`, function (err, data) {
		
			if (err) console.log(err);
			else {
				var allItems = data.recordset;

				var html = ` 
			<table border="1">
            <tr>
                <th>Id</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Groups Name</th>
                <th>Term</th>
            </tr>
			`;
			
				for (let i = 0; i < allItems.length; i++) {
					html += `
		 <tr>
            <td>${allItems[i].Id}</td>
            <td>${allItems[i].FirstName}</td>
            <td>${allItems[i].LastName}</td>
            <td>${allItems[i].GroupName}</td>
            <td>${allItems[i].Term}</td>
        </tr>`
				}
				res.send(html);
				// завершить соединение 
				connection.close();
			}
		});
	});
});


app.get('/Groups',function(req, res) { 

	var connection = new mssql.ConnectionPool(config);

	connection.connect(function (err) {
		// Для выполнения запросов к бд используется метод request.query(command, callback(err, data))
		// метод query принимает такие аргументы: 

		// command - выражение t-sql 
		// callback - функция с параметрами err(ошибка) и data(результат запроса к бд) 
		var request = new mssql.Request(connection);
		request.query(`
			SELECT 
				Groups.Id, 
				Groups.Name, 
				Faculties.Name AS FacultyName
			FROM 
				Groups 
			 JOIN 
				Faculties ON Groups.Id_Faculty = Faculties.Id 
		`, function (err, data) {
		
			if (err) console.log(err);
			else {
				var allItems = data.recordset;

				var html = ` 
			<table border="1">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Faculty Name</th>
            </tr>
			`;
			
				for (let i = 0; i < allItems.length; i++) {
					html += `
		 <tr>
            <td>${allItems[i].Id}</td>
            <td>${allItems[i].Name}</td>
            <td>${allItems[i].FacultyName}</td>
        </tr>`
				}
				res.send(html);
				// завершить соединение 
				connection.close();
			}
		});
	});
});







// демонстрация отката изменений в случае ошибки при выполнении запроса к бд 

// app.get('/error', function (req, res) {
// 	var transaction = new mssql.Transaction(connection);

// 	transaction.begin(function (err) {
// 		var request = new mssql.Request(transaction);
// 		request.query("bad sql", function (err, data) {
// 			if (err) {
// 				console.log(err);
// 				transaction.rollback(function (err) {

// 					if (err) {
// 						console.log('rollback error');
// 					}
// 					else {
// 						console.log('rollback successful');
// 						res.send('transaction rollback successful');
// 					}
// 				});
// 			} else {
// 				transaction.commit(function (err, data) {
// 					if (err) {
// 						console.log('could not commit data');
// 					}
// 					else {
// 						console.log('data commit success');
// 						res.send('transaction successful');
// 					};
// 				});
// 			};
// 		});
// 	});
// });

app.listen(port, function () {

	console.log('app listening on port ' + port);

}); 
