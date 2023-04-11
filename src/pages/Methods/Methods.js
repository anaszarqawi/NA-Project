import { create, all, fix } from 'mathjs';
import nerdamer from 'nerdamer/nerdamer.core.js';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

import algebra from 'algebra.js';
var Equation = algebra.Equation;

const config = {};
const math = create(all, config);

const f = (fx, x) => {
  return math.evaluate(fx, { x: x });
};

export const bisection = ({ ...values }) => {
  console.clear();

  console.log('Bisection');
  let xu = +values.xu;
  let xl = +values.xl;

  console.log({ xl: xl, xu: xu, fxl: f(values.fx, xl), fxu: f(values.fx, xu) });

  let xr = 0;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  if (f(values.fx, xl) * f(values.fx, xu) > 0) {
    return {
      error: 'No root in this range',
    };
  }

  do {
    xrOld = xr;
    xr = (xl + xu) / 2;

    if (f(values.fx, xr) * f(values.fx, xu) < 0) xl = xr;
    else xu = xr;

    ea = Math.abs((xr - xrOld) / xr) * 100;

    // data push without round
    data.push({
      i: i,
      xl: xl,
      fxl: f(values.fx, xl),
      xr: xr,
      fxr: f(values.fx, xr),
      xu: xu,
      fxu: f(values.fx, xu),
      ea: ea,
    });

    i++;
  } while (values.conditionType === 'es' ? ea > values.es : i < values.it);

  if (data.length === 0) {
    return {
      error: 'No root in this range',
    };
  }
  return data;
};

export const falsePosition = ({ ...values }) => {
  console.clear();
  console.log('falsePosition');
  let xr = 0;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  if (f(values.fx, values.xl) * f(values.fx, values.xu) > 0) {
    return {
      error: 'No root in this range',
    };
  }

  do {
    xrOld = xr;
    const fxl = f(values.fx, values.xl);
    const fxu = f(values.fx, values.xu);

    xr = values.xu - (fxu * (values.xl - values.xu)) / (fxl - fxu);

    if (f(values.fx, xr) * f(values.fx, values.xl) < 0) values.xu = xr;
    else values.xl = xr;

    ea = Math.abs((xr - xrOld) / xr) * 100;

    data.push({
      i: i,
      xl: values.xl,
      fxl: f(values.fx, values.xl),
      xr: xr,
      fxr: f(values.fx, xr),
      xu: values.xu,
      fxu: f(values.fx, values.xu),
      ea: ea,
    });

    i++;
  } while (values.conditionType === 'es' ? ea > values.es : i < it);

  return data;
};

export const simpleFixedPoint = ({ ...values }) => {
  console.log('SimpleFixedPoint');
  let xr = values.x0;
  let xrOld = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  // const getSfp = (fx) => {
  //   const xs = fx.match(/x\^\d|x/g);
  //   let maxPower = 1;
  //   xs.map((x) => {
  //     const power = +x.match(/\d/g);
  //     if (power !== null) {
  //       maxPower = power > maxPower ? power : maxPower;
  //     }
  //   });
  //   const fxNew = fx.replace(`x^${maxPower}`, `y^${maxPower}`);
  //   const expr1 = algebra.parse(fxNew);
  //   var eq = new Equation(expr1, 0);
  //   var yAnswer = eq.solveFor('y');

  //   console.log({ eq: eq, yAnswer: yAnswer });
  //   // return nerdamer(fx).solveFor('x').toString();
  //   return yAnswer.toString();
  // };

  do {
    if (i !== 0) {
      xrOld = xr;
      xr = f(values.fx, xrOld);
    }

    if (xr !== 0) ea = Math.abs((xr - xrOld) / xr) * 100;

    data.push({
      i: i,
      xi: xr,
      fxi: f(values.fx, xr),
      ea,
    });
    i++;
  } while (values.conditionType === 'es' ? ea > values.es : i < values.it);

  return data;
};

export const newton = ({ ...values }) => {
  console.clear();
  console.log('newton');
  let x0Old = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  const NewFx = values.fx.replace(/\(|\)/g, '');

  const dfx = math.derivative(NewFx, 'x').toString();

  do {
    if (i !== 0) {
      x0Old = values.x0;
      values.x0 = x0Old - f(values.fx, x0Old) / f(dfx, x0Old);
    }

    if (values.x0 !== 0) ea = Math.abs((values.x0 - x0Old) / values.x0) * 100;

    data.push({
      i: i,
      xi: values.x0,
      fxi: f(values.fx, values.x0),
      dfxi: f(dfx, values.x0),
      ea,
    });
    i++;
  } while (values.conditionType === 'es' ? ea > values.es : i < values.it + 1);

  console.table(data);
  return data;
};

