const VERTICES = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'A',
    'B',
    'C',
    'D',
    'E',
];

const Edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 5],
    [1, 6],
    [2, 7],
    [3, 8],
    [4, 9],
    [5, 7],
    [5, 8],
    [6, 8],
    [6, 9],
    [7, 9],
];

// Example: A => [0, 5]
function getLetterVertices(letter) {
    return VERTICES.flatMap((vertice, i) => vertice === letter ? i : []);
} 

function getEdgeFromLetters(letter2, startVertice = null) {
    const letter2Vertices = getLetterVertices(letter2);
    let result = null;

    Edges.forEach(edge => {
        // edges are not oriented
        const indexOfStartingEdge = edge.indexOf(startVertice);
        if ( 
            startVertice !== null 
            && indexOfStartingEdge !== -1 
            && letter2Vertices.indexOf(edge[indexOfStartingEdge === 0 ? 1 : 0]) !== -1
        ) {
            result = indexOfStartingEdge === 0 ? edge : edge.reverse();
        }
    });

    return result;
}

function getFirstEdgeSmartly(letter1, letter2, letter3 = null) {
    const letter1Vertices = getLetterVertices(letter1);
    const letter2Vertices = getLetterVertices(letter2);
    let result = null;

    Edges.forEach(edge => {
        if ( 
            (letter1Vertices[0] === edge[0] || letter1Vertices[1] === edge[0]) 
            && letter2Vertices.indexOf(edge[1]) !== -1
        ) {
            result = edge;
        }
    });

    if(result && getEdgeFromLetters(letter3, result[1])){
        return result;
    } 
    
    if (result) {
        return result.reverse();
    }

    return result;
}

function generateWalk(inputString) {
    const inputStringToArray = inputString.split('');

    if (inputStringToArray.length < 2) {
        console.log('Please enter a minimum of 2 letters to generate a walk');
        return;
    }

    if (inputStringToArray.length === 2) {
        console.log(getFirstEdgeSmartly(inputStringToArray[0], inputStringToArray[1]));
        return;
    }

    const firstEdge = getFirstEdgeSmartly(inputStringToArray[0], inputStringToArray[1], inputStringToArray[2]);
    let walk = firstEdge;

    inputStringToArray.slice(2, inputStringToArray.length).forEach(letter => {
        const lastKnownVertice = walk[walk.length - 1];        
        const edge = getEdgeFromLetters(letter, lastKnownVertice);

        if (!edge || edge.length !== 2) {
            walk = ['-1'];
        } else {
            walk.push(edge[1]);
        }
    });

    console.log(walk.join(''));
}

// print process.argv
process.argv.forEach(function (val, index, array) {
    // second arguments should be a string
    if (index === 2) {
        if (!val) {
            console.error('Error, please enter a string');
        } else if (/^[A-E]+$/.test(val)) {
            // string should be between A-E
            generateWalk(val);
        } else {
            console.error('Error, String is out of range');
        } 
    }
});