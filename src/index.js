import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import fetch from 'cross-fetch';
import domUpdates from './domUpdates'
import User from "./User"
import RoomService from './RoomService';
import Booking from './Booking';

let userData;
let roomsData;
let bookingData
let serviceData;

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1903/users/users")
.then(response => response.json())
.then(data => {
  userData = data.users;
}).catch(err => console.log('error: ', err))

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1903/rooms/rooms")
.then(response => response.json())
.then(data => {
  roomsData = data.rooms;
}).catch(err => console.log('error: ', err))

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1903/bookings/bookings")
.then(response => response.json())
.then(data => {
  bookingData = data.bookings;
}).catch(err => console.log('error: ', err))

fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1903/room-services/roomServices")
.then(response => response.json())
.then(data => {
  serviceData = data.roomServices;
}).catch(err => console.log('error: ', err))

$("#login-btn").click(function() {
  $("#welcome-msg").append($("#username-input").val())
  $(".login").hide()
  $("header").show()
  $("#main-tab").addClass("current-tab")
  $(".main-section").show()
  $("#book-room-btn").hide();

  domUpdates.loadMainInfo(roomsData, bookingData, serviceData);
  domUpdates.loadDefaultOrders(serviceData)
  domUpdates.loadDefaultBookingInfo(bookingData, roomsData)
})

$("#search-customer-btn").click(function(e){
  e.preventDefault();
  let user = userData.filter(person => person.name === $("#search-input").val())[0];
  if(user){
    let custService = new RoomService(user, serviceData)
    let custBooking = new Booking(user, bookingData)
    domUpdates.populateCustomerInfo(user)
    domUpdates.populateCustOrders(custService)
    domUpdates.populateCustomerBookings(custBooking)
  } else{
    user = ""
    domUpdates.populateCustomerInfo(user)
  }
})

$("#add-customer-btn").click(function() {
  let newUser = new User(userData.length + 1, $("#search-input").val())
  userData.push(newUser);
  let custService = new RoomService(newUser, serviceData)
  let custBooking = new Booking(newUser, bookingData)
  domUpdates.populateCustomerInfo(newUser)
  domUpdates.populateCustOrders(custService)
  domUpdates.populateCustomerBookings(custBooking)
})

$("#book-room-btn").click(function() {
  domUpdates.bookARoom(userData, bookingData, roomsData, serviceData)
})

$("#main-tab").click(function() {
  $(".main-section").show()
  $("#orders-section").hide()
  $("#rooms-section").hide()
  $("#customer-section").hide()
  $(".main-tab").addClass("current-tab")
  $(".orders-tab").removeClass("current-tab")
  $(".rooms-tab").removeClass("current-tab")
  $(".customer-tab").removeClass("current-tab")
})

$("#orders-tab").click(function() {
  $(".main-section").hide()
  $("#orders-section").show()
  $("#rooms-section").hide()
  $("#customer-section").hide()
  $(".main-tab").removeClass("current-tab")
  $(".orders-tab").addClass("current-tab")
  $(".rooms-tab").removeClass("current-tab")
  $(".customer-tab").removeClass("current-tab")
})

$("#rooms-tab").click(function() {
  $(".main-section").hide()
  $("#orders-section").hide()
  $("#rooms-section").show()
  $("#customer-section").hide()
  $(".main-tab").removeClass("current-tab")
  $(".orders-tab").removeClass("current-tab")
  $(".rooms-tab").addClass("current-tab")
  $(".customer-tab").removeClass("current-tab")
})

$("#customer-tab").click(function() {
  $(".main-section").hide()
  $("#orders-section").hide()
  $("#rooms-section").hide()
  $("#customer-section").show()
  $(".main-tab").removeClass("current-tab")
  $(".orders-tab").removeClass("current-tab")
  $(".rooms-tab").removeClass("current-tab")
  $(".customer-tab").addClass("current-tab")
})

const hidePage = () => {
  $("header").hide()
  $(".main-section").hide()
  $("#orders-section").hide()
  $("#rooms-section").hide()
  $("#customer-section").hide()
}

hidePage();