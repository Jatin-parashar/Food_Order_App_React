import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

export default function Checkout(props){


  const [isNameValid,setIsNameValid]=useState(true);
  const [isStreetValid,setIsStreetValid]=useState(true);
  const [isPostalCodeValid,setIsPostalCodeValid]=useState(true);
  const [isCityValid,setIsCityValid]=useState(true);

  const nameInputRef=useRef();
  const streetInputRef=useRef();
  const postalCodeInputRef=useRef();
  const cityInputRef=useRef();

  const isEmpty=(value)=> value.trim()==='';
  const isSixChars=(value)=> value.trim().length===6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalCode=postalCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
    
    setIsNameValid(enteredNameIsValid);
    setIsStreetValid(enteredStreetIsValid);
    setIsPostalCodeValid(enteredPostalCodeIsValid);
    setIsCityValid(enteredCityIsValid);

    const isFormValid = isNameValid  && isStreetValid && isPostalCodeValid && isCityValid;
    if(!isFormValid){
      return;
    }

    //submit form data
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postalCode:enteredPostalCode,
      city:enteredCity
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${isNameValid?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!isNameValid && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${isStreetValid?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!isStreetValid && <p>Please enter a valid Street!</p>}
      </div>
      <div className={`${classes.control} ${isPostalCodeValid?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!isPostalCodeValid && <p>Please enter a valid Postal Code!</p>}
      </div>
      <div className={`${classes.control} ${isCityValid?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!isCityValid && <p>Please enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};