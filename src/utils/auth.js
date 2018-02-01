import Auth0Lock from 'auth0-lock';

const authDomain = 'reactappttt.auth0.com';
const clientId = 'g0qfJIyeG165He2eJ4HRT7DuxsmgeJDd';

class AuthService {
    constructor(){
        this.lock = new Auth0Lock(clientId, authDomain, {
            auth: {
                params: {
                    scope: 'openid email'
                },
            },
        })

        this.showLock = this.showLock.bind(this);
        this.lock.on('authenticated', this.authProcess.bind(this))
    }
    authProcess = (authResult) => {
        console.log(authResult);
    }

    showLock(){
        this.lock.show();
    }

    setToken = (authFields) => {
        let {
            idToken,
            exp
        } = authFields
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('exp', exp * 1000);
    }

    isCurrent = () => {
        let expString = localStorage.getItem('exp');
        if (!expString){
            localStorage.removeItem('idToken');
            return false;
        }
        let now = new Date();
        let exp = new Date(parseInt(expString, 10)); //10 is radix

        if (exp < now) {
            this.logout();
            return false;
        }
        return true;
    }

    clearLocalStorageVals() {
        localStorage.removeItem('idToken');
        localStorage.removeItem('exp');
    }

    getToken() {
        let idToken = localStorage.getItem('idToken');
        if (this.isCurrent() && idToken) {
            return idToken;
        } else {
            this.clearLocalStorageVals();
            return false;
        }
    }

    logout = () => {
        this.clearLocalStorageVals();
        window.location.reload(true);
    }
}