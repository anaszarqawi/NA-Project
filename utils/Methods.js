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

const round = (value) => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  const decimalPlaces = settings?.decimalPrecision?.decimalPlaces;
  const withRounding = settings?.decimalPrecision?.withRounding;

  if (value.toString().includes('.')) {
    if (withRounding) {
      return Number(Math.round(value * 10 ** decimalPlaces) / 10 ** decimalPlaces);
    } else {
      let tempArr = value.toString().split('.');
      if (tempArr[1]) {
        if (tempArr[1].length > decimalPlaces) return Number(tempArr[0] + '.' + tempArr[1].slice(0, decimalPlaces));
        else return value;
      }
    }
  } else {
    return value;
  }
};

export const bisection = ({ fx, xl, xu, condition }) => {
  let [xr, xrOld, ea, i, data] = [0, 0, 0, 0, []];

  if (f(fx, xl) * f(fx, xu) > 0)
    return {
      error: 'No root in this range',
    };

  do {
    xrOld = xr;
    xr = round((xl + xu) / 2);
    ea = round(Math.abs((xr - xrOld) / xr) * 100);

    data.push({
      i: ++i,
      xl,
      fxl: round(f(fx, xl)),
      xr,
      fxr: round(f(fx, xr)),
      xu,
      fxu: round(f(fx, xu)),
      ea,
    });

    f(fx, xr) * f(fx, xu) < 0 ? (xl = xr) : (xu = xr);
  } while (condition.type === 'es' ? ea > condition.value : i < +condition.value);

  return data;
};

export const falsePosition = ({ fx, xl, xu, condition }) => {
  let [xr, xrOld, ea, i, data] = [0, 0, 0, 0, []];

  if (f(fx, xl) * f(fx, xu) > 0)
    return {
      error: 'No root in this range',
    };

  do {
    xrOld = xr;

    xr = round(xu - (f(fx, xu) * (xl - xu)) / (f(fx, xl) - f(fx, xu)));

    ea = round(Math.abs((xr - xrOld) / xr) * 100);

    data.push({
      i: ++i,
      xl,
      fxl: round(f(fx, xl)),
      xr,
      fxr: round(f(fx, xr)),
      xu,
      fxu: round(f(fx, xu)),
      ea,
    });

    f(fx, xr) * f(fx, xu) < 0 ? (xl = xr) : (xu = xr);
  } while (condition.type === 'es' ? ea > condition.value : i < +condition.value);

  return data;
};

export const simpleFixedPoint = ({ fx, x0, condition }) => {
  let [xr, xrOld, ea, i, data] = [0, 0, 0, 0, []];

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
      xr = round(f(fx, xrOld));
    }

    if (xr !== 0) ea = round(Math.abs((xr - xrOld) / xr) * 100);

    data.push({
      i: ++i,
      xi: xr,
      fxi: round(f(fx, xr)),
      ea,
    });
  } while (condition.type === 'es' ? ea > condition.value : i < +condition.value);

  return data;
};

export const newton = ({ fx, x0, condition }) => {
  let [x0Old, ea, i, data] = [0, 0, 0, []];

  const NewFx = fx.replace(/\(|\)/g, '');
  const dfx = math.derivative(NewFx, 'x').toString();

  do {
    if (x0 !== 0) ea = round(Math.abs((x0 - x0Old) / x0) * 100);

    data.push({
      i: ++i,
      xi: x0,
      fxi: round(f(fx, x0)),
      dfxi: round(f(dfx, x0)),
      ea,
    });

    x0Old = round(x0);
    x0 = round(x0Old - round(f(fx, x0Old)) / round(f(dfx, x0Old)));
  } while (condition.type === 'es' ? ea > condition.value : i < +condition.value);

  console.table(data);
  return data;
};

export const secant = ({ fx, x_1, x0, condition }) => {
  let [xr, ea, i, data] = [0, 0, 0, []];

  do {
    ea = round(Math.abs((x0 - x_1) / x0) * 100);

    data.push({
      i: ++i,
      x_1: x_1,
      fxa: round(f(fx, x_1)),
      x0: x0,
      fxb: round(f(fx, x0)),
      ea,
    });

    xr = round(x0 - (f(fx, x0) * (x_1 - x0)) / (f(fx, x_1) - f(fx, x0)));
    x_1 = x0;
    x0 = xr;
  } while (condition.type === 'es' ? ea > condition.value : i < +condition.value);

  return data;
};

export const gaussElimination = (matrix) => {
  const [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  const [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  const [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const m21 = roundToOne(x1_2 / x1_1);
  const m31 = roundToOne(x1_3 / x1_1);

  let matrix_2 = [
    [x1_1, x2_1, x3_1, sol_1],
    [x1_2 - m21 * x1_1, x2_2 - m21 * x2_1, x3_2 - m21 * x3_1, sol_2 - m21 * sol_1],
    [x1_3 - m31 * x1_1, x2_3 - m31 * x2_1, x3_3 - m31 * x3_1, sol_3 - m31 * sol_1],
  ];

  matrix_2 = roundMatrix(matrix_2);

  const m32 = roundToOne(matrix_2[2][1] / matrix_2[1][1]);

  let matrix_3 = [
    [x1_1, x2_1, x3_1, sol_1],
    [matrix_2[1][0], matrix_2[1][1], matrix_2[1][2], matrix_2[1][3]],
    [
      matrix_2[2][0] - m32 * matrix_2[1][0],
      matrix_2[2][1] - m32 * matrix_2[1][1],
      matrix_2[2][2] - m32 * matrix_2[1][2],
      matrix_2[2][3] - m32 * matrix_2[1][3],
    ],
  ];

  matrix_3 = roundMatrix(matrix_3);

  let x3 = matrix_3[2][3] / matrix_3[2][2];
  let x2 = (matrix_3[1][3] - matrix_3[1][2] * x3) / matrix_3[1][1];
  let x1 = (matrix_3[0][3] - matrix_3[0][2] * x3 - matrix_3[0][1] * x2) / matrix_3[0][0];

  x1 = roundToOne(x1);
  x2 = roundToOne(x2);
  x3 = roundToOne(x3);

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
      equation: `${matrix_2[2][1]} / ${matrix_2[1][1]} = ${m32}`,
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

const roundToOne = (value) => {
  if (value.toString().includes('.')) {
    return Number(Math.round(value + 'e' + 1) + 'e-' + 1);
  } else {
    return value;
  }
};

// function to round all values in a matrix to one decimal place
const roundMatrix = (matrix) => {
  return matrix.map((row) => {
    return row.map((value) => {
      return roundToOne(value);
    });
  });
};
