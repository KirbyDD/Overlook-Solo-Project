import User from '../src/User';
import chai from 'chai';
const expect = chai.expect;
import mockUser from "./mockUser"

describe('User', function() {
  
  let user;
  beforeEach(function() {
    user = new User(mockUser.id, mockUser.name);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should make an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have default values', function() {
    expect(user.id).to.eql(9);
    expect(user.name).to.eql("Florine Jaskolski");
  });
});