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
// [x] To generalize equals method
// [ ] To generalize times method
// [x] To compare Franc and Dollar
// [ ] Concept of currency

Deno.test('multiplication',   () => {
  const five = Money.dollar(5);
  assertEquals(Money.dollar(10), five.times(2))
  assertEquals(Money.dollar(15), five.times(3))
})

Deno.test('equality', () => {
  assert(Money.dollar(5).equals(Money.dollar(5)))
  assertFalse(Money.dollar(5).equals(Money.dollar(6)))
  assert(Money.franc(5).equals(Money.franc(5)))
  assertFalse(Money.franc(5).equals(Money.franc(6)))
  assertFalse(Money.franc(5).equals(Money.dollar(5)))
})

Deno.test('franc multiplication',   () => {
  const five = Money.franc(5);
  assertEquals(Money.franc(10), five.times(2))
  assertEquals(Money.franc(15), five.times(3))
})
