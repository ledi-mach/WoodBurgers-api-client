import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { Button } from '../../components/Button/index.js';
import { Input } from '../../components/Input/index.js'
import imgBurger from '../../assets/images/burger-background.png';
import logo from '../../assets/images/logo.png';
import './index.css';
import './responsive.css';


export function Login() {
    const history = useHistory()

    function navigateToRegister() {
        history.push('/register');
    }
    function navigateToMenu() {
        history.push('/menu');
    }

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const logUser = (e) => {
        e.preventDefault()

        if (emailLogin === "" || passwordLogin === "") {
            alert('campo vazio')
        } else {
            fetch('https://lab-api-bq.herokuapp.com/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailLogin,
                    password: passwordLogin
                })
            })
                .then(res => res.json())
                .then((json) => {
                    const token = json.token
                    const id = json.id
                    const role = json.role
                    localStorage.setItem("usersToken", token);
                    if (token !== null && id !== null && role === 'kitchen') {
                        navigateToMenu()
                        alert('voce está na cozinha')
                    } else {
                        navigateToMenu()
                        alert('voce está na salao')
                    }
                })
        }
    }
    return (
        <main>
            <img src={imgBurger} className="imgBurger" alt="imgburger" />
            <img src={logo} className="burgerLogo" alt="logo" />
            <div className="divInfo">
                <fieldset className="formFieldsetLogin">
                    <h1 className="h1Login">LOGIN</h1>
                    <form>
                        <p className="labelInputs">E-mail</p>
                        <Input inputType="email" inputClass="inputEmail" inputValue={emailLogin}
                            inputOnChange={e => setEmailLogin(e.target.value)}
                        />
                        <p className="labelInputs">Senha</p>
                        <Input inputType="password" inputClass="inputPassword" inputValue={passwordLogin}
                            inputOnChange={e => setPasswordLogin(e.target.value)}
                        />
                        <Button btnType="submit" btnClass="yellowBtn" btnText="ENTRAR" btnOnClick={logUser} />
                        <p className="isWorker">É funcionário?</p>
                        <Button btnType="button" btnClass="redBtn" btnText="CADASTRE-SE" btnOnClick={navigateToRegister} />
                    </form>
                </fieldset>
            </div>
        </main>
    )
}
