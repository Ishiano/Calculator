document.addEventListener("DOMContentLoaded", function () {
   const inputBox = document.getElementById("displayInput");
   const buttons = document.querySelectorAll("button");

   let currentInput = ""; // Stores the current user input
   let prevInput = "";    // Stores the previous user input
   let operator = "";     // Stores the operator (+, -, *, /)

   buttons.forEach((button) => {
      button.addEventListener("click", function (event) {
         const buttonValue = event.target.innerText;

         switch (buttonValue) {
            case "=":
               if (prevInput !== "") {
                  try {
                     currentInput = calculate(prevInput, currentInput, operator);
                     inputBox.value = currentInput;
                     prevInput = "";
                     operator = "";
                  } catch (error) {
                     inputBox.value = "Error";
                  }
               }
               break;
            case "Clear":
               clearCalculator();
               break;
            case "Delete":
               currentInput = currentInput.slice(0, -1);
               inputBox.value = currentInput || "0";
               break;
            case "±":
               toggleSign();
               break;
            case "+":
            case "-":
            case "*":
            case "/":
               handleOperator(buttonValue);
               break;
            default:
               appendDigit(buttonValue);
         }
      });
   });

   // Function to perform calculations
   function calculate(num1, num2, operator) {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      switch (operator) {
         case "+":
            return num1 + num2;
         case "-":
            return num1 - num2;
         case "*":
            return num1 * num2;
         case "/":
            if (num2 === 0) {
               throw new Error("Division by zero");
            }
            return num1 / num2;
         default:
            throw new Error("Invalid operator");
      }
   }

   // Function to clear the calculator
   function clearCalculator() {
      currentInput = "";
      prevInput = "";
      operator = "";
      inputBox.value = "0";
   }

   // Function to toggle the sign of the current input
   function toggleSign() {
      if (currentInput !== "") {
         currentInput = -parseFloat(currentInput);
         inputBox.value = currentInput;
      }
   }

   // Function to handle operators
   function handleOperator(newOperator) {
      if (prevInput === "") {
         prevInput = currentInput;
         currentInput = "";
         operator = newOperator;
      } else {
         try {
            prevInput = calculate(prevInput, currentInput, operator);
            currentInput = "";
            operator = newOperator;
         } catch (error) {
            inputBox.value = "Error";
         }
      }
   }

   // Function to append digits to the current input
   function appendDigit(digit) {
      if (currentInput === "0") {
         currentInput = digit;
      } else {
         currentInput += digit;
      }
      inputBox.value = currentInput;
   }
});
