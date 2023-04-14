// import { Matrix } from "../matrix/Matrix";

// export const m4 = {
//   identity: function (): Array<number> {
//     return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
//   },

//   toArray: function (m: Matrix): Array<number> {
//     let array = [];
//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         array.push(m[i][j]);
//       }
//     }
//     return array;
//   },

//   toMatrix: function (array: Array<number>): Matrix {
//     let m = [];
//     for (let i = 0; i < 4; i++) {
//       m.push(array.slice(i * 4, i * 4 + 4));
//     }
//     return m;
//   },

//   translation: function (tx: number, ty: number, tz: number): Array<number> {
//     return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
//   },

//   xRotation: function (angleInRadians: number) {
//     const c = Math.cos(angleInRadians);
//     const s = Math.sin(angleInRadians);

//     return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
//   },

//   yRotation: function (angleInRadians: number) {
//     const c = Math.cos(angleInRadians);
//     const s = Math.sin(angleInRadians);

//     return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
//   },

//   zRotation: function (angleInRadians: number) {
//     const c = Math.cos(angleInRadians);
//     const s = Math.sin(angleInRadians);

//     return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
//   },

//   translate: function (m: Array<number>, tx: number, ty: number, tz: number) {
//     return m4.multiply(m, m4.translation(tx, ty, tz));
//   },

//   rotate: function (
//     m: Array<number>,
//     xAngle: number,
//     yAngle: number,
//     zAngle: number
//   ) {
//     m = m4.xRotation(xAngle);
//     m = m4.yRotate(m, yAngle);
//     m = m4.zRotate(m, zAngle);
//     return m;
//   },

//   xRotate: function (m: Array<number>, angleInRadians: number) {
//     return m4.multiply(m, m4.xRotation(angleInRadians));
//   },

//   yRotate: function (m: Array<number>, angleInRadians: number) {
//     return m4.multiply(m, m4.yRotation(angleInRadians));
//   },

//   zRotate: function (m: Array<number>, angleInRadians: number) {
//     return m4.multiply(m, m4.zRotation(angleInRadians));
//   },

//   multiply: function (b: Array<number>, a: Array<number>) {
//     let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//     for (let i = 0; i < 4; i++) {
//       for (let j = 0; j < 4; j++) {
//         let sum = 0;
//         for (let k = 0; k < 4; k++) {
//           sum += a[i * 4 + k] * b[k * 4 + j];
//         }
//         result[i * 4 + j] = sum;
//       }
//     }

//     return result;
//   },

//   lookAt: function (
//     cameraPosition: Array<number>,
//     target: Array<number>,
//     up: Array<number>
//   ) {
//     const zAxis = vec3.normalize(vec3.subtract(cameraPosition, target));
//     const xAxis = vec3.normalize(vec3.cross(up, zAxis));
//     const yAxis = vec3.normalize(vec3.cross(zAxis, xAxis));

//     return [
//       xAxis[0],
//       xAxis[1],
//       xAxis[2],
//       0,
//       yAxis[0],
//       yAxis[1],
//       yAxis[2],
//       0,
//       zAxis[0],
//       zAxis[1],
//       zAxis[2],
//       0,
//       cameraPosition[0],
//       cameraPosition[1],
//       cameraPosition[2],
//       1,
//     ];
//   },
// };

// const vec3 = {
//   cross: function (a: Array<number>, b: Array<number>) {
//     return [
//       a[1] * b[2] - a[2] * b[1],
//       a[2] * b[0] - a[0] * b[2],
//       a[0] * b[1] - a[1] * b[0],
//     ];
//   },

//   subtract: function (a: Array<number>, b: Array<number>) {
//     let result = [];
//     for (let i = 0; i < a.length; i++) {
//       result.push(a[i] - b[i]);
//     }
//     return result;
//   },

//   normalize: function (v: Array<number>): Array<number> {
//     const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
//     if (length > 0.00001) {
//       return [v[0] / length, v[1] / length, v[2] / length];
//     } else {
//       return [0, 0, 0];
//     }
//   },
// };
