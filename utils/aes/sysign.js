 function Appsign(param,pkey){
      var data =new Array(); ; 
      var i=1;
      data[0] =pkey; 
            for(var name in param){
                data[i++] =name+ param[name];  
            }  
            data.sort();
            var str=data.join("");
            var sign=hex_sha1(utf16to8(str));
            return sign;
    }
 function utf16to8(str)	{//转utf8
		var out, i, len, c;

		out = "";
		len = str.length;
		for(i = 0; i < len; i++){
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF){
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
			}
		}
		return out;
	}
module.exports = {
  Appsign: Appsign
}