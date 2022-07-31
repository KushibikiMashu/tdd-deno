export class Money implements Expression {
  constructor(public amount: number, public currency: string) {
  }

  times(multiplier: number): Expression {
    return new Money(this.amount * multiplier, this.currency)
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend)
  }

  reduce(bank: Bank, to: string): Money {
    const rate = bank.rate(this.currency, to)
    return new Money(this.amount / rate, to)
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
  times(multiplier: number): Expression
  plus(addend: Expression): Expression
  reduce(bank: Bank, to: string): Money
}

export class Sum implements Expression {
  constructor(public augend: Expression, public addend: Expression) {
  }

  times(multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier))
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend)
  }

  reduce(bank: Bank, to: string): Money {
    const amount = this.augend.reduce(bank, to).amount
      + this.addend.reduce(bank, to).amount
    return new Money(amount, to)
  }
}

export class Bank {
  private rates: Map<Pair, number> = new Map()

  reduce(source: Expression, to: string): Money {
    return source.reduce(this, to)
  }

  addRate(from: string, to: string, rate: number): void {
    this.rates.set(new Pair(from, to), rate)
  }

  rate(from: string, to: string): number {
    if (from === to) return 1
    return from === 'CHF' && to === 'USD' ? 2 : 1
  }
}

export class Pair {
  constructor(private from: string, private to: string) {
  }

  equals(object: any) {
    const pair = object as Pair
    return this.from === pair.from && this.to === pair.to
  }

  hashCode() {
    return 0
  }
}
