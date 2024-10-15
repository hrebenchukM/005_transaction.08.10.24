var express  = require('express'); 
var app = express();
var port = 8080; 
var path = require('path');
var bodyParser = require('body-parser'); 





// подключение модулей для обработки запросов 
var displayHandler = require('./js/displayhandler'); 
var insertHandler = require('./js/inserthandler'); 

// установка генератора шаблонов 
app.set('views', __dirname + '/pages'); 
app.set('view engine', 'ejs');

// подгрузка статических файлов из папки pages 
app.use(express.static(path.join(__dirname, 'pages')));

// middleware для обработки данных в формате JSON 
app.use(bodyParser.json()); 
app.use(bodyParser.text());



app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
}); 

// загрузить таблица с элементами 
app.get('/Students', displayHandler.displayStudents);
// загрузка страницы для создания нового элемента 
app.get('/Students/Add', insertHandler.loadAddPage); 
// добавить новый элемент 
app.post('/Students/Add/newStudent', insertHandler.addRow); 


// загрузить таблицу с группами
app.get('/Groups', displayHandler.displayGroups);
// загрузка страницы для создания новой группы
app.get('/Groups/Add', insertHandler.loadAddPageGroups); 
// добавить новую группу
app.post('/Groups/Add/newGroup', insertHandler.addRowGroups); 



// загрузить таблицу с факультетами
app.get('/Faculties', displayHandler.displayFaculties);
// загрузка страницы для создания нового факультета
app.get('/Faculties/Add', insertHandler.loadAddPageFaculties); 
// добавить новій факультет
app.post('/Faculties/Add/newFaculty', insertHandler.addRowFaculties); 










// обработка ошибок 
app.use(function(err, req, res, next) {
	if (err) console.log(err.stack); 

	res.status(500).send('oops...something went wrong'); 
}); 


	app.listen(port, function() { 

	console.log('app listening on port ' + port); 

});  


