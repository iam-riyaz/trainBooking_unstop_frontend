import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import "./InputForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const InputForm = () => {
  const navigate = useNavigate();
  let flag = false;
  const [seatValue, setSeatValue] = useState();

  const onHandleClick = () => {
    console.log({ flag });
    if (seatValue > 0 && seatValue <= 7) {
      let arr = [];
      axios
        .get("http://localhost:2000/get_data")
        .then((res) => {
          arr = res.data.data;

          for (const element of arr) {
            for (const ele of element) {
              ele.justBooked = false;
            }
          }

          localStorage.setItem("data", JSON.stringify(arr));
          navigate("/seatpage");
        })
        .catch((err) => {
          console.log(err);
        });

     

      localStorage.setItem("seatNumberInput", seatValue);
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
      {seatValue > 7 || seatValue == 0 ? (
        <p>*please enter a value between 1 to 7</p>
      ) : null}
      <Button class="book-btn" mt={5} type="submit" onClick={onHandleClick}>
        
        Book
      </Button>
    </>
  );
};
