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

type Method = "run" | "testTemplateMethod" | "testResult" | "testFailedResult";

class TestResult {
  constructor(
    private runCount: number = 0,
    private errorCount: number = 0,
  ) {
  }

  testStarted() {
    this.runCount++
  }

  testFailed() {
    this.errorCount++
  }

  summary() {
    return `${this.runCount} run, ${this.errorCount} failed`
  }
}

class TestCase {
  constructor(private name: Method) {
  }

  setUp() {
  }

  run = () => {
    const result = new TestResult()
    result.testStarted()
    this.setUp();

    try {
      const method = (this as any)[this.name];
      method();
    } catch (e) {
      result.testFailed()
    }
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

class TestCaseTest extends TestCase {
  testTemplateMethod() {
    const test = new WasRun("testMethod");
    test.run();
    assert("setUp testMethod tearDown " === test.log);
  };

  testResult() {
    const test = new WasRun("testMethod");
    const result = test.run();
    assert("1 run, 0 failed" === result.summary());
  };

  testFailedResult() {
    const test = new WasRun("testBrokenMethod");
    const result = test.run();
    assert("1 run, 1 failed" === result.summary());
  };

  testFailedResultFormatting() {
    const result = new TestResult()
    result.testStarted()
    result.testFailed()
    assert("1 run, 1 failed" === result.summary());
  }
}

new TestCaseTest("testTemplateMethod").run();
new TestCaseTest("testResult").run();
// new TestCaseTest("testFailedResult").run();
// new TestCaseTest("testFailedResultFormatting").run();

console.log(new TestCaseTest("testTemplateMethod").run().summary())
console.log(new TestCaseTest("testResult").run().summary())
console.log(new TestCaseTest("testFailedResult").run().summary())
console.log(new TestCaseTest("testFailedResultFormatting").run().summary())

