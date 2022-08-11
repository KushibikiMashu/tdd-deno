import { assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";

// TODO list
// [x] run test method
// [ ] run setUp first
// [ ] run tearDown after
// [ ] run tearDown even if a test failed
// [ ] run multiple tests
// [ ] output collected test results

type Flag = string | number | null;
type Method = "run" | "testMethod" | "testRunning";

class TestCase {
  name: Method;

  constructor(name: Method) {
    this.name = name;
  }

  run = () => {
    const method = (this as any)[this.name];
    method();
  };
}

class WasRun extends TestCase {
  wasRun: Flag;

  constructor(name: Method) {
    super(name);
    this.wasRun = null;
  }

  testMethod = () => {
    this.wasRun = 1;
  };
}

class TestCaseTest extends TestCase {
  testRunning() {
    const test = new WasRun("testMethod");
    assert(!test.wasRun);
    test.run();
    assert(test.wasRun);
  }
}

new TestCaseTest("testRunning").run();
