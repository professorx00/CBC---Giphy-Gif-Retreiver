const docBtnContainer = $("#btnContainer");
const docGifContainer = $("#gifStorage");
const docButton = $("#btnSubmit");
const docformInput = $("#formInput");

var gifStorage = ["dungeons & dragons","Marvel"];

function createButtons(value){
    newBTN = $("<a>").addClass("btn waves-effect waves-light").text(value);
    docBtnContainer.append(newBTN);
}

function AddToBtns(){
    btnName = docformInput.val()
    console.log(btnName.toUpperCase())
    if(gifStorage.indexOf(btnName)==-1){
        createButtons(btnName);
        gifStorage.push(btnName);
        docformInput.val('')
    }
    
}


gifStorage.forEach((ele)=>{
    createButtons(ele);
})

docButton.on("click",(event)=>{
    event.preventDefault();
    AddToBtns();
})








