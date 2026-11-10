function Vehicle(color){
    this.color = color;
}

Vehicle.prototype.go = function(speed){
    this.speed = speed;
    console.log(`Your Vehicle is currently going ${this.speed} miles.`);
};
Vehicle.prototype.print = function(){
    console.log(`Your ${this.color} Vehicle is currently going ${this.speed} miles.`);
};

const v1 = new Vehicle('Red');
console.log(v1);
v1.go(80);
v1.print();

///////////////////////////////////////
function Plane(color){
    this.color = color;
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.go = function(speed){
    this.speed = speed;
    console.log(`This PLANE is currently FLYING ${this.speed} miles.`);
};
const p1 = new Plane('Blue');
console.log(p1);
p1.go(150);
p1.print();
