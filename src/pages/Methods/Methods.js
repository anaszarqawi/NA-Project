import { create, all, fix } from 'mathjs';
// import nerdamer
import nerdamer from 'nerdamer/nerdamer.core.js';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

const config = {};
const math = create(all, config);

const f = (fx, x) => {
  return math.evaluate(fx, { x: x });
};

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const bisection = (fx, xl, xu, es, it, conditionType) => {
  console.log('Bisection');
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
    console.log({ xl: xl, xu: xu, fxl: f(fx, xl), fxu: f(fx, xu) });

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

export const falsePosition = (fx, xl, xu, es, it, conditionType) => {
  console.log('falsePosition');
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
    const fxl = f(fx, xl);
    const fxu = f(fx, xu);

    const xr1 = (fxu * (xl - xu)) / fxl - fxu;

    xr = xu - (fxu * (xl - xu)) / (fxl - fxu);

    if (f(fx, xr) * f(fx, xl) < 0) xu = xr;
    else xl = xr;

    ea = Math.abs((xr - xrOld) / xr) * 100;

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

export const simpleFixedPoint = (fx, xo, es, it, conditionType) => {
  console.log('SimpleFixedPoint');
  let xr = xo;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  // let fxi = fx.replace(/x\^2/g, 'y^2');
  // fxi = fxi.replace(/x\)\^2/g, 'y)^2');

  let fxi = fx + ' = 0';

  // const fxi2 = nerdamer(fxi);
  let sfp = nerdamer.solve(fxi, 'x');
  // sfp = nerdamer(`simplify(${sfp})`).toString();

  console.log({ fxi, sfp });

  do {
    console.log({ xo: xr });
    if (i !== 0) {
      xrOld = xr;
      xr = f(sfp, xrOld);
    }

    if (xr !== 0) ea = Math.abs((xr - xrOld) / xr) * 100;

    data.push({
      i: i,
      xi: round(xr, 5),
      fxi: round(f(fx, xr), 5),
      ea: i === 0 ? '-' : round(ea, 2) + '%',
    });
    i++;
  } while (conditionType === 'es' ? ea > es : i < it);

  return data;
};

export const newton = (fx, xo, es, it, conditionType) => {
  console.log('newton');
  let xr = xo;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  // Remove x from fx

  const NewFx = fx.replace(/\(|\)/g, '');
  console.log({ NewFx });

  const dfx = math.derivative(NewFx, 'x').toString();

  do {
    // console.log({ fx, dfx, xr, xrOld, ea, i });
    console.log({ xr, fx, fxS: f(fx, xr), dfx, dfxS: f(dfx, xr) });

    if (i !== 0) {
      xrOld = xr;
      xr = xrOld - f(fx, xrOld) / f(dfx, xrOld);
    }

    if (xr !== 0) ea = Math.abs((xr - xrOld) / xr) * 100;

    data.push({
      i: i,
      xi: round(xr, 5),
      fxi: round(f(fx, xr), 5),
      dfxi: round(f(dfx, xr), 5),
      ea: i === 0 ? '-' : round(ea, 2) + '%',
    });
    i++;
  } while (conditionType === 'es' ? ea > es : i < it);

  return data;
};
