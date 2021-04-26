class UserService {
    __userBase = "http://localhost:3010/users/";

    getAllUsers = async () => {
        const dataUsers = await fetch(this.__userBase);
        if (!dataUsers.ok) {
            throw new Error('Could not fetch')
        }
        return await dataUsers.json();
    }

    getUser = async (id) => {
        const dataUsers = await this.getAllUsers();
        return dataUsers.find(dataUser => dataUser.id === id);
    }

    getLoginUser = async (user) => {
        const dataUsers = await this.getAllUsers();
        return dataUsers.filter(dataUser => (dataUser.login === user.login));
    }

    registerUser = async (user) => {
        const dataUsers = await this.getAllUsers();
        const inArr = dataUsers.find(dataUser => (dataUser.login === user.login) && (dataUser.password === user.password));
        if (!inArr) {
            const dataUser = await fetch(this.__userBase, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            if (!dataUser.ok) {
                throw new Error('Error')
            }
            return await dataUser.json();
        }
        throw new Error('a user with such data already exists')
    }

    createContact = async (id, newData) => {
        const update = await fetch(this.__userBase + id, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        if (!update.ok) {
            throw new Error('Error')
        }
        return await update.json();
    }
}

export default UserService;