import { assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";

// TODO list
// [x] run test method
// [x] run setUp first
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

  setUp() {
  }

  run = () => {
    this.setUp();
    const method = (this as any)[this.name];
    method();
  };
}

class WasRun extends TestCase {
  setUp() {
    this.wasRun = null;
    this.wasSetUp = 1;
  }

  testMethod = () => {
    this.wasRun = 1;
  };
}

class TestCaseTest extends TestCase {
  private test: WasRun;

  setUp() {
    this.test = new WasRun("testMethod");
  }

  testRunning = () => {
    this.test.run();
    assert(this.test.wasRun);
  };

  testSetUp = () => {
    this.test.run();
    assert(this.test.wasSetUp);
  };
}

new TestCaseTest("testRunning").run();
new TestCaseTest("testSetUp").run();
