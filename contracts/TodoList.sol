pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    bool completed;
    string owner;
    string ownerAadhar;
    string date;
    string landType;
    string schemeName;
    string totalAmount;
    string loanAmount;
    string outstandingLoanAmount;
    string plotNum;
    string syNum;
    string village;
    string taluk;
    string district;
    string state;
    string pincode;
    //address emp;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    bool completed,
    string owner,
    string ownerAadhar,
    string date,
    string landType,
    string schemeName,
    string totalAmount,
    string loanAmount,
    string outstandingLoanAmount,
    string plotNum,
    string syNum,
    string village,
    string taluk,
    string district,
    string state,
    string pincode
    //address emp
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    //createTask("123","Ramesh K Suresh","1234567890","560006");
  }

  function createTask(string memory owner, string memory ownerAadhar, string memory date, string memory landType, string memory schemeName, string memory totalAmount, string memory loanAmount, string memory outstandingLoanAmount, string memory plotNum, string memory syNum, string memory village, string memory taluk, string memory district, string memory state, string memory pincode) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, false, owner, ownerAadhar, date, landType, schemeName, totalAmount, loanAmount, outstandingLoanAmount, plotNum, syNum, village, taluk, district, state, pincode);
    emit TaskCreated(taskCount, false, owner, ownerAadhar, date, landType, schemeName, totalAmount, loanAmount, outstandingLoanAmount, plotNum, syNum, village, taluk, district, state, pincode);
  }

  function modifyTask(uint taskCount, string memory owner, string memory ownerAadhar, string memory date, string memory landType, string memory schemeName, string memory totalAmount, string memory loanAmount, string memory outstandingLoanAmount, string memory plotNum, string memory syNum, string memory village, string memory taluk, string memory district, string memory state, string memory pincode) public {
    tasks[taskCount] = Task(taskCount, false, owner, ownerAadhar, date, landType, schemeName, totalAmount, loanAmount, outstandingLoanAmount, plotNum, syNum, village, taluk, district, state, pincode);
    emit TaskCreated(taskCount, false, owner, ownerAadhar, date, landType, schemeName, totalAmount, loanAmount, outstandingLoanAmount, plotNum, syNum, village, taluk, district, state, pincode);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

}
