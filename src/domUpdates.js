import $ from 'jquery'
import RoomRepo from './RoomRepo';
import RoomServiceRepo from './RoomServiceRepo';
import BookingRepo from './BookingRepo';
import RoomService from "./RoomService"


const domUpdates = {
  loadMainInfo(roomsData, bookingData, serviceData) {
    let today = domUpdates.getTodaysDate();
    let roomRepo = new RoomRepo()
    $("#todays-date").append(today)
    $("#rooms-general").append(roomRepo.checkAvailibility(roomsData, bookingData, today))
    $("#charges-general").append(roomRepo.getAllCharges(roomsData, bookingData, serviceData, today))
    $("#occupied-pct").append(`${roomRepo.availablePct(roomsData)}%`)
  },

  loadDefaultOrders(serviceData) {
    let today = domUpdates.getTodaysDate();
    let serviceRepo = new RoomServiceRepo();
    $("#customer-order-info").html(`<p id="order-info">All order's for room service for ${today}: ${serviceRepo.gatherDailyOrders(serviceData, today)}</p>`)

  },

  loadDefaultBookingInfo(bookingData, roomsData) {
    let bookingRepo = new BookingRepo(bookingData, roomsData)
    $("#customer-room-info").html(
      `<p>Highest Booked Date: ${bookingRepo.populateMostPopularDate()}</p>
      <p>Lowest Booked Date: ${bookingRepo.populateLeastPopularDate()}</p>`
    )
    $("#room-search-btn").click(function() {
      $("#customer-room-info").html(
        `<p>For Rooms 1 - 200 on ${$("#room-date-search").val()}, all are available except:</p>
        ${bookingRepo.gatherAvailableRooms($("#room-date-search").val()).map(el => {
          return `</p>Room: ${el}`
        })}`
      )
    })
  },

  populateCustomerInfo(customer) {
    if(customer.name){
      $("#curr-customer").text(`Current Customer: ${customer.name}`)
    } else{
      $("#curr-customer").text("Current Customer: Customer Does Not Exist.")
    }
  },

  populateCustOrders(custService) {
    custService.gatherCustOrders()
    if(!custService.serviceData.length){
      $("#order-info").html(`<p>Customer hasn't made any orders.</p>`)
    } else{
      $("#order-info").html(custService.serviceData.map(el => {
        return `<p>Date: ${el.date}, Charge Amount: $${el.totalCost}</p>`
      }))
    }
    $("#order-date-search").click(function() {
      $("#order-info").html(
        `<p>Total Service Charges for ${$("#date-search-input").val()}:
        $${custService.getDailyTotal($("#date-search-input").val())}</p>
        <p>All Total Service Charges: $${custService.serviceTotal.toFixed(2)} `
    )})
  },

  populateCustomerBookings(custBooking) {
    let today = domUpdates.getTodaysDate();
    custBooking.gatherBookings();
    let popBtn = custBooking.data.filter(el => el.date === today);
    if(!custBooking.data.length){
      $("#customer-room-info").html(`<p>Customer hasn't made any bookings.</p>`)
    } else {
      $("#customer-room-info").html(
      custBooking.data.map(el => {
        return `<p>Customer booked Room ${el.roomNumber} for ${el.date}</p>`
      }))
    }
    if(!popBtn.length){
      $("#book-room-btn").show();
    }
  },

  bookARoom(userData, bookingData, roomsData, serviceData) {
    $("#customer-room-info").html(
      `<p>What type of room would you like: Single Room, 
      Junior Suite, Suite, or Residential Suite? </p>
      <input class="room-type-input" placeholder="Room Type..." />
      <button id="room-type-confirm">Check Availability</button>`
    )
    domUpdates.showAvailableRooms(userData, bookingData, roomsData, serviceData)
  },

  showAvailableRooms(userData, bookingData, roomsData, serviceData){
    let today = domUpdates.getTodaysDate();
    let bookingRepo = new BookingRepo(bookingData, roomsData)
    let user = userData.filter(person => person.name === $("#search-input").val())[0]
    $("#room-type-confirm").click(function(){
      let room = bookingRepo.getARoom(today, $(".room-type-input").val().toLowerCase());
      $("#customer-room-info").html(
        `<h3>Here is an available room</h3>
        <p>Type: ${room.roomType.toUpperCase()},  Number of beds: ${room.numBeds}, 
        Bed sizes: ${room.bedSize.toUpperCase()},  Bidet: ${room.bidet}</p>
        <button id="confirm-room">Confirm Booking</button>`
      )
      domUpdates.confirmBooking(user, room, today, bookingData, serviceData)
    })
  },

  confirmBooking(user, room, today, bookingData, serviceData){
    $("#confirm-room").click(function(){
      let newBooking = {"userID": user.id, "date": today, "roomNumber": room.number}
      bookingData.push(newBooking);
      $("#customer-room-info").html(
        `<h3>Room ${room.number} has been booked!</h3>
        <button id="add-room-service">Add Room Service</button>`
      )
      domUpdates.makeOrder(user, today, serviceData)
    })
  },

  makeOrder(user, today, serviceData){
    $("#add-room-service").click(function(){
      $("#customer-room-info").html(
        `<p>Please choose from the following list:</p>
        <p>Pizza $8, Hamburger $8, Nachos (All cost $8)</p>
        <input id="selected-order" />
        <button id="confirm-room-service">Confirm Order</button>`
      )
      domUpdates.confirmOrder(user, today, serviceData)
    })
  },

  confirmOrder(user, today, serviceData){
    $("#confirm-room-service").click(function(){
      let newOrder = { "userID": user.id, 
                      "date": today, 
                      "food": $("#selected-order").val(),
                      "totalCost": 8
                    }
      serviceData.push(newOrder)
      let custService = new RoomService(user, serviceData);
      domUpdates.populateCustOrders(custService)
      $("#customer-room-info").html(
        `<p>Order has been made!</p>`
      )
    })
  },

  getTodaysDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) { dd = `0${dd}`; }
    if (mm < 10) { mm = `0${mm}`; }
    today = `${dd}/${mm}/${yyyy}`;
    return today;
  }
  
}

export default domUpdates;