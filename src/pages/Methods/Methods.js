import { create, all, fix } from 'mathjs';
// import nerdamer
import nerdamer from 'nerdamer/nerdamer.core.js';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

import algebra from 'algebra.js';
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

const config = {};
const math = create(all, config);

const f = (fx, x) => {
  return math.evaluate(fx, { x: x });
};

const round = (value, decimals) => {
  // TODO: Fix Rounding
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const bisection = (fx, xl, xu, es, it, conditionType) => {
  console.clear();
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
  console.clear();
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

export const simpleFixedPoint = (sfp, xo, es, it, conditionType) => {
  console.clear();
  console.log('SimpleFixedPoint');
  let xr = xo;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  const getSfp = (fx) => {
    const xs = fx.match(/x\^\d|x/g);
    let maxPower = 1;
    xs.map((x) => {
      const power = +x.match(/\d/g);
      if (power !== null) {
        maxPower = power > maxPower ? power : maxPower;
      }
    });
    const fxNew = fx.replace(`x^${maxPower}`, `y^${maxPower}`);
    const expr1 = algebra.parse(fxNew);
    var eq = new Equation(expr1, 0);
    var yAnswer = eq.solveFor('y');

    console.log({ eq: eq, yAnswer: yAnswer });
    // return nerdamer(fx).solveFor('x').toString();
    return yAnswer.toString();
  };

  // const sfp = getSfp(fx);
  // console.log({ sfp: sfp });

  do {
    if (i !== 0) {
      xrOld = xr;
      xr = f(sfp, xrOld);
    }

    if (xr !== 0) ea = Math.abs((xr - xrOld) / xr) * 100;

    data.push({
      i: i,
      xi: round(xr, 5),
      fxi: round(f(sfp, xr), 5),
      ea: i === 0 ? '-' : round(ea, 2) + '%',
    });
    i++;
  } while (conditionType === 'es' ? ea > es : i < it);

  return data;
};

export const newton = (fx, x0, es, it, conditionType) => {
  console.clear();
  console.log('newton');
  let x0Old = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  const NewFx = fx.replace(/\(|\)/g, '');
  console.log({ NewFx });

  const dfx = math.derivative(NewFx, 'x').toString();

  do {
    // console.log({ fx, dfx, x0, x0Old, ea, i });
    if (i !== 0) {
      x0Old = x0;
      x0 = x0Old - f(fx, x0Old) / f(dfx, x0Old);
    }

    if (x0 !== 0) ea = Math.abs((x0 - x0Old) / x0) * 100;

    console.log(i, x0, round(f(fx, x0), 5), f(dfx, x0), ea);

    data.push({
      i: i,
      xi: round(x0, 5),
      fxi: round(f(fx, x0), 5),
      dfxi: round(f(dfx, x0), 5),
      ea: i === 0 ? '-' : round(ea, 3) + '%',
    });
    i++;
  } while (conditionType === 'es' ? ea > es : i < it + 1);

  console.table(data);
  return data;
};

export const secant = (fx, xa, xb, es, it, conditionType) => {
  console.clear();
  console.log('Secant');
  let xr = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  do {
    if (i !== 0) {
      console.log({ i, xa, xb, ea });

      const fxa = f(fx, xb);
      const fxb = f(fx, xa);
      xr = xb - (fxa * (xa - xb)) / (fxb - fxa);
      console.log(`${xb} - (${fxb} * (${xa} - ${xb})) / (${fxb} - ${fxa})`);

      xa = xb;
      xb = xr;
    }

    ea = Math.abs((xb - xa) / xb) * 100;

    data.push({
      i: i,
      xa: round(xa, 5),
      fxa: round(f(fx, xa), 5),
      xb: round(xb, 5),
      fxb: round(f(fx, xb), 5),
      ea: i === 0 ? '-' : round(ea, 3) + '%',
    });
    i++;
  } while (conditionType === 'es' ? ea > es : i < it);

  return data;
};

export const gaussElimination = (matrix) => {
  const [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  const [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  const [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const m21 = x1_2 / x1_1;
  const m31 = x1_3 / x1_1;

  const matrix_2 = [
    [x1_1, x2_1, x3_1, sol_1],
    [x1_2 - m21 * x1_1, x2_2 - m21 * x2_1, x3_2 - m21 * x3_1, sol_2 - m21 * sol_1],
    [x1_3 - m31 * x1_1, x2_3 - m31 * x2_1, x3_3 - m31 * x3_1, sol_3 - m31 * sol_1],
  ];

  const m32 = matrix_2[2][1] / matrix_2[1][1];

  const matrix_3 = [
    [x1_1, x2_1, x3_1, sol_1],
    [matrix_2[1][0], matrix_2[1][1], matrix_2[1][2], matrix_2[1][3]],
    [
      matrix_2[2][0] - m32 * matrix_2[1][0],
      matrix_2[2][1] - m32 * matrix_2[1][1],
      matrix_2[2][2] - m32 * matrix_2[1][2],
      matrix_2[2][3] - m32 * matrix_2[1][3],
    ],
  ];

  const x3 = matrix_3[2][3] / matrix_3[2][2];
  const x2 = (matrix_3[1][3] - matrix_3[1][2] * x3) / matrix_3[1][1];
  const x1 = (matrix_3[0][3] - matrix_3[0][2] * x3 - matrix_3[0][1] * x2) / matrix_3[0][0];

  console.log({ x1, x2, x3 });

  const steps = [
    {
      matrix_1: matrix,
      m21: {
        equation: `${x1_2} / ${x1_1} = ${m21}`,
      },
      m31: {
        equation: `${x1_3} / ${x1_1} = ${m31}`,
      },
      R2: {
        steps: [
          `${x1_2} - ${m21} * ${x1_1} = ${matrix_2[1][0]}`,
          `${x2_2} - ${m21} * ${x2_1} = ${matrix_2[1][1]}`,
          `${x3_2} - ${m21} * ${x3_1} = ${matrix_2[1][2]}`,
          `${sol_2} - ${m21} * ${sol_1} = ${matrix_2[1][3]}`,
        ],
      },
      R3: {
        steps: [
          `${x1_3} - ${m31} * ${x1_1} = ${matrix_2[2][0]}`,
          `${x2_3} - ${m31} * ${x2_1} = ${matrix_2[2][1]}`,
          `${x3_3} - ${m31} * ${x3_1} = ${matrix_2[2][2]}`,
          `${sol_3} - ${m31} * ${sol_1} = ${matrix_2[2][3]}`,
        ],
      },
    },
    {
      matrix_2,
      m32: {
        equation: `${matrix_2[2][1]} / ${matrix_2[1][1]} = ${m32}`,
      },
      R3: {
        steps: [
          `${matrix_2[2][0]} - ${m32} * ${matrix_2[1][0]} = ${matrix_3[2][0]}`,
          `${matrix_2[2][1]} - ${m32} * ${matrix_2[1][1]} = ${matrix_3[2][1]}`,
          `${matrix_2[2][2]} - ${m32} * ${matrix_2[1][2]} = ${matrix_3[2][2]}`,
          `${matrix_2[2][3]} - ${m32} * ${matrix_2[1][3]} = ${matrix_3[2][3]}`,
        ],
      },
    },
    {
      matrix_3,
      xsValues: [
        { name: 'x', sub: 1, value: x1 },
        { name: 'x', sub: 2, value: x2 },
        { name: 'x', sub: 3, value: x3 },
      ],
    },
  ];

  return steps;
};
