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
                if (token == 'Incorrect username or password') {
                    const error = document.createElement('p');
                    error.style.color = "red";
                    error.className = "error";
                    error.textContent = "Incorrect username or password";
                    const form = document.querySelector('.login-form');
                    form.appendChild(error);
                }
                else {

                    localStorage.setItem('token', token);
                    window.location.reload();

                }
            })
    }
    logout() {
        localStorage.removeItem('token');

        window.location.reload();
    }

}
