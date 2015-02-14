var self = require('sdk/self');
var FileSaver = require('./filesaver/');

var fs = new FileSaver({title: 'Save a File',
                        fileExtension: '.txt'});
console.log(fs.save('This is EPIC'));
