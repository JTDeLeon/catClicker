/* Author: Jonathan Deleon
*  CatClicker Premium - click on the cats!
*  Built with MOV in mind!
*/

// Model
let cats = [{
    name: "Cleo",
    pic: "img/CatPic1.jpg",
    counter:  0
  },
  {
    name: "Leo",
    pic: "img/CatPic2.jpg",
    counter: 0
  },
  {
    name: "Harlem",
    pic: "img/CatPic3.jpg",
    counter: 0
  },
  {
    name: "Lake",
    pic: "img/CatPic4.jpg",
    counter: 0
  },
  {
    name: "Linus",
    pic: "img/CatPic5.jpg",
    counter: 0
  }
];


//Octopus - Controller where we do stuff
const octopus = {
  init: ()=>{
    //Add List of Cats Name To DOM
    // addNamesToDOM();
    listView.render();
    octopus.makeListClickable();
  },

  getCatNames: ()=>{
    return cats.map(a => a.name);
  },

  //Manages the list and adds the elements to the page using the model & list View objects
  makeListClickable: ()=> {
    const names = document.querySelectorAll('.catName');


    names.forEach(function(a){
      a.addEventListener('click',function(){
        //where we add what happens when the items are clicked.
        console.log(`${a.textContent} was clicked!`);

        //Clears Current Added Cat
        catArea.clearCat();

        const idToPass = a.getAttribute('id');

        //Adds Cat Name To Page
        catArea.addCatName(idToPass);

        //Adds Cat Pic To Page
        catArea.addCatPic(idToPass);
        octopus.makeCatPicClickable(idToPass);

        //Adds Cat Counter To Page (Does Not Increment)
        catArea.addCounterToDOM(idToPass);

      });
    });
  },

  makeCatPicClickable: (id)=>{
    const currentImage = document.getElementById('current-image');

    currentImage.addEventListener('click',()=>{
      //We want to increment the counter in model
      cats[id].counter += 1;
      //Updates DOM Counter
      catArea.renderCounter(cats[id].counter);
    });
  },

  getCatSrc: (passedID)=>{
    return cats[passedID].pic;
  },

  getCatName: (passedID)=>{
    return cats[passedID].name;
  },

  getCatCount: (passedID)=>{
    return cats[passedID].counter;
  }

};


//View #1 : List View
const listView = {
  render: function addNamesToDOM() {
    let count = 0;
    const nameContainer = document.querySelector('.name-container');

    const nameArray = octopus.getCatNames();

    const newNode = document.createElement('div');
    newNode.setAttribute('class','catNameList');

    //Inserts to the DOM
    for(let i in nameArray){
      nameContainer.insertAdjacentHTML('beforeend',`<h3 class="catName" id="${count}">${nameArray[i]}</h3>`);
      count++;
    }

    nameContainer.appendChild(newNode);
  }
};


//View #2 : Cat Picture View
const catArea = {
  addCatPic: (id)=>{
    //Adds picture of cat here
    let newImage = catArea.createNewImage(id);
    document.querySelector('.catcontainer').appendChild(newImage);
  },

  addCatName: (id)=>{
    //Adds Cat Name here
    const catName = octopus.getCatName(id);
    const newNameNode = document.createElement('h3');
    newNameNode.textContent = catName;
    newNameNode.setAttribute('id',`cat-name`);
    document.querySelector('.catcontainer').appendChild(newNameNode);
  },

  addCounterToDOM: (id)=>{
    let counter = octopus.getCatCount(id);
    let newCounterNode = document.createElement('h4');
    newCounterNode.textContent = `This cat was clicked ${counter} times!`;
    newCounterNode.setAttribute('id','counter-node');
    document.querySelector('.catcontainer').appendChild(newCounterNode);
  },

  clearCat: ()=>{

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
  },

  createNewImage: (id)=>{
      const newId = octopus.getCatSrc(id);
      const newNode = document.createElement('img');
      newNode.setAttribute('src',newId);
      newNode.setAttribute('id','current-image');

      return newNode;
  },

  renderCounter: (updatedCount)=>{
    document.getElementById('counter-node').textContent = `This cat was clicked ${updatedCount} times!`;
  }
};

//Initialize DOM
octopus.init();
