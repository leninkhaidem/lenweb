var fs = require("fs");
var out = {
    length: 12,
    url: {
        id1: "sdf",
        id2: "sdfsadfsadf"
    }
}
var temp = "name";
out.url[temp]="james"
for(var attributename in out){
    console.log(attributename+": "+out[attributename]);
}
console.log(out.url.name);