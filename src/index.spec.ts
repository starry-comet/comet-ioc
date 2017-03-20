import { ok, equal } from 'assert'
import { Injectable, Inject, bootstrap } from './index'

@Injectable()
class Test {}

@Injectable()
class Test2 {}

@Injectable()
class App {

  @Inject(Test)
  public test: Test

  @Inject(Test2)
  public test2: Test2

  @Inject('pi')
  public pi: number

  @Inject('e')
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
