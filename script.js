let megami = 1;
let convoluted = 0;
let past = 1;
let present = 2;
let future = 3;
let unseen = 4;

const objects = [
  document.getElementById("object1"),
  document.getElementById("object2"),
  document.getElementById("object3"),
  document.getElementById("object4"),
];

const history = [];

const positions = {
  btn5: { left: 150, top: 0 },
  btn6: { left: 150, top: 535 },
  btn7: { left: 150, top: 1070 },
  btn8: { left: 150, top: 1605 },
};

function updateObjectImages() {
  for (let z = 0; z < 4; z++) {
    const filename = `${megami}${z+1}${convoluted}.jpg`;
    objects[z].src = `images/${filename}`;
  }
}

function setObjectPosition(index, buttonId) {
  const obj = objects[index];
  const pos = positions[buttonId];
  obj.style.left = pos.left + "px";
  obj.style.top = pos.top + "px";
}

function initializeObjects() {
  setObjectPosition(0, "btn5");
  setObjectPosition(1, "btn6");
  setObjectPosition(2, "btn7");
  setObjectPosition(3, "btn8");
}

function pushState() {
  history.push({
    megami, convoluted, past, present, future, unseen,
    positions: objects.map(o => ({ left: o.style.left, top: o.style.top }))
  });
}

function restoreState(state) {
  megami = state.megami;
  convoluted = state.convoluted;
  past = state.past;
  present = state.present;
  future = state.future;
  unseen = state.unseen;

  state.positions.forEach((pos, i) => {
    objects[i].style.left = pos.left;
    objects[i].style.top = pos.top;
  });

  updateObjectImages();
}

function setupButtonEvents() {
  document.getElementById("btn1").onclick = () => {
    pushState();
    convoluted = convoluted === 0 ? 1 : 0;
    updateObjectImages();
  };

  document.getElementById("btn2").onclick = () => {
    pushState();
    megami = 3;
    updateObjectImages();
  };

  document.getElementById("btn3").onclick = () => {
    pushState();
    megami = 2;
    updateObjectImages();
  };

  document.getElementById("btn4").onclick = () => {
    pushState();
    megami = 1;
    updateObjectImages();
  };

  document.getElementById("btn5").onclick = () => {
    // Do nothing
  };

  document.getElementById("btn6").onclick = () => {
    pushState();
    setObjectPosition(unseen, "btn6");
    setObjectPosition(future, "btn5");

    const temp = unseen;
    unseen = future;
    future = temp;
  };

  document.getElementById("btn7").onclick = () => {
    pushState();
    setObjectPosition(unseen, "btn6");
    setObjectPosition(future, "btn7");
    setObjectPosition(present, "btn5");

    const temp = unseen;
    unseen = present;
    present = future;
    future = temp;
  };

  document.getElementById("btn8").onclick = () => {
    pushState();
    setObjectPosition(unseen, "btn6");
    setObjectPosition(future, "btn7");
    setObjectPosition(present, "btn8");
    setObjectPosition(past, "btn5");

    const temp = unseen;
    unseen = past;
    past = present;
    present = future;
    future = temp;
  };
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" && history.length > 0) {
    const prev = history.pop();
    restoreState(prev);
  }
});

updateObjectImages();
initializeObjects();
setupButtonEvents();
