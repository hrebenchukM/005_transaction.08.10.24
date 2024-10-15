var mssql = require('mssql');

var queries = require('./queries');  

module.exports = {
    displayStudents: function(req, res) {  
			var query = queries.getAllStudents(req, res)

    },
    displayGroups: function(req, res) {
        var query = queries.getAllGroups(req, res);
    },
    displayFaculties: function(req, res) {
        var query = queries.getAllFaculties(req, res);
    }
}
