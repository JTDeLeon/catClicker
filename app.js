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

        catArea.addAdminButton();
        catArea.createAdminPanel(idToPass);
        octopus.makeAdminButtonClickable(idToPass);
        octopus.cancelButtonInteraction();
        octopus.saveButtonInteraction(idToPass);

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
      //Update Placeholder value for form
      catArea.adminPanelUpdate(id);
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
  },

  makeAdminButtonClickable: (id)=>{
    const admBtn = document.getElementById('admin-button');
    admBtn.addEventListener('click',function(){
      console.log("button was clicked");

      //Show/Hide Admin Panel On Click of Button
      document.getElementById('admin-panel').classList.toggle('hidden');

      //Update Placeholder value for form
      catArea.adminPanelUpdate(id);

    })
  },

  cancelButtonInteraction: ()=>{
    const button = document.getElementById('cancel-button');
    button.addEventListener('click',function(){
      document.getElementById('admin-panel').classList.add('hidden');

    });
  },

  saveButtonInteraction: (id)=>{
    const button = document.getElementById('save-button');
    button.addEventListener('click',function(){
      console.log("Save Button was clicked");

      //If Changed:
        //Update Name, Source, Counter to Model
      console.log(catArea.getAdminName()==cats[id].name);

      if(catArea.getAdminName()!=cats[id].name){
        console.log("Name has changed!");
        cats[id].name = catArea.getAdminName();
      }
      if(catArea.getAdminSource()!=cats[id].pic){
        console.log("Pic Source has changed!");
        cats[id].pic = catArea.getAdminSource();
      }
      if(catArea.getAdminCount()!=cats[id].counter){
        console.log("Counter has changed!");
        cats[id].counter = catArea.getAdminCount();
      }

      document.getElementById(id).click();

    });
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

  addAdminButton: ()=>{
    const button = document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('id','admin-button');
    button.textContent = 'admin';

    document.querySelector('.catcontainer').appendChild(button);


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

    if(document.getElementById('admin-button')){
      const button = document.getElementById('admin-button');
      button.remove();
    }

    if(document.getElementById('admin-panel')){
      const panel = document.getElementById('admin-panel');
      panel.remove();
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
  },

  createAdminPanel: (id)=>{
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id','admin-panel');
    newDiv.setAttribute('class','hidden');

    newDiv.insertAdjacentHTML('afterbegin','<h1>Admin Panel</h1>');

    const catName = octopus.getCatName(id);
    const catSource = octopus.getCatSrc(id);
    const catCount = octopus.getCatCount(id);

    const form = document.createElement('form');
    form.innerHTML =   `<div id="admin-inputs">
        <div class="cinput">
        <label for="uname">Cat Name: </label>
        <input type="text" id="catName" value="${catName}" placeholder="${catName}">
        </div>
        <div class="cinput">
        <label for="uname">Cat Source: </label>
        <input type="text" id="catSource" value="${catSource}" placeholder="${catSource}">
        </div>
        <div class="cinput">
        <label for="uname">Cat Counter: </label>
        <input type="text" id="catCounter" value="${catCount}" placeholder="${catCount}">
        </div>
      </div>
      <div id="admin-controls">
        <button type="button" id="save-button">Save</button>
        <button type="button" id="cancel-button">Cancel</button>
      </div>`

    newDiv.appendChild(form);
    //Insert to end of cat container
    document.querySelector('.catcontainer').appendChild(newDiv);
  },

  adminPanelUpdate: (id)=>{
    const catName = octopus.getCatName(id);
    const catSource = octopus.getCatSrc(id);
    //Use This For Now, but should update all of them
    const catCount = octopus.getCatCount(id);

    const input = document.getElementById('catCounter');
    input.setAttribute('placeholder',catCount);

    const input2 = document.getElementById('catName');
    input2.setAttribute('placeholder',catName);

    const input3 = document.getElementById('catSource');
    input3.setAttribute('placeholder',catSource);
  },

  getAdminName: ()=>{
    return document.getElementById('catName').value;
  },

  getAdminSource: ()=>{
    return document.getElementById('catSource').value;
  },

  getAdminCount: ()=>{
    return document.getElementById('catCounter').value;
  }
};

//Initialize DOM
octopus.init();
