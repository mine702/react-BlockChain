// SPDX-License-Identifier: MIT
pragma solidity >=0.4.23 <0.9.0;

contract RealEstate {

    struct Buyer {
        address buyerAddress; // 매입자의 계정 주소
        string name;
        uint age;
    }

    mapping (uint => Buyer) public buyerInfo; // 매물의 id 키값 => 매입자의 정보

    address public owner; // public으로 만들면 getter 자동으로 생김
    address[10] public buyers; // 매입자 계정 주소 저장. 매물이 10개니까 10개

    event LogBuyRealEstate (
        address _buyer,
        uint _id
    );

    constructor() public {
        owner = msg.sender;
    }

    // 매물 id, 매입자 이름, 매입자 나이
    function buyRealEstate(uint _id, string _name, uint _age) public payable { // 이더를 이 함수로 보내는 것
        require(_id >= 0 && _id <= 9);
        buyers[_id] = msg.sender; // 이 메시지 보낸 사람이 사는거니까!
        buyerInfo[_id] = Buyer(msg.sender, _name, _age); // 매입된 매물의 매입자 정보 매핑

        owner.transfer(msg.value); // 매입가를 owner 계정으로 전송
        // 여기에는 wei만 들어가서 프론트엔드에서 ether를 wei로 변경시켜줘야함

        emit LogBuyRealEstate(msg.sender, _id); // 이벤트를 내보내겠다!
    }
}
