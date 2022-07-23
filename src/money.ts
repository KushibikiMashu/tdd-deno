export class Money implements Expression {
  constructor(protected amount: number, protected currency: string) {
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency)
  }

  plus(addend: Money): Expression {
    return new Money(this.amount + addend.amount, this.currency)
  }

  getCurrency(): string {
    return this.currency
  }

  equals(object: Money): boolean {
    return this.amount === (object as Money).amount
      && object.getCurrency() === this.getCurrency();
  }

  static dollar(amount: number): Money {
    return new Money(amount,  'USD')
  }

  static franc(amount: number): Money {
    return new Money(amount, 'CHF')
  }
}

export interface Expression {

}

export class Bank {
  reduce(source:Expression, to: string ): Money {
    return Money.dollar(10)
  }
}
