import Person, { add } from './otherFile';

const view = document.getElementById("view");
const person = new Person('rodney');

const clickMe = (ev: MouseEvent): void => {
  const sum = add(2,5);
  if (view) {
    view.innerHTML = 'Sum of 2 + 5 = ' + sum + ' ' + person;
  }
};

const arr:number[] = [1,2,3,4,5,6,7,8];

let [a, b, ...rest] = arr; 
console.log(a,b,rest);

const button1 = document.getElementById("b1");
button1?.addEventListener("click", clickMe);

class Test {
  constructor(public name: string) {
    this.name = name;
  }

  logger () {
    console.log("Hellcco", this.name);
  }
}