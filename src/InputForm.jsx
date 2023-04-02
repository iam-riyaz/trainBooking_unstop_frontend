import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import "./InputForm.css"
import { useNavigate } from "react-router-dom";

export const InputForm = () => {

    const navigate= useNavigate()
    let flag= false;
  const [seatValue, setSeatValue] = useState();

  const onHandleClick = () => {
    console.log({flag})
    if(seatValue>0 && seatValue<=7)
    {
        navigate("/seatpage")
        localStorage.setItem("seatNumberInput",seatValue)
    }

  };
  const onHandleChange = (e) => {
    setSeatValue(e.target.value);

    
  };

  return (
    <>
      <label>Number of seats</label>
      <Input
        name="noOfSeats"
        type="number"
        placeholder="number of seats"
        onChange={onHandleChange}
      />
      {seatValue>7 || seatValue==0? <p>*please enter a value between 1 to 7</p>:null}
      <Button mt={5} type="submit" onClick={onHandleClick}>
        {" "}
        Book
      </Button>
    </>
  );
};
