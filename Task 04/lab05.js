// =====================================================
// LAB 05 - TASK 04
// University Result Portal
// =====================================================


// =====================================================
// STUDENT DATA
// =====================================================

const students = [
    {
        name: "Ali",
        rollNumber: "BSCS-001",
        assignment: 25,
        midterm: 27,
        finalExam: 32
    },

    {
        name: "Sara",
        rollNumber: "BSCS-002",
        assignment: 22,
        midterm: 24,
        finalExam: 28
    },

    {
        name: "Ahmed",
        rollNumber: "BSCS-003",
        assignment: 18,
        midterm: 20,
        finalExam: 25
    },

    {
        name: "Ayesha",
        rollNumber: "BSCS-004",
        assignment: 15,
        midterm: 18,
        finalExam: 20
    },

    {
        name: "Hassan",
        rollNumber: "BSCS-005",
        assignment: 10,
        midterm: 15,
        finalExam: 18
    }
];


// =====================================================
// DOM ELEMENTS
// =====================================================

const searchForm = document.getElementById("searchForm");

const rollNumberInput =
    document.getElementById("rollNumber");

const searchResult =
    document.getElementById("searchResult");

const allResults =
    document.getElementById("allResults");

const statistics =
    document.getElementById("statistics");


// =====================================================
// PROMISE 1
// FIND STUDENT
// =====================================================

function findStudent(rollNumber) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const student = students.find(
                student =>
                    student.rollNumber.toLowerCase() ===
                    rollNumber.toLowerCase()
            );

            if (student) {

                resolve(student);

            } else {

                reject(
                    new Error(
                        "Student not found."
                    )
                );

            }

        }, 1000);

    });
}


// =====================================================
// PROMISE 2
// CALCULATE RESULT
// =====================================================

function calculateResult(student) {

    return new Promise((resolve) => {

        setTimeout(() => {

            const total =
                student.assignment +
                student.midterm +
                student.finalExam;

            const average =
                total / 3;

            let grade;

            if (total >= 80) {
                grade = "A";
            }
            else if (total >= 70) {
                grade = "B";
            }
            else if (total >= 60) {
                grade = "C";
            }
            else if (total >= 50) {
                grade = "D";
            }
            else {
                grade = "F";
            }

            const status =
                total >= 50
                    ? "Pass"
                    : "Fail";

            resolve({
                ...student,
                total: total,
                average: average.toFixed(2),
                grade: grade,
                status: status
            });

        }, 1000);

    });
}


// =====================================================
// DISPLAY SINGLE RESULT
// =====================================================

function displayResult(result) {

    searchResult.innerHTML = `

        <div class="alert alert-success result-box">

            <h5>
                ${result.name}
            </h5>

            <p>
                <strong>Roll Number:</strong>
                ${result.rollNumber}
            </p>

            <p>
                <strong>Assignment:</strong>
                ${result.assignment}
            </p>

            <p>
                <strong>Midterm:</strong>
                ${result.midterm}
            </p>

            <p>
                <strong>Final Exam:</strong>
                ${result.finalExam}
            </p>

            <p>
                <strong>Total:</strong>
                ${result.total}
            </p>

            <p>
                <strong>Average:</strong>
                ${result.average}
            </p>

            <p>
                <strong>Grade:</strong>
                ${result.grade}
            </p>

            <p>
                <strong>Status:</strong>
                ${result.status}
            </p>

        </div>
    `;
}


// =====================================================
// ASYNC/AWAIT SEARCH FUNCTION
// =====================================================

async function showResult(rollNumber) {

    searchResult.innerHTML = `
        <div class="alert alert-info">
            Searching for student...
        </div>
    `;

    try {

        const student =
            await findStudent(rollNumber);

        const result =
            await calculateResult(student);

        displayResult(result);

    }
    catch (error) {

        searchResult.innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;

    }
    finally {

        console.log(
            "Search operation completed."
        );

    }
}


// =====================================================
// SEARCH FORM
// =====================================================

searchForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const rollNumber =
            rollNumberInput.value.trim();

        if (rollNumber === "") {

            searchResult.innerHTML = `
                <div class="alert alert-warning">
                    Please enter a roll number.
                </div>
            `;

            return;
        }

        showResult(rollNumber);

    }
);


// =====================================================
// CREATE RESULT CARD
// =====================================================

function createResultCard(result) {

    return `

        <div class="col-md-6 mb-4">

            <div class="card student-card shadow-sm">

                <div class="card-body">

                    <h5 class="card-title text-primary">
                        ${result.name}
                    </h5>

                    <p>
                        <strong>Roll Number:</strong>
                        ${result.rollNumber}
                    </p>

                    <p>
                        <strong>Total:</strong>
                        ${result.total}
                    </p>

                    <p>
                        <strong>Average:</strong>
                        ${result.average}
                    </p>

                    <p>
                        <strong>Grade:</strong>
                        ${result.grade}
                    </p>

                    <p>
                        <strong>Status:</strong>

                        <span class="badge ${
                            result.status === "Pass"
                                ? "bg-success"
                                : "bg-danger"
                        }">
                            ${result.status}
                        </span>

                    </p>

                </div>

            </div>

        </div>
    `;
}


// =====================================================
// LOAD ALL RESULTS
// PROMISE.ALL + MAP
// =====================================================

async function loadAllResults() {

    allResults.innerHTML = `
        <div class="alert alert-info">
            Loading all student results...
        </div>
    `;


    try {

        const resultPromises =
            students.map(student =>
                calculateResult(student)
            );


        const results =
            await Promise.all(resultPromises);


        allResults.innerHTML = "";


        results.forEach(result => {

            allResults.innerHTML +=
                createResultCard(result);

        });


        calculateStatistics(results);

    }
    catch (error) {

        allResults.innerHTML = `
            <div class="alert alert-danger">
                Error loading results.
            </div>
        `;

    }
    finally {

        console.log(
            "All student results loaded."
        );

    }
}


// =====================================================
// STATISTICS
// =====================================================

function calculateStatistics(results) {

    const totalStudents =
        results.length;


    const passedStudents =
        results.filter(
            result => result.status === "Pass"
        ).length;


    const failedStudents =
        results.filter(
            result => result.status === "Fail"
        ).length;


    const averageMarks =
        results.reduce(
            (sum, result) =>
                sum + Number(result.average),
            0
        ) / totalStudents;


    statistics.innerHTML = `

        <div class="row">

            <div class="col-md-3 mb-3">

                <div class="stat-box">

                    <div class="stat-number">
                        ${totalStudents}
                    </div>

                    <div>
                        Total Students
                    </div>

                </div>

            </div>


            <div class="col-md-3 mb-3">

                <div class="stat-box">

                    <div class="stat-number">
                        ${passedStudents}
                    </div>

                    <div>
                        Passed Students
                    </div>

                </div>

            </div>


            <div class="col-md-3 mb-3">

                <div class="stat-box">

                    <div class="stat-number">
                        ${failedStudents}
                    </div>

                    <div>
                        Failed Students
                    </div>

                </div>

            </div>


            <div class="col-md-3 mb-3">

                <div class="stat-box">

                    <div class="stat-number">
                        ${averageMarks.toFixed(2)}
                    </div>

                    <div>
                        Average Marks
                    </div>

                </div>

            </div>

        </div>
    `;
}


// =====================================================
// .THEN(), .CATCH(), .FINALLY() DEMONSTRATION
// =====================================================

function testPromise() {

    findStudent("BSCS-001")

        .then(student => {

            return calculateResult(student);

        })

        .then(result => {

            console.log(
                "Promise Result:",
                result
            );

        })

        .catch(error => {

            console.error(
                "Promise Error:",
                error
            );

        })

        .finally(() => {

            console.log(
                "Promise chain completed."
            );

        });
}


// =====================================================
// START APPLICATION
// =====================================================

loadAllResults();

testPromise();