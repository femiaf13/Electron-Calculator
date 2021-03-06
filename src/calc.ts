// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

class Calculator {
    answer: number;
    // on deck value that will affect value
    on_deck: string;
    // 3 character string for which operation to perform
    operation: string;

    // Button elements of the calculator
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

    // Paragraph elements that display the "screen"
    p_left: HTMLParagraphElement;
    p_operation: HTMLParagraphElement;
    p_right: HTMLParagraphElement;
    p_equals: HTMLParagraphElement;

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

        this.p_left = document.getElementById('left') as HTMLParagraphElement
        this.p_operation = document.getElementById('operation') as HTMLParagraphElement
        this.p_right = document.getElementById('right') as HTMLParagraphElement
        this.p_equals = document.getElementById('equals') as HTMLParagraphElement

        // add event listeners
        num_pad.forEach(el => el.addEventListener('click', () => this.input(event)));
        operators.forEach(el => el.addEventListener('click', () => this.operator(event)));
        // using an arrow function because it preserves "this" in whatever you call
        this.button_equal.addEventListener('click', () => this.math(event));
        this.button_clear.addEventListener('click', () => this.clear(event));
    }

    input(event: Event): void {
        var button: HTMLButtonElement = event.target as HTMLButtonElement;
        this.on_deck += button.value;

        if (this.operation == 'nul') {
            this.p_left.innerHTML = this.on_deck;
        }
        else {
            this.p_right.innerHTML = this.on_deck;
        } 
    }

    operator(event: Event): void {
        var button: HTMLButtonElement = event.target as HTMLButtonElement;
        // reset the equation
        this.p_right.innerHTML = '';
        this.p_equals.innerHTML = '';
        // Don't convert value into empty string
        if (this.on_deck !== ''){
            // Store on deck value into value
            // This is for the "left hand" number
            this.answer = parseFloat(this.on_deck);
            this.p_left.innerHTML = this.on_deck;
        }
        else{
            // Operating on previous calculated value, move it to the left
            this.p_left.innerHTML = this.answer.toString();
        }
        this.on_deck = '';
        this.operation = button.value;
        this.p_operation.innerHTML = button.innerHTML;
    }

    math(event: Event): void {
        //var button: HTMLButtonElement = event.target as HTMLButtonElement;
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
        this.p_equals.innerHTML = '='+this.answer.toString();
        console.log('Value: '+this.answer.toString());
    }

    /**
     * Clear everything out of the calculator
     * @param event event that triggered the method
     */
    clear(event: Event): void {
        this.answer = 0;
        this.on_deck = '';
        this.operation = 'nul';

        this.p_left.innerHTML = '';
        this.p_operation.innerHTML = '';
        this.p_right.innerHTML = '';
        this.p_equals.innerHTML = '';
    }
}

let calc: Calculator = new Calculator();