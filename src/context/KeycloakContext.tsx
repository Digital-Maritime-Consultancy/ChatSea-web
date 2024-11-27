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
    username: string,
  }
  
  const KeycloakContext = createContext<KeycloakContextProps | undefined>(
    undefined,
  )
  
  interface KeycloakProviderProps {
    children: React.ReactNode
  }

    const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
    const navigate = useNavigate()
    const isRun = useRef<boolean>(false)
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [mrn, setMrn] = useState<string>("")
    const [username, setUsername] = useState<string>("")
  
    useEffect(() => {
      if (isRun.current) return; 
  
      isRun.current = true; 
  
      const initKeycloak = async () => {
        const keycloackConfig = {
          url: process.env.REACT_APP_MAAS_KEYCLOAK_URL as string,
          realm: process.env.REACT_APP_MAAS_KEYCLOAK_REALM as string,
          clientId: process.env.REACT_APP_MAAS_KEYCLOAK_CLIENT as string,
        }
        const keycloakInstance: Keycloak = new Keycloak(keycloackConfig)
  
        keycloakInstance
          .init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          })
          .then((authenticated: boolean) => {
            setAuthenticated(authenticated);
            if (!authenticated) {
              navigate('/');
            } else {
                navigate('/dashboard');
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
          })
      }
  
      initKeycloak()
    }, [])
  
    return (
      <KeycloakContext.Provider value={{ keycloak, authenticated, mrn, username }}>
        {children}
      </KeycloakContext.Provider>
    )
  }
  
  export { KeycloakProvider, KeycloakContext }