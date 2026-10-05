
// ==========================================
// LAB 05 - TASK 02
// Student Utility Module
// ==========================================


// Default Import
import formatStudentResult from "./studentUtils.js";


// Named Imports
import {
    DEPARTMENT_NAME,
    calculateTotal,
    calculateAverage,
    getGrade
} from "./studentUtils.js";


// Aliased Import
import {
    getStatus as checkStatus
} from "./studentUtils.js";


// ==========================================
// STUDENT DATA
// ==========================================

const students = [

    {
        name: "Sara",
        rollNumber: "BSCS-023",
        assignment: 25,
        midterm: 27,
        finalExam: 30
    },

    {
        name: "Ahmed",
        rollNumber: "BSCS-002",
        assignment: 20,
        midterm: 22,
        finalExam: 25
    },

    {
        name: "Ayesha",
        rollNumber: "BSCS-014",
        assignment: 15,
        midterm: 15,
        finalExam: 18
    },

    {
        name: "Hassan",
        rollNumber: "BSCS-031",
        assignment: 23,
        midterm: 25,
        finalExam: 30
    }

];


// ==========================================
// MAIN CONTAINER
// ==========================================

const task2 = document.getElementById("task2");


// ==========================================
// HEADING
// ==========================================

task2.innerHTML = `

    <div class="text-center mb-4">

        <h2 class="text-primary">
            Task 02 - Student Utility Module
        </h2>

        <p class="lead">
            Department: <strong>${DEPARTMENT_NAME}</strong>
        </p>

    </div>

    <div id="studentsContainer"></div>

`;


// ==========================================
// STUDENT CONTAINER
// ==========================================

const studentsContainer =
    document.getElementById("studentsContainer");


// ==========================================
// PROCESS STUDENTS
// forEach + Destructuring
// ==========================================

students.forEach(
    ({
        name,
        rollNumber,
        assignment,
        midterm,
        finalExam
    }) => {


        // Calculate Total
        const total = calculateTotal(
            assignment,
            midterm,
            finalExam
        );


        // Calculate Average
        const average = calculateAverage(
            assignment,
            midterm,
            finalExam
        );


        // Calculate Grade
        const grade = getGrade(total);


        // Calculate Status
        const status = checkStatus(total);


        // Default Export Function
        const result =
            formatStudentResult(
                name,
                rollNumber,
                total
            );


        // ==========================================
        // CREATE CARD
        // ==========================================

        studentsContainer.innerHTML += `

            <div class="col-12 mb-4">

                <div class="card shadow">

                    <div class="card-body">

                        <h4 class="card-title text-primary">
                            ${result}
                        </h4>

                        <hr>

                        <p>
                            <strong>Assignment:</strong>
                            ${assignment}
                        </p>

                        <p>
                            <strong>Midterm:</strong>
                            ${midterm}
                        </p>

                        <p>
                            <strong>Final Exam:</strong>
                            ${finalExam}
                        </p>

                        <p>
                            <strong>Average:</strong>
                            ${average}
                        </p>

                        <p>
                            <strong>Grade:</strong>
                            ${grade}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            <span class="badge ${
                                status === "Pass"
                                ? "bg-success"
                                : "bg-danger"
                            }">
                                ${status}
                            </span>
                        </p>

                    </div>

                </div>

            </div>

        `;

    }
);

