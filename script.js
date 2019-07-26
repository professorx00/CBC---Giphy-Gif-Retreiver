const docBtnContainer = $("#btnContainer");
const docGifContainer = $("#gifStorage");
const docButton = $("#btnSubmit");
const docformInput = $("#formInput");

let counter = 0;
var gifStorage = ["DUNGEONS AND DRAGONS","MARVEL"];

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));




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
    $(".gifBtns").on("click", (event) => {
        docGifContainer.empty();
        clickValue = $(event.target).attr("data-search");
        queryURL = `HTTPS://api.giphy.com/v1/gifs/search?q=${clickValue}&limit=10&apikey=4DW3rR9uRFn9H7EgmXRQik7An9jg3I2c`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            addImagetoGifStorage(response.data);
        });
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
        newdiv = $("<div>")
        newSpan = $("<span>").text(`Rating: ${ele.rating}`);
        faceDiv = $("<div>").addClass("fb-share-button").attr("data-href", ele.images.fixed_height_still.url ).attr("data-layout","button_count");
        newdiv.append(newSpan,faceDiv);
        newImageContainer.append(newImg,newdiv);
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
docButton.on("click",(event)=>{
    event.preventDefault();
    AddToBtns();
    GifButtonClick();
})

GifButtonClick();

// ImgClick();






