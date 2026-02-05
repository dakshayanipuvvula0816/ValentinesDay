const gridSize = 14;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const words = [
  "LOVE",
  "HEART",
  "FOREVER",
  "HUG",
  "KISS",
  "US",
  "DATE",
  "PROMISE",
  "SOUL",
  "ALWAYS"
];

const grid = document.getElementById("grid");
const wordList = document.getElementById("wordList");

const directions = [
  {x:1,y:0},{x:0,y:1},{x:1,y:1},{x:1,y:-1}
];

let gridArray = Array.from({length:gridSize},()=>Array(gridSize).fill(""));
let selected = [];
let dragging = false;

/* PLACE WORDS */
function placeWord(word){
  while(true){
    const dir = directions[Math.floor(Math.random()*directions.length)];
    const x = Math.floor(Math.random()*gridSize);
    const y = Math.floor(Math.random()*gridSize);
    const endX = x + dir.x*(word.length-1);
    const endY = y + dir.y*(word.length-1);
    if(endX<0||endX>=gridSize||endY<0||endY>=gridSize) continue;

    let ok = true;
    for(let i=0;i<word.length;i++){
      const cx = x+dir.x*i;
      const cy = y+dir.y*i;
      if(gridArray[cy][cx] && gridArray[cy][cx]!==word[i]) ok=false;
    }
    if(!ok) continue;

    for(let i=0;i<word.length;i++){
      gridArray[y+dir.y*i][x+dir.x*i]=word[i];
    }
    break;
  }
}

words.forEach(placeWord);

/* FILL GRID */
for(let r=0;r<gridSize;r++){
  for(let c=0;c<gridSize;c++){
    if(!gridArray[r][c]){
      gridArray[r][c]=letters[Math.floor(Math.random()*letters.length)];
    }
  }
}

/* RENDER */
gridArray.forEach((row,r)=>{
  row.forEach((l,c)=>{
    const d=document.createElement("div");
    d.className="cell";
    d.textContent=l;
    d.dataset.r=r;
    d.dataset.c=c;
    grid.appendChild(d);
  });
});

words.forEach(w=>{
  const li=document.createElement("li");
  li.textContent=w;
  li.id="w-"+w;
  wordList.appendChild(li);
});

/* DRAG */
grid.addEventListener("mousedown",e=>{
  if(!e.target.classList.contains("cell"))return;
  dragging=true;
  clearSel();
  add(e.target);
});

grid.addEventListener("mouseover",e=>{
  if(dragging && e.target.classList.contains("cell")) add(e.target);
});

document.addEventListener("mouseup",()=>{
  if(!dragging)return;
  dragging=false;
  check();
});

function add(c){
  if(!selected.includes(c)){
    c.classList.add("selected");
    selected.push(c);
  }
}

function clearSel(){
  selected.forEach(c=>c.classList.remove("selected"));
  selected=[];
}

function check(){
  const word=selected.map(c=>c.textContent).join("");
  const rev=word.split("").reverse().join("");
  if(words.includes(word)||words.includes(rev)){
    selected.forEach(c=>c.classList.add("found"));
    document.getElementById("w-"+(words.includes(word)?word:rev)).classList.add("done");
  } else clearSel();
}
