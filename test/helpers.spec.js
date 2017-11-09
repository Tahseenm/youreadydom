import { isFunc, isBrowserOldIE, hasDocLoaded } from '../src/helpers'


/* -------------------------------------------------------------------------- *\
 *   Language
\* -------------------------------------------------------------------------- */

describe('isFunc()', () => {
  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isFunc(() => {})

    expect(actual).toEqual(expected)
  })

  it('should return true for functions', () => {
    const expected = true
    const actual = isFunc(() => {})

    expect(actual).toEqual(expected)
  })

  it('should return false for values which are not function', () => {
    const expected = false
    const actual = isFunc(null)

    expect(actual).toEqual(expected)
  })
})



/* -------------------------------------------------------------------------- *\
 *   Browser
\* -------------------------------------------------------------------------- */

/**
 * Create a IE 10- document mock object
 * 1. documentElement.doScroll method only exists in IE 10 and below
 */
const setOldIEbrowser = () => {
  document.documentElement.doScroll = () => {} /* [1] */
  return document
}

/** Delete the doScroll() method set by getOldIEdocument() */
const unsetOldIEbrowser = () => {
  delete document.documentElement.doScroll
}

describe('isBrowserOldIE()', () => {
  afterEach(unsetOldIEbrowser)

  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof isBrowserOldIE(document)

    expect(actual).toEqual(expected)
  })

  it('should return true when browser is IE', () => {
    const document = setOldIEbrowser()

    const expected = true
    const actual = isBrowserOldIE(document)

    expect(actual).toEqual(expected)
  })

  it('should return false when browser is not IE', () => {
    const expected = false
    const actual = isBrowserOldIE(document)

    expect(actual).toEqual(expected)
  })
})

describe('hasDocLoaded()', () => {
  const getDocumentMock = (readyState, { ie = false } = {}) => ({
    readyState,
    documentElement: !ie ? {} : {
      doScroll: () => {},
    },
  })

  it('should return a boolean', () => {
    const expected = 'boolean'
    const actual = typeof hasDocLoaded(document)

    expect(actual).toEqual(expected)
  })

  it('should return false when window.document ready state is `uninitialized`', () => {
    const documentMock = getDocumentMock('uninitialized')

    const expected = false
    const actual = hasDocLoaded(documentMock)

    expect(actual).toEqual(expected)
  })

  it('should return false when window.document ready state is `loading`', () => {
    const documentMock = getDocumentMock('loading')

    const expected = false
    const actual = hasDocLoaded(documentMock)

    expect(actual).toEqual(expected)
  })

  it('should return true when window.document ready state is `loaded`', () => {
    const documentMock = getDocumentMock('loaded')

    const expected = true
    const actual = hasDocLoaded(documentMock)

    expect(actual).toEqual(expected)
  })

  it('should return true when window.document ready state is `interactive`', () => {
    const documentMock = getDocumentMock('interactive')

    const expected = true
    const actual = hasDocLoaded(documentMock)

    expect(actual).toEqual(expected)
  })

  it('should return false when browser is old IE and window.document ready state is `interactive`', () => {
    const documentMock = getDocumentMock('interactive', { ie: true })

    const expected = false
    const actual = hasDocLoaded(documentMock)

    expect(actual).toEqual(expected)
  })

  it('should return true when window.document ready state is `complete`', () => {
    const documentMock = getDocumentMock('complete')

    const expected = true
    const actual = hasDocLoaded(documentMock)

    expect(actual).toEqual(expected)
  })
})
