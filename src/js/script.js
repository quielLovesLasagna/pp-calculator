"use strict";

// ELEMENT/S
const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");
const allClearBtn = document.querySelector(".all-clear");
const deleteBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");
const previousResultEl = document.querySelector(".previous-result");
const currentResultEl = document.querySelector(".current-result");

class Calculator {
	constructor(previousResult, currentResult) {
		this.previousResult = previousResult;
		this.currentResult = currentResult;
		this.allClear();
	}

	allClear() {
		this.previousOperand = "";
		this.currentOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	selectOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.calculate();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	calculate() {
		let result;
		const prevNum = parseFloat(this.previousOperand);
		const currentNum = parseFloat(this.currentOperand);

		if (isNaN(prevNum) || isNaN(currentNum)) return;

		switch (this.operation) {
			case "+":
				result = prevNum + currentNum;
				break;
			case "-":
				result = prevNum - currentNum;
				break;
			case "×":
				result = prevNum * currentNum;
				break;
			case "÷":
				result = prevNum / currentNum;
				break;
			default:
				return;
		}

		this.currentOperand = result.toString();
		this.operation = undefined;
		this.previousOperand = "";
	}

	formatNumber(number) {
		const strNum = number.toString().split(".");
		const integers = parseFloat(strNum[0]);
		const decimals = strNum[1];
		let integerNum;

		if (isNaN(integers)) {
			integerNum = "";
		} else {
			integerNum = integers.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimals != null) {
			return `${integerNum}.${decimals}`;
		} else {
			return integerNum;
		}
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;

		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	updateDisplay() {
		this.currentResult.textContent = this.formatNumber(this.currentOperand);

		if (this.operation != null) {
			this.previousResult.textContent = `${this.formatNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousResult.textContent = "";
		}
	}
}

// Calculator instance
const calculator = new Calculator(previousResultEl, currentResultEl);

// EVENT LISTENER/S
numberBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.appendNumber(btn.textContent);
		calculator.updateDisplay();
	});
});

operationBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.selectOperation(btn.textContent);
		calculator.updateDisplay();
	});
});

equalBtn.addEventListener("click", () => {
	calculator.calculate();
	calculator.updateDisplay();
});

allClearBtn.addEventListener("click", () => {
	calculator.allClear();
	calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});
