var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Student = /** @class */ (function () {
    function Student(name, rollNo, marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
    }
    Student.prototype.calculateTotal = function () {
        return this.marks.reduce(function (total, mark) { return total + mark; }, 0);
    };
    Student.prototype.calculateAverage = function () {
        return this.calculateTotal() / this.marks.length;
    };
    Student.prototype.calculateGrade = function () {
        var average = this.calculateAverage();
        if (average >= 90)
            return "A+";
        else if (average >= 80)
            return "A";
        else if (average >= 70)
            return "B";
        else if (average >= 60)
            return "C";
        else
            return "D";
    };
    return Student;
}());
var students = [];
var addStudent = function (numStudents, currentIndex) {
    if (currentIndex === void 0) { currentIndex = 0; }
    if (currentIndex >= numStudents) {
        displayStudents();
        return;
    }
    rl.question("Enter details for student ".concat(currentIndex + 1, ":\nName: "), function (name) {
        rl.question("Roll Number: ", function (rollNoStr) {
            var rollNo = parseInt(rollNoStr);
            rl.question("Enter comma-separated marks: ", function (marksInput) {
                var marks = marksInput.split(",").map(function (mark) { return parseInt(mark.trim()); });
                students.push(new Student(name, rollNo, marks));
                addStudent(numStudents, currentIndex + 1);
            });
        });
    });
};
var displayStudents = function () {
    console.log("Student Details:");
    students.forEach(function (student) {
        console.log("Name: ".concat(student.name, ", Roll No: ").concat(student.rollNo, ", Marks: ").concat(student.marks.join(', '), ", Total: ").concat(student.calculateTotal(), ", Average: ").concat(student.calculateAverage().toFixed(2), ", Grade: ").concat(student.calculateGrade()));
    });
    displayClassAverage();
};
var displayClassAverage = function () {
    var totalMarks = students.reduce(function (total, student) { return total + student.calculateTotal(); }, 0);
    var average = totalMarks / students.length;
    console.log("\nClass Average Details:\nTotal Students: ".concat(students.length, ", Average Total Marks: ").concat(average ? average.toFixed(2) : 0));
};
rl.question("Enter the number of students in the class: ", function (numStudentsStr) {
    var numStudents = parseInt(numStudentsStr);
    addStudent(numStudents);
});
