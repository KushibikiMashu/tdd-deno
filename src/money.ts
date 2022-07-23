export abstract class Money {
  constructor(protected amount: number, protected currency: string) {
  }

  abstract times(multiplier: number): Money;
  getCurrency(): string{
    return this.currency
  }

  equals(object: Money): boolean {
    return this.amount === (object as Money).amount
      // "object instanceof this" doesn't work so comparing both class names here.
      && object.constructor.name === this.constructor.name;
  }

  static dollar(amount: number): Money {
    return new Dollar(amount,  'USD')
  }

  static franc(amount: number): Money {
    return new Franc(amount, 'CHF')
  }
}

export class Dollar extends Money {
  constructor(protected amount: number, protected currency: string) {
    super(amount, currency)
  }

  times(multiplier: number): Money {
    return Money.dollar(this.amount * multiplier)
  }
}

export class Franc extends Money {
  constructor(protected amount: number, protected currency: string) {
    super(amount, currency)
  }

  times(multiplier: number): Money {
    return Money.franc(this.amount * multiplier)
  }
}
