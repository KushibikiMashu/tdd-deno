import { assert } from "https://deno.land/std@0.149.0/testing/asserts.ts";

// TODO list
// [x] run test method
// [x] run setUp first
// [x] run tearDown after
// [ ] run tearDown even if a test failed
// [ ] run multiple tests
// [x] output collected test results
// [x] log string at WasRun
// [x] output failed test
// [ ] catch setUp error to output it
// [ ] create TestSuite from TestCase

class TestSuite {
  tests: WasRun[];

  constructor() {
    this.tests = [];
  }

  add(test: WasRun) {
    this.tests = [...this.tests, test];
  }

  run(result: TestResult) {
    for (const test of this.tests) {
      test.run(result);
    }
  }
}

class TestResult {
  runCount: number;
  errorCount: number;

  constructor() {
    this.runCount = 0;
    this.errorCount = 0;
  }

  testStarted() {
    this.runCount++;
  }

  testFailed() {
    this.errorCount++;
  }

  summary() {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}

class TestCase {
  constructor(private name: string) {
  }

  setUp() {
  }

  run = (result: TestResult) => {
    result.testStarted();
    this.setUp();

    try {
      const method = this[this.name];
      method();
    } catch (_e) {
      result.testFailed();
    }
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

  testBrokenMethod = () => {
    throw new Error();
  };

  tearDown() {
    this.log = this.log + "tearDown ";
  }
}

class TestCaseTest extends TestCase {
  private result: TestResult;

  setUp() {
    this.result = new TestResult();
  }

  testTemplateMethod = () => {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert("setUp testMethod tearDown " === test.log);
  };

  testResult = () => {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert("1 run, 0 failed" === this.result.summary());
  };

  testFailedResult = () => {
    const test = new WasRun("testBrokenMethod");
    test.run(this.result);
    assert("1 run, 1 failed" === this.result.summary());
  };

  testFailedResultFormatting = () => {
    this.result.testStarted();
    this.result.testFailed();
    assert("1 run, 1 failed" === this.result.summary());
  };

  testSuite = () => {
    const suite = new TestSuite();
    suite.add(new WasRun("testMethod"));
    suite.add(new WasRun("testBrokenMethod"));
    suite.run(this.result);
    assert("2 run, 1 failed" === this.result.summary());
  };
}

const suite = new TestSuite();
suite.add(new TestCaseTest("testTemplateMethod"));
suite.add(new TestCaseTest("testResult"));
suite.add(new TestCaseTest("testFailedResult"));
suite.add(new TestCaseTest("testFailedResultFormatting"));
suite.add(new TestCaseTest("testSuite"));

const result = new TestResult();
suite.run(result);
console.log(result.summary());
