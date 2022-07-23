import { assertEquals, assert, assertFalse } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import {Bank, Money} from "./money.ts";

// TODO List
// [ ] $5 + 10CHF = $10 (when rate is 2:1)
// [ ] $5 + $5 = $10

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

Deno.test('simple addition',   () => {
  const five = Money.dollar(5)
  const sum = five.plus(five)
  const bank = new Bank();
  const reduced = bank.reduce(sum, 'USD')
  assertEquals(Money.dollar(10), reduced)
})
