
export const authCalls = {
    register: async (data: any = {}) => {
        const response = await fetch(`/register`, {
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
        const response = await fetch(`/login`, {
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
        const response = await fetch(`/logout`, {
            method: 'GET',
            credentials: 'include'
    })
    return await response.json();
},
    checkLogin: async () => {
        const response = await fetch('/loginstatus', {
            method:'GET',
            credentials: 'include'
        })
        return await response.json();
    }
}

