const getCoords = (elem) => { // кроме IE8-
  const box = elem.getBoundingClientRect();

  return {
    y: box.top + window.pageYOffset,
    x: box.left + window.pageXOffset,
  };
};

export default getCoords;
