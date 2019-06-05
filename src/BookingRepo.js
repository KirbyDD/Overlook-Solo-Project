class BookingRepo{
  constructor(bookingData, roomsData){
    this.data = bookingData;
    this.rooms = roomsData;
  }

  populateMostPopularDate(){
    let workObj = this.data.reduce((acc, booking) => {
      if(!acc[booking.date]){
        acc[booking.date] = 1
      } else {
        acc[booking.date]++
      }
      return acc;
    }, {})
    let workArray = Object.values(workObj)
    let popday = Math.max(...workArray)
    
    return Object.keys(workObj).find(key => {
      return workObj[key] === popday
    })
  }

  populateLeastPopularDate(){
    let workObj = this.data.reduce((acc, booking) => {
      if(!acc[booking.date]){
        acc[booking.date] = 1
      } else {
        acc[booking.date]++
      }
      return acc;
    }, {})
    let workArray = Object.values(workObj)
    let popday = Math.min(...workArray)
    
    return Object.keys(workObj).find(key => {
      return workObj[key] === popday
    })
  }

  gatherAvailableRooms(date){
    let workArray = this.data.filter(booking => booking.date === date)
    .map(booking => booking.roomNumber)
    return workArray;
  }

  getARoom(date, input){
    let workArray = this.gatherAvailableRooms(date);
    this.rooms = this.rooms.filter(room => {
      if(workArray.includes(room.number)){
        return
      } else{
        return room;
      }
    }).filter(room => room.roomType === input.toLowerCase())
    return this.rooms[0];
  }
}

export default BookingRepo;