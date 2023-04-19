/* a 4x4 Matrix */
export class Matrix extends Array {
  static inverse(matrix: Matrix): Matrix {
    // create a copy of the matrix
    const copy = matrix.map((row) => [...row]);
    const result = IDENTITY_MATRIX.map((row) => [...row]);

    // loop through each row
    for (let i = 0; i < copy.length; i++) {
      // find the row with the largest first element
      let largest = i;
      for (let j = i + 1; j < copy.length; j++) {
        if (Math.abs(copy[j][i]) > Math.abs(copy[largest][i])) {
          largest = j;
        }
      }

      // swap the rows
      [copy[i], copy[largest]] = [copy[largest], copy[i]];
      [result[i], result[largest]] = [result[largest], result[i]];

      // divide the row by the first element
      const divisor = copy[i][i];
      for (let j = 0; j < copy.length; j++) {
        copy[i][j] /= divisor;
        result[i][j] /= divisor;
      }

      // subtract the row from all other rows
      for (let j = 0; j < copy.length; j++) {
        if (j !== i) {
          const multiplier = copy[j][i];
          for (let k = 0; k < copy.length; k++) {
            copy[j][k] -= copy[i][k] * multiplier;
            result[j][k] -= result[i][k] * multiplier;
          }

          // set the first element to 0
          copy[j][i] = 0;
        }
      }
    }

    return result;
  }

  static transpose(m: Matrix): Matrix {
    return [
      [m[0][0], m[1][0], m[2][0], m[3][0]],
      [m[0][1], m[1][1], m[2][1], m[3][1]],
      [m[0][2], m[1][2], m[2][2], m[3][2]],
      [m[0][3], m[1][3], m[2][3], m[3][3]],
    ];
  }

  static multiply(m1: Matrix, m2: Matrix): Matrix {
    const result = [];

    for (let i = 0; i < m1.length; i++) {
      result.push([]);
      for (let j = 0; j < m2[0].length; j++) {
        result[i].push(0);
      }
    }

    for (let i = 0; i < m1.length; i++) {
      for (let j = 0; j < m2[0].length; j++) {
        for (let k = 0; k < m1[0].length; k++) {
          result[i][j] += m1[i][k] * m2[k][j];
        }
      }
    }

    return result;
  }

  static scalarMultiply(m: Matrix, scalar: number) {
    return [
      [m[0][0] * scalar, m[0][1] * scalar, m[0][2] * scalar, m[0][3] * scalar],
      [m[1][0] * scalar, m[1][1] * scalar, m[1][2] * scalar, m[1][3] * scalar],
      [m[2][0] * scalar, m[2][1] * scalar, m[2][2] * scalar, m[2][3] * scalar],
      [m[3][0] * scalar, m[3][1] * scalar, m[3][2] * scalar, m[3][3] * scalar],
    ];
  }

  static add(m1: Matrix, m2: Matrix) {
    return [
      [
        m1[0][0] + m2[0][0],
        m1[0][1] + m2[0][1],
        m1[0][2] + m2[0][2],
        m1[0][3] + m2[0][3],
      ],
      [
        m1[1][0] + m2[1][0],
        m1[1][1] + m2[1][1],
        m1[1][2] + m2[1][2],
        m1[1][3] + m2[1][3],
      ],
      [
        m1[2][0] + m2[2][0],
        m1[2][1] + m2[2][1],
        m1[2][2] + m2[2][2],
        m1[2][3] + m2[2][3],
      ],
      [
        m1[3][0] + m2[3][0],
        m1[3][1] + m2[3][1],
        m1[3][2] + m2[3][2],
        m1[3][3] + m2[3][3],
      ],
    ];
  }

  static interpolate(m1: Matrix, m2: Matrix, p: number) {
    const pm1 = Matrix.scalarMultiply(m1, 1 - p);
    const pm2 = Matrix.scalarMultiply(m2, p);

    return Matrix.add(pm1, pm2);
  }
}

export const IDENTITY_MATRIX: Matrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
