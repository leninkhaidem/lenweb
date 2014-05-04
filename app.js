/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');
var jsdom = require("jsdom");
var jquery = fs.readFileSync("./bower_components/jquery/dist/jquery.js", "utf-8");
/*var output = {
    length: 0,
    url: {}
};*/
var output = [];


var app = express();

// all environments
app.set('port', process.env.PORT || 443);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('maskofzorrod'));
app.use(express.session());
app.use(app.router);
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    if (req.cookies.search) {
        res.clearCookie('search');
    }
    res.render('pic');
});
app.post('/search', function(req, res) {
    var string = req.body.search;
    console.dir(req.cookies);
    console.log('got a request! current search string is ' + string + ' cached string is ' + req.cookies);
    if (!req.cookies.search || (req.cookies.search != string)) {
        console.log('not search ' + string + ' before');
        var link = "http://www.imagesbazaar.com/advancesearchresult.aspx?id=" + string + "%20&idtot=" + string + "&exec=True&nonexec=True";
        jsdom.env({
            url: link,
            src: [jquery],
            done: function(errors, window) {
                if (errors) {
                    console.log("error occured while trying to download");
                    res.json([]);
                } else {
                    var count = 0;
                    output = [];
                    /*output = {
                        length: 0,
                        url: {}
                    };*/
                    var $ = window.$;
                    res.cookie('search', string);
                    $("img").each(function() {
                        if ($(this).attr('src').match(/http.*\.jpg/)) {
                            count++;
                            output.push($(this).attr('src'));
                            /*output.url[count] = $(this).attr('src');*/
                        }
                    });

                    if (output.length == 0) {
                        res.json([]);
                    } else if (output.length > 0 && output.length <= 10) {
                        res.json(output);
                        output = [];
                    } else {
                        var temp = [];
                        for (var i = 0; i < 10; i++) {
                            temp.push(output.pop());
                        };
                        console.log(temp);
                        res.json(temp);
                    }
                }
            }
        });
    } else {
        if (output.length == 0) {
            res.json([]);
        } else if (output.length > 0 && output.length <= 10) {
            res.json(output);
            output = [];
        } else {
            var temp = [];
            for (var i = 0; i < 10; i++) {
                temp.push(output.pop());
            };
            res.json(temp);
        }
    }

});

/*
var key = fs.readFileSync('server.key').toString();
var cert = fs.readFileSync('server.crt').toString();
https.createServer({
    cert: cert,
    key: key
}, app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});*/
http.createServer(app).listen(80, function() {
    console.log('Express server listening on port 80');
});
