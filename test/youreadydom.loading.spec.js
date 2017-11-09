import domReady from '../src'


/* -------------------------------------------------------------------------- *\
 *   Test Setup
\* -------------------------------------------------------------------------- */

/** Keep track of mockHandlers execution + order of execution */
const handlerExecutions = []

/** Create 10 mock handlers which if executed will push its index to handlerExecutions */
const mockHandlers = Array(10).fill().map((_, i) =>
  () => handlerExecutions.push(i))

/** Second handler will throw */
mockHandlers[1] = () => {
  handlerExecutions.push(1)
  throw new Error('I failed :(')
}

/** Add all the Jest mock functions as domReady handlers */
mockHandlers.forEach(handler => domReady(handler).catch(e => e))



/* -------------------------------------------------------------------------- *\
 *   Tests: Loading -> Loaded
\* -------------------------------------------------------------------------- */

describe('domReady()', () => {
  const setDocToLoaded = () => {
    document.readyState = 'complete'

    /** 'DOMContentLoaded' Listener */
    const domListener = document.addEventListener.mock.calls[0][1]
    domListener()
  }

  it('should return a promise', () => {
    const expected = true
    const actual = domReady() instanceof Promise

    expect(actual).toEqual(expected)
  })

  it('should throw an error when given handler is not a function', () => {
    const invalidHandler = 5
    const actual = () => domReady(invalidHandler)

    expect(actual).toThrow()
  })

  /** document.readyState has been set to `loading` in ./setupTests.js */
  describe('DOM Content is loading', () => {
    it('should add a single event listener on window.document', () => {
      const expected = 1
      const actual = document.addEventListener.mock.calls.length

      expect(actual).toEqual(expected)
    })

    it('should add a event listener of type "DOMcontentLoaded" on window.document', () => {
      const expected = 'DOMContentLoaded'
      const actual = document.addEventListener.mock.calls[0][0]

      expect(actual).toEqual(expected)
    })
  })

  describe('DOM Content has loaded', () => {
    setDocToLoaded()

    it('should call a handler once DOM is loaded', () => {
      const expected = 0
      const actual = handlerExecutions[0]

      expect(actual).toEqual(expected)
    })

    it('should not stop executing handlers if any of them throw an error', () => {
      /** 1. Second handler added throws a error so check if third handler gets called */
      const expected = true
      const actual = handlerExecutions[2] !== undefined /* [1] */

      expect(actual).toEqual(expected)
    })

    it('should call all the handlers that were added', () => {
      const expected = mockHandlers.length
      const actual = handlerExecutions.length

      expect(actual).toEqual(expected)
    })

    it('should call the handlers in the order they are added', () => {
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const actual = handlerExecutions

      expect(actual).toEqual(expected)
    })

    it('should remove a "DOMContentLoaded" event listener from window.document', () => {
      const expected = 'DOMContentLoaded'
      const actual = document.removeEventListener.mock.calls[0][0]

      expect(actual).toEqual(expected)
    })

    it('should remove the same "DOMcontentLoaded" event listener that was added to window.document', () => {
      const expected = document.addEventListener.mock.calls[0][1]
      const actual = document.removeEventListener.mock.calls[0][1]

      expect(actual).toEqual(expected)
    })
  })
})
