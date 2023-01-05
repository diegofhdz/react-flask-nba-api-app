
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
},
    getUserDets: async () => {
        const response = await fetch('/getuser', {
            method: 'GET',
            credentials: 'include'
        })
        return await response.json();
},
    updatePassword: async (data:any) => {
        const response = await fetch('/updatepassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return await response.json()
 },
    registerUser: async (data:any) => {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return await response.json();
},
    updateUsername: async (data:any) => {
        const response = await fetch('/updateusername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return await response.json();
},
    updateEmail: async (data:any) => {
        const response = await fetch('/updateemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        return await response.json();
    },
    deleteUser: async (data: any) => {
        const response = await fetch('/deleteaccount', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json();
    }
}
