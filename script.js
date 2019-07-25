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
    AlreadyAdded = gifStorage.find((ele)=>{return(btnName===ele)});
    if(!AlreadyAdded){
        gifStorage.push(btnName);
        createButtons(btnName);
    }
}


gifStorage.forEach((ele)=>{
    createButtons(ele);
})

docButton.on("click",(event)=>{
    AddToBtns();
})








