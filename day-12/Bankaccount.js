// class is a shorter way to set up a constructor and a shared prototype.
class BankAccount {
  // The constructor runs once each time you write new BankAccount(...).
  // It sets up the starting state of the new object.
  constructor(owner, balance = 0) {
    this.owner = owner; // a property on each account
    this.balance = balance; // a property on each account
  }

  // A method. It is placed on the shared prototype automatically.
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Deposit must be a positive number');
    }
    this.balance = this.balance + amount;
    return this.balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error('Not enough balance');
    }
    this.balance = this.balance - amount;
    return this.balance;
  }

  // A getter looks like a method but you read it like a property.
  // You write account.summary, with no parentheses.
  get summary() {
    return `${this.owner}: ${this.balance}`;
  }

  // A setter runs when you assign to its own property name.
  // You write account.ownerName = 'New Name' and this runs.
  // (Assigning to account.owner directly would bypass this setter.)
  set ownerName(name) {
    if (name.length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.owner = name;
  }
  // A static method belongs to the class itself, not to each account.
  // You call it as BankAccount.fromObject(...), not on an instance.
  // Use static methods for tasks that make or compare accounts.
  static fromObject(data) {
    return new BankAccount(data.owner, data.balance);
  }
}

const account = new BankAccount('Alice', 100);
account.deposit(50);
console.log(account.balance); // 150
console.log(account.summary); // "Alice: 150"  (getter, no parentheses)

// Build an account from plain data using the static method.
const restored = BankAccount.fromObject({ owner: 'Bob', balance: 20 });
console.log(restored.summary); // "Bob: 20"