export const secant = ({ ...values }) => {
  console.clear();
  console.log('Secant');
  let xr = 0;
  let ea = 0;
  let i = 0;
  let data = [];

  do {
    if (i !== 0) {
      const fxa = f(values.fx, values.xb);
      const fxb = f(values.fx, values.xa);
      xr = values.xb - (fxa * (values.xa - values.xb)) / (fxb - fxa);
      console.log(`${values.xb} - (${fxb} * (${values.xa} - ${values.xb})) / (${fxb} - ${fxa})`);

      values.xa = values.xb;
      values.xb = xr;
    }

    ea = Math.abs((values.xb - values.xa) / values.xb) * 100;

    data.push({
      i: i,
      xa: values.xa,
      fxa: f(values.fx, values.xa),
      xb: values.xb,
      fxb: f(values.fx, values.xb),
      ea,
    });

    i++;
  } while (values.conditionType === 'es' ? ea > values.es : i < it);

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

  const steps = {
    matrix_1: matrix,
    matrix_2: matrix_2,
    matrix_3: matrix_3,
    m21: {
      equation: `${x1_2} / ${x1_1} = ${m21}`,
      value: m21,
    },
    m31: {
      equation: `${x1_3} / ${x1_1} = ${m31}`,
      value: m31,
    },
    m32: {
      equation: `${x2_3} / ${x2_2} = ${m32}`,
      value: m32,
    },

    R2: {
      steps: [
        `${x1_2} - ${m21} * ${x1_1} = ${matrix_2[1][0]}`,
        `${x2_2} - ${m21} * ${x2_1} = ${matrix_2[1][1]}`,
        `${x3_2} - ${m21} * ${x3_1} = ${matrix_2[1][2]}`,
        `${sol_2} - ${m21} * ${sol_1} = ${matrix_2[1][3]}`,
      ],
    },
    R3_1: {
      steps: [
        `${x1_3} - ${m31} * ${x1_1} = ${matrix_2[2][0]}`,
        `${x2_3} - ${m31} * ${x2_1} = ${matrix_2[2][1]}`,
        `${x3_3} - ${m31} * ${x3_1} = ${matrix_2[2][2]}`,
        `${sol_3} - ${m31} * ${sol_1} = ${matrix_2[2][3]}`,
      ],
    },
    R3_2: {
      steps: [
        `${matrix_2[2][0]} - ${m32} * ${matrix_2[1][0]} = ${matrix_3[2][0]}`,
        `${matrix_2[2][1]} - ${m32} * ${matrix_2[1][1]} = ${matrix_3[2][1]}`,
        `${matrix_2[2][2]} - ${m32} * ${matrix_2[1][2]} = ${matrix_3[2][2]}`,
        `${matrix_2[2][3]} - ${m32} * ${matrix_2[1][3]} = ${matrix_3[2][3]}`,
      ],
    },
    xsValues: [
      { name: 'x', sub: 1, value: x1 },
      { name: 'x', sub: 2, value: x2 },
      { name: 'x', sub: 3, value: x3 },
    ],
  };

  return steps;
};

export const luDecomposition = (matrix) => {
  const [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  const [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  const [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const steps = gaussElimination(matrix);

  const L = [
    [1, 0, 0],
    [steps.m21.value, 1, 0],
    [steps.m31.value, steps.m32.value, 1],
  ];

  const B = [[sol_1], [sol_2], [sol_3]];

  const C = [
    [...L[0], ...B[0]],
    [...L[1], ...B[1]],
    [...L[2], ...B[2]],
  ];

  const x1_C = C[0][3] / C[0][0];
  const x2_C = (C[1][3] - C[1][0] * x1_C) / C[1][1];
  const x3_C = (C[2][3] - C[2][0] * x1_C - C[2][1] * x2_C) / C[2][2];

  const C_Values = [[x1_C], [x2_C], [x3_C]];

  const U = [
    [steps.matrix_3[0][0], steps.matrix_3[0][1], steps.matrix_3[0][2]],
    [0, steps.matrix_3[1][1], steps.matrix_3[1][2]],
    [0, 0, steps.matrix_3[2][2]],
  ];

  // Matrix of U with solutions
  const U_ = [
    [...U[0], +C_Values[0]],
    [...U[1], +C_Values[1]],
    [...U[2], +C_Values[2]],
  ];

  console.log(U_[2][2]);

  const x3_U = U_[2][3] / U_[2][2];
  const x2_U = (U_[1][3] - U_[1][2] * x3_U) / U_[1][1];
  const x1_U = (U_[0][3] - U_[0][2] * x3_U - U_[0][1] * x2_U) / U_[0][0];

  console.log({ x1_U, x2_U, x3_U });

  console.log({ U_ });

  steps.A = [
    [x1_1, x2_1, x3_1],
    [x1_2, x2_2, x3_2],
    [x1_3, x2_3, x3_3],
  ];

  const X = [
    [...U[0], x1_C],
    [...U[1], x2_C],
    [...U[2], x3_C],
  ];

  const X_Values = [
    { name: 'x', sub: 1, value: x1_U },
    { name: 'x', sub: 2, value: x2_U },
    { name: 'x', sub: 3, value: x3_U },
  ];

  steps.B = B;
  steps.U = U;
  steps.L = L;
  steps.C = C;
  steps.C_Values = C_Values;
  steps.X = X;
  steps.X_Values = X_Values;
  steps.U_WithSolutions = U_;

  return steps;
};
