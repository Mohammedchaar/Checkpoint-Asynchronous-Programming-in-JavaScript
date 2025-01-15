// File: index.js

// 1.
const simulateApiCall = (endpoint, delay = 1500) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.3; // 70% success rate
            if (success) {
                resolve({
                    status: 200,
                    data: { message: `Data fetched from ${endpoint}` }
                });
            } else {
                reject(new Error(`Failed to fetch data from ${endpoint}`));
            }
        }, delay);
    });
};

// 2. Task 1: 
async function iterateWithAsyncAwait(values) {
    try {
        for (const value of values) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(value);
        }
    } catch (error) {
        console.error('Error during iteration:', error.message);
    }
}

// 3. Task 2 & 3:
async function awaitCall(endpoint) {
    try {
        const response = await simulateApiCall(endpoint);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        const friendlyMessage = `😟 Oops! We couldn't fetch your data. 
            Please try again later. (Error: ${error.message})`;
        console.error(friendlyMessage);
        throw new Error(friendlyMessage);
    }
}

// 4. Task 4:
async function concurrentRequests(endpoint1, endpoint2) {
    try {
        console.log('Starting concurrent requests...');
        
        const [result1, result2] = await Promise.all([
            awaitCall(endpoint1),
            awaitCall(endpoint2)
        ]);

        const combinedResults = {
            endpoint1: result1,
            endpoint2: result2,
            timestamp: new Date().toISOString()
        };

        console.log('Combined Results:', combinedResults);
        return combinedResults;
    } catch (error) {
        console.error('Error in concurrent requests:', error.message);
        throw error;
    }
}

// 5. Test function to run everything
async function runAllTests() {
    // Test 1: 
    console.log('\n🧪 Testing Task 1 - Iterating with delay:');
    await iterateWithAsyncAwait([1, 2, 3, 4, 5]);

    // Test 2: 
    console.log('\n🧪 Testing Task 2 & 3 - Single API call:');
    try {
        await awaitCall('/api/data');
    } catch (error) {
        // Error already handled 
    }

    // Test 3: Concurrent requests
    console.log('\n🧪 Testing Task 4 - Concurrent requests:');
    try {
        await concurrentRequests('/api/users', '/api/posts');
    } catch (error) {
       
    }
}

// 6. Run everything
console.log('🚀 Starting tests...');
runAllTests().then(() => console.log('\n✅ All tests completed!'));