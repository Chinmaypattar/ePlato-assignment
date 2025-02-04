import React, { useContext, useEffect, useState } from 'react';
import { initKeyCloak, login } from '../utils/keycloak';
import { useNavigate } from 'react-router-dom';
import { ContextApp } from '../utils/Context';

const Login = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(ContextApp);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initKeyCloak()
            .then((kc) => {
                if (kc?.authenticated && !kc.isTokenExpired(5)) {
                    navigate("/home");
                    setIsAuthenticated(true)
                }else{
                    setIsAuthenticated(false)
                }
            })
            .catch((err) => {
                console.error("Error initializing Keycloak:", err);
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const loginScenario = (scenario) => {
        console.log(`Login with ${scenario}`);
        localStorage.setItem("scenario", scenario);
        
        if (!localStorage.getItem("scenario")) {
            console.error("Failed to set scenario in localStorage");
        }

        login();
    };

    if (loading) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 transition"
                    onClick={() => loginScenario("scenario1")}
                >
                    Login with Callback scenario
                </button>
                <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => loginScenario("scenario2")}
                >
                    Login with Refresh token Scenario
                </button>
            </div>
        </div>
    );
};

export default Login;
