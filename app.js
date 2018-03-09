let cat1clickCounter = 0;
let cat2clickCounter = 0;

//Event Listener for Cat1 Picture
const pic1 = document.querySelector('#cat-pic1');
insertName(pic1,'Cleo');
pic1.addEventListener('click',function(){
  //Do something here
  cat1clickCounter++;
  console.log(`cat picture 1 was clicked ${cat1clickCounter} times`);
  updateCounter(pic1,cat1clickCounter,'cat1');
});

//Event Listener for Cat2 Picture
const pic2 = document.querySelector('#cat-pic2');
insertName(pic2,'Leo');
pic2.addEventListener('click',function(){
  //Do something here
  cat2clickCounter++;
  console.log(`cat picture 2 was clicked ${cat2clickCounter} times`);
  updateCounter(pic2,cat2clickCounter,'cat2');
});

function updateCounter(cat, updatedCounter,id){
  if(document.querySelector(`#${id}`)){
    deletePrevCounter(`#${id}`);
  }
  cat.insertAdjacentHTML('afterend',`<h3 id="${id}">This picture was clicked ${updatedCounter} times!</h3>`);
}

function deletePrevCounter(id) {
  document.querySelector(id).remove();
}

function insertName(cat,name){
  cat.insertAdjacentHTML('beforebegin',`<h2 class="catNameText">${name}</h2>`);
}
