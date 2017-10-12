'use strict';

var gulp = require('gulp');
var fs = require("fs")
var path = require('path');


function parseAssets(values) {
    var config = {
        files: (values.files && values.files[0]) ? values.files : false,
        extensions: ((values.extensions && values.extensions[0]) ? values.extensions : ['js', 'css', 'html']).join('|'),
        tags: (values.tags && values.tags[0]) ? values.tags : false,
    }

    if (!config.files) return [''];
    var res = [],
        regex = /([^'"# \(\)\?]+\.(extList))\b/ig;
    config.files.forEach(function(file) {

        var srcString = fs.readFileSync(file, "utf8");
        var foundString = '';


        if (config.tags) {
            config.tags.forEach(function(tag) {
                var tagMatch = /<!-- start:key -->([\s\S]*?)<!-- end:key -->/gmi;
                var match = new RegExp(tagMatch.source.replace('key', tag), 'gi');
                match = new RegExp(match.source.replace('key', tag), 'gi');
                while ((result = match.exec(srcString))) {
                    foundString += result[1];
                }
            });
            srcString = foundString;
        }

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
console.log(parseAssets({ files: ['test/test.html'], tags: ['assets'] }));

module.exports = parseAssets;
