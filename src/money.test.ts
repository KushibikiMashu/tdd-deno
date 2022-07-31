import { assertEquals, assert, assertFalse } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import {Bank, Expression, Money, Sum} from "./money.ts";

// TODO List
// [x] $5 + 10CHF = $10 (when rate is 2:1)
// [x] $5 + $5 = $10
// [x] Bank.reduce(Money)
// [x] Money を変換して換算を行う
// [x] Reduce(Bank, String)
// [x] Sum.plus
// [x] Expression.times

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

Deno.test('plus returns sum',   () => {
  const five = Money.dollar(5)
  const result = five.plus(five)
  const sum = result as Sum
  assertEquals(five, sum.augend)
  assertEquals(five, sum.addend)
})

Deno.test('reduce sum',   () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4))
  const bank = new Bank()
  const result = bank.reduce(sum, 'USD')
  assertEquals(Money.dollar(7), result)
})

Deno.test('reduce money',   () => {
  const bank = new Bank()
  const result = bank.reduce(Money.dollar(1), 'USD')
  assertEquals(Money.dollar(1), result)
})

Deno.test('reduce money different currency',   () => {
  const bank = new Bank()
  bank.addRate('CFH', 'USD', 2)
  const result = bank.reduce(Money.franc(2), 'USD')
  assertEquals(Money.dollar(1), result)
})

Deno.test('identity rate',   () => {
  assertEquals(1, new Bank().rate('USD', 'USD'))
})

Deno.test('mixed addition',   () => {
  const fiveBucks: Expression = Money.dollar(5)
  const tenFrancs: Expression = Money.franc(10)
  const bank = new Bank()
  bank.addRate('CHF', 'USD', 2)
  const result = bank.reduce(fiveBucks.plus(tenFrancs), 'USD')
  assertEquals(Money.dollar(10), result)
})

Deno.test('sum plus money',   () => {
  const fiveBucks: Expression = Money.dollar(5)
  const tenFrancs: Expression = Money.franc(10)
  const bank = new Bank()
  bank.addRate('CHF', 'USD', 2)
  const sum = new Sum(fiveBucks, tenFrancs).plus(fiveBucks)
  const result = bank.reduce(sum, 'USD')
  assertEquals(Money.dollar(15), result)
})

Deno.test('sum times',   () => {
  const fiveBucks: Expression = Money.dollar(5)
  const tenFrancs: Expression = Money.franc(10)
  const bank = new Bank()
  bank.addRate('CHF', 'USD', 2)
  const sum = new Sum(fiveBucks, tenFrancs).times(2)
  const result = bank.reduce(sum, 'USD')
  assertEquals(Money.dollar(20), result)
})
