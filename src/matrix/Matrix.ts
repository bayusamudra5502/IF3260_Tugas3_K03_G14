/* a 4x4 Matrix */
export class Matrix extends Array {
  static inverse(matrix: Matrix): Matrix {
    // TODO kawan
    return matrix;
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
}

export const IDENTITY_MATRIX: Matrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
