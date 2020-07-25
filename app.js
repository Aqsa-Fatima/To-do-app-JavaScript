// javascript code for To-Do app

//select the emements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date"); //variable to get id from html for date div tag 
const list = document.getElementById("list"); //variable to get id from html for ul tag list items 
const input = document.getElementById("input"); //variable to get id from html for input tag for waht to do


// classes names 
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id; // these varables store data in list with id start from 0 to id++

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data in variable is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last in the list
    loadList(LIST); // load the list to user interface

}else{
    //if data is not in localstorage or empty
    LIST = [];
    id = 0 ;
    
}

// load items to the user's interface

function loadList(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear thelocal storage
clear.addEventListener("click" ,function(){
    localStorage.clear();
    location.reload();
});





// show todays date 

const options = { weekday: "long", month: "short", day: "numeric", year: "numeric" }; //this variable is used to store date detailes and call in dateElement for inner html
const today = new Date();  //current date is store in this variable
dateElement.innerHTML = today.toLocaleDateString("en-US", options); //toLocaleDateString is a function that is call in date function which is declare in Today variable 


// add to do function 

function addToDo(toDo, id, done, trash) {

    if (trash) { return; } //this is for delete true or false from list 

    const DONE = done ? CHECK : UNCHECK; // item is checked or unchecked if value is true then it is checked otherwise unchecked
    const LINE = done ? LINE_THROUGH : ""; // if item is checked

    //variable item is second parameter of insertAdjecentHTML 
    const item = `<li class=item> 
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i> 
                        <p class="text ${LINE}">${toDo}</p> 
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>    
                        </li>
                        `;

    const position = "beforeend";
    //positions are of four type before begin any section, after being and  before end and after end of any section   

    list.insertAdjacentHTML(position, item);
    //insertAdjesentHTML is a method to add html elemets in javascript it hav etwo parameters first one is position and second one is text that is some this which you want to display 




}
//addToDo("this is to do function ")

//add an item to list  use the enter key 
document.addEventListener("keyup", function (even) {
    if (even.keyCode == 13) {
        const toDo = input.value;

        //if the input isn"t empty 
        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //add item to local storage ( this code must be added where the list array is updated )
            localStorage.setItem("TODO",JSON.stringify(LIST));

            id++;

        }
        input.value = "";
    }
});

// addToDo("this is toDo " , 1, false, false);
// addToDo("this is toDo" , 1, true, false);


// Complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove to do

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


//target the item created dynamically

list.addEventListener("click", function (event) {
    const element = event.target; //return the click element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }


    //add item to local storage ( this code must be added where the list array is updated )
    localStorage.setItem("TODO" , JSON.stringify(LIST));


})













