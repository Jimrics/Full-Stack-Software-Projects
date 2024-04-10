const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Student {
    constructor(public name: string, public rollNo: number, public marks: number[]) {}

    calculateTotal(): number {
        return this.marks.reduce((total, mark) => total + mark, 0);
    }

    calculateAverage(): number {
        return this.calculateTotal() / this.marks.length;
    }

    calculateGrade(): string {
        const average = this.calculateAverage();
        if (average >= 90) return "A+";
        else if (average >= 80) return "A";
        else if (average >= 70) return "B";
        else if (average >= 60) return "C";
        else return "D";
    }
}

const students: Student[] = [];

const addStudent = (numStudents: number, currentIndex: number = 0): void => {
    if (currentIndex >= numStudents) {
        displayStudents();
        return;
    }

    rl.question(`Enter details for student ${currentIndex + 1}:\nName: `, (name) => {
        rl.question("Roll Number: ", (rollNoStr) => {
            const rollNo: number = parseInt(rollNoStr);
            rl.question("Enter comma-separated marks: ", (marksInput) => {
                const marks: number[] = marksInput.split(",").map(mark => parseInt(mark.trim()));
                students.push(new Student(name, rollNo, marks));
                addStudent(numStudents, currentIndex + 1);
            });
        });
    });
};

const displayStudents = (): void => {
    console.log("Student Details:");
    students.forEach((student) => {
        console.log(`Name: ${student.name}, Roll No: ${student.rollNo}, Marks: ${student.marks.join(', ')}, Total: ${student.calculateTotal()}, Average: ${student.calculateAverage().toFixed(2)}, Grade: ${student.calculateGrade()}`);
    });
    displayClassAverage();
};

const displayClassAverage = (): void => {
    const totalMarks = students.reduce((total, student) => total + student.calculateTotal(), 0);
    const average = totalMarks / students.length;
    console.log(`\nClass Average Details:\nTotal Students: ${students.length}, Average Total Marks: ${average ? average.toFixed(2) : 0}`);
};

rl.question("Enter the number of students in the class: ", (numStudentsStr) => {
    const numStudents: number = parseInt(numStudentsStr);
    addStudent(numStudents);
});
