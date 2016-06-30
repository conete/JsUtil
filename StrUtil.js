/**
 * String Processing library 
 *
 * @author Conete Cristian, 2005
 * @license MIT License <http://opensource.org/licenses/MIT>
 * @use Usage and Redistributions of source code must retain the above information
 * @source https://github.com/conete/JsUtil
 */

function AfterFirstToken(sir, c) {
	if (sir === "" || sir.indexOf(c) < 0)
		return sir;
	else
		return sir.substring(sir.indexOf(c) + c.length, sir.length);// -sir.indexOf(c)-c.length);
}

function GetFirstToken(sir, c) {
	if (sir === "" || sir.indexOf(c) < 0)
		return sir;
	else
		return sir.substring(0, sir.indexOf(c));
}

function AfterLastToken(sir, c) {
	if (sir === "" || sir.indexOf(c) < 0)
		return sir;
	var i = 0;
	var lc = c.length;
	var ls = sir.length;
	for (i = ls - lc - 1; i > 0; i--)
		if (sir.substring(i, i + lc) === c)
			break;
	if (i == 0)
		return "";
	return sir.substring(i + lc, ls);
}

function BeforeLastToken(sir, c) {
	if (sir === "" || sir.indexOf(c) < 0)
		return sir;
	var i = 0;
	var lc = c.length;
	var ls = sir.length;
	for (i = ls - lc; i > 0; i--)
		if (sir.substring(i, i + lc) === c)
			break;
	if (i == 0)
		return "";
	return sir.substring(0, i);// var.valueOf(i)+sir.substring(0,i);
}

function BeforeAnyOfTokens(line, setvar) {
	var minPos = 1000, curIdx, curId = 0;
	for (var i = 0; i<setvar.length;i++){
		curIdx = line.indexOf(setvar[i]);
		if (curIdx > 0 && minPos > curIdx){
			minPos = curIdx;
			curId = i;
		}
	}
	if (minPos == 1000)
		return "";
	
	return GetFirstToken(line, setvar[curId]);
}

function startsWith(line, setvar) {		
	for (var i=0;i<setvar.length;i++)
		if (line.indexOf(setvar[i]) == 0)
			return true;
	return false;
}

function ifStartsWithGetAfter(line, setStart,  setAfter) {		
	for (var i=0;i<setStart.length;i++)
		if (line.indexOf(setStart[i]) == 0)
			return AfterFirstToken(line, setAfter[i]);				
	return line;
}

function isOrdered(arrayInt){
	if (arrayInt.length < 2)
		return true;
	for (i = 1; i < arrayInt.length; i++) 
		if (arrayInt[i]<arrayInt[i-1])
			return false;
	return true;
}
function isStrictOrdered(arrayInt){
	if (arrayInt.length < 2)
		return true;
	for (i = 1; i < arrayInt.length; i++) 
		if (arrayInt[i]<=arrayInt[i-1])
			return false;
	return true;
}

function GetBetweenChars( sir,  fch,  lch) {
	if( isStrictOrdered([-1,sir.indexOf(fch),sir.indexOf(lch)]))
		return GetFirstToken(AfterFirstToken(sir, fch), lch);
	else
		return "";
}
function GetOutsideChars( sir,  fch,  lch) {		
	if( isStrictOrdered([-1,sir.indexOf(fch),sir.indexOf(lch)])	)
		return GetFirstToken(sir, fch)+AfterFirstToken(sir, lch);
	else
		return "";
}	
function GetBetweenAndChars( sir,  fch,  lch) {
	//if( isStrictOrdered([-1,sir.indexOf(fch),sir.indexOf(lch)])	//condition will fail if fch = lch, isOrdered will fail for indexOf(fch) = -1
		return fch+GetFirstToken(AfterFirstToken(sir, fch), lch)+lch;
	//else
	//	return "";
}
function GetOutsideAndChars( sir,  fch,  lch) {		
	return GetFirstToken(sir, fch)+fch+lch+AfterFirstToken(sir, lch);
}

