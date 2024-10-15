var mssql = require('mssql'); 

var path = require('path'); 

var queries = require('./queries');

module.exports = {
    loadAddPage: function(req, res) {
        res.render(path.join(__dirname, '../pages/add_item_page')); 
    }, 
    addRow: function (req, res) { 
	
        // подключение к бд 
        console.log(req.body);
			var query = queries.insertStudent(req.body, req, res);  
	
    },
    loadAddPageGroups: function(req, res) {
        res.render(path.join(__dirname, '../pages/add_group_page'));
    },
    addRowGroups: function(req, res) {
        console.log(req.body);
        var query = queries.insertGroup(req.body, req, res);
    },

    loadAddPageFaculties: function(req, res) {
        res.render(path.join(__dirname, '../pages/add_faculty_page'));
    },
    addRowFaculties: function(req, res) {
        console.log(req.body);
        var query = queries.insertFaculty(req.body, req, res);
    }
}
