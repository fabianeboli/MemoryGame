var person1 = {};

Object.defineProperties(person1,{
    _name: {
        value: "Nicholas",
        enumerable: true,
        configurable: true,
        writable: true
    },
    // accessor property
    name: {
        get: function () {
            console.log("Reading name");
            return this.name;
        },
        set: function (value) {
            console.log("Setting name to %s",value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    }
});

var descriptor = Object.getOwnPropertyDescriptor(person1,"name");

console.log(descriptor.enumerable);
console.log(descriptor.configurable);
console.log(descriptor.writable);
// cant add new properties
Object.preventExtensions(person1);

// cant add or remove properties
Object.seal(person1);
// cant add, remove , change properties
Object.freeze(person1);

function  Person(name) {
    Object.defineProperty(this, "name", {
        get: function () {
            return name;
        },
        set: function (newName) {
            name = newName;
        },
        enumerable: true,
        configurable: true
    });
    this.sayName = function () {
        console.log("basaf");
    }

}