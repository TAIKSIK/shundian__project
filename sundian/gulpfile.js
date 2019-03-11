const gulp = require("gulp");

gulp.task("copyCss",()=>{
    gulp .src("./css/*.*").pipe(gulp.dest("./distCss"))
})