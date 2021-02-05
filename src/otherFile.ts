
export function add(a: number, b: number): number {
  return a + b;
}

export function sub(c:number, d:number): number {
  return c - d;
}

export default class Person {
  public firstName: string;

  constructor(name: string) {
    this.firstName = name;
  }
}