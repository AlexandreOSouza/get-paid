// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";

contract GetPaid {

    using Counters for Counters.Counter;
    Counters.Counter public transactionsCount;

    address contractAddress;

    constructor() {
        contractAddress = payable(msg.sender);
    }

    event Sended(
        address to,
        address from,
        uint256 value
    );

    function send(address _to) public payable {
        require(msg.value > 0, "Send some ETH");

        (bool sent, bytes memory data) = _to.call{ value: msg.value }("");
        require(sent, "Failed to send Ether");
        transactionsCount.increment();
        emit Sended(_to, msg.sender, msg.value);
    }

}