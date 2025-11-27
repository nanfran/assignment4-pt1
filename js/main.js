/*
File: main.js
GUI Assignment: Creating A Dynamic Multiplication Table with jQuery Validation plugin
Nancy Vi, UMass Lowell Computer Science, Nancy_Vi@student.uml.edu
Copyright (c) 2025 by Nancy. All rights reserved.

Description: This is the js file for assignment 4 part 1, it contains the behavior of the page that 
handles the form subission, input validation (ensures input values are valid, whole, within 
-50 to 50, and the maximums are greater than or equal to the minimums). This assignments builds off 
the previous assignment and incorporates the jQuery Validation Plugin.
Updated by NV on November 26, 2025 at 11:59 PM

*/

//Initializing constants/elements
const MIN_BOUND = -50;
const MAX_BOUND = 50;

const tableContainer = document.getElementById('table-container');

// Execute when the DOM is fully loaded
$(document).ready(function() {

    /* Validation tests for the user inputs. It'll check whether the user inputs are valid numbers (not symbols, empty. etc.),
    the values are whole numbers, and the maximums are greater than or equal to the minimums.
    */
    $.validator.addMethod("isInteger", function(value, element) {
        return this.optional(element) || /^-?\d+$/.test(value);
    }, "Please enter a positive or negative integer.");

    $.validator.addMethod("greaterThan", function(value, element, param) {
        var target = $(param);
        if (this.settings.onfocusout && target.not(".validate-lessThan-blur").length) {
            target.addClass("validate-lessThan-blur").on("blur.validate-lessThan", function() {
                $(element).valid();
            });
        }
        return parseFloat(value) >= parseFloat(target.val());
    }, "Maximum value must be greater than or equal to minimum.");


    // Initialize the Validation Plugin on the form
    $("#table-form").validate({
        rules: {
            min_col: {
                required: true,
                number: true,
                isInteger: true,
                range: [MIN_BOUND, MAX_BOUND]
            },
            max_col: {
                required: true,
                number: true,
                isInteger: true,
                greaterThan: "#min_col",
                range: [MIN_BOUND, MAX_BOUND]
            },
            min_row: {
                required: true,
                number: true,
                isInteger: true,
                range: [MIN_BOUND, MAX_BOUND]
            },
            max_row: {
                required: true,
                number: true,
                isInteger: true,
                greaterThan: "#min_row",
                range: [MIN_BOUND, MAX_BOUND]
            }
        },

        // Error messaging
        messages: {
            min_col: {
                required: "Enter a valid whole number in this field.",
                range: "Numbers must be between -50 and 50.",
                isInteger: "Please enter a whole number."
            },
            max_col: {
                required: "Enter a valid whole number in this field.",
                range: "Numbers must be between -50 and 50.",
                isInteger: "Please enter a whole number.",
                greaterThan: "Maximum Column Value must be greater than or equal to the Minimum Column Value."
            },
            min_row: {
                required: "Enter a valid whole number in this field.",
                range: "Numbers must be between -50 and 50.",
                isInteger: "Please enter a whole number."
            },
            max_row: {
                required: "Enter a valid whole number in this field.",
                range: "Numbers must be between -50 and 50.",
                isInteger: "Please enter a whole number.",
                greaterThan: "Maximum Row Value must be greater than or equal to the Minimum Row Value."
            }
        },

        // If all validation tests pass, then submit function runs
        submitHandler: function(form) {
            generateTable();
            return false; 
        }
    });
});


// Validate the table inputs and generate the table
function generateTable() {
    //Convert string value to numerical integer data type
    const validMinCol = parseInt(document.getElementById('min_col').value);
    const validMaxCol = parseInt(document.getElementById('max_col').value);
    const validMinRow = parseInt(document.getElementById('min_row').value);
    const validMaxRow = parseInt(document.getElementById('max_row').value);
    
    // Generate dynamic table 
    const table = document.createElement('table');
    table.className = 'multi_table';
    const thead = table.createTHead();
    const tbody = table.createTBody();
    const headerRow = thead.insertRow();
    
    const corner = document.createElement('th');
    corner.textContent = '';
    headerRow.appendChild(corner);

    // Create horizontal headers
    for (let i = validMinCol; i <= validMaxCol; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        headerRow.appendChild(th);
    }

    // Create rows
    for (let i = validMinRow; i <= validMaxRow; i++) {
        const row = tbody.insertRow();

        const headerCell = document.createElement('th');
        headerCell.textContent = i;
        row.appendChild(headerCell);

        for (let j = validMinCol; j <= validMaxCol; j++) {
            const cell = row.insertCell();
            cell.textContent = i * j;
        }
    }

    tableContainer.innerHTML = ''; 
    tableContainer.appendChild(table);
}