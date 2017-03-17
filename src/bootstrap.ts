import 'reflect-metadata'
import { Container, interfaces } from 'inversify'

export interface IBootstrapDynamicProviders<T> {
  provide: symbol | string | interfaces.Newable<T>,
  useFactory(context: interfaces.Context): T
}

export interface IBootstrapConstantDependencies<T> {
  provide: symbol | string | interfaces.Newable<T>,
  useValue: T
}

export interface IBootstrapDependencies {
  declarations?: interfaces.Newable<any>[],
  constants?: IBootstrapConstantDependencies<any>[]
  providers?: IBootstrapDynamicProviders<any>[]
}

// IoC container in cache
const container = new Container()

/**
 * bootstrap your application
 * @param {interfaces.Newable<T>} mainClass main class to bootstrap
 * @param {interfaces.Newable<any>[]} dependencies all dependencies needed to your project
 * @return {T} the instanciate main class
 */
export function bootstrap<T>(mainClass: interfaces.Newable<T>, dependencies: IBootstrapDependencies): T {
  if (dependencies.constants) {
    dependencies
      .constants
      .forEach(constant => container.bind(constant.provide).toConstantValue(constant.useValue))
  }

  if (dependencies.providers) {
    dependencies
      .providers
      .forEach(provider => container.bind(provider.provide).toDynamicValue(provider.useFactory))
  }

  if (dependencies.declarations) {
    dependencies
      .declarations
      .forEach(declaration => container.bind(declaration).toSelf())
  }

  container.bind(mainClass).toSelf()
  return container.get<T>(mainClass)
}
