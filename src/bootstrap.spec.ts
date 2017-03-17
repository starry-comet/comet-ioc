import { ok } from 'assert'
import { bootstrap } from './bootstrap'
import { injectable, inject } from 'inversify'

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
