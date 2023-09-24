let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function (array) {
  return array.map((row) => createEmployeeRecord(row))
}

let createTimeInEvent = function(object, dateStamp){
  let [date, hour] = dateStamp.split(" ")

  object.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })

  return object
}

let createTimeOutEvent = function(object, dateStamp) {
  let [date, hour] = dateStamp.split(" ")

  object.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return object
}

let hoursWorkedOnDate = function (employee, soughtDate) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, soughtDate) {
  let hoursWorked = hoursWorkedOnDate(employee, soughtDate)
  return (hoursWorked * parseInt(employee.payPerHour))
}

function allWagesFor(employeeRecord) {
  let dates = employeeRecord.timeInEvents.map((event) => event.date)

  let payable = dates.reduce((memo, d) => memo + wagesEarnedOnDate(employeeRecord, d), 0)
  return payable
}

function calculatePayroll(array) {
  return array.reduce((memo, rec) => memo + allWagesFor(rec), 0)
}
