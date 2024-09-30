// =============================================
// DESIGN PATTERNS
// =============================================
// =============================================
// CREATIONAL
// =============================================
// Singleton
// =============================================
class Settings {
  static instance: Settings;

  private readonly mode = "dark";

  // prevent new with private constructor
  private constructor() {
    mode: "dark";
  }

  static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }
}

// const settings = new Settings();
const settings = Settings.getInstance();

// This example take advantage of the built in const key-word
// this object can't be instantiate again
const settingsObj = {
  dark: "true",
};

console.log(settings);

// =============================================
//  Prototype
// =============================================
// The key concept of prototype is that you might want to
// inherit some methods and/or functionalities
const zombie = {
  eatBrain() {
    return "gnam gnam 🧠";
  },
};

const orc = Object.create(zombie, {
  name: { value: "Gallan" },
});

// Interesting that you will not able to see the method inherit from
// zombie prototype but you can still call it and use it, this is because
// Javascript will go up the prototype chain until it reaches the root
// looking for any methods or properties on the parent objects
console.log("🚀 ~ orc:", orc);
console.log("🚀 ~ orc method:", orc.eatBrain());

// Get prototype info with the built in method getPrototypeOf
Object.getPrototypeOf(orc);

// =============================================
//  Builder
// =============================================
class PaniniBuilder {
  constructor(
    public bun: string,
    public meat: boolean,
    public souce: boolean
  ) {}
}

// this way is hard to track all those options and we might want to
// defer each step to a later point
new PaniniBuilder("wheat", true, true);

// With Builder pattern we create the object step by step using methods

class Panini {
  constructor(
    public bun: string,
    public meat?: boolean,
    public souce?: boolean
  ) {}

  addBun() {
    this.bun = "wheat";
    // we use return this -> reference to the object instance
    return this;
  }

  addMeat() {
    this.meat = true;
    return this;
  }

  addSouce() {
    this.souce = true;
    return this;
  }
}

// Now we could even delegate the building logic to an entire different class
// we can use method chaining where we instantiate an object then chain methods to it

const myLunch = new Panini("gluten free");

myLunch.addBun().addMeat().addSouce();

// =============================================
//  Factory
// =============================================
// Instead of using the new keyword to instantiate an object you use a function
// or method to do it for you

class IOSButton {}

class AndroidButton {}

let os = "ios";

// Without Factory
const button1 = os === "ios" ? new IOSButton() : new AndroidButton();
const button2 = os === "ios" ? new IOSButton() : new AndroidButton();

// =============================================
// Instead of doing this which is not very mantainable we could create a function that will
// determine which object to instantiate
// =============================================
// With factory
// =============================================
class ButtonFactory {
  createButton(os: string): IOSButton | AndroidButton {
    if (os === "ios") {
      return new IOSButton();
    } else {
      return new AndroidButton();
    }
  }
}

// Now instead of repeating the same logic we use the factory to determin which button will be instantiated
const factory = new ButtonFactory();
const btn1 = factory.createButton(os);
const btn2 = factory.createButton(os);
