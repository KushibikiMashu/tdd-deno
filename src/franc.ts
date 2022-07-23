export class Franc {
  constructor(private amount: number) {
  }

  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier)
  }

  equals(object: Franc): boolean {
    return this.amount === (object as Franc).amount;
  }
}
