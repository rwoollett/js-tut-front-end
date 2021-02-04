

const clickMe = (ev: MouseEvent) => {
  console.log('Clicked here..');
};

const button1 = document.getElementById("b1");
button1?.addEventListener("click", clickMe);