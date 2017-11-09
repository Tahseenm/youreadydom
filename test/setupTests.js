/**
 * Minimal browser Document mock enviroment for tests
 */
global.document = {
  readyState: 'loading',
  documentElement: {},

  /** :: (event: string, listener: Function) -> void */
  addEventListener: jest.fn(),

  /** :: (event: string, listener: Function) -> void */
  removeEventListener: jest.fn(),
}
