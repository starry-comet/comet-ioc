import { ok } from 'assert'
import { injectable, inject, bootstrap } from './index'

@injectable()
class Test {}

@injectable()
class App {

  @inject(Test)
  public test: Test
}

describe('Launch bootstrap', function() {
  it('Bootstrap', function() {
    ok(bootstrap(App, [Test]).test instanceof Test, 'Injection failed')
  })
})