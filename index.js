function createEmployeeRecord(infoArray) {
    return {firstName: infoArray[0], familyName: infoArray[1], title: infoArray[2], payPerHour: infoArray[3], timeInEvents: [], timeOutEvents: []}
}

function createEmployeeRecords(array) {
    return array.map(person => createEmployeeRecord(person));
}

function createTimeInEvent(record, stamp) {
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(stamp.slice(11, 15)), date: stamp.slice(0, 10)});
    return record;
}

function createTimeOutEvent(record, stamp) {
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(stamp.slice(11, 15)), date: stamp.slice(0, 10)});
    return record;
}

function hoursWorkedOnDate(record, date) {
    let timeOut = record.timeOutEvents.find(timeStamp => timeStamp.date == date).hour;
    let timeIn = record.timeInEvents.find(timeStamp => timeStamp.date == date).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    return record.timeOutEvents.map(event => wagesEarnedOnDate(record, event.date)).reduce((total, amount) => total + amount);
}

function findEmployeeByFirstName(records, name) {
    return records.find(employee => employee.firstName == name)
}

function calculatePayroll(records) {
    return records.map(employee => allWagesFor(employee)).reduce((total, amount) => total + amount);
}

