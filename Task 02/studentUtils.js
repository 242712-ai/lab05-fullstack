
// ==========================================
// STUDENT UTILITY MODULE
// ==========================================


// Named Export
export const DEPARTMENT_NAME = "Computer Science";


// Named Export
// Rest Parameter
export function calculateTotal(...marks) {

    let total = 0;

    for (const mark of marks) {
        total += mark;
    }

    return total;
}


// Named Export
// Arrow Function
export const calculateAverage = (...marks) => {

    const total = calculateTotal(...marks);

    return (total / marks.length).toFixed(2);
};


// Named Export
// Grade Function
export function getGrade(marks) {

    if (marks >= 80) {
        return "A";
    }

    if (marks >= 70) {
        return "B";
    }

    if (marks >= 60) {
        return "C";
    }

    if (marks >= 50) {
        return "D";
    }

    return "F";
}


// Named Export
// Arrow Function + Ternary
export const getStatus = (marks) => {

    return marks >= 50 ? "Pass" : "Fail";
};


// Default Export
export default function formatStudentResult(
    name,
    rollNumber,
    total
) {

    return `${name} - ${rollNumber} - Total: ${total}`;
}

