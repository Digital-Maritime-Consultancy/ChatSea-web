import React, {
    createContext,
    useEffect,
    useState,
    useRef,
  } from 'react'
  import Keycloak from 'keycloak-js'
  import { useNavigate } from 'react-router-dom'
  
  interface KeycloakContextProps {
    keycloak: Keycloak | null
    authenticated: boolean
    mrn: string,
    orgMrn: string,
    username: string,
    token: string,
  }
  
  const KeycloakContext = createContext<KeycloakContextProps | undefined>(
    undefined,
  )
  
  interface KeycloakProviderProps {
    children: React.ReactNode
  }

    const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const isRun = useRef<boolean>(false);
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [mrn, setMrn] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [orgMrn, setOrgMrn] = useState<string>("");
  
    useEffect(() => {
      if (isRun.current) return; 
  
      isRun.current = true; 
  
      const initKeycloak = async () => {
        const keycloackConfig = {
            url: process.env.REACT_APP_MAAS_KEYCLOAK_URL+'/auth' as string,
            authServerUrl: process.env.REACT_APP_MAAS_KEYCLOAK_URL as string,
          realm: process.env.REACT_APP_MAAS_KEYCLOAK_REALM as string,
          clientId: process.env.REACT_APP_MAAS_KEYCLOAK_CLIENT as string,
        }
        const keycloakInstance: Keycloak = new Keycloak(keycloackConfig)
  
        keycloakInstance.onTokenExpired = () => {
          console.log('expired '+new Date());
          keycloakInstance.updateToken(50).success((refreshed)=>{
                if (refreshed){
                    console.log('refreshed '+new Date());
                }else {
                    console.log('not refreshed '+new Date());
                }
            }).error(() => {
                 console.error('Failed to refresh token '+new Date());
            });
        }
        keycloakInstance
          .init({
            onLoad: 'check-sso',
            flow: 'standard',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
          })
          .then(async (authenticated: boolean) => {
            await setAuthenticated(authenticated);
            if (!authenticated) {
              navigate('/');
            } else {
              navigate('/connect');
            }
          })
          .catch((error) => {
            console.error('Keycloak initialization failed:', error)
            setAuthenticated(false)
          })
          .finally(() => {
            setKeycloak(keycloakInstance)
            setMrn(keycloakInstance.tokenParsed?.mrn);
            setUsername(keycloakInstance.tokenParsed?.name);
            setOrgMrn(keycloakInstance.tokenParsed?.org);
            setToken(keycloakInstance.token!);
          })
      }
  
      initKeycloak()
    }, [])
  
    return (
      <KeycloakContext.Provider value={{ keycloak, authenticated, mrn, username, token, orgMrn }}>
        {children}
      </KeycloakContext.Provider>
    )
  }
  
  export { KeycloakProvider, KeycloakContext }