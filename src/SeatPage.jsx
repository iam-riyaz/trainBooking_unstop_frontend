
import "./SeatPage.css"
export const SeatPage=()=>{

  
    // let arr=[[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,32,33,34,35],[36,37,38,39,40,41,42],[43,44,45,46,47,48,49],[50,51,52,53,54,55,56],[57,58,59,60,61,62,63],[64,65,66,67,68,69,70],[71,72,73,74,75,76,77],[78,79,80]]

    let arr=[]
    let i=1
    while(i<=80)
    {
        let a1=[]
        let temp=i
        for(i; i<temp+7; i++)
        {
            let obj={seatNumber:i,bookingStatus:"empty",justBooked:false}
            a1.push(obj)
        }
        
        arr.push(a1)
    }

    arr[0][0].bookingStatus="fill"

    let numberOfSeatToBook= localStorage.getItem("seatNumberInput")


    for(let i=0; i<arr.length; i++)
    {
        let bookedStatus=false
        let emptyCount=0
        for(let j=0; j<arr[i].length; j++)
        {
             if(arr[i][j].bookingStatus=="empty")
             {
                emptyCount++
             }
             if(emptyCount==numberOfSeatToBook)
             {
                break;
             }
        }
        if(emptyCount==numberOfSeatToBook)
        {
            let fillCount=0
            for(let j=0; j<arr[i].length; j++)
            {
                if(arr[i][j].bookingStatus=="empty")
                {
                    arr[i][j].bookingStatus="fill";
                    arr[i][j].justBooked=true
                    fillCount++
                    
                }
                if(fillCount==numberOfSeatToBook)
                {
                    break;
                }
            }

            if(fillCount==numberOfSeatToBook)
            {
                break
            }
        }
    }
    console.log({arr})



    

    return(
        <>
        <div>
            <h3>booking page</h3>

            <div className="box">

                <div className="flax-box">
                    {arr.map((e)=>{
                        return(
                            <>
                            <div className="row">
                                {e.map((k)=>{
                                    
                                        if(k.bookingStatus=="empty")
                                        {
                                        return (<button> {k.seatNumber} </button>)
                                        }
                                         else if(k.bookingStatus=="fill" && k.justBooked==true){
                                            return(<button style={{ border:"2px solid green", color:"white" ,backgroundColor:"green"}}> {k.seatNumber}</button>) 

                                        }
                                        else{
                                            return(
                                                <button style={{border:"2px solid gray", color:"white",backgroundColor:"gray"}}> {k.seatNumber}</button>
                                            )
                                        }
                                        
                                    
                                })}
                            </div>
                            <hr />
                            </>
                        )
                    })}
                </div>

            </div>
        </div>
       
        </>
    )

}