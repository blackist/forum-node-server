'use strict';

const fs = require('fs');

function addRouter(router, dir) {
    var files = fs.readdirSync(__dirname + "/" + dir);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for(var f of js_files) {
        console.log('controller ' + "/" + dir + "/" + f);
        let mapping = require(__dirname + "/" + dir + "/" + f);
        console.log(mapping);
        addMapping(router, mapping);
    }
}

function addMapping(router, mapping) {
    for(var url in mapping) {
        if(url.startsWith('GET')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log('register GET ' + path);
        } else if(url.startsWith('POST')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log('register POST ' + path);
        } else if(url.startsWith('PUT')) {
            var path = url.substring(4);
            router.post(path, mapping[url]);
            console.log('register PUT ' + path);
        } else if(url.startsWith('DELETE')) {
            var path = url.substring(7);
            router.post(path, mapping[url]);
            console.log('register DELETE ' + path);
        }
    }
}

module.exports = function(dir) {
    let 
    controller_dir = dir || 'controller',
    router = require('koa-router')();

    addRouter(router, controller_dir);

    return router.routes();
}