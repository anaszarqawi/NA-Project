import { create, all, fix, i, re } from 'mathjs';
import nerdamer from 'nerdamer/nerdamer.core.js';
import 'nerdamer/Algebra.js';
import 'nerdamer/Calculus.js';
import 'nerdamer/Solve.js';

import Fraction from 'fraction.js';

import algebra from 'algebra.js';
var Equation = algebra.Equation;

const config = {};
const math = create(all, config);

const f = (fx, x) => {
  return math.evaluate(fx, { x: x });
};

const round = (value, decPlaces) => {
  const settings = JSON.parse(localStorage.getItem('settings'));
  const decimalPlaces = decPlaces ?? settings?.decimalPrecision?.decimalPlaces;
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

const swap2Rows = (matrix, targetCol) => {
  const temp = matrix[targetCol];

  // get the index of the row with the max value in the target column
  const index2 = maxInCol(matrix, targetCol);

  if (index2 === targetCol) return 'no swap';
  matrix[targetCol] = matrix[index2];
  matrix[index2] = temp;

  return { matrix, indexMax: index2 };
};

const maxInCol = (matrix, col) => {
  let max = matrix[col][col];
  let maxIndex = col;

  for (let i = col + 1; i < matrix.length; i++) {
    if (Math.abs(matrix[i][col]) > Math.abs(max)) {
      max = matrix[i][col];
      maxIndex = i;
    }
  }

  return maxIndex;
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

export const gaussElimination = ({ matrix, withPP }) => {
  let [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  let [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  let [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const steps = {};
  const swapData = {};
  let matrixLabel = '';

  let tempMat = matrix;

  steps.mainMatrix = tempMat;
  steps.mij_rule = `mij = aij/ajj`;

  const handelPP = (targetCol) => {
    if (withPP) {
      const data = swap2Rows(tempMat, targetCol - 1);
      if (data !== 'no swap') {
        tempMat = data.matrix;
        const indexMax = data.indexMax;

        [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
        [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
        [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

        matrixLabel += `P${targetCol}${indexMax + 1} `;
        swapData[`step${targetCol}`] = {
          matrixLabel,
          finalMatrix: fracMat(tempMat),
          comment: `Swap R${targetCol} and R${indexMax + 1} Because |${frac(
            tempMat[targetCol - 1][targetCol - 1]
          )}| > |${frac(tempMat[indexMax][targetCol - 1])}|`,
        };
      }
    }
  };

  handelPP(1);

  const m21 = x1_2 / x1_1;
  const m31 = x1_3 / x1_1;
  steps.step1 = [
    {
      matrixLabel,
      m21_rule: `m21 = a21/a11 = ${x1_2}/${x1_1} = ${m21}`,
      rule: `R2 - (m21 * R1) → R2`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1, sol_1],
        [x1_2 - m21 * x1_1, x2_2 - m21 * x2_1, x3_2 - m21 * x3_1, sol_2 - m21 * sol_1],
        [x1_3, x2_3, x3_3, sol_3],
      ]),
      steps: [
        `a21 = (${frac(x1_2)}) - (${frac(m21)} * ${frac(x1_1)}) = ${frac(x1_2 - m21 * x1_1)}`,
        `a22 = (${frac(x2_2)}) - (${frac(m21)} * ${frac(x2_1)}) = ${frac(x2_2 - m21 * x2_1)}`,
        `a23 = (${frac(x3_2)}) - (${frac(m21)} * ${frac(x3_1)}) = ${frac(x3_2 - m21 * x3_1)}`,
        `a24 = (${frac(sol_2)}) - (${frac(m21)} * ${frac(sol_1)}) = ${frac(sol_2 - m21 * sol_1)}`,
      ],
      comment: `Multiply R1 by m21 and subtract from R2`,
    },
    {
      matrixLabel,
      m21_rule: `m31 = a31/a11 = ${x1_3}/${x1_1} = ${m31}`,
      rule: `R3 - (m31 * R1) → R3`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1, sol_1],
        [x1_2 - m21 * x1_1, x2_2 - m21 * x2_1, x3_2 - m21 * x3_1, sol_2 - m21 * sol_1],
        [x1_3 - m31 * x1_1, x2_3 - m31 * x2_1, x3_3 - m31 * x3_1, sol_3 - m31 * sol_1],
      ]),
      steps: [
        `a31 = (${frac(x1_3)}) - (${frac(m31)} * ${frac(x1_1)}) = ${frac(x1_3 - m31 * x1_1)}`,
        `a32 = (${frac(x2_3)}) - (${frac(m31)} * ${frac(x2_1)}) = ${frac(x2_3 - m31 * x2_1)}`,
        `a33 = (${frac(x3_3)}) - (${frac(m31)} * ${frac(x3_1)}) = ${frac(x3_3 - m31 * x3_1)}`,
        `a34 = (${frac(sol_3)}) - (${frac(m31)} * ${frac(sol_1)}) = ${frac(sol_3 - m31 * sol_1)}`,
      ],
      comment: `Multiply R1 by m31 and subtract from R3`,
    },
  ];

  tempMat = fracToNumMat(steps.step1[steps.step1.length - 1].finalMatrix);
  console.log(tempMat);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  handelPP(2);

  const m32 = x2_3 / x2_2;
  steps.step2 = [
    {
      matrixLabel,
      m32_rule: `m32 = a32/a22 = ${x2_3}/${x2_2} = ${m32}`,
      rule: `R3 - (m32 * R2) → R3`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1, sol_1],
        [x1_2, x2_2, x3_2, sol_2],
        [x1_3 - m32 * x1_2, x2_3 - m32 * x2_2, x3_3 - m32 * x3_2, sol_3 - m32 * sol_2],
      ]),
      steps: [
        `a31 = (${frac(x1_3)}) - (${frac(m32)} * ${frac(x1_2)}) = ${frac(x1_3 - m32 * x1_2)}`,
        `a32 = (${frac(x2_3)}) - (${frac(m32)} * ${frac(x2_2)}) = ${frac(x2_3 - m32 * x2_2)}`,
        `a33 = (${frac(x3_3)}) - (${frac(m32)} * ${frac(x3_2)}) = ${frac(x3_3 - m32 * x3_2)}`,
        `a34 = (${frac(sol_3)}) - (${frac(m32)} * ${frac(sol_2)}) = ${frac(sol_3 - m32 * sol_2)}`,
      ],
      comment: `Multiply R2 by m32 and subtract from R3`,
    },
  ];

  tempMat = fracToNumMat(steps.step2[steps.step2.length - 1].finalMatrix);

  [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  steps.swaps = swapData;

  const x3 = tempMat[2][3] / tempMat[2][2];
  const x2 = (tempMat[1][3] - tempMat[1][2] * x3) / tempMat[1][1];
  const x1 = (tempMat[0][3] - tempMat[0][2] * x3 - tempMat[0][1] * x2) / tempMat[0][0];

  steps.xsValues = [
    { name: 'x', sub: 1, value: frac(x1) },
    { name: 'x', sub: 2, value: frac(x2) },
    { name: 'x', sub: 3, value: frac(x3) },
  ];

  console.log(steps);
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

  const x3_U = U_[2][3] / U_[2][2];
  const x2_U = (U_[1][3] - U_[1][2] * x3_U) / U_[1][1];
  const x1_U = (U_[0][3] - U_[0][2] * x3_U - U_[0][1] * x2_U) / U_[0][0];

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

  const xsValuesLu = [
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
  steps.xsValuesLu = xsValuesLu;
  steps.U_WithSolutions = U_;

  return steps;
};

const sub = (n) => {
  let temp = n.toString();

  temp = temp.replaceAll('0', '⁰');
  temp = temp.replaceAll('1', '¹');
  temp = temp.replaceAll('2', '²');
  temp = temp.replaceAll('3', '³');
  temp = temp.replaceAll('4', '⁴');
  temp = temp.replaceAll('5', '⁵');
  temp = temp.replaceAll('6', '⁶');
  temp = temp.replaceAll('7', '⁷');
  temp = temp.replaceAll('8', '⁸');
  temp = temp.replaceAll('9', '⁹');

  return temp;
};

export const gaussJordan = ({ matrix, withPP }) => {
  let [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  let [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  let [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  let matrixLabel = '';

  // with partial pivoting

  const steps = {};
  const swapData = {};

  steps.mainMatrix = matrix;

  let tempMat = matrix;

  const handelPP = (targetCol) => {
    if (withPP) {
      const data = swap2Rows(tempMat, targetCol - 1);
      if (data !== 'no swap') {
        tempMat = data.matrix;
        const indexMax = data.indexMax;

        [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
        [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
        [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

        matrixLabel += `P${targetCol}${indexMax + 1} `;
        swapData[`step${targetCol}`] = {
          matrixLabel,
          finalMatrix: fracMat(tempMat),
          comment: `Swap R${targetCol} and R${indexMax + 1} Because |${frac(
            tempMat[targetCol - 1][targetCol - 1]
          )}| > |${frac(tempMat[indexMax][targetCol - 1])}|`,
        };
      }
    }
  };

  handelPP(1);

  const mi_a11 = 1 / x1_1;
  tempMat = [
    [mi_a11 * x1_1, mi_a11 * x2_1, mi_a11 * x3_1, mi_a11 * sol_1],
    [x1_2, x2_2, x3_2, sol_2],
    [x1_3, x2_3, x3_3, sol_3],
  ];

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  const x1_2Rule = x1_2;
  const x1_3Rule = x1_3;
  steps.step1 = [
    {
      swap: swapData.step1,
      matrixLabel,
      finalMatrix: fracMat(tempMat),
      steps: [
        `a11 = (${frac(mi_a11)})(${frac(x1_1)}) = ${frac(x1_1)}`,
        `a12 = (${frac(mi_a11)})(${frac(x2_1)}) = ${frac(x2_1)}`,
        `a13 = (${frac(mi_a11)})(${frac(x3_1)}) = ${frac(x3_1)}`,
        `a14 = (${frac(mi_a11)})(${frac(sol_1)}) = ${frac(sol_1)}`,
      ],
      comment: `Normalizing the first row by multiply it by ${frac(mi_a11)} to yield`,
    },
    {
      matrixLabel,
      rule: `R2 - (${frac(x1_2Rule)} * R1) → R2`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1, sol_1],
        [x1_2 - x1_2Rule * x1_1, x2_2 - x1_2Rule * x2_1, x3_2 - x1_2Rule * x3_1, sol_2 - x1_2Rule * sol_1],
        [x1_3, x2_3, x3_3, sol_3],
      ]),
      steps: [
        `a21 = (${frac(x1_2)}) - (${frac(x1_2Rule)} * ${frac(x1_1)}) = ${frac(x1_2 - x1_2Rule * x1_1)}`,
        `a22 = (${frac(x2_2)}) - (${frac(x1_2Rule)} * ${frac(x2_1)}) = ${frac(x2_2 - x1_2Rule * x2_1)}`,
        `a23 = (${frac(x3_2)}) - (${frac(x1_2Rule)} * ${frac(x3_1)}) = ${frac(x3_2 - x1_2Rule * x3_1)}`,
        `a24 = (${frac(sol_2)}) - (${frac(x1_2Rule)} * ${frac(sol_1)}) = ${frac(sol_2 - x1_2Rule * sol_1)}`,
      ],
      comment: 'Eliminate x1 term can from the second row by:',
    },
    {
      matrixLabel,
      rule: `R3 - (${frac(x1_3Rule)} * R1) → R3`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1, sol_1],
        [x1_2 - x1_2Rule * x1_1, x2_2 - x1_2Rule * x2_1, x3_2 - x1_2Rule * x3_1, sol_2 - x1_2Rule * sol_1],
        [x1_3 - x1_3Rule * x1_1, x2_3 - x1_3Rule * x2_1, x3_3 - x1_3Rule * x3_1, sol_3 - x1_3Rule * sol_1],
      ]),
      steps: [
        `a31 = (${frac(x1_3)}) - (${frac(x1_3Rule)} * ${frac(x1_1)}) = ${frac(x1_3 - x1_3Rule * x1_1)}`,
        `a32 = (${frac(x2_3)}) - (${frac(x1_3Rule)} * ${frac(x2_1)}) = ${frac(x2_3 - x1_3Rule * x2_1)}`,
        `a33 = (${frac(x3_3)}) - (${frac(x1_3Rule)} * ${frac(x3_1)}) = ${frac(x3_3 - x1_3Rule * x3_1)}`,
        `a34 = (${frac(sol_3)}) - (${frac(x1_3Rule)} * ${frac(sol_1)}) = ${frac(sol_3 - x1_3Rule * sol_1)}`,
      ],
      comment: 'Eliminate x1 term can from the third row by:',
    },
  ];

  tempMat = fracToNumMat(steps.step1[steps.step1.length - 1].finalMatrix);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  handelPP(2);

  const mi_a22 = 1 / x2_2;

  tempMat = [
    [x1_1, x2_1, x3_1, sol_1],
    [mi_a22 * x1_2, mi_a22 * x2_2, mi_a22 * x3_2, mi_a22 * sol_2],
    [x1_3, x2_3, x3_3, sol_3],
  ];

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  const x2_1Rule = x2_1;
  const x2_3Rule = x2_3;
  steps.step2 = [
    {
      matrixLabel,
      swap: swapData.step2,
      finalMatrix: fracMat(tempMat),
      steps: [
        `a21 = (${frac(mi_a22)})(${frac(x1_2)}) = ${frac(x1_2)}`,
        `a22 = (${frac(mi_a22)})(${frac(x2_2)}) = ${frac(x2_2)}`,
        `a23 = (${frac(mi_a22)})(${frac(x3_2)}) = ${frac(x3_2)}`,
        `a24 = (${frac(mi_a22)})(${frac(sol_2)}) = ${frac(sol_2)}`,
      ],
      comment: `Normalizing the second row by multiply it by ${frac(mi_a22)} to yield`,
    },
    {
      matrixLabel,
      rule: `R1 - (${frac(x2_1Rule)} * R2) → R1`,
      finalMatrix: fracMat([
        [x1_1 - x2_1Rule * x1_2, x2_1 - x2_1Rule * x2_2, x3_1 - x2_1Rule * x3_2, sol_1 - x2_1Rule * sol_2],
        [x1_2, x2_2, x3_2, sol_2],
        [x1_3, x2_3, x3_3, sol_3],
      ]),
      steps: [
        `a11 = (${frac(x1_1)}) - (${frac(x2_1Rule)} * ${frac(x1_2)}) = ${frac(x1_1 - x2_1Rule * x1_2)}`,
        `a12 = (${frac(x2_1)}) - (${frac(x2_1Rule)} * ${frac(x2_2)}) = ${frac(x2_1 - x2_1Rule * x2_2)}`,
        `a13 = (${frac(x3_1)}) - (${frac(x2_1Rule)} * ${frac(x3_2)}) = ${frac(x3_1 - x2_1Rule * x3_2)}`,
        `a14 = (${frac(sol_1)}) - (${frac(x2_1Rule)} * ${frac(sol_2)}) = ${frac(sol_1 - x2_1Rule * sol_2)}`,
      ],
      comment: 'Eliminate x2 term can from the first row by:',
    },
    {
      matrixLabel,
      rule: `R3 - (${frac(x2_3Rule)} R2) → R3`,
      finalMatrix: fracMat([
        [x1_1 - x2_1Rule * x1_2, x2_1 - x2_1Rule * x2_2, x3_1 - x2_1Rule * x3_2, sol_1 - x2_1Rule * sol_2],
        [x1_2, x2_2, x3_2, sol_2],
        [x1_3 - x2_3Rule * x1_2, x2_3 - x2_3Rule * x2_2, x3_3 - x2_3Rule * x3_2, sol_3 - x2_3Rule * sol_2],
      ]),
      steps: [
        `a31 = (${frac(x1_3)}) - (${frac(x2_3Rule)} * ${frac(x1_2)}) = ${frac(x1_3 - x2_3Rule * x1_2)}`,
        `a32 = (${frac(x2_3)}) - (${frac(x2_3Rule)} * ${frac(x2_2)}) = ${frac(x2_3 - x2_3Rule * x2_2)}`,
        `a33 = (${frac(x3_3)}) - (${frac(x2_3Rule)} * ${frac(x3_2)}) = ${frac(x3_3 - x2_3Rule * x3_2)}`,
        `a34 = (${frac(sol_3)}) - (${frac(x2_3Rule)} * ${frac(sol_2)}) = ${frac(sol_3 - x2_3Rule * sol_2)}`,
      ],
      comment: 'Eliminate x2 term can from the third row by:',
    },
  ];

  tempMat = fracToNumMat(steps.step2[steps.step2.length - 1].finalMatrix);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  handelPP(3);

  const mi_a33 = 1 / x3_3;

  tempMat = [
    [x1_1, x2_1, x3_1, sol_1],
    [x1_2, x2_2, x3_2, sol_2],
    [mi_a33 * x1_3, mi_a33 * x2_3, mi_a33 * x3_3, mi_a33 * sol_3],
  ];

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  const x3_2Rule = x3_2;
  const x3_1Rule = x3_1;
  steps.step3 = [
    {
      matrixLabel,
      finalMatrix: fracMat(tempMat),
      steps: [
        `a31 = (${frac(mi_a33)})(${frac(x1_3)}) = ${frac(x1_3)}`,
        `a32 = (${frac(mi_a33)})(${frac(x2_3)}) = ${frac(x2_3)}`,
        `a33 = (${frac(mi_a33)})(${frac(x3_3)}) = ${frac(x3_3)}`,
        `a34 = (${frac(mi_a33)})(${frac(sol_3)}) = ${frac(sol_3)}`,
      ],
      comment: `Normalizing the third row by multiply it by ${frac(mi_a33)} to yield`,
    },
    {
      matrixLabel,

      rule: `R2 - (${frac(x3_2Rule)})R3 → R2`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1, sol_1],
        [x1_2 - x3_2Rule * x1_3, x2_2 - x3_2Rule * x2_3, x3_2 - x3_2Rule * x3_3, sol_2 - x3_2Rule * sol_3],
        [x1_3, x2_3, x3_3, sol_3],
      ]),
      steps: [
        `a21 = (${frac(x1_2)}) - (${frac(x3_2Rule)} * ${frac(x1_3)}) = ${frac(x1_2 - x3_2Rule * x1_3)}`,
        `a22 = (${frac(x2_2)}) - (${frac(x3_2Rule)} * ${frac(x2_3)}) = ${frac(x2_2 - x3_2Rule * x2_3)}`,
        `a23 = (${frac(x3_2)}) - (${frac(x3_2Rule)} * ${frac(x3_3)}) = ${frac(x3_2 - x3_2Rule * x3_3)}`,
        `a24 = (${frac(sol_2)}) - (${frac(x3_2Rule)} * ${frac(sol_3)}) = ${frac(sol_2 - x3_2Rule * sol_3)}`,
      ],
      comment: 'Eliminate x3 term can from the second row by:',
    },
    {
      matrixLabel,

      rule: `R1 - (${frac(x3_1Rule)})R3 → R1`,
      finalMatrix: fracMat([
        [x1_1 - x3_1Rule * x1_3, x2_1 - x3_1Rule * x2_3, x3_1 - x3_1Rule * x3_3, sol_1 - x3_1Rule * sol_3],
        [x1_2 - x3_2Rule * x1_3, x2_2 - x3_2Rule * x2_3, x3_2 - x3_2Rule * x3_3, sol_2 - x3_2Rule * sol_3],
        [x1_3, x2_3, x3_3, sol_3],
      ]),
      steps: [
        `a21 = (${frac(x1_1)}) - (${frac(x3_1Rule)} * ${frac(x1_3)}) = ${frac(x1_1 - x3_1Rule * x1_3)}`,
        `a22 = (${frac(x2_1)}) - (${frac(x3_1Rule)} * ${frac(x2_3)}) = ${frac(x2_1 - x3_1Rule * x2_3)}`,
        `a23 = (${frac(x3_1)}) - (${frac(x3_1Rule)} * ${frac(x3_3)}) = ${frac(x3_1 - x3_1Rule * x3_3)}`,
        `a24 = (${frac(sol_1)}) - (${frac(x3_1Rule)} * ${frac(sol_3)}) = ${frac(sol_1 - x3_1Rule * sol_3)}`,
      ],
      comment: 'Eliminate x3 term can from the first row by:',
    },
  ];

  tempMat = fracToNumMat(steps.step3[steps.step3.length - 1].finalMatrix);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  steps.xsValues = [
    { name: 'x', sub: 1, value: `${frac(sol_1)}${`${sol_1}`.includes('.') ? ` = ${round(sol_1)}` : ''}` },
    { name: 'x', sub: 2, value: `${frac(sol_2)}${`${sol_1}`.includes('.') ? ` = ${round(sol_2)}` : ''}` },
    { name: 'x', sub: 3, value: `${frac(sol_3)}${`${sol_1}`.includes('.') ? ` = ${round(sol_3)}` : ''}` },
  ];

  console.log(steps);
  return steps;
};

