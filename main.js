
var dark = false;

document.cookie = "theme=light";

var thanks = false;

function typingOnLoad(){
    onLoad();
    if( window.innerWidth < 700 )
    {
        typingObjects[0].fontSize = 35;
        typingObjects[2].fontSize = 38;
    }
    
    for(var i = 0; i < typingObjects.length; i++ )
    {
        try{    
            typing( typingObjects[i]); 
        }       
        catch( error )
        {
                
        }
    }
}

var menuOpen = false;
function openMenu(){
    var menu = document.getElementById("menuwrapper");
    menu.style.right = menuOpen ? "-90px" : "0px";
    document.getElementsByClassName("topnav")[0].style.right = menuOpen ? "-5px" : "85px";
    document.getElementById("menubutton").innerHTML = "•••"
    menuOpen = !menuOpen;
}
function loadFiles(){
    onLoad();
    var toLoad = document.getElementsByClassName( "toload" );
    for ( var i = 0; i < toLoad.length; i++)
    {
        toLoad[i].setAttribute("src", toLoad[i].id);
    }
}

function loadCad()
{
    document.getElementById( "cad" ).style.display = "initial";
    document.getElementById( "cad" ).style.height = "90vh";
    document.getElementById( "loadcad" ).style.display = "none";
    document.getElementById( "cad" ).setAttribute("src", "https://a360.co/3iG7QLU");
}

var typingObjects = [
        {
            "message": "Sooraj Gupta's;Blog",
            "array" : [],
            "stage" : 0,
            "id": "title",
            "containerId": "titlecontainer",
            "titleDuration": 2.5,
            "separator": ";",
            "fontSize": 60
        },
        {
            "message": "Website Created By:;Sooraj Gupta",
            "array" : [],
            "stage" : 0,
            "id": "credit",
            "containerId": "creditcontainer",
            "titleDuration": 3,
            "separator": ";",
            "fontSize": 20 
        },
        {
            "message": "About;Me",
            "array" : [],
            "stage" : 0,
            "id": "about",
            "containerId": "aboutcontainer",
            "titleDuration": 2.5,
            "separator": ";",
            "fontSize": 60
        },
]

function onLoad()
{
    thanks = false;
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const theme = urlParams.get('theme');
    const thankyou = urlParams.get('thanks');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    if( theme == "dark")
        dark = true;
    if( theme == "light")
        dark = false;
    if( thankyou == 'true')
    {
        thanks = true;
        thankYouPage(name, email);
    }
    
    setTheme();
    console.log(thankyou);
    //console.log("titleStage: "+ titleStage);
    
}


function typing( obj )
{
    document.getElementById( obj.id ).style.transitionDuration = "1s";
    document.getElementById( obj.containerId ).style.transitionDuration = "1s";
    arrayize( obj );
    
    document.getElementById(obj.id).innerHTML = obj.array[0];
    
    setTitleAnimation( obj );
    setInterval( function() { return titleChange( obj ) }, obj.titleDuration*1000 );
}

function arrayize( obj )
{
    var word = "";
    for( var i = 0; i <= obj.message.length; i++ )
    {
        if( obj.message.charAt( i ) == obj.separator || i == obj.message.length )
        {
            obj.array.push( word )    
            word = "";
        }
        else{
            word += obj.message.charAt(i);
        }
    }
}

function setTitleAnimation( obj ){
    document.getElementById( obj.id ).style.fontSize = `${obj.fontSize}px`
    var titleText = document.getElementById( obj.id ).innerHTML;
    document.getElementById( obj.containerId ).style.transitionDuration = "0s";
    document.getElementById( obj.id ).style.transitionDuration = "0s";
    document.getElementById( obj.containerId ).style.width = `${titleText.length * ( ( obj.fontSize * 0.6 )+ 1 ) }px`;
    document.getElementById( obj.id ).style.height = `${1.375 * obj.fontSize - 2.5}px`;
    document.getElementById( obj.id ).style.animation = `typing ${obj.titleDuration}s infinite steps(${titleText.length},end), blink-cursor infinite step-end 1s`;
    document.getElementById( obj.id ).style.animationDelay= `${obj.titleDuration*(4.2/5)}s`;
    
}  



function titleChange( obj )
{
    obj.stage++;
    if( obj.stage >= obj.array.length )
        obj.stage = 0;
    
    document.getElementById( obj.id ).innerHTML = obj.array[obj.stage]
    setTitleAnimation( obj );
}



function getTheme(){
    var x = document.cookie;
    var themeIdx = x.indexOf("theme=");
    var theme = x.substr(themeIdx+6,x.length);
    if( theme == "light"){
        dark = false;
    }
    if( theme == "dark" ){
        dark = true;
    }
    //console.log(theme);
    return theme;
}
function adjustTheme(){
    dark = !dark;
    document.getElementById( "titlecontainer" ).style.transitionDuration = "1s";
    setTheme();
}
function setTheme() {
    if( dark ){
        document.getElementById("theme").setAttribute("href", "dark.css");
        document.cookie = "theme=dark";
        document.getElementById("themebutton").setAttribute("src", "assets/lightmode.png");
        console.log(getTheme());
        if( !thanks )
        {
            window.history.replaceState(null, null, "?theme=dark");
        }
    }
    else if ( !dark ){
        document.getElementById("theme").setAttribute("href", "light.css");
        document.cookie = "theme=light";
        document.getElementById("themebutton").setAttribute("src", "assets/darkmode.png");
        console.log(getTheme());
        if( !thanks )
        {
            window.history.replaceState(null, null, "?theme=light");
        }
    }
    //console.log(x);
}
function goTo( target )
{
    if( dark )
    {
        window.location = target + "?theme=dark"
    }
    else{
        window.location = target + "?theme=light"
    }
}
function $(id) {
    return document.getElementById(id);
}

function getInput()
{
    thanks = true;
    var email = $("email").value;
    var name = $("name").value;
    var darkString = ( dark ) ? "dark" : "light";
    window.location = "thanks.html?theme=" + darkString + "&name="+name + "&email=" + email+"&thanks=true";
}
function thankYouPage( name, email ){
    $("first").innerHTML = "Thank you for your submission "+ name + ".";
    if( email != "" )
    {
        $("second").innerHTML = "An email will be sent to " + email + " within 24 hours!";
    }
    else
        $("second").style.padding = "0px";
}
