class Snowflake
{
	constructor( i )
	{
		this.x = Math.random( ) * window.innerWidth;
		this.y = ( Math.random( ) * -400 ) - 200;
		this.el = document.createElement("div");
		this.size = Math.floor( (Math.random() * 2) + 2 );
		this.el.setAttribute("style", `width: ${this.size}px; height: ${this.size}px; position: fixed; top:${this.y}px; left:${this.x}px; background-color: white; border-radius: 50%;`);
		document.body.appendChild( this.el );
		this.fallSpeed = Math.random( ) * 3 + 2;
		this.sideSpeed = ( Math.random( ) * 2 ) - 1;
		this.done = false;
		this.i = i;
	}
	move()
	{
		this.y+=this.fallSpeed;
		this.x+=this.sideSpeed;
		if( this.x > window.innerWidth )
		{
			this.x = 0;
			//this.sideSpeed = ( Math.random( ) * 4 ) - 2;
		}
		else if( this.x < 0 )
		{
			this.x = window.innerWidth;
			//this.sideSpeed = ( Math.random( ) * 4 ) - 2;
		}
		if( this.y > window.innerHeight )
		{
			this.y = -10;
		}
	}
	draw()
	{
		this.el.style.top = this.y+"px";
		this.el.style.left = this.x+"px";
	}
}

var snow = [];
var numSnow = 200;
function init()
{
	for ( let i = 0; i < numSnow; i++ )
	{
		snow.push( new Snowflake( i ) );
		snow[i].draw();
	}

	setInterval( move, 10);
}
function move(){
	for ( let i = 0; i < numSnow; i++ )
	{
		snow[i].move();
		snow[i].draw();
	}
}
init();