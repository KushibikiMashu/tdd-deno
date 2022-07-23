import { assertEquals, assert, assertFalse } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import { Money } from "./money.ts";

// TODO List
// [ ] $5 + 10CHF = $10 (when rating is 2:1)
// [x] $5 * 2 = $10
// [x] To make amount prop private
// [x] How to deal with a side effect of Dollar?
// [ ] How to deal with rounding of Money?
// [x] equals()
// [ ] hashCode()
// [ ] To evaluate equality to null
// [ ] To evaluate equality to other objects
// [x] Duplication of Dollar and Franc
// [x] To generalize equals method
// [x] To generalize times method
// [x] To compare Franc and Dollar
// [x] Concept of currency
// [x] should delete testFrancMultiplication ?

Deno.test('multiplication',   () => {
  const five = Money.dollar(5);
  assertEquals(Money.dollar(10), five.times(2))
  assertEquals(Money.dollar(15), five.times(3))
})

Deno.test('equality', () => {
  assert(Money.dollar(5).equals(Money.dollar(5)))
  assertFalse(Money.dollar(5).equals(Money.dollar(6)))
  assertFalse(Money.franc(5).equals(Money.dollar(5)))
})

Deno.test('currency',   () => {
  assertEquals('USD', Money.dollar(1).getCurrency())
  assertEquals('CHF', Money.franc(1).getCurrency())
})
