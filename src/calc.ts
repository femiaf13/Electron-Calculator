// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

class Calculator {
    answer: number;
    // on deck value that will affect value
    on_deck: string;
    // 3 character string for which operation to perform
    operation: string;

    button_1: HTMLButtonElement;
    button_2: HTMLButtonElement;
    button_3: HTMLButtonElement;
    button_4: HTMLButtonElement;
    button_5: HTMLButtonElement;
    button_6: HTMLButtonElement;
    button_7: HTMLButtonElement;
    button_8: HTMLButtonElement;
    button_9: HTMLButtonElement;
    button_0: HTMLButtonElement;
    button_add: HTMLButtonElement;
    button_sub: HTMLButtonElement;
    button_mul: HTMLButtonElement;
    button_div: HTMLButtonElement;
    button_equal: HTMLButtonElement;
    button_clear: HTMLButtonElement;

    constructor() {
        this.answer = 0;
        this.on_deck = '';
        this.operation = 'nul'

        this.button_1 = document.getElementById('button_1') as HTMLButtonElement;
        this.button_2 = document.getElementById('button_2') as HTMLButtonElement;
        this.button_3 = document.getElementById('button_3') as HTMLButtonElement;
        this.button_4 = document.getElementById('button_4') as HTMLButtonElement;
        this.button_5 = document.getElementById('button_5') as HTMLButtonElement;
        this.button_6 = document.getElementById('button_6') as HTMLButtonElement;
        this.button_7 = document.getElementById('button_7') as HTMLButtonElement;
        this.button_8 = document.getElementById('button_8') as HTMLButtonElement;
        this.button_9 = document.getElementById('button_9') as HTMLButtonElement;
        this.button_0 = document.getElementById('button_0') as HTMLButtonElement;
        this.button_add = document.getElementById('button_add') as HTMLButtonElement;
        this.button_sub = document.getElementById('button_sub') as HTMLButtonElement;
        this.button_mul = document.getElementById('button_mul') as HTMLButtonElement;
        this.button_div = document.getElementById('button_div') as HTMLButtonElement;
        this.button_equal = document.getElementById('button_equal') as HTMLButtonElement;
        this.button_clear = document.getElementById('button_clear') as HTMLButtonElement;

        var num_pad: Array<HTMLButtonElement> = [this.button_0, this.button_1, this.button_2,
            this.button_3, this.button_4, this.button_5, this.button_6, this.button_7, 
            this.button_8, this.button_9]
    
        var operators: Array<HTMLButtonElement> = [this.button_add, this.button_sub,
        this.button_mul, this.button_div]

        // add event listeners
        num_pad.forEach(el => el.addEventListener('click', () => this.input(event)));
        operators.forEach(el => el.addEventListener('click', () => this.operator(event)));
        // using an arrow function because it preserves "this" in whatever you call
        this.button_equal.addEventListener('click', () => this.math(event));
    }

    input(event: Event): void {
        var button: HTMLButtonElement = event.target as HTMLButtonElement;
        this.on_deck += button.value;

        if (this.operation == 'nul') {
            document.getElementById('left').innerHTML = this.on_deck;
        }
        else {
            document.getElementById('right').innerHTML = this.on_deck;
        } 
    }

    operator(event: Event): void {
        var button: HTMLButtonElement = event.target as HTMLButtonElement;
        // reset the equation
        document.getElementById('right').innerHTML = '';
        document.getElementById('equals').innerHTML = '';
        // Don't convert value into empty string
        if (this.on_deck !== ''){
            // Store on deck value into value
            // This is for the "left hand" number
            this.answer = parseFloat(this.on_deck);
            document.getElementById('left').innerHTML = this.on_deck;
        }
        else{
            // Operating on previous calculated value, move it to the left
            document.getElementById('left').innerHTML = this.answer.toString();
        }
        this.on_deck = '';
        this.operation = button.value;
        document.getElementById('operation').innerHTML = button.innerHTML;
    }

    math(event: Event): void {
        var button: HTMLButtonElement = event.target as HTMLButtonElement;
        switch(this.operation) {
            case 'add':
                this.answer += parseFloat(this.on_deck);
                break;
            case 'sub':
                this.answer -= parseFloat(this.on_deck);
                break;
            case 'mul':
                this.answer *= parseFloat(this.on_deck);
                break;
            case 'div':
                this.answer /= parseFloat(this.on_deck);
                break;
            default:
                break;
        }
        // reset operation to none so you can't keep doing operations
        this.operation = 'nul';
        this.on_deck = '';
        document.getElementById('equals').innerHTML = '='+this.answer.toString();
        console.log('Value: '+this.answer.toString());
    }
}

let calc: Calculator = new Calculator();