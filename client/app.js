const API = "http://localhost:5000/api";


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
async function loadHotels() {

    const response = await fetch(API + "/hotels");

    const hotels = await response.json();

    let html = "";

    hotels.forEach(hotel => {

        html += `
            <div style="border:1px solid gray; padding:15px; margin:10px;">
               <h3>${hotel.name}</h3>

<button onclick="viewRooms(${hotel.hotel_id})">
    View Rooms
</button>

                <p><strong>City:</strong> ${hotel.city}</p>

                <p><strong>Address:</strong> ${hotel.address}</p>

                <p>${hotel.description}</p>
            </div>
        `;

    });

    document.getElementById("hotels").innerHTML = html;

}
async function register() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(API + "/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })

    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
        window.location = "index.html";
    }

}
function viewRooms(hotelId){

    localStorage.setItem("hotelId", hotelId);

    window.location = "rooms.html";

}


async function loadRooms(){

    const hotelId = localStorage.getItem("hotelId");

    const response = await fetch(API + "/rooms");

    const rooms = await response.json();

    let html = "";

    rooms
    .filter(room => room.hotel_id == hotelId)
    .forEach(room => {

        html += `
            <div style="border:1px solid gray;padding:15px;margin:10px;">

               <h3>${room.room_type}</h3>

<p>Price: ${room.price_per_night}</p>

<p>Capacity: ${room.capacity}</p>

<p>${room.description}</p>

<button onclick="bookRoom(${room.room_id})">
    Book Now
</button>   
            </div>
        `;

    });

    document.getElementById("rooms").innerHTML = html;

}
async function bookRoom(roomId) {

    const token = localStorage.getItem("token");

    const check_in_date = prompt("Enter check-in date (YYYY-MM-DD)");

    const check_out_date = prompt("Enter check-out date (YYYY-MM-DD)");

    const response = await fetch(API + "/bookings", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },

        body: JSON.stringify({
    room_id: roomId,
    check_in_date,
    check_out_date
})

    });

    const data = await response.json();

    alert(data.message || "Booking created successfully!");

}
async function loadBookings(){

    const token = localStorage.getItem("token");

    const response = await fetch(
        API + "/bookings/my",
        {
            headers:{
                "Authorization":"Bearer " + token
            }
        }
    );


    const bookings = await response.json();


    let html = "";


    bookings.forEach(booking => {

        html += `

        <div style="border:1px solid gray;padding:15px;margin:10px">

            <h3>Booking ID: ${booking.booking_id}</h3>

            <p>Room ID: ${booking.room_id}</p>

            <p>Check in: ${booking.check_in_date}</p>

            <p>Check out: ${booking.check_out_date}</p>

            <p>Status: ${booking.status}</p>


            <button onclick="cancelBooking(${booking.booking_id})">
                Cancel
            </button>

        </div>

        `;

    });


    document.getElementById("bookings").innerHTML = html;

}
async function cancelBooking(id){

    const token = localStorage.getItem("token");


    const response = await fetch(
        API + "/bookings/" + id,
        {
            method:"DELETE",

            headers:{
                "Authorization":"Bearer " + token
            }
        }
    );


    const data = await response.json();


    alert(data.message);


    loadBookings();

}