
// ==========================================
// LAB 05 - TASK 01
// University Course Enrollment Manager
// ==========================================

// 1. Core Courses
const coreCourses = [
    "Web Development",
    "Database Systems",
    "Data Structures"
];

// 2. Elective Courses
const electiveCourses = [
    "Artificial Intelligence",
    "Computer Networks",
    "Cloud Computing"
];

// 3. Student Object
const student = {
    name: "Ali",
    rollNumber: "BSCS-001",
    department: "Computer Science",
    semester: 6
};

// 4. CGPA Array
const cgpas = [3.10, 3.45, 2.95, 3.75, 3.30];

// 5. Merge arrays using Spread Operator
const allCourses = [...coreCourses, ...electiveCourses];

// 6. Copy array and add a new course
const copiedCourses = [...allCourses, "Software Engineering"];

// 7. Update student using Spread Operator
const updatedStudent = {
    ...student,
    semester: 7,
    cgpa: 3.45
};

// 8. Rest Parameter
function enrollStudent(name, ...courses) {
    return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`;
}

// 9. Average CGPA using Rest Parameter and Arrow Function
const calculateAverageCGPA = (...values) => {
    const total = values.reduce((sum, value) => sum + value, 0);
    return (total / values.length).toFixed(2);
};

// 10. Highest CGPA using Math.max and Spread
const highestCGPA = Math.max(...cgpas);

// 11. Default Parameter
function getStudentInfo(name, department = "Computer Science") {
    return `${name} - Department: ${department}`;
}

// 12. Display results
const task1 = document.getElementById("task1");

task1.innerHTML = `
    <div class="card shadow p-4 mb-5">

        <h2 class="text-center text-primary mb-4">
            Task 01 - University Course Enrollment Manager
        </h2>

        <hr>

        <h5>Core Courses:</h5>
        <p>${coreCourses.join(", ")}</p>

        <h5>Elective Courses:</h5>
        <p>${electiveCourses.join(", ")}</p>

        <h5>All Courses (${allCourses.length}):</h5>
        <p>${allCourses.join(", ")}</p>

        <h5>Copy After Adding a Course (${copiedCourses.length}):</h5>
        <p>${copiedCourses.join(", ")}</p>

        <p class="text-success fw-bold">
            Original still has ${allCourses.length} courses.
        </p>

        <hr>

        <h5>Original Student:</h5>
        <p>${student.name}, Semester ${student.semester}</p>

        <h5>Updated Student:</h5>
        <p>
            ${updatedStudent.name},
            Semester ${updatedStudent.semester},
            CGPA ${updatedStudent.cgpa}
        </p>

        <hr>

        <h5>Enrollment:</h5>
        <p>
            ${enrollStudent(
                "Ali",
                "Web Development",
                "Database Systems",
                "Artificial Intelligence"
            )}
        </p>

        <h5>Average CGPA:</h5>
        <p>${calculateAverageCGPA(...cgpas)}</p>

        <h5>Highest CGPA:</h5>
        <p>${highestCGPA}</p>

        <h5>Department (Default):</h5>
        <p>${getStudentInfo("Ali")}</p>

    </div>
`;

