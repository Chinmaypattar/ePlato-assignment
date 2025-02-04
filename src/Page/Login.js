import React, { useEffect } from 'react';
import { initKeyCloak, login } from '../utils/keycloak';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
    const navigate = useNavigate(); // React Router navigation

    useEffect(() => {
        initKeyCloak().then((kc) => {
            if (kc?.authenticated) {

                if (!kc.isTokenExpired(5)) {
               
                    navigate("/home"); // Redirect to Home after login
                }

            }
        });
    }, [navigate]);

    const loginScenario1 = () => {
        console.log("Login with Scenario 1");

        // Set value in localStorage
        localStorage.setItem("scenario", "scenario1");

        // Check if localStorage is updated correctly
        console.log("localStorage type:", localStorage.getItem("type"));

        login();
    };

    const loginScenario2 = () => {
        console.log("Login with Scenario 2");
        localStorage.setItem("scenario", "scenario2")
        login()
        // Add logic for scenario 2
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 transition"
                    onClick={loginScenario1}
                >
                    Login with Callback scenario
                </button>
                <button
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    onClick={loginScenario2}
                >
                    Login with Refresh token Scenario
                </button>
            </div>
        </div>
    );
};

export default Login;
