// mathCHARITYHOGAN.js

const operation = process.argv[2]; // The math operation (add, subtract, multiply, divide, exponent)
const num1 = parseFloat(process.argv[3]); // The first number
const num2 = parseFloat(process.argv[4]); // The second number

if (isNaN(num1) || isNaN(num2)) {
    console.log("Please provide valid numbers for the operation.");
    process.exit(1);
}

switch (operation) {
    case "add":
        console.log(`${num1} + ${num2} = ${num1 + num2}`);
        break;
    case "subtract":
        console.log(`${num1} - ${num2} = ${num1 - num2}`);
        break;
    case "multiply":
        console.log(`${num1} * ${num2} = ${num1 * num2}`);
        break;
    case "divide":
        if (num2 === 0) {
            console.log("Division by zero is not allowed.");
        } else {
            console.log(`${num1} / ${num2} = ${num1 / num2}`);
        }
        break;
    case "exponent":
        console.log(`${num1} ^ ${num2} = ${Math.pow(num1, num2)}`);
        break;
    default:
        console.log("Unknown operation. Please use add, subtract, multiply, divide, or exponent.");
}
