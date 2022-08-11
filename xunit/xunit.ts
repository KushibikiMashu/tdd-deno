import { assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";

// TODO list
// [x] run test method
// [x] run setUp first
// [x] run tearDown after
// [ ] run tearDown even if a test failed
// [ ] run multiple tests
// [x] output collected test results
// [x] log string at WasRun

type Method = "run" | "testTemplateMethod" | "testResult" | "testFailedResult";

class TestCase {
  name: Method;

  constructor(name: Method) {
    this.name = name;
  }

  setUp() {
  }

  run = () => {
    const result = new TestResult()
    result.testStarted()
    this.setUp();
    const method = (this as any)[this.name];
    method();
    this.tearDown();

    return result
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

  testBrokenMethod = () => {
    throw new Error()
  }

  tearDown() {
    this.log = this.log + "tearDown ";
  }
}

class TestResult {
  constructor(private runCount: number = 0) {
  }

  testStarted() {
    this.runCount++
  }

  summary() {
    return `${this.runCount} run, 0 failed`
  }
}

class TestCaseTest extends TestCase {
  testTemplateMethod = () => {
    const test = new WasRun("testMethod");
    test.run();
    assert("setUp testMethod tearDown " === test.log);
  };

  testResult = () => {
    const test = new WasRun("testMethod");
    const result = test.run();
    assert("1 run, 0 failed" === result.summary());
  };

  testFailedResult = () => {
    const test = new WasRun("testBrokenMethod");
    const result = test.run();
    assert("1 run, 1 failed" === result.summary());
  };
}

new TestCaseTest("testTemplateMethod").run();
new TestCaseTest("testResult").run();
// new TestCaseTest("testFailedResult").run();
