# pid-controller-npm-package

Simple Node.js PID controller.

## Installion

```bash
 npm i @sahbi-kardi/pid-controller
```

## usage

```javascript
const controller = require("@sahbi-kardi/pid-controller");

// pid controll constants

let kp = 2.0;
let ki = 0.5;
let kd = 0.25;

// sampleTime in seconds

let sampleTime = 0.01;

//setpoint

let setpoint = 1.0;

// options

const options = {
  limMin: -10.0,
  limMax: 10.0,
  limMinInt: -5.0,
  limMaxInt: 5.0,
  tau: 0.02,
};

// tau is the low pass filter time contant
// limMin and limMax are the min and max values of the controller output
// limMinInt and limMaxInt are the min and max values of the integral term

const controller = new PIDController(kp, ki, kd, sampleTime, options);

// to set the setpoint

controller.setTarget(setpoint);

let isDone = false;

while (!isDone) {
  const value = getOutputValue(controller.out);
  controller.update(value);
  isDone = Math.abs(value - setpoint) <= Number.EPSILON ? true : false; // remove this line for continuous control
}
```
