// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let value: number = 0;
// on deck value that will affect value
let on_deck: string = '';
let operation: string = 'none'

function math(event: MouseEvent): void {
    switch(operation) {
        case 'add':
            value += parseFloat(on_deck);
            break;
        case 'sub':
            value -= parseFloat(on_deck);
            break;
        case 'mul':
            value *= parseFloat(on_deck);
            break;
        case 'div':
            value /= parseFloat(on_deck);
            break;
        default:
            break;
    }
    // reset operation to none so you can't keep doing operations
    operation = 'none';
    on_deck = '';
    document.getElementById('equals').innerHTML = '='+value.toString();
    console.log('Value: '+value.toString());
}

function input(event: MouseEvent): void {
    // Whoever calls this function is the button being pressed
    on_deck += this.value

    if (operation == 'none') {
        document.getElementById('left').innerHTML = on_deck;
    }
    else {
        document.getElementById('right').innerHTML = on_deck;
    }
}

function operator(event: MouseEvent): void {
    // reset the equation
    document.getElementById('right').innerHTML = '';
    document.getElementById('equals').innerHTML = '';
    // Don't convert value into empty string
    if (on_deck !== ''){
        // Store on deck value into value
        // This is for the "left hand" number
        value = parseFloat(on_deck);
        document.getElementById('left').innerHTML = on_deck;
    }
    else{
        // Operating on previous calculated value, move it to the left
        document.getElementById('left').innerHTML = value.toString();
    }
    on_deck = '';
    operation = this.value;
    document.getElementById('operation').innerHTML = this.innerHTML;
}

// TODO: Add way to clear
//       Group these listeners in cleaner way

document.getElementById('button_1').addEventListener("click", input);
document.getElementById('button_2').addEventListener("click", input);
document.getElementById('button_3').addEventListener("click", input);
document.getElementById('button_4').addEventListener("click", input);
document.getElementById('button_5').addEventListener("click", input);
document.getElementById('button_6').addEventListener("click", input);
document.getElementById('button_7').addEventListener("click", input);
document.getElementById('button_8').addEventListener("click", input);
document.getElementById('button_9').addEventListener("click", input);
document.getElementById('button_0').addEventListener("click", input);
document.getElementById('button_add').addEventListener("click", operator);
document.getElementById('button_sub').addEventListener("click", operator);
document.getElementById('button_mul').addEventListener("click", operator);
document.getElementById('button_div').addEventListener("click", operator);
document.getElementById('button_equal').addEventListener("click", math);