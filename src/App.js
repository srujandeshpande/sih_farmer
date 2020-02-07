App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
        //window.location.reload()
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const todoList = await $.getJSON('TodoList.json')
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.todoList = await App.contracts.TodoList.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderTasks()

    // Update loading state
    App.setLoading(false)
  },

  search: async () => {
    // Load the total task count from the blockchain
    const sval = $('#search').val()
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate2 = $('.taskTemplate2')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const t_plotNum = task[1]
      const taskCompleted = task[2]
      const t_owner = task[3]
      const t_ownerAadhar = task[4]
      const t_pincode = task[5]
      const t_schemeName = task[6]
      const t_address = task[7]

      // Create the html for the task
      const $newTaskTemplate2 = $taskTemplate2.clone()
      $newTaskTemplate2.find('.d_index').html(taskId)
      $newTaskTemplate2.find('.d_plotNum').html(t_plotNum)
      $newTaskTemplate2.find('.d_owner').html(t_owner)
      $newTaskTemplate2.find('.d_ownerAadhar').html(t_ownerAadhar)
      $newTaskTemplate2.find('.d_pincode').html(t_pincode)
      $newTaskTemplate2.find('.d_schemeName').html(t_schemeName)
      $newTaskTemplate2.find('.d_address').html(t_address)
      $newTaskTemplate2.find('.d_tempid').attr('id',taskId)
      $newTaskTemplate2.find('.d_tempid')
                      .prop('name', taskId)
                      .on('click', App.modifyRefill)
      $newTaskTemplate2.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      for (var j = 1; j <= 7; j++) {
        if (sval === task[j]) {
      //if (sval === t_owner) {
        $('#searchList').append($newTaskTemplate2)
        //$('#completedTaskList').append($newTaskTemplate)
      }}

      // Show the task
      $newTaskTemplate2.show()
    }
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= taskCount; i++) {
      // Fetch the task data from the blockchain
      const task = await App.todoList.tasks(i)
      const taskId = task[0].toNumber()
      const t_plotNum = task[1]
      const taskCompleted = task[2]
      const t_owner = task[3]
      const t_ownerAadhar = task[4]
      const t_pincode = task[5]
      const t_schemeName = task[6]
      const t_address = task[7]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.c_index').html(taskId)
      $newTaskTemplate.find('.c_plotNum').html(t_plotNum)
      $newTaskTemplate.find('.c_owner').html(t_owner)
      $newTaskTemplate.find('.c_ownerAadhar').html(t_ownerAadhar)
      $newTaskTemplate.find('.c_pincode').html(t_pincode)
      $newTaskTemplate.find('.c_schemeName').html(t_schemeName)
      $newTaskTemplate.find('.c_address').html(t_address)
      $newTaskTemplate.find('.tempid').attr('id',taskId)
      $newTaskTemplate.find('.tempid')
                      .prop('name', taskId)
                      .on('click', App.modifyRefill)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (taskCompleted) {
        $('#taskList').append($newTaskTemplate)
        //$('#completedTaskList').append($newTaskTemplate)
      } else {
        $('#taskList').append($newTaskTemplate)
      }

      // Show the task
      $newTaskTemplate.show()
    }
  },

  modifyRefill: async (e) => {
    //App.setLoading(true)
    const taskId = e.target.name
    /*
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')
    */

    const task = await App.todoList.tasks(taskId)

    const t_plotNum = task[1]
    const taskCompleted = task[2]
    const t_owner = task[3]
    const t_ownerAadhar = task[4]
    const t_pincode = task[5]
    const t_schemeName = task[6]

    $('#index').val(taskId)
    $('#plotNum').val(t_plotNum)
    $('#owner').val(t_owner)
    $('#ownerAadhar').val(t_ownerAadhar)
    $('#pincode').val(t_pincode)
    $('#schemeName').val(t_schemeName)

    //$('#modButton').attr('disabled',false)
    //                .on('click',App.modifyTask)
  },
/*
  modifyTask: async () => {
    App.setLoading(true)
    const index = $('#index').val()
    const plotNum = $('#plotNum').val()
    const owner = $('#owner').val()
    const ownerAadhar = $('#ownerAadhar').val()
    const pincode = $('#pincode').val()
    await App.todoList.modifyTask(index,plotNum,owner,ownerAadhar,pincode)
    $('#modButton').attr('disabled',true)
    window.location.reload()
  },
*/
  createTask: async () => {
    App.setLoading(true)
    const index = $('#index').val()

    const plotId = $('#plotId').val()
    const owner = $('#owner').val()
    const ownerAadhar = $('#ownerAadhar').val()
    const date = $('#date').val()
    const landType = $('#landType').val()
    const schemeName = $('#schemeName').val()
    const totalAmount = $('#totalAmount').val()
    const loanAmount = $('#loanAmount').val()
    const outstandingLoanAmount = $('#outstandingLoanAmount').val()
    const plotNum = $('#plotNum').val()
    const syNum = $('#syNum').val()
    const village = $('#village').val()
    const taluk = $('#taluk').val()
    const district = $('#district').val()
    const state = $('#state').val()
    const pincode = $('#pincode').val()
    const nomDet1 = $('#nomDet1').val()
    const nomDet2 = $('#nomDet2').val()
/*
    const plotNum = $('#plotNum').val()
    const owner = $('#owner').val()
    const ownerAadhar = $('#ownerAadhar').val()
    const pincode = $('#pincode').val()
*/
    if(index) {
      await App.todoList.modifyTask(index,plotNum,owner,village,pincode,schemeName)
      //$('#modButton').attr('disabled',true)
    }
    else {
      await App.todoList.createTask(plotNum,owner,village,pincode,schemeName)
    }
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.todoList.toggleCompleted(taskId)
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