export const cramer = (matrix) => {
  const [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  const [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  const [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const steps = {
    A: [
      [x1_1, x2_1, x3_1],
      [x1_2, x2_2, x3_2],
      [x1_3, x2_3, x3_3],
    ],
    A1: [
      [sol_1, x2_1, x3_1],
      [sol_2, x2_2, x3_2],
      [sol_3, x2_3, x3_3],
    ],
    A2: [
      [x1_1, sol_1, x3_1],
      [x1_2, sol_2, x3_2],
      [x1_3, sol_3, x3_3],
    ],
    A3: [
      [x1_1, x2_1, sol_1],
      [x1_2, x2_2, sol_2],
      [x1_3, x2_3, sol_3],
    ],
  };

  const detA = math.det(steps.A);
  const detA1 = math.det(steps.A1);
  const detA2 = math.det(steps.A2);
  const detA3 = math.det(steps.A3);

  const x1 = detA1 / detA;
  const x2 = detA2 / detA;
  const x3 = detA3 / detA;

  steps.detA = detA;
  steps.detA1 = detA1;
  steps.detA2 = detA2;
  steps.detA3 = detA3;
  steps.xsValues = [
    { name: 'x', sub: 1, value: x1 },
    { name: 'x', sub: 2, value: x2 },
    { name: 'x', sub: 3, value: x3 },
  ];

  return steps;
};

// function to round all values in a matrix to one decimal place
const roundMatrix = (matrix, decPlaces) => {
  return matrix.map((row) => {
    return row.map((value) => {
      return round(value, decPlaces);
    });
  });
};

// function to change decimal values to fractions using the mathjs library
const fracMat = (matrix) => {
  return matrix.map((row) => {
    return row.map((value) => {
      return frac(value);
    });
  });
};

// function to change decimal value to fraction
const frac = (value) => {
  const num = math.number(value);
  const f = math.fraction(num);
  if (f.s === -1 && f.d === 1) return `-${f.n}`;
  else if (f.s === -1 && f.d !== 1) return `-${f.n}/${f.d}`;
  else if (f.s === 1 && f.d === 1) return f.n;
  else return `${f.n}/${f.d}`;
};

// function to change fraction string to number
const fracToNumMat = (value) => {
  return value.map((row) => {
    return row.map((value) => {
      return fracToNum(value);
    });
  });
};

const fracToNum = (value) => {
  const f = math.fraction(value);
  if (f.s === -1 && f.d === 1) return -f.n;
  if (f.s === -1) return (f.n / f.d) * -1;
  if (f.s === 1 && f.d === 1) return f.n;
  return f.n / f.d;
};
