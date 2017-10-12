# gulp-parse-assets

it simply grabs files from a defined file and returns back the grabbed vinyl files to the pipe by respecting its position in sequence.

```
default options;
	extensions: js,css,html,
	tags: none.
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