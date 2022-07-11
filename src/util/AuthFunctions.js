import {
  AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool
} from 'amazon-cognito-identity-js'
import cognitoCredentials from '../cognito-pool.json'
  
  const userPool = new CognitoUserPool(cognitoCredentials)

  // first time user signup
  export const signupUser = (email,firstName,lastName,address,phoneNumber,password,callback) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: phoneNumber,
      }),
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: lastName,
      }),
      new CognitoUserAttribute({
        Name: 'address',
        Value: address,
      }),
      new CognitoUserAttribute({
        Name: 'profile',
        Value: 'user',
      })
    ]
  
    userPool.signUp(email, password, attributeList, null, callback)
  }
  
  
  export const userVerification = (email, verificationCode, callback) => {
    const userInfo = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userInfo)
    cognitoUser.confirmRegistration(verificationCode, true, callback)
  }
  
  export const loginUser = (email, password, callback) => {
    const authData = {
      Username: email,
      Password: password,
    }
    const authDetails = new AuthenticationDetails(authData)
    const userInfo = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userInfo)
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => {
        // console.log(result);
        localStorage.setItem('userMail',email);
        localStorage.setItem('userFName',result.idToken.payload.given_name);
        localStorage.setItem('profile',result.idToken.payload.profile);
        localStorage.setItem("isLogin",true);
        // console.log('access token + ' + result.getAccessToken().getJwtToken())
        callback(null, result)
      },
      onFailure: err => {
        callback(err)
      }
    })
  }

  export const loginAdmin = (email, password, callback) => {
    const authData = {
      Username: email,
      Password: password,
    }
    const authDetails = new AuthenticationDetails(authData)
    const userInfo = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userInfo)
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => {
        // console.log(result);
        const profileType = result.idToken.payload.profile;
        if(profileType === "admin"){
          localStorage.setItem('userMail',email);
          localStorage.setItem('userFName',result.idToken.payload.given_name);
          localStorage.setItem('profile',result.idToken.payload.profile);
          localStorage.setItem("isLogin",true);
          // console.log('access token + ' + result.getAccessToken().getJwtToken())
          callback(null, result)
        }
        else{
          localStorage.setItem('userMail',email);
          localStorage.setItem('userFName',result.idToken.payload.given_name);
          localStorage.setItem('profile',result.idToken.payload.profile);
          localStorage.setItem("isLogin",true);
          callback(null, result)
        }
      },
      onFailure: err => {
        callback(err)
      }
    })
  }
  
  
  export const logoutUser = (email) => {
    console.log(email);
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // const navigate = useNavigate();
    let userData = {
        Username : email,
        Pool: userPool
    }
    let cognitoUser = new CognitoUser(userData);
    cognitoUser.signOut();
    localStorage.clear();
    localStorage.setItem("isLogin",false);
    console.log("User Signout");
    window.location.replace('/');
  }
  
  export const userLoginCheck = (callback) => {
    const cognitoUser = userPool.getCurrentUser()
    if (!cognitoUser) return false;
  
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err)
        return
      }
  
      console.log('Session validation check', session.isValid())
      console.log(session)
  
      cognitoUser.getUserAttributes((err, attributes) => {
        if (err) return console.log(err);
        callback(attributes)
      })
    })
  }