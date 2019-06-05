class RoomServiceRepo {
  constructor(){

  }

  gatherDailyOrders(orderInfo, date){
    let todaysList = orderInfo.filter(order => order.date === date)
    let result = todaysList.map(item => {
      return `${item.food}(${item.totalCost})`
    })
    if(result.length === 0){
      return "None";
    }
    else{
      return result.map(el => el);
    }
  }
}

export default RoomServiceRepo;