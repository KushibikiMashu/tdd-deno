import {assert} from "https://deno.land/std@0.149.0/testing/asserts.ts";

// TODO list
// [x] run test method
// [x] run setUp before test
// [x] run tearDown after test
// [ ] run tearDown even if a test failed
// [x] run multiple tests
// [ ] output collected test results
// [ ] log string at WasRun
// [ ] output failed test
// [ ] catch setUp error to output it
// [ ] create TestSuite from TestCase

class TestResult {
  logger: TestLogger

  constructor(private testCount: number = 0, private failedCount: number = 0) {
    this.logger = new TestLogger()
  }

  start() {
    this.testCount++
  }

  failed() {
    this.failedCount++
  }

  log (method: string, e: Error) {
    this.logger.add(method, e)
  }

  summary() {
    const sum = `${this.testCount} run, ${this.failedCount} failed.`
    const list = this.logger.list()

    if (list === '') {
      return sum
    }

    return `${sum}

${list}`
  }
}

class TestLogger {
  constructor(private logs: string [] = []) {
  }

  add (method: string, e: Error) {
    const log = `${method}: ${e}`
    this.logs = [...this.logs, log]
  }

  list () {
    return this.logs.join('\n\n')
  }
}

class TestRunner {
  constructor(private testCase: TestCase) {
  }

  run() {
    const result = new TestResult()
    this.testCase.run(result)
    return result.summary()
  }
}

class TestCase {
  setUp() {

  }

  tearDown() {

  }

  run(result: TestResult) {
    // テストメソッドを取得
    const proto = Object.getPrototypeOf(this)
    const testMethods = Object.getOwnPropertyNames(proto)
      .filter((method) => method.startsWith('test'))

    // 全てのテストを実行
    for (const method of testMethods) {
      result.start()
      this.setUp()

      try {
        this[method]()
      } catch (e) {
        result.log(method, e)
        result.failed()
      }

      this.tearDown()
    }
  }
}

class Counter {
  add(a: number, b: number): number {
    return a + b
  }
}

class CounterTest extends TestCase {
  counter: Counter

  setUp() {
    super.setUp()
    this.counter = new Counter()
  }

  test_shouldReturnTwo() {
    const actual = this.counter.add(1, 1)
    assert(2 === actual)
  }

  test_shouldReturnTwenty() {
    const actual = this.counter.add(10, 10)
    assert(20 === actual)
  }

  test_throwError() {
    const actual = this.counter.add(1, 1)
    assert(0 === actual)
  }
}

console.log(new TestRunner(new CounterTest()).run())

// 実装クラス
// テストを実施するクラス
// テストに必要な便利なメソッドを持っている親クラス
