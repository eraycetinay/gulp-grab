var gulp = require('gulp');
var fs = require("fs")
var path = require('path');


function parseAssets(values) {

	//split('<!-- build:bundleJs -->')[1]).split('<!-- endbuild -->')[0]

    var config = {
        files: (values.files && values.files[0]) ? values.files : false,
        extensions: ((values.extensions && values.extensions[0]) ? values.extensions : ['js', 'css', 'html']).join('|'),
        tags: (values.tags && values.tags[0]) ? values.tags : '',
    }

    if (!config.files) return ['']; 
    var res = [], regex = /([^'"# \(\)\?]+\.(extList))\b/ig;
    config.files.forEach(function(file) {

        var srcString = fs.readFileSync(file, "utf8"); 
        var match = new RegExp(regex.source.replace('extList', config.extensions), 'ig');

        var result;
        while ((result = match.exec(srcString))) {
            if (!path.isAbsolute(result[1])) {
                result[1] = path.join(process.cwd(), result[1]);
            }
            res.push(result[1]);
        }


    });

    return res;
}


console.log(parseAssets({files:['test.html','b.js'], extensions:['js']}));