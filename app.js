//Creates Cats JSON object
const cats = [{
    name: "Cleo",
    pic: "img/CatPic1.jpg",
  },
  {
    name: "Leo",
    pic: "img/CatPic2.jpg",
  },
  {
    name: "Harlem",
    pic: "img/CatPic3.jpg",
  },
  {
    name: "Lake",
    pic: "img/CatPic4.jpg",
  },
  {
    name: "Linus",
    pic: "img/CatPic5.jpg",
  }
];
// What this application does:
  //Add List To DOM of Cat Names
  //Make List Clickable
  //When Clicked:
    //Add Cat pic, cat name, and cat counter to the page
    //Be sure to increment cat counter and make sure this counter is exclusive to this cat only

//Add List of Cats Name To DOM
addNamesToDOM();

//Make List Clickable
makeNamesClickable();



//Add List of Names TO DOM
function addNamesToDOM() {
  let count = 1;
  const body = document.querySelector('body');

  const nameArray = cats.map(a => a.name);

  const newNode = document.createElement('div');
  newNode.setAttribute('class','catNameList');
  for(let i in nameArray){
    newNode.insertAdjacentHTML('beforeend',`<h3 class="catName" id="CatPic${count}">${nameArray[i]}</h3>`);
    count++;
  }

  body.appendChild(newNode);
}

function makeNamesClickable() {
  const names = document.querySelectorAll('.catName');

  names.forEach(function(a){
    let counter = 0;
    a.addEventListener('click',function(){
      //where we add what happens when the items are clicked.
      console.log(`${a.textContent} was clicked!`);

      //Clears if any existing picture is on the DOM
      clearCat();

      //Increment counter here
      counter++;
      console.log(`counter is now ${counter}`);

      //Adds picture of cat here
      let id = a.getAttribute('id');
      let newImage = createNewImage(id);
      document.querySelector('body').appendChild(newImage);

      //Adds Cat Name here
      const catName = a.textContent;
      const newNameNode = document.createElement('h3');
      newNameNode.textContent = catName;
      newNameNode.setAttribute('id',`cat-name`);
      document.querySelector('body').appendChild(newNameNode);

      //Add Counter to DOM
      let newCounterNode = document.createElement('h4');
      newCounterNode.textContent = `This cat was clicked ${counter} times!`;
      newCounterNode.setAttribute('id','counter-node');
      document.querySelector('body').appendChild(newCounterNode);

    })
  });
}

function createNewImage(id) {
    const newId = id+'.jpg';
    const newNode = document.createElement('img');
    newNode.setAttribute('src',`img/${newId}`);
    newNode.setAttribute('id','current-image');

    return newNode;
}

function clearCat() {
  if(document.getElementById('current-image')){
    const catPic = document.getElementById('current-image');
    catPic.remove();
  }

  if(document.getElementById('cat-name')){
    const catName = document.getElementById('cat-name');
    catName.remove();
  }

  if(document.getElementById('counter-node')){
    const counter = document.getElementById('counter-node');
    counter.remove();
  }
}
