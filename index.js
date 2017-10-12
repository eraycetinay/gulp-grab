'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var fs = require("fs")
var path = require('path');
var through = require('through2');

module.exports = function(values) {
    var config = {
        extensions: ['js', 'css', 'html'].join('|'),
        tags: false
    }

    if(values && values.extensions && values.extensions[0]){
        config.extensions = values.extensions.join('|');
    }
    if(values && values.tags && values.tags[0]){
        config.tags = values.tags;
    }

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return cb();
        } else if (file.isStream()) {
            cb();
        } else if (file.isBuffer()) {
            var res = [],
                regex = /([^'"# \(\)\?]+\.(extList))\b/ig;
            var srcString = file.contents,foundString,result;
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
            while ((result = match.exec(srcString))) {
                if (!path.isAbsolute(result[1])) {
                    result[1] = path.join(file.base, result[1]);
                }
                if (fs.existsSync(result[1])) {   
                    var asset = new util.File({
                        path: result[1],
                        base: path.parse(result[1]).dir,
                        contents: fs.readFileSync(result[1])
                    });
                    this.push(asset);
                }
            }
            cb();
        }
    });
}