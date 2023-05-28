import { create, all, fix, i, re, matrix } from 'mathjs';
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

const maxInCol = (matrix, col, startRow) => {
  let max = matrix[startRow][col];
  let maxIndex = startRow;

  for (let i = startRow; i < matrix.length; i++)
    if (Math.abs(matrix[i][col]) > Math.abs(max)) {
      max = matrix[i][col];
      maxIndex = i;
    }

  return maxIndex;
};

const swap2Rows = (matrix, row1, row2, targetCol) => {
  // console.log({ matrix, row1, row2, targetCol });
  if (targetCol === undefined) {
    const temp = matrix[row1];
    matrix[row1] = matrix[row2];
    matrix[row2] = temp;
  } else {
    const temp = matrix[row1][targetCol];
    matrix[row1][targetCol] = matrix[row2][targetCol];
    matrix[row2][targetCol] = temp;
  }

  return matrix;
};

const swapWithMax = (matrix, targetCol, startRow) => {
  const temp = matrix[startRow];

  const index2 = maxInCol(matrix, targetCol, startRow);

  if (index2 === startRow) return 'no swap';
  matrix[startRow] = matrix[index2];
  matrix[index2] = temp;

  return { matrix, indexMax: index2 };
};

// method to solve matrix by math.lu
const solveMatrix = (matrix, b) => {
  const lu = math.lup(matrix);
  const x = math.lusolve(lu, b);
  // console.log({ x });
  return x;
};

const getSwaps = (matrixLabel) => {
  const swaps = matrixLabel.match(/\d+/g);
  return [
    ...swaps.map((swap) => {
      return { index1: +swap[0], index2: +swap[1] };
    }),
  ];
};

const rmLastCol = (matrix) => {
  return matrix.map((row) => {
    return row.slice(0, row.length - 1);
  });
};

// Chapter 1
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
  let [xr, xrOld, ea, i, data] = [x0, 0, 0, 0, []];

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

    // console.log({ eq: eq, yAnswer: yAnswer });
    // return nerdamer(fx).solveFor('x').toString();
    return yAnswer.toString();
  };

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
    // console.log({ xr, xrOld, ea, i });
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

