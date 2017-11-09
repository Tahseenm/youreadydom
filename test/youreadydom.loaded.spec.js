import domReady from '../src'


/** Simulate loaded document by mocking hasDocLoaded */
jest.mock('../src/helpers', () => ({
  isFunc: () => true,
  hasDocLoaded: () => true,
}))

/* -------------------------------------------------------------------------- *\
 *   Tests: Loaded
\* -------------------------------------------------------------------------- */

describe('domReady()', () => {
  it('should not attach a `DOMContentLoaded` event listener to window.document when DOM has already loaded', () => {
    domReady(jest.fn())

    const expected = 0
    const actual = document.addEventListener.mock.calls.length

    expect(actual).toEqual(expected)
  })

  it('should call handler when DOM has already loaded', async () => {
    expect.assertions(1)

    const mockHandler = jest.fn()
    await domReady(mockHandler)

    const expected = 1
    const actual = mockHandler.mock.calls.length

    expect(actual).toEqual(expected)
  })
})
