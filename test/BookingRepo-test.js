import BookingRepo from '../src/BookingRepo';
import chai from 'chai';
const expect = chai.expect;
import mockBookingData from "./mockBookingData";
import mockRoomData from "./mockRoomData"

describe('BookingRepo', function() {
  
  let bookingRepo;
  beforeEach(function() {
    bookingRepo = new BookingRepo(mockBookingData, mockRoomData);
  });

  it('should be a function', function() {
    expect(BookingRepo).to.be.a('function');
  });

  it('should make an instance of BookingRepo', function() {
    expect(bookingRepo).to.be.an.instanceOf(BookingRepo);
  });

  it('should have default values', function() {
    expect(bookingRepo.rooms).to.be.an("array");
    expect(bookingRepo.data).to.be.an("array");
  });

  it('should return most popular date', function() {
    expect(bookingRepo.populateMostPopularDate()).to.eql("04/07/2019");
  });

  it('should return lest popular date', function() {
    expect(bookingRepo.populateLeastPopularDate()).to.eql("15/07/2019");
  });

  it('should return most popular date', function() {
    expect(bookingRepo.gatherAvailableRooms("04/07/2019")).to.eql([39, 42]);
  });

  it('should return a room for booking', function() {
    expect(bookingRepo.getARoom("04/07/2019", "suite")).to.eql({
      number: 31,
      roomType: "suite",
      bidet: true,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 230.2
    });
  });
});