import 'reflect-metadata'
import { Container, interfaces } from 'inversify'

// IoC container in cache
const container = new Container()

/**
 * bootstrap your application
 * @param {interfaces.Newable<T>} mainClass main class to bootstrap
 * @param {interfaces.Newable<any>[]} dependencies all dependencies needed to your project
 * @return {T} the instanciate main class
 */
export function bootstrap<T>(mainClass: interfaces.Newable<T>, dependencies: interfaces.Newable<any>[]): T {
  container.bind(mainClass).toSelf()
  dependencies.forEach(dependency => container.bind(dependency).toSelf())

  return container.get<T>(mainClass)
}
