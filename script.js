const docBtnContainer = $("#btnContainer");
const docGifContainer = $("#gifStorage");
const docButton = $("#btnSubmit");
const docformInput = $("#formInput");


var gifStorage = ["DUNGEONS AND DRAGONS","MARVEL"];

function createButtons(value){
    newBTN = $("<a>").addClass("btn waves-effect waves-light gifBtns").text(value).attr("data-search",value);
    docBtnContainer.append(newBTN);
}

function AddToBtns(){
    btnName = docformInput.val().toUpperCase();

    if(gifStorage.indexOf(btnName)==-1){
        createButtons(btnName);
        gifStorage.push(btnName);
        docformInput.val('')
    }
    else{
        docformInput.val('')
    }
    
}

function addImagetoGifStorage(object){
    object.forEach((ele)=>{
        stillUrl = ele.images.fixed_height_still.url;
        newImageContainer = $("<div>").addClass("activeImgsContainer").attr("data-rating",ele.rating)
        newImg = $("<img>").attr("src",stillUrl).attr("data-moving",ele.images.fixed_width.url).addClass("activeImgs").attr("data-active", 0)
        newSpan = $("<span>").text(`Rating: ${ele.rating}`);
        newImageContainer.append(newImg,newSpan);
        docGifContainer.append(newImageContainer);
        
    })
    ImgClick();
}
// docformInput.bind('keyup', function(event){ 
//     if(event.keyCode == 13){ 
//       event.preventDefault();
//       return false;
//     }
//   });

//intial setting of buttons
gifStorage.forEach((ele)=>{
    createButtons(ele);
})
// ON click Event lister to add to the div
docButton.on("click",(event)=>{
    event.preventDefault();
    AddToBtns();
    GifButtonClick();
})

GifButtonClick();

ImgClick();




function ImgClick() {
    $(".activeImgs").on("click", (event) => {
        img = $(event.target);
        
        if(img.attr("data-active")==0){
            stillUrl = img.attr("src");
            movingUrl = img.attr("data-moving")
            img.attr("src",movingUrl);
            img.attr("data-moving",stillUrl)
        }
        else{
            stillUrl = img.attr("data-moving");
            movingUrl = img.attr("src")
            img.attr("src",movingUrl);
            img.attr("data-moving",stillUrl)
        }
        
    });
}

function GifButtonClick() {
    $(".gifBtns").on("click", (event) => {
        docGifContainer.empty();
        clickValue = $(event.target).attr("data-search");
        queryURL = `HTTPS://api.giphy.com/v1/gifs/search?q=${clickValue}&limit=10&apikey=4DW3rR9uRFn9H7EgmXRQik7An9jg3I2c`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            addImagetoGifStorage(response.data);
        });
    });
}

