var express = require('express');
var path = require('path');
var fs = require('fs');

module.exports = function(app, prefix) {
    var router = express();

    router.locals.terminal_tab = process.env.TERMINAL_TAB;

    router.locals.console_url = process.env.CONSOLE_URL;
    router.locals.restart_url = process.env.RESTART_URL;

    var workshop_dir = process.env.WORKSHOP_DIR || '/opt/app-root/src/workshop';

    var slides_dir = process.env.SLIDES_DIR;

    router.locals.with_slides = false;

    if (slides_dir) {
        if (fs.existsSync(slides_dir + '/index.html')) {
            router.locals.with_slides = true;
        }
        else {
            slides_dir = undefined;
        }
    }

    if (!slides_dir) {
        if (fs.existsSync(workshop_dir + '/slides/index.html')) {
            router.locals.with_slides = true;
        }
        else if (fs.existsSync('/opt/app-root/workshop/slides/index.html')) {
            router.locals.with_slides = true;
        }
    }

    router.set('views', path.join(__dirname, '..', 'views'));
    router.set('view engine', 'pug');

    router.use(function (req, res) {
        res.render('dashboard');
    });

    return router;
}
