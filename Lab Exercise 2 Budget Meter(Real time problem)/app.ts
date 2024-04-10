import * as readlineSync from 'readline-sync';

interface Expense {
    category: string;
    amount: number;
}

class BudgetMeter {
    income: number;
    savingsPercentage: number;
    expenses: Expense[] = [];

    constructor() {
        console.log('Budget Meter');
        this.getIncomeAndSavings();
    }

    getIncomeAndSavings() {
        this.income = parseFloat(readlineSync.question('Enter your monthly income: '));
        this.savingsPercentage = parseFloat(readlineSync.question('Enter the percentage of income you want to save (0-100): '));

        if (isNaN(this.income) || isNaN(this.savingsPercentage) || this.savingsPercentage < 0 || this.savingsPercentage > 100) {
            console.log('Invalid input. Please enter valid values.');
            this.getIncomeAndSavings();
        } else {
            this.showMenu();
        }
    }

    calculateRemainingAmount(): number {
        const savingsAmount = (this.income * this.savingsPercentage) / 100;
        const totalExpenses = this.expenses.reduce((total, expense) => total + expense.amount, 0);
        return this.income - savingsAmount - totalExpenses;
    }

    showMenu() {
        console.log('\n1. Add Expense');
        console.log('2. View Expenses');
        console.log('3. Exit');

        const choice = readlineSync.question('Enter your choice: ');

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
    }

    addExpense() {
        const remainingAmount = this.calculateRemainingAmount();
        if (remainingAmount <= 0) {
            console.log('You have no more available spending.');
            this.showMenu();
            return;
        }

        console.log(`You have $${remainingAmount.toFixed(2)} available for spending.`);

        const category = readlineSync.question('Enter expense category: ');
        const amount = parseFloat(readlineSync.question('Enter expense amount: '));

        if (!isNaN(amount) && amount <= remainingAmount) {
            this.expenses.push({ category, amount });
            console.log('Expense added successfully!');
        } else {
            console.log('Invalid amount or exceeds available spending. Please try again.');
        }

        this.showMenu();
    }

    viewExpenses() {
        console.log('\nExpenses:');
        this.expenses.forEach((expense, index) => {
            console.log(`${index + 1}. Category: ${expense.category}, Amount: $${expense.amount.toFixed(2)}`);
        });

        this.showMenu();
    }
}

new BudgetMeter();
