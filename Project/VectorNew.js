
function Vector(x,y){
	var v = Object.create(Methods);
	v.x = x; v.y = y;
	return v;
}
var Methods = {
	dot:function(v1){
		return this.x*v1.x + this.y*v1.y;
	},
	abs:function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	plus:function(v1){
		return Vector(this.x+v1.x, this.y+v1.y);
	},
	minus:function(v1){
		return Vector(this.x-v1.x, this.y-v1.y);
	},
	unit:function(){
		var mag = this.abs(); 
		return Vector(this.x/mag, this.y/mag);
	},
	scale:function(mag){
		return Vector(this.x*mag,this.y*mag);
	},
	distance:function(v1){
		return this.minus(v1).abs();
	}
};


