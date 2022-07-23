import {Money} from "./money.ts";

export class Dollar extends Money {
  constructor(protected amount: number) {
    super(amount)
  }

  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier)
  }
}
