// OBJECTS


// const person = {
//     name: 'Aleksa',
//     age: 23,
//     location: {
//         city: 'Novi Sad',
//         temperature: 38
//     }
// };
// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temperature: temp } = person.location;
// if(city && temp){
//     console.log(`It's ${city} in  ${temp}`);
// }


// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }

// const {name: publisherName = 'Self-published'} = book.publisher;
// console.log(publisherName)


// ARRAYS


// const address = ['1299 S Juniper Street', 'Philadelphia','Pennsylvania', '19147'];
// const [, city, state='New York'] = address;
// console.log(`You are in ${city} ${state}.`)

const item = ['Coffee (iced)', '$3.00', '$3.50', '$3.75'];
const [coffee, , price] = item;
console.log(`A medium ${coffee} costs ${price}`);