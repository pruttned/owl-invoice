const gulp = require('gulp');
const path = require('path');
const print = require('gulp-print').default;
var del = require('del');

const distPath = path.join(__dirname, 'dist');

const paths = {
    graphqlSrc: './src/**/*.graphql',
    graphqlDest: path.join(distPath, 'app/graphql'),
    clientSrc: './client/build/**/*',
    clientDest: path.join(distPath, 'public'),
};

exports.graphqlCopy = () => {
    return gulp.src(paths.graphqlSrc)
        .pipe(print())
        .pipe(gulp.dest(paths.graphqlDest));
}

exports.clientCopy = () => {
    return gulp.src(paths.clientSrc)
        .pipe(print())
        .pipe(gulp.dest(paths.clientDest));
}

exports.clearDest = () => {
    return del(distPath);
}

exports.watch = () => {
    gulp.watch(paths.graphqlSrc, exports.graphqlCopy);
}