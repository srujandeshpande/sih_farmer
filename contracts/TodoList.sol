pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;
  address public emp = msg.sender;

  struct Task {
    uint id;
    string content;
    bool completed;
    string owner;
    string ownerAadhar;
    string pincode;
    string schemeName;
    address emp;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed,
    string owner,
    string ownerAadhar,
    string pincode,
    string schemeName,
    address emp
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    //createTask("123","Ramesh K Suresh","1234567890","560006");
  }

  function createTask(string memory _plotNum, string memory _owner, string memory _ownerAadhar, string memory _pincode, string memory _schemeName) public {
    taskCount ++;
    emp = msg.sender;
    //address emp = msg.sender;
    tasks[taskCount] = Task(taskCount, _plotNum, false, _owner, _ownerAadhar, _pincode, _schemeName,emp);
    emit TaskCreated(taskCount, _plotNum, false, _owner, _ownerAadhar, _pincode, _schemeName,emp);
  }

  function modifyTask(uint taskCount, string memory _plotNum, string memory _owner, string memory _ownerAadhar, string memory _pincode, string memory _schemeName) public {
    emp = msg.sender;
    tasks[taskCount] = Task(taskCount, _plotNum, false, _owner, _ownerAadhar, _pincode, _schemeName,emp);
    emit TaskCreated(taskCount, _plotNum, false, _owner, _ownerAadhar, _pincode, _schemeName,emp);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

}
