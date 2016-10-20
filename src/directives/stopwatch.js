import stopwatchHtml from "./stopwatch.html";

function stopWatch() {
  return {
    restrict: "E",
    template: stopwatchHtml,
    scope: {
      setTimer: '=setTimer'
    },
		controller: function ( $scope, mainSvc ) {
      $scope.stopwatch = new Stopwatch(
        document.querySelector('.stopwatch')
      );

      $scope.$watch( 'setTimer', setTimer => {
        console.log( setTimer.duration, setTimer.restPeriod );
        $scope.stopwatch.timeLimit = setTimer.duration;
        setTimer.duration = -1;
      } );

      $scope.stopwatch.complete = () => {
        if ( $scope.setTimer.restPeriod < 0 ) {
          $scope.stopwatch.reset();
          mainSvc.setCompleted( "Set is completed!" );
        }
        else {
          $scope.stopwatch.reset();
          $scope.stopwatch.timeLimit = $scope.setTimer.restPeriod;
          $scope.setTimer.restPeriod = -1;
          mainSvc.exerciseCompleted( "Exercise is completed!" );
        }
      };
		}
	};
}

class Stopwatch {
  constructor(display) {
      this.running = false;
      this.display = display;
      this.laps = [];
      this.reset();
      this.print(this.times);
  }

  start() {
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

      if ( this.times[ 0 ] === Math.floor( this.timeLimit ) && this.times[ 1 ] === ( this.timeLimit % 1 ) * 60 ) {
        this.stop();
        this.times[ 2 ] = 0;
        this.times[ 1 ] = ( this.timeLimit % 1 ) * 60;
        this.times[ 0 ] = Math.floor( this.timeLimit );
        this.print();
      }
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

export default stopWatch;
