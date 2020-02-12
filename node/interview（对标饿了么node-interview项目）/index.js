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
function test() {
    console.log(1);
    setTimeout(() => test(), 0);
}
