// https://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/

var data = [
  {
    name: "Jamestown",
    population: 2047,
    temperatures: [-34, 67, 101, 87],
  },
  {
    name: "Awesome Town",
    population: 3568,
    temperatures: [-3, 4, 9, 12],
  },
  {
    name: "Funky Town",
    population: 1000000,
    temperatures: [75, 75, 75, 75, 75],
  },
];

// If we want to use a chart or graphing library to compare the average temperature
// to population size, we’d need to write some JavaScript that makes a few changes to
// the data before it’s formatted correctly for our visualization.
// Our graphing library wants an array of x and y coordinates, like so:
//
// 	[
// 		[x, y],
// 		[x, y]
//   …etc
// ]

var coords = [],
  totalTemperature = 0,
  averageTemperature = 0;

for (var i = 0; i < data.length; i++) {
  totalTemperature = 0;

  for (var j = 0; j < data[i].temperatures.length; j++) {
    totalTemperature += data[i].temperatures[j];
  }

  averageTemperature = totalTemperature / data[i].temperatures.length;

  coords.push([averageTemperature, data[i].population]);
}

console.log("nonfunctional cords", coords);

// When programming in a functional style, you’re always looking for simple,
// repeatable actions that can be abstracted out into a function.
// We can then build more complex features by calling these functions in sequence
// (also known as “composing” functions) — more on that in a second.
// In the meantime, let’s look at the steps we’d take in the process of transforming
// the initial API response to the structure required by our visualization library.
// At a basic level, we’ll perform the following actions on our data:
//
// 	add every number in a list,
// 	calculate an average,
// 	retrieve a single property from a list of objects.

// Notice we're accepting two values, the list and the current total

function addNumbers(a, b) {
  return a + b;
}

function totalForArray(arr) {
  return arr.reduce(addNumbers);
}

function average(total, count) {
  return total / count;
}

function averageForArray(arr) {
  return average(totalForArray(arr), arr.length);
}

// Pass in the name of the property that you'd like to retrieve
function getItem(propertyName) {
  // Return a function that retrieves that item, but don't execute the function.
  // We'll leave that up to the method that is taking action on items in our
  // array.
  return function (item) {
    return item[propertyName];
  };
}

function pluck(arr, propertyName) {
  return arr.map(getItem(propertyName));
}

function combineArrays(arr1, arr2, finalArr = []) {
  finalArr.push([arr1[0], arr2[0]]);

  var remainingArr1 = arr1.slice(1),
    remainingArr2 = arr2.slice(1);

  // If both arrays are empty, then we're done
  if (remainingArr1.length === 0 && remainingArr2.length === 0) {
    return finalArr;
  } else {
    // Recursion!
    return combineArrays(remainingArr1, remainingArr2, finalArr);
  }
}

var processed = combineArrays(
  pluck(data, "temperatures").map(averageForArray),
  pluck(data, "population"),
);

console.log("functional cords", processed);