// Chapter 2
export const gaussElimination = ({ matrix, withPP }) => {
  let [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  let [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  let [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const steps = {};
  const swapData = {
    step1: [],
    step2: [],
  };
  let matrixLabel = '';

  steps.mainMatrix = [...matrix];

  let tempMat = matrix;

  steps.mij_rule = `mij = aij/ajj`;

  const handelPP = (targetCol, startRow) => {
    if (withPP) {
      const data = swapWithMax(tempMat, targetCol - 1, startRow - 1);
      // console.log(data);
      if (data !== 'no swap') {
        tempMat = data.matrix;
        const indexMax = data.indexMax;

        [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
        [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
        [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

        // console.log(tempMat);

        matrixLabel += `P${startRow}${indexMax + 1} `;
        swapData[`step${targetCol}`].push({
          matrixLabel,
          finalMatrix: fracMat(tempMat),
          comment: `Swap R${startRow} and R${indexMax + 1} Because |${frac(
            tempMat[startRow - 1][targetCol - 1]
          )}| > |${frac(tempMat[indexMax][targetCol - 1])}|`,
        });
      }
    }
  };

  handelPP(1, 1);

  handelPP(1, 2);

  const m21 = x1_2 / x1_1;
  const m31 = x1_3 / x1_1;
  steps.step1 = [
    x1_2 != 0 && {
      swap: swapData.step1,
      matrixLabel,
      mij: `m21 = a21/a11 = ${frac(x1_2)}/${frac(x1_1)} = ${frac(m21)}`,
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

    x1_3 != 0 && {
      matrixLabel,
      mij: `m31 = a31/a11 = ${frac(x1_3)}/${frac(x1_1)} = ${frac(m31)}`,
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

  tempMat = fracToNumMat(steps.step1[1]?.finalMatrix || steps.step1[0].finalMatrix || tempMat);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  handelPP(2, 2);

  const m32 = x2_3 / x2_2;
  steps.step2 = [
    x2_3 != 0 && {
      swap: swapData.step2,
      matrixLabel,
      mij: `m32 = a32/a22 = ${frac(x2_3)}/${frac(x2_2)} = ${round(m32)}`,
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

  tempMat = fracToNumMat(steps.step2[steps.step2.length - 1]?.finalMatrix || tempMat);

  [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  steps.swaps = swapData;

  const x3 = tempMat[2][3] / tempMat[2][2];
  const x2 = (tempMat[1][3] - tempMat[1][2] * x3) / tempMat[1][1];
  const x1 = (tempMat[0][3] - tempMat[0][2] * x3 - tempMat[0][1] * x2) / tempMat[0][0];

  steps.xsValues = [
    { name: 'x', sub: 1, value: `${frac(x1)}${`${x1}`.includes('.') ? ` = ${round(x1)}` : ''}` },
    { name: 'x', sub: 2, value: `${frac(x2)}${`${x2}`.includes('.') ? ` = ${round(x2)}` : ''}` },
    { name: 'x', sub: 3, value: `${frac(x3)}${`${x3}`.includes('.') ? ` = ${round(x3)}` : ''}` },
  ];

  // console.log(steps);
  return steps;
};

export const luDecomposition = ({ matrix, withPP }) => {
  let tempMat = [...matrix];

  let [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  let [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  let [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  const steps = {};
  const swapData = {
    step1: [],
    step2: [],
  };
  let matrixLabel = '';

  let A = [
    [x1_1, x2_1, x3_1],
    [x1_2, x2_2, x3_2],
    [x1_3, x2_3, x3_3],
  ];

  steps.A = [...A];

  let b = [[sol_1], [sol_2], [sol_3]];

  steps.b = [...b];

  steps.mij_rule = `mij = aij/ajj`;

  const handelPP = (targetCol, startRow) => {
    if (withPP) {
      const data = swapWithMax(tempMat, targetCol - 1, startRow - 1);
      // console.log(data);
      if (data !== 'no swap') {
        tempMat = data.matrix;
        const indexMax = data.indexMax;

        [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
        [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
        [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

        // console.log(tempMat);

        matrixLabel += `P${startRow}${indexMax + 1} `;
        swapData[`step${targetCol}`].push({
          matrixLabel,
          finalMatrix: fracMat([
            [x1_1, x2_1, x3_1],
            [x1_2, x2_2, x3_2],
            [x1_3, x2_3, x3_3],
          ]),
          comment: `Swap R${startRow} and R${indexMax + 1} Because |${frac(
            tempMat[startRow - 1][targetCol - 1]
          )}| > |${frac(tempMat[indexMax][targetCol - 1])}|`,
        });
      }
    }
  };

  handelPP(1, 1);
  handelPP(1, 2);

  const m21 = x1_2 / x1_1;
  const m31 = x1_3 / x1_1;
  steps.step1 = [
    x1_2 != 0 && {
      swap: swapData.step1,
      matrixLabel,
      mij: `m21 = a21/a11 = ${x1_2}/${x1_1} = ${frac(m21)}${`${m21}`.includes('.') ? ` = ${round(m21)}` : ''}`,
      rule: `R2 - (m21 * R1) → R2`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1],
        [x1_2 - m21 * x1_1, x2_2 - m21 * x2_1, x3_2 - m21 * x3_1],
        [x1_3, x2_3, x3_3],
      ]),
      steps: [
        `a21 = (${frac(x1_2)}) - (${frac(m21)} * ${frac(x1_1)}) = ${frac(x1_2 - m21 * x1_1)}`,
        `a22 = (${frac(x2_2)}) - (${frac(m21)} * ${frac(x2_1)}) = ${frac(x2_2 - m21 * x2_1)}`,
        `a23 = (${frac(x3_2)}) - (${frac(m21)} * ${frac(x3_1)}) = ${frac(x3_2 - m21 * x3_1)}`,
      ],
      comment: `Multiply R1 by m21 and subtract from R2`,
    },
    x1_3 != 0 && {
      matrixLabel,
      mij: `m31 = a31/a11 = ${x1_3}/${x1_1} = ${frac(m31)}${`${m31}`.includes('.') ? ` = ${round(m31)}` : ''}`,
      rule: `R3 - (m31 * R1) → R3`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1],
        [x1_2 - m21 * x1_1, x2_2 - m21 * x2_1, x3_2 - m21 * x3_1],
        [x1_3 - m31 * x1_1, x2_3 - m31 * x2_1, x3_3 - m31 * x3_1],
      ]),
      steps: [
        `a31 = (${frac(x1_3)}) - (${frac(m31)} * ${frac(x1_1)}) = ${frac(x1_3 - m31 * x1_1)}`,
        `a32 = (${frac(x2_3)}) - (${frac(m31)} * ${frac(x2_1)}) = ${frac(x2_3 - m31 * x2_1)}`,
        `a33 = (${frac(x3_3)}) - (${frac(m31)} * ${frac(x3_1)}) = ${frac(x3_3 - m31 * x3_1)}`,
      ],
      comment: `Multiply R1 by m31 and subtract from R3`,
    },
  ];

  tempMat = fracToNumMat(steps.step1[steps.step1.length - 1].finalMatrix || tempMat);

  [x1_1, x2_1, x3_1] = tempMat[0];
  [x1_2, x2_2, x3_2] = tempMat[1];
  [x1_3, x2_3, x3_3] = tempMat[2];

  handelPP(2, 2);

  const m32 = x2_3 / x2_2;
  steps.step2 = [
    x2_3 != 0 && {
      swap: swapData.step2,
      matrixLabel,
      mij: `m32 = a32/a22 = ${frac(x2_3)}/${frac(x2_2)} = ${frac(m32)}${
        `${m32}`.includes('.') ? ` = ${round(m32)}` : ''
      }`,
      rule: `R3 - (m32 * R2) → R3`,
      finalMatrix: fracMat([
        [x1_1, x2_1, x3_1],
        [x1_2, x2_2, x3_2],
        [x1_3 - m32 * x1_2, x2_3 - m32 * x2_2, x3_3 - m32 * x3_2],
      ]),
      steps: [
        `a31 = (${frac(x1_3)}) - (${frac(m32)} * ${frac(x1_2)}) = ${frac(x1_3 - m32 * x1_2)}`,
        `a32 = (${frac(x2_3)}) - (${frac(m32)} * ${frac(x2_2)}) = ${frac(x2_3 - m32 * x2_2)}`,
        `a33 = (${frac(x3_3)}) - (${frac(m32)} * ${frac(x3_2)}) = ${frac(x3_3 - m32 * x3_2)}`,
      ],
      comment: `Multiply R2 by m32 and subtract from R3`,
    },
  ];

  tempMat = fracToNumMat(steps.step2[steps.step2.length - 1]?.finalMatrix || tempMat);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  steps.finalMatrixLabel = matrixLabel;

  steps.U = {
    matrixLabel: 'U = ',
    matrix: fracMat([
      [x1_1, x2_1, x3_1],
      [x1_2, x2_2, x3_2],
      [x1_3, x2_3, x3_3],
    ]),
    comment: 'Thus, upper triangular matrix is',
  };

  let L_rule = [
    [1, 0, 0],
    ['m21', 1, 0],
    ['m31', 'm32', 1],
  ];

  let L = fracMat([
    [1, 0, 0],
    [m21, 1, 0],
    [m31, m32, 1],
  ]);

  if (withPP && matrixLabel !== '') {
    const swapsData = getSwaps(matrixLabel);
    for (const swap of swapsData) {
      const { index1, index2 } = swap;
      b = swap2Rows(b, index1 - 1, index2 - 1);
      if (
        ((index1 === 2 && index2 === 3) || (index1 === 3 && index2 === 2)) &&
        !steps.step1[steps.step1.length - 1].matrixLabel.includes('P23')
      ) {
        L = swap2Rows(L, index1 - 1, index2 - 1, 0);
        L_rule = swap2Rows(L_rule, index1 - 1, index2 - 1, 0);
      }
    }
  }

  steps.L = {
    ruleMat: L_rule,
    matrixLabel: 'L = ' + matrixLabel,
    matrix: L,
    comment: 'Thus, the lower triangular matrix is',
  };

  steps.AxEqB = {
    comment: 'Write this system in matrix form as Ax = b where',
    matrices: [
      {
        matrixLabel: 'A =',
        matrix: fracMat(A),
      },
      {
        matrixLabel: `b = ${withPP ? matrixLabel : ''}`,
        matrix: fracMat(b),
      },
      {
        matrixLabel: 'U =',
        matrix: steps.U.matrix,
      },
      {
        matrixLabel: 'L =',
        matrix: steps.L.matrix,
      },
    ],
  };

  // console.log({ undefined: b });
  steps.LcEqB = {
    rule: 'Lc = b',
    comment: 'Firstly, we solve the system',
    matricesInline: [steps.L.matrix, [['c1'], ['c2'], ['c3']], fracMat(b)],
    commentMatrix: 'now solve these equations by forward substitution to find c',
    equations: [
      [1, 0, 0, b[0][0]],
      [m21, 1, 0, b[1][0]],
      [m31, m32, 1, b[2][0]],
    ],
    var: 'c',
  };

  // Get C values
  const xsValuesLcEqB = solveMatrix(fracToNumMat(steps.L.matrix), fracToNumMat(b))._data;
  steps.LcEqB.xsValues = [
    { name: 'c', sub: 1, value: frac(xsValuesLcEqB[0][0]) },
    { name: 'c', sub: 2, value: frac(xsValuesLcEqB[1][0]) },
    { name: 'c', sub: 3, value: frac(xsValuesLcEqB[2][0]) },
  ];

  // console.log({ tempMat });

  const LcEqBValues = steps.LcEqB.xsValues;

  steps.UxEqC = {
    rule: 'Ux = c',
    comment: 'Secondly, we solve the system',
    matricesInline: [steps.U.matrix, [['x1'], ['x2'], ['x3']], [...LcEqBValues.map((eq) => [eq.value])]],
    commentMatrix: 'We can now solve these equations by back substitution to find x',
    finalMatrix: fracMat([
      [x1_1, x2_1, x3_1],
      [0, x2_2, x3_2],
      [0, 0, x3_3],
    ]),
    equations: roundMatrix(
      fracToNumMat([
        [x1_1, x2_1, x3_1, xsValuesLcEqB[0][0]],
        [0, x2_2, x3_2, xsValuesLcEqB[1][0]],
        [0, 0, x3_3, xsValuesLcEqB[2][0]],
      ])
    ),
    var: 'x',
  };

  const xsValuesUxEqC = fracMat(solveMatrix(fracToNumMat(steps.U.matrix), fracToNumMat(xsValuesLcEqB))._data);
  steps.UxEqC.xsValues = [
    { name: 'x', sub: 1, value: xsValuesUxEqC[0][0] },
    { name: 'x', sub: 2, value: xsValuesUxEqC[1][0] },
    { name: 'x', sub: 3, value: xsValuesUxEqC[2][0] },
  ];

  steps.swaps = swapData;

  // console.log(steps);

  return steps;
};

export const gaussJordan = ({ matrix, withPP }) => {
  let [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  let [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  let [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  let matrixLabel = '';

  // with partial pivoting

  const steps = {};
  const swapData = {};

  steps.mainMatrix = [...matrix];

  let tempMat = matrix;

  const handelPP = (targetCol, startRow) => {
    if (withPP) {
      const data = swapWithMax(tempMat, targetCol - 1, startRow - 1);
      // console.log(data);
      if (data !== 'no swap') {
        tempMat = data.matrix;
        const indexMax = data.indexMax;

        [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
        [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
        [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

        // console.log(tempMat);

        matrixLabel += `P${startRow}${indexMax + 1} `;
        swapData[`step${targetCol}`] = {
          matrixLabel,
          finalMatrix: fracMat(tempMat),
          comment: `Swap R${startRow} and R${indexMax + 1} Because |${frac(
            tempMat[startRow - 1][targetCol - 1]
          )}| > |${frac(tempMat[indexMax][targetCol - 1])}|`,
        };
      }
    }
  };

  handelPP(1, 1);

  const mi_a11 = 1 / x1_1;
  if (mi_a11 !== 1)
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
  console.table([...tempMat]);

  steps.step1 = [
    mi_a11 !== 1 && {
      swap: swapData.step1,
      matrixLabel,
      finalMatrix: fracMat(tempMat),
      rule: `R1 * (${frac(mi_a11)}) → R1`,
      steps: [
        `a11 = (${frac(x1_1)})(${frac(mi_a11)}) = ${frac(x1_1)}`,
        `a12 = (${frac(x2_1)})(${frac(mi_a11)}) = ${frac(x2_1)}`,
        `a13 = (${frac(x3_1)})(${frac(mi_a11)}) = ${frac(x3_1)}`,
        `a14 = (${frac(sol_1)})(${frac(mi_a11)}) = ${frac(sol_1)}`,
      ],
      comment: `Normalizing the first row by multiply it by ${frac(mi_a11)} to yield`,
    },
    x1_2 != 0 && {
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
    x1_3 != 0 && {
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

  tempMat = fracToNumMat(steps.step1[steps.step1.length - 1].finalMatrix || tempMat);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  handelPP(2, 2);

  const mi_a22 = 1 / x2_2;
  if (mi_a22 !== 1)
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
    mi_a22 != 1 && {
      matrixLabel,
      rule: `R2 * (${frac(mi_a22)}) → R2`,
      swap: swapData.step2,
      finalMatrix: fracMat(tempMat),
      steps: [
        `a21 = (${frac(x1_2)})(${frac(mi_a22)}) = ${frac(x1_2)}`,
        `a22 = (${frac(x2_2)})(${frac(mi_a22)}) = ${frac(x2_2)}`,
        `a23 = (${frac(x3_2)})(${frac(mi_a22)}) = ${frac(x3_2)}`,
        `a24 = (${frac(sol_2)})(${frac(mi_a22)}) = ${frac(sol_2)}`,
      ],
      comment: `Normalizing the second row by multiply it by ${frac(mi_a22)} to yield`,
    },
    x2_1 != 0 && {
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
    x2_3 != 0 && {
      matrixLabel,
      rule: `R3 - (${frac(x2_3Rule)} * R2) → R3`,
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

  tempMat = fracToNumMat(steps.step2[steps.step2.length - 1].finalMatrix || tempMat);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  const mi_a33 = 1 / x3_3;
  if (mi_a33 !== 1)
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
    mi_a33 != 1 && {
      matrixLabel,
      rule: `R3 * (${frac(mi_a33)}) → R3`,
      finalMatrix: fracMat(tempMat),
      steps: [
        `a31 = (${frac(x1_3)})(${frac(mi_a33)}) = ${frac(x1_3)}`,
        `a32 = (${frac(x2_3)})(${frac(mi_a33)}) = ${frac(x2_3)}`,
        `a33 = (${frac(x3_3)})(${frac(mi_a33)}) = ${frac(x3_3)}`,
        `a34 = (${frac(sol_3)})(${frac(mi_a33)}) = ${frac(sol_3)}`,
      ],
      comment: `Normalizing the third row by multiply it by ${frac(mi_a33)} to yield`,
    },
    x3_2 != 0 && {
      matrixLabel,

      rule: `R2 - (${frac(x3_2Rule)} * R3) → R2`,
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
    x3_1 != 0 && {
      matrixLabel,

      rule: `R1 - (${frac(x3_1Rule)} * R3) → R1`,
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

  tempMat = fracToNumMat(steps.step3[steps.step3.length - 1].finalMatrix || tempMat);

  [x1_1, x2_1, x3_1, sol_1] = tempMat[0];
  [x1_2, x2_2, x3_2, sol_2] = tempMat[1];
  [x1_3, x2_3, x3_3, sol_3] = tempMat[2];

  steps.xsValues = [
    { name: 'x', sub: 1, value: `${frac(sol_1)}${`${sol_1}`.includes('.') ? ` = ${round(sol_1)}` : ''}` },
    { name: 'x', sub: 2, value: `${frac(sol_2)}${`${sol_1}`.includes('.') ? ` = ${round(sol_2)}` : ''}` },
    { name: 'x', sub: 3, value: `${frac(sol_3)}${`${sol_1}`.includes('.') ? ` = ${round(sol_3)}` : ''}` },
  ];

  // console.log(steps);
  return steps;
};

export const cramer = ({ matrix }) => {
  const [x1_1, x2_1, x3_1, sol_1] = matrix[0];
  const [x1_2, x2_2, x3_2, sol_2] = matrix[1];
  const [x1_3, x2_3, x3_3, sol_3] = matrix[2];

  const steps = {};

  // A
  steps.A = {
    matrixLabel: 'A = ',
    matrix: fracMat([
      [x1_1, x2_1, x3_1],
      [x1_2, x2_2, x3_2],
      [x1_3, x2_3, x3_3],
    ]),
  };
  const detA = frac(math.det(steps.A.matrix));
  steps.A.det = `det(A) = ${detA}`;

  // A1
  steps.A1 = {
    matrixLabel: 'A1 = ',
    matrix: fracMat([
      [sol_1, x2_1, x3_1],
      [sol_2, x2_2, x3_2],
      [sol_3, x2_3, x3_3],
    ]),
  };
  const detA1 = frac(math.det(steps.A1.matrix));
  steps.A1.det = `det(A1) = ${detA1}`;

  // A2
  steps.A2 = {
    matrixLabel: 'A2 = ',
    matrix: fracMat([
      [x1_1, sol_1, x3_1],
      [x1_2, sol_2, x3_2],
      [x1_3, sol_3, x3_3],
    ]),
  };
  const detA2 = frac(math.det(steps.A2.matrix));
  steps.A2.det = `det(A2) = ${detA2}`;

  // A3
  steps.A3 = {
    matrixLabel: 'A3 = ',
    matrix: fracMat([
      [x1_1, x2_1, sol_1],
      [x1_2, x2_2, sol_2],
      [x1_3, x2_3, sol_3],
    ]),
  };
  const detA3 = frac(math.det(steps.A3.matrix));
  steps.A3.det = `det(A3) = ${detA3}`;

  const x1 = frac(detA1 / detA);
  const x2 = frac(detA2 / detA);
  const x3 = frac(detA3 / detA);

  steps.xEq = [
    {
      rule: 'x1 = det(A1) / det(A)',
      sub_in_rule: `x1 = (${detA1}) / (${detA})`,
    },
    {
      rule: 'x2 = det(A2) / det(A)',
      sub_in_rule: `x2 = (${detA2}) / (${detA})`,
    },
    {
      rule: 'x3 = det(A3) / det(A)',
      sub_in_rule: `x3 = (${detA3}) / (${detA})`,
    },
  ];

  steps.xValues = [
    { name: 'x', sub: 1, value: x1 },
    { name: 'x', sub: 2, value: x2 },
    { name: 'x', sub: 3, value: x3 },
  ];

  // console.log(steps);
  return steps;
};

// Chapter 3
// export const goldenSection = ({ fx, xl, xu, condition }) => {
//   const ratio = (Math.sqrt(5) - 1) / 2; // Golden ratio constant
//   let [d, x1, x2, i, data] = [0, 0, 0, 0, []];

//   const get_d = (xl, xu) => ratio * (xu - xl);
//   const get_x1 = (xl, d) => xl + d;
//   const get_x2 = (xu, d) => xu - d;

// };

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
