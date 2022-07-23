export class Dollar {
  constructor(private amount: number) {
  }

  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier)
  }

  equals(object: Dollar): boolean {
    return this.amount === (object as Dollar).amount;
  }
}
