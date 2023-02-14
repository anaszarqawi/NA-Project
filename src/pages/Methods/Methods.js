import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

const f = (fx, x) => {
    return math.evaluate(fx, { x: x });
};

const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const bisection = (fx, xl, xu, es, it, conditionType) => {
    let xl_ = xl;
    let xu_ = xu;
    let xr = 0;
    let xrOld = 0;
    let ea = 0;
    let i = 0;
    let data = [];

    if (f(fx, xl_) * f(fx, xu_) > 0) {
        return {
            error: 'No root in this range',
        };
    }

    do {
        xrOld = xr;
        xr = (xl_ + xu_) / 2;
        if (f(fx, xr) * f(fx, xu_) < 0) xl_ = xr;
        else xu_ = xr;

        i++;
        ea = Math.abs((xr - xrOld) / xr) * 100;

        data.push({
            i: i,
            xl: round(xl_, 5),
            fxl: round(f(fx, xl_), 5),
            xr: round(xr, 5),
            fxr: round(f(fx, xr), 5),
            xu: round(xu_, 5),
            fxu: round(f(fx, xu_), 5),
            ea: round(ea, 2) + '%',
        });
    } while (conditionType === 'es' ? ea > es : i < it);

    return data;
};