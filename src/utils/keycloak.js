import Keycloak from 'keycloak-js';


let kc = null;

export const initKeyCloak = () => {
    console.log("ENV",process.env.REACT_APP_KEYCLOAK_CLIENT_ID)
    if (kc) return Promise.resolve(kc);

    let initOptions = {
        url: process.env.REACT_APP_KEYCLOAK_URL,
        realm: process.env.REACT_APP_KEYCLOAK_REALM,
        clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    };

    kc = new Keycloak(initOptions);

    return kc.init({
        onLoad: 'check-sso',  // Check login silently, but don't force
        checkLoginIframe: false,  
    }).then((auth) => {
        console.log("Keycloak initialized", auth);
        return kc;
    }).catch((err) => {
        console.error("Keycloak initialization failed", err);
        return null;
    });
};

// Function to trigger login manually
export const login = () => {
    if (kc) {
        kc.login();
    } else {
        console.error("Keycloak is not initialized yet");
    }
};


export const logout =async (navigate) => {
    if (kc) {
        kc.logout({
            redirectUri: "http://localhost:3000/", // Redirect after logout
        }).then(() => {
            navigate("/"); // Ensure navigation after logout
        }).catch((err) => {
            console.log("Logout error:", err);
        });
    } else {
        console.log("Keycloak instance not found. Initializing...");
        initKeyCloak().then((initializedKc) => {
            if (initializedKc) {
                initializedKc.logout({
                    redirectUri: "http://localhost:3000/",
                }).then(() => navigate("/"));
            } else {
                console.log("Logout failed: Keycloak not initialized");
            }
        });
    }
    localStorage.clear()
};

export const getRefreshToken = async () => {
    if (kc) {
        try {
            await kc.updateToken(10);
            return true;
        } catch (error) {
            console.error("Token refresh failed:", error);
            return false;
        }
    }
    return false;
};


// Function to get the current Keycloak instance


export const getKeycloak = () => {
    if (!kc) {
        initKeyCloak();
    }
    return kc;
  };