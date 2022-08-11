import { assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";

// TODO list
// [x] run test method
// [x] run setUp first
// [x] run tearDown after
// [ ] run tearDown even if a test failed
// [ ] run multiple tests
// [ ] output collected test results
// [x] log string at WasRun

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
    this.tearDown();
  };

  tearDown() {
  }
}

class WasRun extends TestCase {
  log: string;

  setUp() {
    this.log = "setUp ";
  }

  testMethod = () => {
    this.log = this.log + "testMethod ";
  };

  tearDown() {
    this.log = this.log + "tearDown ";
  }
}

class TestCaseTest extends TestCase {
  testSetUp = () => {
    const test = new WasRun("testMethod");
    test.run();
    assert("setUp testMethod tearDown " === test.log);
  };
}

new TestCaseTest("testSetUp").run();
