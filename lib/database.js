var fs = require('fs');
exports.getDatabaseSettings = function(callback) {
  fs.readFile('./config/database.json', function(err, content) {
    var parser = JSON.parse(content);
    callback(parser['hostname'], parser['database'], parser['port']);
  });
};