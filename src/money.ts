export class Money {
  constructor(protected amount: number) {
  }

  equals(object: Money): boolean {
    return this.amount === (object as Money).amount
      // "object instanceof this" doesn't work so comparing both class names here.
      && object.constructor.name === this.constructor.name;
  }
}
