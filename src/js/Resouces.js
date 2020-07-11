
/*RESOURCES.JS*/
/** Contains helper functions for the tic-tac-toe app */


/* DEEP COPY obj * /
/* Used to create a deep clone of a source object. */
/* The target won't contain references to source, howerver, methods */
/* aren't copied either...*/

export function deepCopyObj(obj) {
  let newObj = JSON.parse(JSON.stringify(obj))
  return newObj
}