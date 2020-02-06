pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

  constructor() public {
    createTask("123","Ramesh K Suresh","1234567890","560006");
  }
  
  function createTask(string memory _plotNum, string memory _owner, string memory _ownerAadhar, string memory _pincode) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _owner, false);
    emit TaskCreated(taskCount, _owner, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

}
