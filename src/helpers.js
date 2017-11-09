/* -------------------------------------------------------------------------- *\
 *   Language
\* -------------------------------------------------------------------------- */

/** :: (val: any) -> boolean */
export const isFunc = val => typeof val === 'function'



/* -------------------------------------------------------------------------- *\
 *   Brower
\* -------------------------------------------------------------------------- */

/** @HACK - doScroll() DOM method is only available in IE10 & below */
/** :: (HTMLDocument) -> boolean */
export const isBrowserOldIE = ({ documentElement: { doScroll } }) => isFunc(doScroll)


/**
 * Document Ready Sates
 * ====================
 *
 * `uninitialized` - Has not started loading yet.
 * `loading`       - Is loading.
 * `loaded`        - Has been loaded.
 * `interactive`   - Has loaded enough and is ready for user interaction.
 * `complete`      - Fully loaded.
 *
 * 1. The 'interactive' state in IE 9 & 10 can be fired early, before the document
 * has finished parsing, so don't rely on it.
 */
/** :: (HTMLDocument) -> boolean */
export const hasDocLoaded = (document) => {
  const LOADED_STATES = isBrowserOldIE(document)
    ? /^loaded|^complete/ /* [1] */
    : /^loaded|^interactive|^complete/

  return document.readyState.search(LOADED_STATES) > -1
}
