import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CreditCardForm from './components/CreditCardForm';

function App() {
  const [cardNumber, setCardNumber] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(event.target.value);
  };

  const verifyCreditCard =  () =>{
    console.log("Hello");
    
  }

  return (
    <div className='app'>
      <h1>Credit Card Verification</h1>
      <CreditCardForm />
    </div>
  );
}

export default App
