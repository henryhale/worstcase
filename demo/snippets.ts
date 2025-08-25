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

export const typescript = {
    name: "Typescript",
    code: `interface User {
    id: number;
    name: string;
    email: string;
}

class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    findUser(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    sortUsers(): User[] {
        return this.users.sort((a, b) => a.name.localeCompare(b.name));
    }

    async fetchUsers(): Promise<User[]> {
        const response = await fetch('/api/users');
        return response.json();
    }
}

function processUsers<T extends User>(users: T[]): T[] {
    return users.filter(user => user.email.includes('@'));
}`
};

export const complex = {
    name: "Complex Code",
    code: `class DataProcessor {
    private cache = new Map();

    async processData(data: any[]) {
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

        // O(n log n) sorting with caching
        const cacheKey = JSON.stringify(results);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        results.sort();
        this.cache.set(cacheKey, results);

        return results;
    }
}`
};

export const react = {
    name: "JSX",
    code: `function UserDashboard({ users, filters }) {
    
    const filteredUsers = users.filter(user => 
        filters.every(filter => user[filter.key] === filter.value)
    );
    
    return (
        <div className="dashboard">
            <h1>User Dashboard</h1>
            <div className="user-grid">
                {filteredUsers.map(user => (
                    <div key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <div className="user-stats">
                            {user.stats.map(stat => (
                                <span key={stat.id}>
                                    {stat.label}: {stat.value}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
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
