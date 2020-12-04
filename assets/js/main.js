var menuOpen = false;
document.getElementById( "mobilemenubutton" ).onclick = function()
{
	if( !menuOpen )
	{
		document.getElementById("mobilemenu").style.display = "flex";
		setTimeout( function() {
			document.getElementById("mobilemenu").style.opacity = "1";
		}, 10);
		document.getElementById( "mobilemenubutton" ).style.transform = "rotate(-90deg)";
	}
	else
	{
		document.getElementById("mobilemenu").style.opacity = "0";
		setTimeout( function() {
			document.getElementById("mobilemenu").style.display = "none";
		}, 100);
		document.getElementById( "mobilemenubutton" ).style.transform = "rotate(0deg)";
	}
	menuOpen = !menuOpen;
}