import RoomService from '../src/RoomService';
import chai from 'chai';
const expect = chai.expect;
import mockUser from "./mockUser"
import mockServiceData from "./mockServiceData"

describe('RoomService', function() {
  
  let roomService;
  beforeEach(function() {
    roomService = new RoomService(mockUser, mockServiceData);
  });

  it('should be a function', function() {
    expect(RoomService).to.be.a('function');
  });

  it('should make an instance of Booking', function() {
    expect(roomService).to.be.an.instanceOf(RoomService);
  });

  it('should have default values', function() {
    expect(roomService.user).to.be.an("object");
    expect(roomService.serviceData).to.be.an("array");
    expect(roomService.serviceTotal).to.eql(0)
  });

  it('should gather all of customers orders and total charges', function() {
    expect(roomService.serviceData.length).to.eql(4);
    roomService.gatherCustOrders();
    expect(roomService.serviceData.length).to.eql(3);
    expect(roomService.serviceTotal).to.eql(40.82);
  });

  it('should have default values', function() {
    expect(roomService.getDailyTotal("15/07/2019")).to.eql("35.73")
  });
});