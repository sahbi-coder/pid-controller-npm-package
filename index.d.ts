declare namespace Controller {

    interface Options {

        minimalLimit?: Number
        maximumLimit?: Number,
        minimalLimitInt?: Number,
        maximumLimitInt?: Number,
        tau?: Number,

    }
}


declare class Controller {

    public kp: number;
    public ki: number;
    public kd: number;
    public T: number;
    public tau: number;
    public setpoint: number;
    public minimalLimit: number;
    public maximumLimit: number;
    public minimalLimitInt: number;
    public maximumLimitInt: number;


    constructor(kp: number, ki: number, kd: number, T: number, options?: Controller.Options);

    public setTarget(target: number): void;
    public update(currentValue: number): number;
    public init(): void;
}

export = Controller;