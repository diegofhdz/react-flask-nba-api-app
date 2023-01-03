
export const authCalls = {
    register: async (data: any = {}) => {
        const response = await fetch(`http://127.0.0.1:5000/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
    });
   if (!response.ok) {
        throw new Error('Something went wrong');
   }
   
   return await response.json();
},
    login: async (data: any = {}) => {
        const response = await fetch(`http://127.0.01:5000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        return await response.json();
},
    logout: async () => {
        const response = await fetch(`http://127.0.0.1:5000/logout`, {
            method: 'GET',
            credentials: 'include'
    })
    return await response.json();
}
}

