import Booking from '../src/Booking';
import chai from 'chai';
const expect = chai.expect;
import mockUser from "./mockUser"
import mockBookingData from "./mockBookingData"

describe('Booking', function() {

  let booking;
  beforeEach(function() {
    booking = new Booking(mockUser, mockBookingData);
  });

  it('should be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should make an instance of Booking', function() {
    expect(booking).to.be.an.instanceOf(Booking);
  });

  it('should have default values', function() {
    expect(booking.user).to.be.an("object");
    expect(booking.data).to.be.an("array");
  });

  it('should grab only the booking of user', function() {
    expect(booking.data.length).to.eql(3);
    booking.gatherBookings()
    expect(booking.data.length).to.eql(2);
  });
});