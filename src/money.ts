export class Money {
  constructor(protected amount: number, protected currency: string) {
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency)
  }

  getCurrency(): string {
    return this.currency
  }

  equals(object: Money): boolean {
    return this.amount === (object as Money).amount
      // "object instanceof this" doesn't work so comparing both class names here.
      && object.getCurrency() === this.getCurrency();
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
}

export class Franc extends Money {
  constructor(protected amount: number, protected currency: string) {
    super(amount, currency)
  }
}
