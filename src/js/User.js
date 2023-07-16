export default class User {

    isAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    async login(login, pass) {
        fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: login, password: pass })
        })
            .then(response => response.text())
            .then(token => {
                console.log(token)
                localStorage.setItem('token', token);
                window.location.reload();
            })
    }
    logout() {
        localStorage.removeItem('token');

        window.location.reload();
    }

}
