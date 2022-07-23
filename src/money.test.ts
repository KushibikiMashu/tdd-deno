import { assertEquals, assert, assertFalse } from "https://deno.land/std@0.149.0/testing/asserts.ts";
import {Dollar} from "./money.ts";

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

Deno.test('multiplication',   () => {
  const five = new Dollar(5);
  assertEquals(new Dollar(10), five.times(2))
  assertEquals(new Dollar(15), five.times(3))
})

Deno.test('equality', () => {
  assert(new Dollar(5).equals(new Dollar(5)))
  assertFalse(new Dollar(5).equals(new Dollar(6)))
})
