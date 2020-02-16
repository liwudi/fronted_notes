/**
 * Created by mapbar_front on 2020-02-10.
 */
// const EventEmitter = require('events');
//
// let emitter = new EventEmitter();
//
// emitter.on('myEvent', () => {
//     console.log('hi 1');
// });
//
// emitter.on('myEvent', () => {
//     console.log('hi 2');
// });
//
// emitter.emit('myEvent');

// const EventEmitter = require('events');
//
// let emitter = new EventEmitter();
//
// emitter.on('myEvent', () => {
//     console.log('hi');
//     emitter.emit('myEvent');
// });
//
// emitter.emit('myEvent');


// const EventEmitter = require('events');
//
// let emitter = new EventEmitter();
//
// emitter.on('myEvent', function sth () {
//     emitter.on('myEvent', sth);
//     console.log('hi');
// });
//
// emitter.emit('myEvent');

// function test() {
//     console.log(1);
//     process.nextTick(() => test());
// }
// function test() {
//     console.log(1);
//     setTimeout(() => test(), 0);
// }

// let querystring = require('querystring');
// let obj = {a: 1, b: 3, c: [1,2,3], d: {a:1}};
// console.log(querystring.stringify(obj));



// let fs = require('fs');
// let path = require('path');
// let list = fs.readdirSync('../');
//
// for (let item of list) {
//     console.log(item);
//     let filepath = path.join('../', item);
//     let fd = fs.openSync(filepath, 'r');
//     let flag = fs.fstatSync(fd).isDirectory();
//     console.log(flag);
// }

// const glob = require("glob");
//
// glob("./", (err, files) => {
//     if (err) {
//         throw new Error(err);
//     }
//     files.map((filename) => {
//         console.log('Here you are:', filename);
//     });
// });
