// @flow

const lookForElement = (id: string) => {
  // id=
  const element = document.getElementById(id);
  if (element) return element;
  // name=
  const elementsSet = document.getElementsByName(id);
  if (elementsSet.length) return elementsSet[0];
};

let retryTimeout = null;
let retryCount = 0;
const retryDelay = 100;
const retryMax = 1000; // 1000 * retryDelay = retry during 10s in case of slow network

// @todo instead of doing a max number of tries, we could imagine trying every
// x previous delay x 2 (; previous delay = delay x 2)

const moveToHash = (id: string) => {
  if (id === "") return;
  const element = lookForElement(id);
  if (!element && retryCount < retryMax) {
    retryTimeout = setTimeout(() => {
      retryCount++;
      moveToHash(id);
    }, retryDelay);
  }
  if (element) element.scrollIntoView();
};

export default (hash: string) => {
  retryCount = 1;
  if (retryTimeout) {
    clearTimeout(retryTimeout);
  }
  moveToHash(hash.replace(/^#/, ""));
};
