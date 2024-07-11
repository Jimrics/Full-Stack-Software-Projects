"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var BudgetMeter = /** @class */ (function () {
    function BudgetMeter() {
        this.expenses = [];
        console.log('Budget Meter');
        this.getIncomeAndSavings();
    }
    BudgetMeter.prototype.getIncomeAndSavings = function () {
        this.income = parseFloat(readlineSync.question('Enter your monthly income: '));
        this.savingsPercentage = parseFloat(readlineSync.question('Enter the percentage of income you want to save (0-100): '));
        if (isNaN(this.income) || isNaN(this.savingsPercentage) || this.savingsPercentage < 0 || this.savingsPercentage > 100) {
            console.log('Invalid input. Please enter valid values.');
            this.getIncomeAndSavings();
        }
        else {
            this.showMenu();
        }
    };
    BudgetMeter.prototype.calculateRemainingAmount = function () {
        var savingsAmount = (this.income * this.savingsPercentage) / 100;
        var totalExpenses = this.expenses.reduce(function (total, expense) { return total + expense.amount; }, 0);
        return this.income - savingsAmount - totalExpenses;
    };
    BudgetMeter.prototype.showMenu = function () {
        console.log('\n1. Add Expense');
        console.log('2. View Expenses');
        console.log('3. Exit');
        var choice = readlineSync.question('Enter your choice: ');
        switch (choice) {
            case '1':
                this.addExpense();
                break;
            case '2':
                this.viewExpenses();
                break;
            case '3':
                console.log('Exiting...');
                process.exit(0);
            default:
                console.log('Invalid choice. Please try again.');
                this.showMenu();
        }
    };
    BudgetMeter.prototype.addExpense = function () {
        var remainingAmount = this.calculateRemainingAmount();
        if (remainingAmount <= 0) {
            console.log('You have no more available spending.');
            this.showMenu();
            return;
        }
        console.log("You have $".concat(remainingAmount.toFixed(2), " available for spending."));
        var category = readlineSync.question('Enter expense category: ');
        var amount = parseFloat(readlineSync.question('Enter expense amount: '));
        if (!isNaN(amount) && amount <= remainingAmount) {
            this.expenses.push({ category: category, amount: amount });
            console.log('Expense added successfully!');
        }
        else {
            console.log('Invalid amount or exceeds available spending. Please try again.');
        }
        this.showMenu();
    };
    BudgetMeter.prototype.viewExpenses = function () {
        console.log('\nExpenses:');
        this.expenses.forEach(function (expense, index) {
            console.log("".concat(index + 1, ". Category: ").concat(expense.category, ", Amount: $").concat(expense.amount.toFixed(2)));
        });
        this.showMenu();
    };
    return BudgetMeter;
}());
new BudgetMeter();
