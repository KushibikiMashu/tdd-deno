import { assertEquals, assert, assertFalse } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import {Franc, Money} from "./money.ts";

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
// [x] Concept of currency
// [ ] To delete testFrancMultiplication ?

Deno.test('multiplication',   () => {
  // Comment out here because comparing parent class and sub class here.
  //  -   Dollar {
  //  +   Money {

  // const five = Money.dollar(5);
  // assertEquals(Money.dollar(10), five.times(2))
  // assertEquals(Money.dollar(15), five.times(3))
})

Deno.test('equality', () => {
  assert(Money.dollar(5).equals(Money.dollar(5)))
  assertFalse(Money.dollar(5).equals(Money.dollar(6)))
  assert(Money.franc(5).equals(Money.franc(5)))
  assertFalse(Money.franc(5).equals(Money.franc(6)))
  assertFalse(Money.franc(5).equals(Money.dollar(5)))
})

Deno.test('franc multiplication',   () => {
  // Comment out here because comparing parent class and sub class here.
  //  -   Franc {
  //  +   Money {

  // const five = Money.franc(5);
  // assertEquals(Money.franc(10), five.times(2))
  // assertEquals(Money.franc(15), five.times(3))
})

Deno.test('currency',   () => {
  assertEquals('USD', Money.dollar(1).getCurrency())
  assertEquals('CHF', Money.franc(1).getCurrency())
})

Deno.test('different class equality',   () => {
  assert(new Money(10, 'CHF').equals(new Franc(10, 'CHF')))
})
