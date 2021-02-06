import Person, { add } from './otherFile';
import styles from './scss/style.scss';
import mainStyles from './scss/main.scss';

const view = document.getElementById("view");
const person = new Person('rodney');

const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const root = document.getElementById("root");
if (h1) {
  h1.setAttribute('class', `${styles.large}`);
}
if (h2) {
  h2.setAttribute('class', `${styles.bold} ${styles.small}`);
}

interface box {
  desc: string;
  color: string;
}
const boxes:box[] = [];
boxes.push( {
  desc: "Box 1",
  color: 'blue'
});
boxes.push( {
  desc: "Box 2",
  color: 'red'
});
boxes.push( {
  desc: "Box 3",
  color: 'green'
});
boxes.push( {
  desc: "Box 4",
  color: 'yellow'
});

if (root) {
  root.textContent = '';
  root.setAttribute("class", mainStyles.root);
  const container = document.createElement( "div" );
  if (container) {
    container.setAttribute("class", `${mainStyles.container} ${mainStyles.board}`);
    boxes.map(  ({desc, color}: {desc: string; color: string}, i: number) => {
      const box = document.createElement( "div" );
      if (box) {
        box.setAttribute("class", `${color} ${mainStyles.commentContainer}`);
        box.textContent = desc;
        container.append(box);
      }
    });
    root.append(container);
  }
}

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
    console.log("Hello", this.name);
  }
}
var foo = '_we';
var bar = '_lo';
var ComputeObj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};

let myNumber = (x: number) => x;

const A = /o+/y;