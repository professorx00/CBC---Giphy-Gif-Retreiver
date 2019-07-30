const docBtnContainer = $("#btnContainer");
const docGifContainer = $("#gifStorage");
const docButton = $("#btnSubmit");
const docformInput = $("#formInput");

let counter = 0;
var gifStorage = ["DUNGEONS AND DRAGONS","MARVEL","OFFICE","RICK AND MORTY","INVADER ZIM","CATS","DOGS","VIDEO GAMES","ASSASSIN'S CREED","PROGRAMMING","GLITCHES","GHOSTBUSTER","ZOMBIELAND","MEL BROOKS"];



function createButtons(value){
    newBTN = $("<button>").addClass("btn waves-effect waves-light gifBtns").text(value).attr("data-search",value);
    docBtnContainer.append(newBTN);
}

function AddToBtns(target){

    let btnName = target || docformInput.val().toUpperCase();
    if(gifStorage.indexOf(btnName)==-1){
        createButtons(btnName);
        gifStorage.push(btnName);
        docformInput.val('')
    }
    else{
        docformInput.val('')
    }
    
}
function ImgClick() {
    $(".activeImgs").on("click", (event) => {
        img = $(event.target);
        
        if(img.attr("data-active")==0){
            stillUrl = img.attr("src");
            movingUrl = img.attr("data-moving")
            img.attr("src",movingUrl);
            img.attr("data-moving",stillUrl)
            img.attr("data-active")==1 
        }
        else{
            stillUrl = img.attr("data-moving");
            movingUrl = img.attr("src")
            img.attr("src",movingUrl);
            img.attr("data-moving",stillUrl)
            img.attr("data-active")==0
        }
        
    });
}

function GifButtonClick() {
        docGifContainer.empty();
        let randomOffset = Math.floor(Math.random()*200)+25
        clickValue = $(event.target).attr("data-search");
        queryURL = `HTTPS://api.giphy.com/v1/gifs/search?q=${clickValue}&limit=10&offset=${randomOffset}&apikey=4DW3rR9uRFn9H7EgmXRQik7An9jg3I2c`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            addImagetoGifStorage(response.data);
    });
}

function addImagetoGifStorage(object){
        docGifContainer.empty();
        counter++
        console.log("Start Add Images")
    object.forEach((ele)=>{
        console.log(counter)
        stillUrl = ele.images.fixed_height_still.url;
        newImageContainer = $("<div>").addClass("activeImgsContainer").attr("data-rating",ele.rating)
        newImg = $("<img>").attr("src",stillUrl).attr("data-moving",ele.images.fixed_width.url).addClass("activeImgs").attr("data-active", 0)
        newSpan = $("<span>").text(`Rating: ${ele.rating}`);
        newImageContainer.append(newImg,newSpan);
        docGifContainer.append(newImageContainer);
    })
    console.log("end")
    ImgClick();
    response={}
    console.log("ran ImgClick")
}

//intial setting of buttons
gifStorage.forEach((ele)=>{
    createButtons(ele);
})
// ON click Event lister to add to the div
docformInput.on("keyup",(event)=>{ 
    
    if(event.keyCode === 13){
        AddToBtns(event.currentTarget.value)
        console.log(event);
    }
})

docButton.on("click",(event)=>{
    event.preventDefault();
    AddToBtns(event.currentTarget.value);
})
$("#form").submit(()=> false);

$(document).on("click", "button.gifBtns", GifButtonClick);

console.log(docformInput)

// ImgClick();






