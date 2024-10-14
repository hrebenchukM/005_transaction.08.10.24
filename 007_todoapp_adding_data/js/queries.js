var mssql = require('mssql');
var displayHandler = require('./displayhandler');  

var connection = require('./config'); 

module.exports = {

    tableRows: ``,
    // выбор всех элементов и отображение в виде таблицы 
    getAllStudents: function (req, res) {
		
        var self = this; 		
		self.tableRows = ``; 

			var request = new mssql.Request(connection);  
			request.stream = true; 
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
		`); 
			
			request.on('row', function(row){ 
	
				self.tableRows += ` <tr>
				            <td>${row.Id}</td>
							<td>${row.FirstName} </td>
							<td>${row.LastName}</td>
							<td>${row.GroupName}</td>
                            <td>${row.Term}</td>
						</tr>` 
			}); 
			
			request.on('done', function(affected) { 
				console.log('show_students'); 
				res.render('index', { data:  self.tableRows }); 
			})		

    }, 
	// добавить элемент в бд
	insertStudent: function (data, req, res) {


					var inserts = {
						
						FirstName: data.FirstName, 
						LastName: data.LastName, 
						Id_Group: parseInt(data.Id_Group,10), 
						Term:   parseInt(  data.Term,10)
					}
				
				   var ps = new mssql.PreparedStatement(connection);  
				   
				   ps.input('FirstName', mssql.NVarChar(50)); 
				   ps.input('LastName', mssql.NVarChar(50)); 
				   ps.input('Id_Group', mssql.Int); 
				   ps.input('Term', mssql.Int); 
				   
				   ps.prepare("INSERT INTO Students (FirstName,LastName,Id_Group,Term) VALUES (@FirstName,@LastName,@Id_Group,@Term)", function(err) { 
						if (err) console.log(err); 
					    var request = ps.execute(inserts, function(err) { 
						
							if (err) console.log(err); 
							console.log('add student'); 
							ps.unprepare(); 

						}); 
				
				
				})
	},

    // выбор всех элементов и отображение в виде таблицы 
    getAllGroups: function (req, res) {
		
        var self = this; 		
		self.tableRows = ``; 

			var request = new mssql.Request(connection);  
			request.stream = true; 
			request.query(`
			  SELECT 
                Groups.Id, 
                Groups.Name AS GroupName,
                Faculties.Name AS FacultyName
            FROM 
                Groups
            JOIN 
                Faculties ON Groups.Id_Faculty = Faculties.Id
        	`); 
			
			request.on('row', function(row){ 
	
				self.tableRows += ` <tr>
				            <td>${row.Id}</td>
							<td>${row.GroupName} </td>
							<td>${row.FacultyName}</td>
						</tr>` 
			}); 
			
			request.on('done', function(affected) { 
				console.log('show_groups'); 
				res.render('group_index', { data:  self.tableRows }); 
			})		

    }, 
	// добавить элемент в бд
	insertGroup: function (data, req, res) {


					var inserts = {
						
						Name: data.Name, 
						Id_Faculty: parseInt(data.Id_Faculty,10), 
						}
				
				   var ps = new mssql.PreparedStatement(connection);  
				   
				   ps.input('Name', mssql.NVarChar(50)); 
				   ps.input('Id_Faculty', mssql.Int); 
				 
				   ps.prepare("INSERT INTO Groups (Name,Id_Faculty) VALUES (@Name,@Id_Faculty)", function(err) { 
						if (err) console.log(err); 
					    var request = ps.execute(inserts, function(err) { 
						
							if (err) console.log(err); 
							console.log('add group'); 
							ps.unprepare(); 

						}); 
				
				
				})
	}

}


