import React, { children, useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { UserContext } from '../../App';



const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        
                loggedInUser.email ?(children):(
                    <Navigate to={'/LogIn'} replace />
                )
            
         
    );
    }
    


export default PrivateRoute;