function GetBeforeNoTokens( sir,  c,  no) {
	var a="" ;
	
	for (var i=0; i<no;i++){
		a += GetFirstToken(sir, c)+c;
		sir = AfterFirstToken(sir, c);
	}		
	return BeforeLastToken(a, c);
	
}

function AfterFirstNoTokens( sir,  c,  no) {
	for (var i=0; i<no;i++)
		sir = AfterFirstToken(sir, c);
	return sir.trim();
}

function  countTokens( sir,  c) {
	var count = 0;
	var temp = sir;
	while (temp.indexOf(c) != -1) {
		count++;
		temp = AfterFirstToken(temp, c);
	}
	return count;
}

// function ReplaceTokenChar(var sir, var t, var c) {
// //return sir.replaceFirst(t,c);
// return "";
// }

//not usefull anymore, same as replace all with ""
function RemoveTokenChars( sir,  tk) {

	// return sir.replaceAll(tk,""); // jdk 1.4 or later
	// return sir.ReplaceAll(tk," ", "");
	/*
	 * java.util.varTokenizer st = new java.util.varTokenizer(sir,
	 * tk); varBuffer buf = new varBuffer(); while
	 * (st.hasMoreTokens()) { buf.append(st.nextToken()); } return
	 * buf.tovar();
	 */// too slow

	while (sir.indexOf(tk) != -1) {
		sir = sir.substring(0, sir.indexOf(tk))
				+ sir.substring(sir.indexOf(tk) + 1, sir.length);
	}
	return sir;
}

function RemoveBetweenTokens( line,  tkStart,  tkEnd) {
	var temp;
	if (line.indexOf(tkStart)!= -1 && line.indexOf(tkEnd)!= -1 && line.indexOf(tkStart)<line.indexOf(tkEnd)){
		temp = GetFirstToken(line, tkStart) ;
		line = AfterFirstToken(line, tkStart);
		line = AfterFirstToken(line, tkEnd);
		line = temp + " "+ line;
	}
	return line;
}

function RemoveAllBetweenTokens( line,  tkStart,  tkEnd) {
	while (line.indexOf(tkStart) > -1 && line.indexOf(tkEnd) > -1)
		line = RemoveBetweenTokens(line, tkStart, tkEnd);
	return line;
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function ReplaceAll(str, find, replaceStr) { //might malfunction for ReplaceAll(str, " ", "")
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replaceStr);
}

function RemoveAllSet( line,  setvar) {
	for (var i = 0; i<setvar.length;i++){
		line = ReplaceAll(line, setvar[i], "");			
	}
	return line;
}

function RemoveEnding( temp1,  end) {
	if(temp1 == null || temp1.length < end.length)
		return "";
	if (temp1.substring(temp1.length-end.length, temp1.length) === end)
		temp1 = temp1.substring(0,temp1.length-end.length);
	return temp1;
}


function RemoveBegining( temp1,  begStr) {
	if(temp1 == null )
		return "";
	if (temp1.length < begStr.length)
		return temp1;
	if (temp1.substring(0,begStr.length) === begStr)
		temp1 = temp1.substring(begStr.length,temp1.length);
	return temp1;fs
}

function ReplaceAllSet( line,  setvar,  repl) {
	for (var i = 0; i<setvar.length;i++){
		line = ReplaceAll(line, setvar[i], repl);			
	}
	return line;
}

// same as countTokens
function  countMatches( str,  sub) {
    if (str == null || sub == null || str.trim() === "" || sub.trim() === "") {
        return 0;
    }
    var count = 0;
    var idx = 0;
    while ((idx = str.indexOf(sub, idx)) != -1) {
        count++;
        idx += sub.length;
    }
    return count;
}

function toProperCase( s) {
	    return s.substring(0, 1).toUpperCase() +
	               s.substring(1).toLowerCase();
}


function toCamelCase( s, sep){
	   var parts = s.split(sep);
	   var camelCasevar = "";
	   for (var i in parts){
	      camelCasevar += toProperCase(parts[i]);
	   }
	   return camelCasevar;
	}
	
