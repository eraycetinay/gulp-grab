# gulp-grab

it grabs the included files from a piped file and returns back the grabbed vinyl files to the pipe by respecting its position in sequence.

```
options;
	extensions: ['file-extension'] // default: ['js','css','html'],
	tags: ['jsfiles'] //default: undefined (searchs the entire file)

note: if you define a tag like jsfiles, please use comment tag like;
<!-- start:jsfiles -->	files... <!-- end:jsfiles -->
in this way, only files between those tags will be piped back.
also you can use multiple tags and extensions at the same time.
```

Eg;
```
var gulp=require('gulp');
var gulpGrab=require('gulp-grab');

//get all js,css and html files
gulp.src("test/*")
.pipe(gulpGrab())
.pipe(gulp.dest("./dist-all"));

//only js files between <!-- start:jsassets --> and <!-- end:jsassets --> tags.
gulp.src("test/*")
.pipe(gulpGrab({tags: ['jsassets'],extensions: ['js']}))
.pipe(gulp.dest("./dist-assets"));
```