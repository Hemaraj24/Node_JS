var arr = [1, [2, 3, [90, [8]]], 4, [90, 89], 5, 0, 89];
var output = [];

for(var x = 0; x < arr.length; x++)
{
   output = output.concat(arr[x]);
}

console.log('New Array is'+' : '+ output);


