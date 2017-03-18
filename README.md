# comet-ioc
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b3479b6ee6ff4fc4857e25f105b013f8)](https://www.codacy.com/app/miton18/comet-ioc?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=starry-comet/comet-ioc&amp;utm_campaign=Badge_Grade) [![NSP Status](https://nodesecurity.io/orgs/starry-comet/projects/044892a8-b223-4838-937c-f0a7b1c4c255/badge)](https://nodesecurity.io/orgs/starry-comet/projects/044892a8-b223-4838-937c-f0a7b1c4c255) [![Build Status](https://travis-ci.org/starry-comet/comet-ioc.svg?branch=master)](https://travis-ci.org/starry-comet/comet-ioc)

<p align="center">
  <img height="200" src="https://github.com/starry-comet/comet/blob/master/resources/images/comet.png?raw=true">
</p>

## Roles

This project has to main goal to provide utility tools to inversify and a dynamic registration of dependencies.

## Usage

This project is based on [inversify](http://inversify.io).

### Simple usage

To understand how works this project, below there is an example.

```ts
import {inject, injectable, bootstrap} from 'comet-ioc'

@injectable()
export class A {
  hi() {
    console.log('hi !')
  }
}

@injectable()
export class B {
  constructor(@inject(A) a: A) {
    a.hi()
  }
}

bootstrap(B, {
  declarations: [
    A
  ]
})
```

result:
```
hi !
```

### Advance usage

You can also use constant or factory to provide classes, below an example:

```ts
import {inject, injectable, bootstrap, interfaces} from 'comet-ioc'

const hi: symbol = Symbol('hi')
const log: symbol = Symbol('log')

@injectable()
export class A {
  hi() {
    this.log(this.hi)
  }

  @inject(hi)
  private hi: string

  @inject(log)
  private log: Function
}

@injectable()
export class B {
  constructor(@inject(A) a: A) {
    a.hi()
  }
}

bootstrap(B, {
  declarations: [
    A
  ],

  constants: [{
    provide: hi,
    useValue: 'hi !'
  }],

  providers: [{
    provide: log,
    useFactory(context: interfaces.Context) {
      return console.log
    }
  }]
})
```

result:
```
hi !
```
### Import / Export usage

```ts
import {inject, injectable, bootstrap, IBootstrapDependencies} from 'comet-ioc'

@injectable()
class A {
  hi() {
    console.log('hi !')
  }
}

@injectable()
class B {
  constructor(@inject(A) a: A) {
    a.hi()
  }
}

export const FakeModule: IBootstrapDependencies = {
  declarations: [A, B]
}
```

```ts
import {bootstrap, injectable, inject} from 'comet-ioc'
import {FakeModule} from 'comet-ioc-fake'

@injectable()
class App {
  constructor(@inject(A) a: A) { }
}

bootstrap(App, {
  imports: [FakeModule]
})
```

result:
```
hi !
```
