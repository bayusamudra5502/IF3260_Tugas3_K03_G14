export class Geometry {
  static angleDegToRad(degree: number): number {
    return (degree / 180) * Math.PI;
  }

  static angleRadToDeg(rads: number): number {
    return (rads / Math.PI) * 180;
  }
}
