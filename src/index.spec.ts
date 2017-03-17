import { ok, equal } from 'assert'
import { injectable, inject, bootstrap } from './index'

@injectable()
class Test {}

@injectable()
class Test2 {}

@injectable()
class App {

  @inject(Test)
  public test: Test

  @inject(Test2)
  public test2: Test2

  @inject('pi')
  public pi: number

  @inject('e')
  public e: number
}

describe('Launch bootstrap', function() {
  let app: App

  before('bootstrap', function() {
    app = bootstrap(App, {
      declarations: [Test],
      constants: [{
        provide: 'pi',
        useValue: Math.PI
      }],

      imports:[{
        declarations: [Test2]
      }],

      providers: [{
        provide: 'e',
        useFactory() {
          return Math.E
        }
      }]
    })
  })

  it('Declarations', function() {
    ok(app.test instanceof Test, 'Injection failed')
  })

  it('Imports', function() {
    ok(app.test2 instanceof Test2, 'Injection failed')
  })

  it('Constants', function() {
    equal(app.pi, Math.PI, 'Injection failed')
  })

  it('Providers', function() {
    equal(app.e, Math.E, 'Injection failed')
  })
})