function toCamelCase( s, sep){
	   var parts = s.split(sep);
	   var camelCasevar = "";
	   for (var i in parts){
	      camelCasevar += toProperCase(parts[i]);
	   }
	   return camelCasevar;
	}

function toUCamelCase( s, sep){
	   var parts = s.split(sep);
	   var camelCasevar = "";
	   for (var i in parts){
	      camelCasevar +=  toProperCase(parts[i])+sep;
	   }
	   camelCasevar = RemoveEnding(camelCasevar, sep);
	   return camelCasevar;
}

function toNameCase(s, sep){
	   var parts = s.split(sep);
	   var camelCasevar = "";
	   for (var i in parts){
		  if (parts[i].trim() === "")
			  continue;
	      camelCasevar += toProperCase(parts[i])+sep;
	   }
	   return camelCasevar;
	}

function genSpacedStr( s,  len) {
	var retStr = s;
	if (s.length >= len)
		return retStr;
	for(var i=s.length;i<len;i++)
		retStr += " ";		
    return retStr;
}


function testFct(){
	testStr = "hello how are you, my name is cristian";
	alert("ReplaceAll \n hello how re you, my nme is cristin:\n " + ReplaceAll(testStr, "a", ""));
	alert("ReplaceAll \n hello how are you, my name is john:\n " + ReplaceAll(testStr, "cristian", "john"));
	alert("AfterFirstToken \n my name is cristian:\n " + AfterFirstToken(testStr, "you,"));
	alert("GetFirstToken \n hello how are :\n " + GetFirstToken(testStr, "you,"));
	alert("AfterLastToken \n an :\n " + AfterLastToken(testStr, "i"));
	alert("BeforeLastToken \n hello how are you, my name is crist :\n " + BeforeLastToken(testStr, "i"));
	alert("BeforeAnyOfTokens \n hell :\n " + BeforeAnyOfTokens(testStr, ["o","a","c"]));
	alert("startsWith \n true :\n " + startsWith(testStr, ["hello","how","my"]));
	alert("startsWith \n false :\n " + startsWith(testStr, ["how","my"]));
	alert("ifStartsWithGetAfter \n name is cristian :\n " + ifStartsWithGetAfter(testStr, ["hello how"],["my"]));
	alert("GetBetweenChars \n are you, :\n " + GetBetweenChars(testStr, "how","my"));
	alert("GetOutsideChars \n hello  name is cristian :\n " + GetOutsideChars(testStr, "how","my"));
	alert("GetBetweenAndChars \n how are you, my:\n " + GetBetweenAndChars(testStr, "how","my"));
	alert("GetOutsideAndChars \n hello howmy name is cristian :\n " + GetOutsideAndChars(testStr, "how","my"));
	alert("GetBeforeNoTokens \n hello how are y :\n " + GetBeforeNoTokens(testStr, "o",3));
	alert("AfterFirstNoTokens \n u, my name is cristian :\n " + AfterFirstNoTokens(testStr, "o",3));
	alert("countTokens \n 3 :\n " + countTokens(testStr, "o"));
	alert("RemoveTokenChars \n hell hw are yu, my name is cristian :\n " + RemoveTokenChars(testStr, "o"));
	alert("RemoveBetweenTokens \n hello  name is cristian :\n " + RemoveBetweenTokens(testStr, "how","my"));
	alert("RemoveAllBetweenTokens \n hello how :\n " + RemoveAllBetweenTokens(testStr, "a","n"));
	alert("RemoveAllSet \n hell hw are yu, my name s crstan :\n " + RemoveAllSet(testStr, ["o","i"]));
	alert("RemoveEnding \n hello how are you, my name is cris :\n " + RemoveEnding(testStr, "tian"));
	alert("RemoveBegining \n  how are you, my name is cristian :\n " + RemoveBegining(testStr, "hello"));
	alert("ReplaceAllSet \n  hellY hYw are yYu, my name Ys crYstYan :\n " + ReplaceAllSet(testStr, ["o","i"], "Y"));
	alert("countMatches \n  3 :\n " + countMatches(testStr, "o"));
	alert("toProperCase \n Hello how are you :\n " + toProperCase("hello how are you"));
	alert("toCamelCase \n HelloHowAreYou_ :\n " + toCamelCase("hello how are you", " "));
	alert("toUCamelCase \n Hello How Are You :\n " + toUCamelCase("hello how are you", " "));
	alert("toNameCase \n Hello How Are You :\n " + toNameCase("hello how are you", " "));
	alert("genSpacedStr \n hello how      :\n " + genSpacedStr("hello how", 15) + "]");	
	alert(GetAllBetweenChars("outPorts>g:nth-child(1)>.port-body", "(",")"));
}


