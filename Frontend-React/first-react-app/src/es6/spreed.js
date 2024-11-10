// ...
const boys =['kevin', 'john'];
const girls = [1,2 ,3,4,5,6,7,8,9,10];
const newGirls = [...girls, 'anne', 'keza']

let children =[...boys, ...newGirls];
console.log(children);


// object
let myvehicle ={
    make: 'Toyota',
    model: 'Camry',
    year: 2015
}
let updateVehicle = {
    color: 'black'
}
let myUpdateVehicle = {...myvehicle, ...updateVehicle, type:'car'}
console.log(myUpdateVehicle);
