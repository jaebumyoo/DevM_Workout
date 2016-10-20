import template from "./stopwatch.html"

export default {
  bindings:{
    timeLimit "=setTimer"
  },
  template,
  controller(){
    console.log(this.timeLimit);
    this.stopwatch = new Stopwatch(
      document.querySelector('.stopwatch'),
      this.timeLimit
    );
  }
}

class Stopwatch {
constructor(display, limit) {
    this.running = false;
    this.display = display;
    this.laps = [];
    this.reset();
    this.print(this.times);
    this.limit = limit;
}

start() {
    console.log( this.limit );
    if (!this.time) this.time = performance.now();
    if (!this.running) {
        this.running = true;
        requestAnimationFrame(this.step.bind(this));
    }
}

stop() {
    this.running = false;
    this.time = null;
}

reset() {
    this.running = false;
    this.times = [ 0, 0, 0 ];
    this.time = null;
    this.print();
}

step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
}

calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 100) {
        this.times[1] += 1;
        this.times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
        this.times[0] += 1;
        this.times[1] -= 60;
    }
}

print() {
    this.display.innerText = this.format(this.times);
}

format(times) {
    return `${pad0(times[0], 2)}:${pad0(times[1], 2)}:${pad0(Math.floor(times[2]), 2)}`;
}
}

function pad0(value, count) {
var result = value.toString();
for (; result.length < count; --count)
    result = '0' + result;
return result;
}
