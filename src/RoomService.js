class RoomService {
  constructor(userObj, serviceData){
    this.user = userObj;
    this.serviceData = serviceData;
    this.serviceTotal = 0;
  }

  gatherCustOrders(){
    this.serviceData = this.serviceData.filter(service => {
      return service.userID === this.user.id
    })
    this.serviceTotal = this.serviceData.reduce((total, item) => { 
      total+=item.totalCost;
      return total;
    }, 0)
  }

  getDailyTotal(date){
    let workArray = this.serviceData.filter(service => service.date === date);
    let result = workArray.reduce((total, item) => { 
      total+=item.totalCost;
      console.log(total)
      return total;
    }, 0)
    return result.toFixed(2)
  }
}

export default RoomService;