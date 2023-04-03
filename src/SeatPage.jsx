import { useEffect } from "react";
import "./SeatPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const SeatPage = () => {
  let arr = localStorage.getItem("data");

  const navigate = useNavigate();

  arr = JSON.parse(arr);

  let numberOfSeatToBook = localStorage.getItem("seatNumberInput");

  let seatInRow = false;
  
  let bookedStatus = false;
  let fillCount = 0;

  // check if seats are available in one row
  for (const element of arr) {
    let emptyCount = 0;

    for (const ele2 of element) {
      if (ele2.bookingStatus == "empty") {
        emptyCount++;
      }
      if (emptyCount == numberOfSeatToBook) {
        seatInRow = true;
        break;
      }
    }

    if (emptyCount == numberOfSeatToBook) {
      for (const ele2 of element) {
        if (ele2.bookingStatus == "empty") {
          ele2.bookingStatus = "fill";
          ele2.justBooked = true;
          fillCount++;
        }
        if (fillCount == numberOfSeatToBook) {
          bookedStatus = true;
          break;
        }
      }
    }

    if (bookedStatus) {
      break;
    }
  }


  // check if the seats are available in multiple rows
  let emptyCount = 0;
  let filledseat = 0;
  if (!seatInRow) {
    let seatAv = false;
    for (const ele of arr) {
      for (const ele2 of ele) {
        // console.log({ele2})
        if (ele2.bookingStatus == "empty") {
          emptyCount++;
          console.log({ emptyCount });
        }
        if (emptyCount == numberOfSeatToBook) {
          seatAv = true;
          console.log({ seatAv });
          bookedStatus = true;
          break;
        }
      }
      if (seatAv) {
        break;
      }
    }
    if (seatAv) {
      for (const ele of arr) {
        for (const ele2 of ele) {
          if (ele2.bookingStatus == "empty") {
            ele2.bookingStatus = "fill";
            ele2.justBooked = true;
            filledseat++;
          }
          if (filledseat == numberOfSeatToBook) {
            break;
          }
        }
        if (filledseat == numberOfSeatToBook) {
          break;
        }
      }
    }
  }

  arr = JSON.stringify(arr);

  // save the latest booked seate data in database
  axios
    .post("https://trainbackend.onrender.com/book_seats", {
      data: JSON.parse(arr),
    })
    .then((res) => {
      console.log({ res });
    })
    .catch((err) => {
      console.log(err);
    });

  arr = JSON.parse(arr);

  const onBack = () => {
    navigate("/");
  };


  
  const onReset = () => {
    for (const element of arr) {
      for (const nestedElement of element) {
        nestedElement.justBooked = false;
        nestedElement.bookingStatus = "empty";
      }
    }
    let newArr = JSON.stringify(arr);

    axios
      .post("https://trainbackend.onrender.com/book_seats", {
        data: JSON.parse(newArr),
      })
      .then((res) => {
        console.log({ res });
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // when no seats are available
  if (!bookedStatus) {
    alert("Seats running out of availibility, all bookings will be reset, click OK");
    onReset();
    navigate("/seatpage");
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <h3>Booking Status</h3>

          <div className="box">
            <div className="flax-box">
              {arr.map((e) => {
                return (
                  <>
                    <div className="row">
                      {e.map((k) => {
                        if (k.bookingStatus == "empty") {
                          return <button> {k.seatNumber} </button>;
                        } else if (
                          k.bookingStatus == "fill" &&
                          k.justBooked == true
                        ) {
                          return (
                            <button
                              style={{
                                border: "2px solid green",
                                color: "white",
                                backgroundColor: "green",
                              }}
                            >
                              {k.seatNumber}
                            </button>
                          );
                        } else {
                          return (
                            <button
                              style={{
                                border: "2px solid gray",
                                color: "white",
                                backgroundColor: "gray",
                              }}
                            >
                              {k.seatNumber}
                            </button>
                          );
                        }
                      })}
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div>
            <button className="back-btn" onClick={onBack}>
              Book More..
            </button>
            <button className="reset-btn" onClick={onReset}>
              Reset and Book More..
            </button>
          </div>
          <hr />
          <div>
            <div className="booked">Sold Out</div>
            <div className="just-booked">Booked</div>
            <div className="empty">Empty</div>
          </div>
        </div>
      </div>
    </>
  );
};
