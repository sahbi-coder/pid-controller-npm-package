class PIDController {
  constructor(
    kp = 0,
    ki = 0,
    kd = 0,
    T = 0,
    {
      minimalLimit = 0,
      maximumLimit = 0,
      minimalLimitInt = 0,
      maximumLimitInt = 0,
      tau = 0,
    } = {}
  ) {
    this.Kp = kp;
    this.Ki = ki;
    this.Kd = kd;

    this.tau = tau;
    this.setpoint = 0;
    this.minimalLimit = minimalLimit;
    this.maximumLimit = maximumLimit;

    this.minimalLimitInt = minimalLimitInt;
    this.maximumLimitInt = maximumLimitInt;

    this.T = T;

    this.integrator = 0;
    this.prevError = 0;
    this.differentiator = 0;
    this.prevMeasurement = 0;

    this.out = 0;
  }
  init() {
    this.integrator = 0;
    this.prevError = 0;
    this.differentiator = 0;
    this.prevMeasurement = 0;
    this.out = 0;
  }
  setTarget(setpoint) {
    this.setpoint = setpoint;
  }
  update(measurement) {
    let error = this.setpoint - measurement;

    let proportional = this.Kp * error;

    this.integrator += 0.5 * this.Ki * this.T * (error + this.prevError);

    if (
      typeof this.maximumLimitInt === "number" &&
      this.maximumLimitInt !== 0 &&
      this.integrator > this.maximumLimitInt
    ) {
      this.integrator = this.maximumLimitInt;
    } else if (
      typeof this.minimalLimitInt === "number" &&
      this.minimalLimitInt !== 0 &&
      this.integrator < this.minimalLimitInt
    ) {
      this.integrator = this.minimalLimitInt;
    }

    this.differentiator = this.tau
      ? -(
          2.0 * this.Kd * (measurement - this.prevMeasurement) +
          (2.0 * this.tau - this.T) * this.differentiator
        ) /
        (2.0 * this.tau + this.T)
      : (-(measurement - this.prevMeasurement) / 2) * this.T;

    this.out = proportional + this.integrator + this.differentiator;

    if (
      typeof this.maximumLimit === "number" &&
      this.maximumLimit !== 0 &&
      this.out > this.maximumLimit
    ) {
      this.out = this.maximumLimit;
    } else if (
      typeof this.minimalLimit === "number" &&
      this.minimalLimit !== 0 &&
      this.out < this.minimalLimit
    ) {
      this.out = this.minimalLimit;
    }

    this.prevError = error;
    this.prevMeasurement = measurement;

    return this.out;
  }
}

module.exports = PIDController;
