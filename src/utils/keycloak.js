import Keycloak from 'keycloak-js';


// export const initKeyCloak =()=>{
//     if (kc) return;
//     let initOptions = {
//         url: 'http://localhost:8080/auth',
//         realm: 'master',
//         clientId: 'react-client',
//       }
      
//        kc = new Keycloak(initOptions);
//     kc.init({
//         onLoad: 'login-required',  // Redirects to login if not authenticated
//         checkLoginIframe: true,   // Disable iframe login check to avoid timeout issues
//       }).then((auth) => {
//         if (!auth) {
//           console.log('Not authenticated')
//         //   window.location.reload();
//         } else {
//           /* Remove below logs if you are using this on production */
//           console.info("Authenticated");
//           console.log('auth', auth)
//           console.log('Keycloak', kc)
//           console.log('Access Token', kc.token)
      
//           /* http client will use this header in every request it sends */
         
//           kc.onTokenExpired = () => {
//             console.log('token expired')
//           }
//         }
//       }, (err) => {
//         /* Notify the user if necessary */
//         console.error("Authentication Failed",err);
//       });
// }




let kc = null;

export const initKeyCloak = () => {
    if (kc) return Promise.resolve(kc);

    let initOptions = {
        url: 'http://localhost:8080/auth',
        realm: 'master',
        clientId: 'react-client',
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

// Function to logout
// export const logout = (navigate) => {
//     if (kc) {
//         kc.logout().then(() => {
//             navigate("/"); // Redirect to login after logout
//         });
//     }else{
//         console.log("logout err")
//     }
// };


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