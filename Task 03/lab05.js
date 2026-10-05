// =====================================================
// LAB 05 - TASK 03
// Online Examination Workflow
// =====================================================

// Get HTML elements
const output = document.getElementById("output");
const startBtn = document.getElementById("startBtn");


// Display message on webpage
function showMessage(message, type = "info") {

    output.innerHTML += `
        <div class="step alert alert-${type}">
            ${message}
        </div>
    `;

    // Automatically scroll to latest message
    output.scrollTop = output.scrollHeight;
}


// Clear previous output
function clearOutput() {
    output.innerHTML = "";
}


// =====================================================
// STEP 1 - Validate Student
// Error-first callback
// =====================================================

function validateStudent(rollNumber, callback) {

    setTimeout(() => {

        if (!rollNumber || rollNumber.trim() === "") {

            callback("Roll number is required", null);

        } else {

            callback(null, {
                rollNumber: rollNumber,
                name: "Ali"
            });

        }

    }, 1000);
}


// =====================================================
// STEP 2 - Load Questions
// Callback
// =====================================================

function loadQuestions(student, callback) {

    setTimeout(() => {

        const questions = [
            "What is JavaScript?",
            "What is a callback?",
            "What is a Promise?"
        ];

        callback(null, questions);

    }, 1500);
}


// =====================================================
// STEP 3 - Start Examination
// Nested Callback
// =====================================================

function startExam(student, questions, callback) {

    setTimeout(() => {

        const exam = {
            student: student,
            questions: questions,
            status: "Started"
        };

        callback(null, exam);

    }, 2000);
}


// =====================================================
// STEP 4 - Submit Examination
// =====================================================

function submitExam(exam, callback) {

    setTimeout(() => {

        exam.status = "Submitted";

        callback(null, exam);

    }, 1000);
}


// =====================================================
// MAIN EXAMINATION WORKFLOW
// =====================================================

function runExamination() {

    clearOutput();

    startBtn.disabled = true;

    showMessage(
        "Examination process started...",
        "primary"
    );

    // Student Roll Number
    const rollNumber = "BSCS-023";


    // =================================================
    // Nested callbacks / Callback Hell example
    // =================================================

    validateStudent(rollNumber, function(error, student) {

        if (error) {

            showMessage(
                "Error: " + error,
                "danger"
            );

            startBtn.disabled = false;

            return;
        }

        showMessage(
            `Student validated: ${student.name} (${student.rollNumber})`,
            "success"
        );


        loadQuestions(student, function(error, questions) {

            if (error) {

                showMessage(
                    "Error loading questions",
                    "danger"
                );

                startBtn.disabled = false;

                return;
            }

            showMessage(
                `Questions loaded: ${questions.length}`,
                "success"
            );


            startExam(student, questions, function(error, exam) {

                if (error) {

                    showMessage(
                        "Error starting examination",
                        "danger"
                    );

                    startBtn.disabled = false;

                    return;
                }

                showMessage(
                    "Examination started successfully.",
                    "success"
                );


                submitExam(exam, function(error, result) {

                    if (error) {

                        showMessage(
                            "Error submitting examination",
                            "danger"
                        );

                        startBtn.disabled = false;

                        return;
                    }

                    showMessage(
                        "Examination submitted successfully.",
                        "success"
                    );

                    showMessage(
                        `Student: ${result.student.name}<br>
                         Roll Number: ${result.student.rollNumber}<br>
                         Status: ${result.status}`,
                        "info"
                    );

                    showMessage(
                        "All asynchronous operations completed.",
                        "primary"
                    );

                    startBtn.disabled = false;

                });

            });

        });

    });
}


// =====================================================
// BUTTON EVENT
// =====================================================

startBtn.addEventListener("click", runExamination);