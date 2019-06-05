import RoomServiceRepo from '../src/RoomServiceRepo';
import chai from 'chai';
const expect = chai.expect;
import mockServiceData from "./mockServiceData"

describe('RoomServiceRepo', function() {
  
  let serviceRepo;
  beforeEach(function() {
    serviceRepo = new RoomServiceRepo();
  });

  it('should be a function', function() {
    expect(RoomServiceRepo).to.be.a('function');
  });

  it('should make an instance of RoomServiceRepo', function() {
    expect(serviceRepo).to.be.an.instanceOf(RoomServiceRepo);
  });

  it('should have default values', function() {
    expect(serviceRepo.gatherDailyOrders(mockServiceData, "15/07/2019").length
    ).to.be.eql(2);
  });
});