function urlEscapedStr(str) {
	// space %20 replaced with +
	var askSet = [["%", "%25"], ["\\|", "%7C"], ["\\^", "%5E"], [" ", "%20"], ["#", "%23"], 
			["\\$", "%24"],	["`", "%60"], [":", "%3A"], ["<", "%3C"], [">", "%3E"], ["\\[", "%5B"], 
			["\\]", "%5D"], ["\\[", "%7B"], ["\\]", "%7D"], ["“", "%22"], ["\\+", "%2B"], 
			["&", "%26"], ["@", "%40"], ["/", "%2F"], [";", "%3B"], ["=", "%3D"], ["\\?", "%3F"],
			["~", "%7E"], ["‘", "%27"], [",", "%2C"], ["\\\\", "%5C"]];			
	for (var i=0;i<askSet.length;i++)
		str = ReplaceAll(str, askSet[i][0], askSet[i][1]);
	return str;
}


function toHeadlessCC( s, sep){
	   var parts = s.split(sep);
	   var camelCasevar = "";
	   for (var i = 0; i<parts.length;i++)
		if (i == 0)
			camelCasevar += parts[i].toLowerCase();
		else
			camelCasevar += toProperCase(parts[i]);	   
	   return camelCasevar;
}
	
function toSnakeCase( s){
   //alert(s.replace(/\.?([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, ""));   
   return s.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
   
}

function inArray(haystack, needle) {  //indexOf() for IE<9
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle)
            return true;
    }
    return false;
}

function GetAllBetweenChars( sir,  fch,  lch) {
	var retVals = [];
	while (sir.indexOf(fch) >- 1){
		retVals.push(GetBetweenChars( sir,  fch,  lch));
		sir = AfterFirstToken(sir, lch);
	}
	return retVals;
}


function GetAllBetweenAndChars( sir,  fch,  lch) {
	var retVals = [];
	var temp;
	while(isStrictOrdered([-1,sir.indexOf(fch),sir.indexOf(lch)])){
		temp = GetBetweenAndChars( sir,  fch,  lch)
		retVals.push(temp);		
		sir = sir.replace(temp, "");
	}
	return retVals;
}

function ReplaceAllBetweenChars( sir,  fch,  lch, lookFor, replaceWith) {
	var retVals = GetAllBetweenAndChars( sir,  fch,  lch);
	for (i = 0; i < retVals.length; i++)
		sir = sir.replace(retVals[i], retVals[i].replace(lookFor, replaceWith));
	return sir;
}

function ReplaceBetweenTokens( line,  tkStart,  tkEnd, lookFor, replaceWith) {
	var temp;
	if (line.indexOf(tkStart)!= -1 && line.indexOf(tkEnd)!= -1 && line.indexOf(tkStart)<line.indexOf(tkEnd)){
		temp = GetFirstToken(line, tkStart) ;
		line = AfterFirstToken(line, tkStart);
		line = AfterFirstToken(line, tkEnd);
		line = temp + " "+ line;
	}
	return line;
}

function stringToNumArray(str){
  num = 0;
  for (i = 0; i < str.length; i++) 
    if (str[i] >= '0' && str[i] <= '9') 
      num = num * 10 + parseInt(str[i]);
  return num;
}


function toFirstUp(s) {
	return s.substring(0, 1).toUpperCase()+s.substring(1);
}
