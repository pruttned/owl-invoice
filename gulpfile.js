const gulp = require('gulp');
const path = require('path');
const print = require('gulp-print').default;
var del = require('del');

const distPath = path.join(__dirname, 'dist');

const paths = {
    graphqlSrc: './src/**/*.graphql',
    graphqlDest: path.join(distPath, 'app/graphql'),
    contentSrc: './content/**/*',
    contentDest: path.join(distPath, 'content'),
    clientSrc: './client/build/**/*',
    clientDest: path.join(distPath, 'public'),
};

const graphqlCopy = () => {
    return gulp.src(paths.graphqlSrc)
        .pipe(print())
        .pipe(gulp.dest(paths.graphqlDest));
}

const contentCopy = () => {
    return gulp.src(paths.contentSrc)
        .pipe(print())
        .pipe(gulp.dest(paths.contentDest));
}

exports.clientCopy = () => {
    return gulp.src(paths.clientSrc)
        .pipe(print())
        .pipe(gulp.dest(paths.clientDest));
}

exports.serverCopy = gulp.parallel(contentCopy, graphqlCopy);

exports.clearDest = () => {
    return del(distPath);
}

exports.watch = () => {
    gulp.watch(paths.graphqlSrc, exports.graphqlCopy);
    gulp.watch(paths.contentSrc, exports.contentCopy);
}