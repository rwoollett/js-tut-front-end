import { add } from './otherFile';
import styles from './scss/style.scss';
import mainStyles from './scss/main.scss';

let view:HTMLElement|null;

const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const root = document.getElementById("root");
const adder = document.getElementById("adderForm");
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
    container.setAttribute(
      "class", `${mainStyles.container} ${mainStyles.board}`);
    boxes.map(  ({desc, color}: {desc: string; color: string}) => {
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

const responses = {
  num1: 0,
  num2: 0,
};

if (adder) {
  const formAdd = document.createElement( "form" );
  const formRowGrid1 = document.createElement( "div" );
  const inputNum1 = document.createElement( "input" );
  const inputNum2 = document.createElement( "input" );
  const label1 = document.createElement( "label" );
  const label2 = document.createElement( "label" );
  const label3 = document.createElement( "label" );
  const viewAdd = document.createElement( "div" );
  if (formAdd && formRowGrid1 && label1 && label2 &&
      label3 && inputNum1 && inputNum2 && viewAdd) {
    view = viewAdd;
    formRowGrid1.setAttribute('class', mainStyles['form-row-grid']);
    label1.setAttribute('class', styles.element1);
    label1.setAttribute('for', "add1");
    label1.textContent = "Add ";
    inputNum1.setAttribute('class', styles.element2);
    inputNum1.setAttribute('name', 'add1');
    inputNum1.setAttribute('id', 'add1');
    inputNum1.value = ("" + responses.num1);
    label2.setAttribute('class', styles.element3);
    label2.textContent = " to ";
    label2.setAttribute('for', "add2");
    inputNum2.setAttribute('class', styles.element4);
    inputNum2.setAttribute('name', 'add2');
    inputNum2.setAttribute('id', 'add2');
    inputNum2.value = ("" + responses.num2);
    label3.setAttribute('class', styles.element5);
    label3.textContent = " = ";
    viewAdd.setAttribute('class', styles.element6);
    viewAdd.textContent = "";
    formRowGrid1.append(label1);
    formRowGrid1.append(inputNum1);
    formRowGrid1.append(label2);
    formRowGrid1.append(inputNum2);
    formRowGrid1.append(label3);
    formRowGrid1.append(viewAdd);
    inputNum1.addEventListener('change', (evt: Event) => {
      if (evt.target) {
        responses['num1'] = parseInt(inputNum1.value);
        console.log('add num1', responses);
      }
    });
    inputNum2.addEventListener('change', (evt: Event) => {
      if (evt.target) {
        responses['num2'] = parseInt(inputNum2.value);
        console.log('add num2', responses);
      }
    });
    formAdd.append(formRowGrid1);
  }

  adder.append(formAdd);
}

const clickMe = (): void => {
  const sum = add(responses.num1,responses.num2);
  if (view) {
    view.innerHTML = sum + ' ';
  }
};

const button1 = document.getElementById("b1");
button1?.addEventListener("click", clickMe);

const x = { xx : "hello", yy : "world"};
(function () {
    console.log("Hello World", x);
})();

const foo = '_we';
const bar = '_lo';
const ComputeObj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};

console.log(ComputeObj);

