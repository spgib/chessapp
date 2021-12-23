const legalSquare = (x, y) => {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
};

export default legalSquare;