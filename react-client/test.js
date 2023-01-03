

const authCalls = {
    register: async (data={} ) => {
        const response = await fetch(`http://127.0.0.1:5000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    });
    return await response.json();
}};

authCalls.register(myData);