export class Money {
  constructor(protected amount: number) {
  }

  equals(object: Money): boolean {
    return this.amount === (object as Money).amount;
  }
}
