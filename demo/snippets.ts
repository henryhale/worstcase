// Sample code examples

export const bubble = {
    name: "Bubble Sort",
    code: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`
};

export const binary = {
    name: "Binary Search",
    code: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`
};

export const nested = {
    name: "Nested Loops",
    code: `function processMatrix(matrix) {
    let sum = 0;
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            sum += matrix[i][j];
            
            for (let k = 0; k < matrix[i][j]; k++) {
                console.log(k);
            }
        }
    }
    
    return sum;
}`
};

// export const recursive = {
//     name: "Recursion",
//     code: `function fibonacci(n) {
//     if (n <= 1) {
//         return n;
//     }

//     return fibonacci(n - 1) + fibonacci(n - 2);
// }`
// };

export const complex = {
    name: "Complex Code",
    code: `function complexAlgorithm(data) {
    let results = [];
    
    // O(n) preprocessing
    for (let item of data) {
        if (item.valid) {
            results.push(item.value);
        }
    }
    
    // O(n^2) nested processing
    for (let i = 0; i < results.length; i++) {
        for (let j = i + 1; j < results.length; j++) {
            if (results[i] > results[j]) {
                let temp = results[i];
                results[i] = results[j];
                results[j] = temp;
            }
        }
    }
    
    // O(n log n) sorting
    results.sort();
    
    return results;
}`
};
