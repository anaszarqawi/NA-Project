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
  let xr = 0;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  if (f(fx, xl) * f(fx, xu) > 0) {
    return {
      error: 'No root in this range',
    };
  }

  do {
    xrOld = xr;
    xr = (xl + xu) / 2;
    // console.log({ f: f(fx, xr) * f(fx, xu) });
    if (f(fx, xr) * f(fx, xu) < 0) xl = xr;
    else xu = xr;

    ea = Math.abs((xr - xrOld) / xr) * 100;
    // console.log({ abs: ((xr - xrOld) / xr) * 100 });

    // console.log({ xl, xr, xu, ea });

    data.push({
      i: i,
      xl: round(xl, 5),
      fxl: round(f(fx, xl), 5),
      xr: round(xr, 5),
      fxr: round(f(fx, xr), 5),
      xu: round(xu, 5),
      fxu: round(f(fx, xu), 5),
      ea: i === 0 ? '-' : round(ea, 2) + '%',
    });
    i++;
  } while (conditionType === 'es' ? ea > es : i < it);

  return data;
};
