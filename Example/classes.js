//ANCHOR Basic Structure


class ClassName {
  constructor(parameter1, parameter2) {
    // properties
    this.property1 = parameter1;
    this.property2 = parameter2;
  }

  // methods
  methodName() {
    // code for the method
  }

  anotherMethod() {
    // more code
  }
}


//ANCHOR example


class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // method
  start() {
    console.log(`${this.brand} ${this.model} is starting...`);
  }

  // another method
  displayInfo() {
    console.log(`Car: ${this.brand} ${this.model} (${this.year})`);
  }
}

// create objects from the class
const car1 = new Car("Toyota", "Corolla", 2020);
const car2 = new Car("Tesla", "Model 3", 2023);

// use the methods
car1.start();        // Output: Toyota Corolla is starting...
car2.displayInfo();  // Output: Car: Tesla Model 3 (2023)


//ANCHOR inheritance


class ElectricCar extends Car {
  constructor(brand, model, year, batteryRange) {
    super(brand, model, year); // call the parent constructor
    this.batteryRange = batteryRange;
  }

  charge() {
    console.log(`${this.brand} ${this.model} is charging...`);
  }
}

const myEV = new ElectricCar("Tesla", "Model S", 2024, 396);
myEV.displayInfo(); // from Car
myEV.charge();      // from ElectricCar
