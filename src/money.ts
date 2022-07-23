export abstract class Money {
  constructor(protected amount: number) {
  }

  abstract times(multiplier: number): Money;

  equals(object: Money): boolean {
    return this.amount === (object as Money).amount
      // "object instanceof this" doesn't work so comparing both class names here.
      && object.constructor.name === this.constructor.name;
  }

  static dollar(amount: number): Money {
    return new Dollar(amount)
  }

  static franc(amount: number): Money {
    return new Franc(amount)
  }
}

export class Dollar extends Money {
  constructor(protected amount: number) {
    super(amount)
  }

  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier)
  }
}

export class Franc extends Money {
  constructor(protected amount: number) {
    super(amount)
  }

  times(multiplier: number): Money {
    return new Franc(this.amount * multiplier)
  }
}
