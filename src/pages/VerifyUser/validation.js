import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import { userVerification } from "../../util/AuthFunctions";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useValidation = (callback) => {
    
    const location = useLocation();

    const navigate = useNavigate();

    console.log(location.state);
    // cite : https://stackoverflow.com/questions/58786590/pure-javascript-replacement-for-lodashes-omit
    // I used above code for destroying object with their respective key
    function omit(obj, attr) {
        const { [attr]: _, ...newObj } = obj;
        return newObj;
    }

    const [isValid, setIsvalid] = useState(false);

    const [inputValues, setInputValues] = useState({

    });

    const [inputErrors, setInputErrors] = useState({

    });


    const validateInputs = (event, inputName, inputValue) => {
        // console.log(isValid);
        if (inputName === 'authCode') {
            if (!inputValue) {
                setInputErrors({
                    ...inputErrors,
                    authCode: 'Please enter verification code'
                })
                setIsvalid(false);
            }
            else if (!new RegExp("^\\d{6}").test(inputValue)) {
                setInputErrors({
                    ...inputErrors,
                    authCode: 'Verification code contains only 6 digits'
                })
                setIsvalid(false);
            }
            else if (inputValue.length > 6) {
                setInputErrors({
                    ...inputErrors,
                    authCode: 'Verification code no more than 6 digit'
                })
                setIsvalid(false);
            }
            else {
                let newState = omit(inputErrors, 'authCode');
                setInputErrors(newState);
                console.log(inputErrors);
                setIsvalid(true);
            }
        }


    }

    const handleChange = (event) => {
        event.persist();
        // console.log("Input name:",event.target.name);
        // console.log("Input value:",event.target.value);

        let inputName = event.target.name;
        let inputValue = event.target.value;

        setInputValues({
            ...inputValues,
            [inputName]: inputValue,
        })

        validateInputs(event, inputName, inputValue);
    }
    const notify = () => {
        toast.success("You successfully verified",{position: toast.POSITION.TOP_RIGHT});
    }

    const handleSubmit = (event) => {
        console.log(location.state.email);
        console.log(inputValues);
        if (event) event.preventDefault();
        userVerification(location.state.email,inputValues.authCode, (err, result) => {
            if (err) {
                console.log(err)
                return
            }
            // alert(result);
            notify();
            navigate('/login',{ state: { email: location.state.email } });
        })
    }

    return {
        inputValues,
        inputErrors,
        handleChange,
        handleSubmit,
        isValid
    }
}

export default useValidation