//The URIs of the REST endpoint
IUPS = "https://prod-56.northeurope.logic.azure.com:443/workflows/bb2fd34bae014bbaa23a61d9a2163c88/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=X6HeupOOYnhpPdU8dN07rRcW6udUSW5dgVeFlufkLE0";
RAI = "https://prod-54.northeurope.logic.azure.com:443/workflows/ef1a624db43d46919066bb1c58d1450f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eAhNL0_Bdkdvl_STWiCWKRGH_F8hkAl9boZyz9tZHLE";

BLOB_ACCOUNT = "https://videoshareb00776763.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#getVideo").click(function(){

      //Run the get asset list function
      getVideo();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

 //Create a form data object
 submitData = new FormData();
 //Get form variables and append them to the form data object
 submitData.append('title', $('#title').val());
 submitData.append('publisher', $('#publisher').val());
 submitData.append('producer', $('#producer').val());
 submitData.append('genre', $('#genre').val());
 submitData.append('ageRating', $('#ageRating').val());
 submitData.append('movieDescription', $('#movieDescription').val());
 submitData.append('userName', $('#userNamego').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  type: 'POST',
  success: function(data){

 }
 });
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideo(){

  //Replace the current HTML in that div with a loading message
 $('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
 
 $.getJSON(RAI, function( data ) {
 
  //Create an array to hold all the retrieved assets
  var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {
    items.push( "<hr />");
    items.push("<video controls src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/></video><br />")
    items.push( "Title : " + val["title"] + "<br />");
    items.push( "Publisher : " + val["publisher"] + "<br />");
    items.push( "Producer : " + val["producer"] + "<br />");
    items.push( "Genre : " + val["genre"] + "<br />");
    items.push( "Age Rating : " + val["ageRating"] + "<br />");
    items.push( "Movie Description : " + val["movieDescription"] + "<br />");
    items.push( "Uploaded by: " + val["userName"] + "<br />");
    items.push( "<hr />");
  });

  //Clear the assetlist div
  $('#VideoList').empty();
 
  //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
  "class": "my-new-list",
  html: items.join( "" )
 }).appendTo( "#VideoList" );
});
 
}

