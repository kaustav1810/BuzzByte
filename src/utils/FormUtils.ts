export const validateFormFields = (fieldName,fieldValue,formData) => { 

    if(fieldName=='password' && fieldValue.length<6){
        return ({[fieldName]:`${fieldName} must be at least 6 characters`});
    }

    if(fieldName=='confirmPassword' && fieldValue!==formData.password){
        return ({[fieldName]:`Passwords do not match`});
    }

    if(fieldName=='phone' && /^[6-9]\d{9}$/.test(fieldValue) === false){
      return ({[fieldName]:`Please enter a valid phone number`});
    }

    if(fieldName=='email' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(fieldValue) === false){
      return ({[fieldName]:`Please enter a valid email`});
    }

  }

  