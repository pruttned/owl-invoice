const gulp = require('gulp');
const path = require('path');
const print = require('gulp-print').default;

const distPath = './dist';

const paths = {
    graphqlSrc: './src/**/*.graphql',
    graphqlDest: path.join(distPath, 'app/graphql')
};


exports.graphqlCopy = () => {
    return gulp.src(paths.graphqlSrc)
        .pipe(print())
        .pipe(gulp.dest(paths.graphqlDest));
}

exports.watch = () => {
    gulp.watch(paths.graphqlSrc, exports.graphqlCopy);
}