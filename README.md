# Gulp Grab Plugin 
[![npm version](https://badge.fury.io/js/ng-latinize.svg)](https://badge.fury.io/js/ng-latinize)
[![dependency Status](https://david-dm.org/eraycetinay/ng-latinize.svg)](https://david-dm.org/eraycetinay/ng-latinize.svg)

Gulp-grab, grabs the included files from a piped file and returns back the grabbed vinyl files to the pipe by respecting its position in sequence.

## Installation
```
npm install gulp-grab
```

## Options
```
extensions: ['file-extension'] // default: ['js','css','html'],
tags: ['jsfiles'] //default: undefined (searchs the entire file)
```
note: if you define a tag like jsfiles, please use comment tag like;
```
<!-- start:jsfiles -->	files... <!-- end:jsfiles -->
```
in this way, only files between those tags will be piped back.
also you can use multiple tags and extensions at the same time.

## Examples
- Get all included JS files in index.html and move them to dist/js folder.
- Get all included CSS files in index.html and move them to dist/css folder.
- Get only included private CSS and JS files in index.html and move them to dist/private folder.

index.html
```
<html>
	<head>
		<script src="a.js"></script>
		<script src="b.js"></script>
		<link href="c.css" />
		<link href="d.css" />
		<!-- start:private -->
		<link href="e.css" />
		<script src="f.js"></script>
		<!-- end:private -->
	</head>
	<body>
	</body>
</html>
```
gulpfile.js
```
//initialize gulp and gulp-grab
var gulp=require('gulp');
var gulpGrab=require('gulp-grab');

//get js files
gulp.src("index.html")
.pipe(gulpGrab({extensions: ['js']}))
.pipe(gulp.dest("dist/js"));

//get css files
gulp.src("index.html")
.pipe(gulpGrab({extensions: ['css']}))
.pipe(gulp.dest("dist/css"));

//get private js and css files
gulp.src("index.html")
.pipe(gulpGrab({tags: ['private'], extensions: ['css']}))
.pipe(gulp.dest("dist/css"));
```
dist folder
```
js/a.js
js/b.js
js/f.js
css/c.css
css/d.css
css/e.css
private/e.css
private/f.js
```
## License
[MIT](LICENSE) license.
