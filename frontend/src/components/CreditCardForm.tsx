import React, { useState } from "react";

const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [valid, setValid] = useState(0); // State to track the validity

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("hell");
    setCardNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("inside credit");

    try {
      const response = await fetch("http://localhost:8000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ card_number: cardNumber }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.valid);

        data.valid ? setValid(1) : setValid(2);
      } else {
        console.error("Request failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        {/* <label>
        Credit Card Number:
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </label> */}
        <div className="form__group">
          <input
            type="text"
            className="form__input"
            id="name"
            placeholder="Card Number"
            required
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>

        <button type="submit">Verify</button>
      </form>
      {valid == 0 ? <div className="valid">Enter Credit Card Number!</div> : valid == 1 ? (
        <div className="valid">Bingo! it's a Valid Credit Card</div>
      ) : (
        <div className="valid">Oops! not a Valid Credit Card</div>
      )}
    </>
  );
};

export default CreditCardForm;
