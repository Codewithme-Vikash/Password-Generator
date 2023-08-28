import {  lowerCaseLetters , upperCaseLetters , numbers , specialCharacters } from "./dataArray.js";

function passwordGenerator( length , includeLowercase ,  includeUppercase , includeNumbers  , includeSymbols){

    let password = ""

    while( password.length != length ){
        
        let select = Math.round(Math.random()*(4 -1) )
        
        if( select == 0 && includeLowercase ) { // use the lowercaseletters
            password += lowerCaseLetters[Math.round(Math.random()*(lowerCaseLetters.length - 1))]
        }
        
        else if( select == 1 && includeUppercase ) { // use the uppercaseletters
            password += upperCaseLetters[Math.round(Math.random()*(upperCaseLetters.length - 1))]
        }
        else if( select == 2 && includeNumbers ){
            password += numbers[Math.round(Math.random()*(numbers.length - 1))]
        }
        else if( select == 3 && includeSymbols ){
            password += specialCharacters[Math.round(Math.random()*(specialCharacters.length - 1 ) ) ]
        }
    }

    return password
}

export default passwordGenerator;