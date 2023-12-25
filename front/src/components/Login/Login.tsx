import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import "./Login.Module.scss"
import { login, loginDiscord, register, /*logout*/ } from '../api/auth.api.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Link} from "react-router-dom";
import { ChangeEvent, useState } from 'react';
import { useGlobalContext } from "../../context/context.ts";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [usernameCreate, setUsernameCreate] = useState('');
    const [passwordCreate, setPasswordCreate] = useState('');
    const [emailCreate, setEmailCreate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setRole,role } = useGlobalContext();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(event.target.value);
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(event.target.value);
    };

    const handleEmailCChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailCreate(event.target.value);
    };
    const handleUsernameCChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsernameCreate(event.target.value);
    };
    const handlePasswordCChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordCreate(event.target.value);
    };

    interface Params {
        [key: string]: string;
    }

    const getFragmentParams = () => {
        const fragment = window.location.hash.substring(1);
        const params: Params = {};
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while ((match = regex.exec(fragment)) !== null) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    };
    const handleOAuthCallback = () => {
        const params = getFragmentParams();
        try {

            // Check if 'access_token' is present in the URL fragment
            if ('access_token' in params) {
                const accessToken = params['access_token']; 
                console.log()
                window.onload = () => {
                    const fragment = new URLSearchParams(window.location.hash.slice(1));
                    console.log(fragment)
                    const [accessToken, tokenType] = [params['access_token'], params['token_type']];
                    console.log({accessToken, tokenType})
                    fetch('https://discord.com/api/users/@me', {
                        headers: {
                            authorization: `${tokenType} ${accessToken}`,
                        },
                    })
                        .then(result => result.json())
                        .then(response => {
                            const result = loginDiscord(response.username, response.email)
                            console.log(result)
                        })
                        .catch(console.error);
                };

                // Now you have the access token, you can use it as needed
                console.log('Access Token:', accessToken);

                // You may want to clear the URL fragment to avoid displaying sensitive information
                window.location.hash = '';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleDiscordAuthClick = async () => {
        try {
            window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1183920234793554061&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5173&scope=identify+email';
        } catch (error) {
            console.log(error);
        }
    };
    handleOAuthCallback();

    const handleLoginClick = async () => {
        try {
            if (!emailInput) {
                setErrorMessage('Please enter a valid email address.');
                return;
            }
            if (!passwordInput) {
                setErrorMessage('Please enter a password.');
                return;
            }
            
            if(role === 'guest'){
                setRole('');
            }
            const response = await login(emailInput, passwordInput)
            setErrorMessage('');

            if (response == 200) {
                setErrorMessage('');

                console.log('POST request successful');
            } else {
                // Handle error response
                console.error('POST request failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }


    }
    const handleRegisterClick = async () => {
        try {
            if (!emailCreate) {
                setErrorMessage('Please enter a valid email address.');
                return;
            }
            if (!passwordCreate) {
                setErrorMessage('Please enter a password.');
                return;
            }
            if (!usernameCreate) {
                setErrorMessage('Please enter a password.');
                return;
            }
            await register(usernameCreate, emailCreate, passwordCreate)
            setErrorMessage('');
            setActiveTab('login');
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const handleAnonymousClick = async () => {
        setRole('guest');
        navigate('/home');
    }


    return (
        <div className="dg__account section-padding--xl">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key || 'login')}>
                            <Nav variant="pills" className="acount__nav justify-content-center">
                                <Nav.Item>
                                    <Nav.Link eventKey="login">Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="register">Register</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="login">
                                    <div className="single__account">
                                        <div className="input__box">
                                            <span>Email Address</span>
                                            <input type="text" value={emailInput} onChange={handleEmailChange} />
                                        </div>
                                        <div className="input__box">
                                            <span>Password</span>
                                            <input type="password" value={passwordInput}
                                                onChange={handlePasswordChange} />
                                        </div>
                                        <div className="questions">
                                            <Link to={"/"}
                                            >
                                                Lost your password?
                                            </Link>
                                        </div>
                                        <div className="submit_button">
                                            <button className="account__btn"
                                                onClick={handleLoginClick}>
                                                Login
                                            </button>
                                            <button className="account__btn"
                                                onClick={handleAnonymousClick}>
                                                Continue as a guest
                                            </button>
                                            <button onClick={handleDiscordAuthClick} className="discord-auth-button">
                                                <FontAwesomeIcon icon={faDiscord} className="discord-icon" />
                                                Authenticate with Discord
                                            </button>
                                        </div>
                                        {errorMessage && (
                                            <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
                                        )}
                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="register">
                                    <div className="single__account">
                                        <div className="input__box">
                                            <span>Username</span>
                                            <input type="text" value={usernameCreate} onChange={handleUsernameCChange}/>
                                        </div>
                                        <div className="input__box">
                                            <span>Email address</span>
                                            <input type="email" value={emailCreate} onChange={handleEmailCChange} />
                                        </div>
                                        <div className="input__box">
                                            <span>Password</span>
                                            <input type="password" value={passwordCreate}
                                                onChange={handlePasswordCChange} />
                                        </div>
                                        <button className="account__btn" onClick={handleRegisterClick}>Register</button>
                                        {errorMessage && (
                                            <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
                                        )}
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginRegister;