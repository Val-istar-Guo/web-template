interface Snapshot {
  prod: boolean
  dev: boolean
  not: Snapshot
}

class Env {
  private variable: () => string

  constructor(variable = () => (process.env.NODE_ENV || 'development')) {
    this.variable = variable
  }

  get is(): Snapshot {
    const value = this.variable()

    const prod = value === 'production'
    const dev = value !== 'production'

    const snapshot = {
      prod,
      dev,
      get not() {
        return {
          prod: !this.prod,
          dev: !this.dev,
          get not() {
            return snapshot
          },
        }
      },
    }

    return snapshot
  }
}

export default new Env()
