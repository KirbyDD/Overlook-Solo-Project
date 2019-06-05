import RoomRepo from '../src/RoomRepo';
import chai from 'chai';
const expect = chai.expect;
import mockBookingData from "./mockBookingData"
import mockRoomData from "./mockRoomData"
import mockServiceData from "./mockServiceData"

describe('RoomRepo', function() {
  
  let roomRepo;
  beforeEach(function() {
    roomRepo = new RoomRepo();
  });

  it('should be a function', function() {
    expect(RoomRepo).to.be.a('function');
  });

  it('should make an instance of RoomRepo', function() {
    expect(roomRepo).to.be.an.instanceOf(RoomRepo);
  });
  
  it('should have default values', function() {
    expect(roomRepo.roomsAvailable).to.eql(0);
  });

  it('should show rooms available by date', function() {
    roomRepo.checkAvailibility(mockRoomData, mockBookingData, "15/07/2019")
    expect(roomRepo.roomsAvailable).to.eql(2);
  });

  it('should return occupied % of hotel', function() {
    roomRepo.checkAvailibility(mockRoomData, mockBookingData, "15/07/2019")
    expect(roomRepo.availablePct(mockRoomData)).to.eql("33.33");
  });

  it('should show all charges by date', function() {
    expect(roomRepo.getAllCharges(mockRoomData, mockBookingData, 
      mockServiceData, "15/07/2019")).to.eql("$331.03");
  });
});