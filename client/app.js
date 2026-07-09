const API = "http://localhost:5000/api";


// ================= LOGIN =================

async function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    const response = await fetch(
        API + "/auth/login",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }
    );


    const data = await response.json();


    if(data.token){

        localStorage.setItem(
            "token",
            data.token
        );


        alert("Login successful");


        window.location="hotels.html";


    }else{

        alert(data.message);

    }

}





// ================= REGISTER =================


async function register(){


    const name =
    document.getElementById("name").value;


    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    const response = await fetch(
        API + "/auth/register",
        {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },


        body:JSON.stringify({

            name,
            email,
            password

        })

    });



    const data = await response.json();


    alert(data.message);



    if(response.ok){

        window.location="index.html";

    }


}







// ================= HOTELS =================


async function loadHotels(){


    const response = await fetch(
        API + "/hotels"
    );


    const hotels = await response.json();



    let html = "";



    hotels.forEach(hotel=>{


        html += `


        <div class="card">


            <img src="images/hotel${hotel.hotel_id}.jpg"
            alt="${hotel.name}">


            <h3>
            ${hotel.name}
            </h3>


            <p>
            <strong>City:</strong>
            ${hotel.city}
            </p>


            <p>
            <strong>Address:</strong>
            ${hotel.address}
            </p>


            <p>
            ${hotel.description}
            </p>



            <button onclick="viewRooms(${hotel.hotel_id})">

            View Rooms

            </button>


        </div>


        `;


    });



    document.getElementById("hotels").innerHTML = html;


}






function viewRooms(hotelId){


    localStorage.setItem(
        "hotelId",
        hotelId
    );


    window.location="rooms.html";


}








// ================= ROOMS =================



async function loadRooms(){


    const hotelId =
    localStorage.getItem("hotelId");



    const response = await fetch(
        API + "/rooms"
    );



    const rooms = await response.json();



    const availableRooms =
    rooms.filter(
        room => room.hotel_id == hotelId
    );



    let html = "";



    if(availableRooms.length === 0){


        html = `

        <div class="card">

        <h2>
        No rooms available
        </h2>

        </div>

        `;


    }



    availableRooms.forEach(room=>{


        html += `


        <div class="card">


        <h3>
        ${room.room_type}
        </h3>


        <p>
        Price:
        ${room.price_per_night} Birr
        </p>


        <p>
        Capacity:
        ${room.capacity}
        </p>


        <p>
        ${room.description}
        </p>



        <button onclick="bookRoom(${room.room_id})">

        Book Now

        </button>


        </div>


        `;


    });



    document.getElementById("rooms").innerHTML = html;


}









// ================= BOOKING =================



let selectedRoom = null;




function bookRoom(roomId){


    selectedRoom = roomId;



    const box =
    document.getElementById("bookingBox");



    if(box){

        box.style.display="block";


        box.scrollIntoView({

            behavior:"smooth"

        });

    }


}






async function confirmBooking(){



    const token =
    localStorage.getItem("token");



    if(!token){

        alert("Please login first");

        window.location="index.html";

        return;

    }




    const check_in_date =
    document.getElementById("checkIn").value;



    const check_out_date =
    document.getElementById("checkOut").value;




    if(!check_in_date || !check_out_date){


        alert("Please select dates");


        return;

    }





    const response = await fetch(

        API + "/bookings",

        {


        method:"POST",


        headers:{


            "Content-Type":"application/json",


            "Authorization":
            "Bearer " + token


        },


        body:JSON.stringify({


            room_id:selectedRoom,


            check_in_date,


            check_out_date


        })


    });




    const data = await response.json();



    alert(
        data.message ||
        "Booking successful"
    );



    if(response.ok){


        window.location="bookings.html";


    }


}









// ================= MY BOOKINGS =================



async function loadBookings(){


    const token =
    localStorage.getItem("token");



    const response = await fetch(

        API + "/bookings/my",

        {


        headers:{


            "Authorization":
            "Bearer " + token


        }


    });



    const bookings =
    await response.json();




    if(!Array.isArray(bookings)){


        alert(bookings.message);


        return;


    }





    let html="";




    if(bookings.length===0){


        html=`


        <div class="card">


        <h2>
        No bookings yet
        </h2>


        </div>


        `;


    }






    bookings.forEach(booking=>{


        html += `


        <div class="card">


        <h3>
        Booking ID:
        ${booking.booking_id}
        </h3>


        <p>
        Room ID:
        ${booking.room_id}
        </p>


        <p>
        Check In:
        ${booking.check_in_date}
        </p>


        <p>
        Check Out:
        ${booking.check_out_date}
        </p>


        <p>
        Status:
        ${booking.status}
        </p>



        <button onclick="cancelBooking(${booking.booking_id})">

        Cancel

        </button>



        </div>


        `;


    });




    document.getElementById("bookings").innerHTML=html;


}








// ================= CANCEL BOOKING =================



async function cancelBooking(id){



    const token =
    localStorage.getItem("token");



    const response = await fetch(

        API + "/bookings/" + id,

        {


        method:"DELETE",


        headers:{


            "Authorization":
            "Bearer " + token


        }


    });




    const data =
    await response.json();



    alert(data.message);



    loadBookings();


}