var RealEstate = artifacts.require("./RealEstate.sol");

contract('RealEstate', function(accounts) { 
    
    // 테스팅할 컨트랙트, accounts를 콜백으로 받는다 
    // accounts : 현재 연결된 노드에서 쓸수있는 계정 가나슈에서 연결할거져!! 그 계정!~
    var realEstateInstance;

    it("컨트랙의 소유자 초기화 테스팅", function() { // 무슨 테스트 할건지 : it
        return RealEstate.deployed().then(function(instance) { // 배포가 됐다면
            realEstateInstance = instance;
            return realEstateInstance.owner.call(); // owner return
        }).then(function(owner) {
            assert.equal(owner.toUpperCase(), accounts[0].toUpperCase(), "owner가 가나슈 첫 번째 계정과 일치하지 않습니다.");
            // assert.equal(리턴된 실제 값, 예상값, 두 개가 다를 경우 에러메시지)
        });
    });
});