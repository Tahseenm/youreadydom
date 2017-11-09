import { isFunc, hasDocLoaded } from './helpers'


/* -------------------------------------------------------------------------- *\
 *   Library
\* -------------------------------------------------------------------------- */

/** :: (listener: Function) -> void */
const handleListener = ({ listener, resolve, reject }) => {
  /** An exception thrown in a DOM Listener will not affect others */
  try {
    resolve(listener())
  } catch (err) {
    reject(err)
  }
}


/** :: (listener: Function) -> Promise<> */
const domReady = (function getDomReady(document) {
  /** Will eventually be `true` */
  let docsLoaded = hasDocLoaded(document)

  const listeners = []
  const handleListeners = () => {
    docsLoaded = true

    /** Execute & resolve every listener in the order they are defined */
    listeners.forEach(handleListener)
    document.removeEventListener('DOMContentLoaded', handleListeners)
  }

  /** Only a single `DOMContentLoaded` listener added on the document */
  if (!docsLoaded) document.addEventListener('DOMContentLoaded', handleListeners)


  /** :: (listener: Function) -> Promise<> */
  const $domReady = (listener = Function()) => { // eslint-disable-line no-new-func
    if (!isFunc(listener)) throw new Error('Handler should be a function that would be called once the DOM is ready.')

    return new Promise((resolve, reject) => {
      /** `handleListener` needs to be able to resolve or reject promise */
      const $listener = { listener, resolve, reject }

      /** Execute listener asyncrously */
      if (docsLoaded) setTimeout(() => handleListener($listener), 0)
      else listeners.push($listener)
    })
  }

  return $domReady
})(document)


export default domReady
