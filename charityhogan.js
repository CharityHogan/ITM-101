function addNumbers() {
    // Get the input values
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);

    // Check if the inputs are valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers";
        return;
    }

    // Add the numbers
    var sum = num1 + num2;

    // Display the result
    document.getElementById("result").innerHTML = "The sum is: " + sum;
}