import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  constructor() { }

  ngOnInit() {
  }

  public getNumber(v: string){
    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;

    }
  }

  getDecimal(){
    if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op , secondOp){
    switch (op){
      case '+':
      return this.firstOperand + secondOp; 
      case '-': 
      return this.firstOperand - secondOp; 
      case '*': 
      return this.firstOperand * secondOp; 
      case '/': 
      return this.firstOperand / secondOp;
      case '%':
      return this.firstOperand % secondOp; 
      case '=':
      return secondOp;
    }
  }

  private doCalcSingle(op){
    switch (op) {
      case 'sqrt':
        return Math.sqrt(Number(this.currentNumber));
      case 'x^2':
        return Math.pow(Number(this.currentNumber), 2);
      case '1/x':
        return 1/(Number(this.currentNumber));
      case '+/-':
        return -(Number(this.currentNumber));
    }
  }
  
  public getSingleOp(op: string){
    console.log(op);
    const result = this.doCalcSingle(op);
    this.currentNumber = String(result);
    if (this.firstOperand === null){
      this.firstOperand = this.currentNumber;
    }
  }

  public getClearOp(op: string){
    console.log(op);
    if (op === 'C'){
      this.currentNumber = '0';
      this.firstOperand = null;
    }
    else if (op === 'CE'){
      this.currentNumber = '0';
    }
    else if (op === '<='){
      if (this.currentNumber.length == 1){
        this.currentNumber = '0';
      } else {
      this.currentNumber = this.currentNumber.substr(0, this.currentNumber.length - 1);
      }
    }
  }

  public getOperation(op: string){
    console.log(op);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
  
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);
 
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }

}
