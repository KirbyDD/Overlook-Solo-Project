class RoomRepo {
  constructor(){
    this.roomsAvailable = 0;
  }

  checkAvailibility(roomsData, bookingData, date){
    let bookedRooms = bookingData.filter(booking => booking.date === date)
    this.roomsAvailable = roomsData.length - bookedRooms.length
    return this.roomsAvailable;
  }

  availablePct(roomsData){
    return 100 - (this.roomsAvailable * 100 / roomsData.length);
  }

  getAllCharges(roomsData, bookingData, servicesData, date){
    let bookedRooms = bookingData.filter(booking => booking.date === date)
    let charges = bookedRooms.reduce((total, bookedRoom) => {
      roomsData.forEach(room => {
        if(room.number=== bookedRoom.roomNumber){
          total += room.costPerNight;
        }
      });
      servicesData.forEach(service => {
        if(service.userID === bookedRoom.userID){
          total += service.totalCost;
        }
      })
      return total;
    }, 0)
    return `$${charges.toFixed(2)}`;
  }

}

export default RoomRepo;