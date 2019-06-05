class Booking {
  constructor(userObj, bookingData){
    this.user = userObj;
    this.data = bookingData;
  }

  gatherBookings(){
    this.data = this.data.filter(booking => booking.userID === this.user.id)
  }

}

export default Booking;