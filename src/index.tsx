import Person, { add } from './otherFile';

const view = document.getElementById("view");
const person = new Person('rodney');

const clickMe = (ev: MouseEvent): void => {
  const sum = add(2,5);
  if (view) {
    view.innerHTML = 'Sum of 2 + 5 = ' + sum + ' ' + person;
  }
};


const button1 = document.getElementById("b1");
button1?.addEventListener("click", clickMe);