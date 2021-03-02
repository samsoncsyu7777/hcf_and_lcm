const questions = [
  //stage 0 one common prime factor
  [
    [4, 6],
    [25, 10],
    [9, 15],
  ],
  //stage 1 two common prime factors
  [
    [12, 18],
    [50, 40],
    [54, 45],
  ],
  //stage 2 three common prime factors
  [
    [24, 36],
    [32, 40],
    [60, 80],
  ],
  //stage 3 one of them is one
  [
    [1, 8],
    [17, 1],
    [1, 24],
  ],
  //stage 4 one is the factor of another one
  [
    [7, 21],
    [5, 45],
    [4, 44],
  ],
  //stage 5 relative prime to each other
  [
    [2, 5],
    [3, 4],
    [4, 7],
  ],

];

export default questions;
