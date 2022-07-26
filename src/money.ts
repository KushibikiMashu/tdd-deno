export class Money implements Expression {
  constructor(public amount: number, public currency: string) {
  }

  times(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency)
  }

  plus(addend: Money): Expression {
    return new Sum(this, addend)
  }

  reduce(to: string): Money {
    return this
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
  reduce(to: string): Money
}

export class Sum implements Expression {
  constructor(public augend: Money, public  addend: Money) {
  }

  reduce(to: string): Money {
    const amount = this.augend.amount + this.addend.amount
    return new Money(amount, to)
  }
}

export class Bank {
  reduce(source:Expression, to: string): Money {
    return source.reduce(to)
  }
}
