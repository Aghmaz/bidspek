import React ,{useState} from 'React'
import LinkedInLogin from 'react-linkedin-login-oauth2';

const Linkedin = () => {
      // linkedin 
  const [userData, setUserData] = useState(null);
  const handleSuccess = (response) => {
    setUserData(response);
  };
  
  const handleFailure = (error) => {
    console.log(error);
  };
  
  return (
    <div>
         <LinkedInLogin
  clientId="<your-client-id>"
  redirectUri="<your-redirect-uri>"
  onSuccess={handleSuccess}
  onFailure={handleFailure}
  renderElement={({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>LinkedIn Login</button>
  )}
/>
    </div>
  )
}

export default Linkedin
