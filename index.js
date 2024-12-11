import Vertex from './vertex.js';

function filterNeighbour([locationY, locationX]) {
  if (locationY >= 0 && locationY < 8 && locationX >= 0 && locationX < 8) {
    return true;
  }
  return false;
}

function generateNeighbours([locationY, locationX]) {
  const upMoves = [
    [locationY + 1, locationX - 2],
    [locationY + 2, locationX - 1],
    [locationY + 2, locationX + 1],
    [locationY + 1, locationX + 2],
  ];
  const downMoves = [
    [locationY - 1, locationX - 2],
    [locationY - 2, locationX - 1],
    [locationY - 2, locationX + 1],
    [locationY - 1, locationX + 2],
  ];
  const availableMoves = [...upMoves, ...downMoves].filter(filterNeighbour);
  return availableMoves;
}

function checkAddress(arr, val) {
  return arr.some((arrVal) => val[0] === arrVal[0] && val[1] === arrVal[1]);
}

function knightMoves(start, end) {
  let queue = [start];
  let seen = new Set();
  let steps = 0;

  let output = [];

  while (!output.length) {
    let nextStepQueue = [];

    while (queue.length) {
      let currentAddress = queue.shift();

      // visit
      let current = new Vertex(
        currentAddress,
        generateNeighbours(currentAddress)
      );

      // update path
      const currentAddressString = `[${current.address[0]},${current.address[1]}]`;
      !currentAddress[2]
        ? (current.path = currentAddressString)
        : (current.path = `${currentAddress[2]} => ${currentAddressString}`);

      // mark as seen
      seen.add(`${current.address[0]},${current.address[1]}`);

      // check presence of desired endpoint
      if (checkAddress(current.neighbours, end)) {
        // update path to endpoint
        const pathToEnd = current.path + ` => [${end[0]},${end[1]}]`;
        output.push(pathToEnd);
      } else {
        for (let neighbour of current.neighbours) {
          if (!seen.has(`${neighbour[0]},${neighbour[1]}`)) {
            //track path from Vertex & populate queue
            neighbour.push(current.path);
            nextStepQueue.push(neighbour);
            //mark as seen
            seen.add(`${neighbour[0]},${neighbour[1]}`);
          }
        }
      }
    }
    // populate queue for next step
    queue = [...nextStepQueue];
    steps++;
  }
  const moves = steps > 1 ? 'moves' : 'move';
  const message =
    output.length > 1 ? 'Here are the possible paths:' : "Here's your path:";
  console.log(`You did it in ${steps} ${moves}! ${message}`);
  for (let path of output) {
    console.log(path);
  }
}

knightMoves([0, 0], [1, 2]);
// You did it in 1 move! Here's your path:
// [0,0] => [1,2]

knightMoves([4, 3], [3, 6]);
// You did it in 2 moves! Here are the possible paths:
// [4,3] => [5,5] => [3,6]
// [4,3] => [2,4] => [3,6]

knightMoves([3, 3], [4, 3]);
// You did it in 3 moves! Here are the possible paths:
// [3,3] => [4,1] => [6,2] => [4,3]
// [3,3] => [4,1] => [2,2] => [4,3]
// [3,3] => [5,2] => [6,4] => [4,3]
// [3,3] => [5,2] => [3,1] => [4,3]
// [3,3] => [5,4] => [3,5] => [4,3]
// [3,3] => [4,5] => [2,4] => [4,3]

knightMoves([0, 5], [7, 0]);
// You did it in 4 moves! Here are the possible paths:
// [0,5] => [1,3] => [3,2] => [5,1] => [7,0]
// [0,5] => [2,4] => [4,3] => [6,2] => [7,0]

knightMoves([0, 0], [6, 5]);
// You did it in 5 moves! Here are the possible paths:
// [0,0] => [2,1] => [4,0] => [6,1] => [7,3] => [6,5]
// [0,0] => [2,1] => [4,0] => [6,1] => [5,3] => [6,5]
// [0,0] => [2,1] => [4,0] => [5,2] => [4,4] => [6,5]
// [0,0] => [2,1] => [4,2] => [5,4] => [4,6] => [6,5]
// [0,0] => [2,1] => [3,3] => [4,5] => [5,7] => [6,5]

knightMoves([7, 0], [0, 7]);
// You did it in 6 moves! Here are the possible paths:
// [7,0] => [5,1] => [7,2] => [5,3] => [3,4] => [1,5] => [0,7]
// [7,0] => [5,1] => [7,2] => [5,3] => [3,4] => [2,6] => [0,7]
