(function(a,b){if(typeof module==="object"&&typeof module.exports==="object"){module.exports=b}else{if(typeof define==="function"&&(define.amd||window.seajs)){define("urlParamParser",[],function(){return b})}else{a.urlParamParser=b;return b}}}(typeof window!=="undefined"?window:this,function(){function a(b,h){if(!b){throw"Need URL Params."}var c;var i=b.indexOf("#");var g=b.substr(0,i===-1?b.length:i);var e;function d(o){if(!o){return null}var q=o.split("&");var k={};while(q.length){var n=q.shift();var m=n.indexOf("=");if(m===0&&n.lastIndexOf("=")===n.indexOf("=")){continue}var l;var p;if(m!==-1){l=n.substr(0,m);p=n.substr(m+1)}else{if(!n){continue}l=n;p=undefined}if(k.hasOwnProperty(l)){if({}.toString.call(k[l])!=="[object Array]"){k[l]=[k[l]]}k[l].push(p)}else{k[l]=p}}return k}if(!h){if(i!==-1&&b.lastIndexOf("#")===b.indexOf("#")){e=b.substr(i+1);c={hash:d(e)}}else{c={}}}var f=g.lastIndexOf("?");if(f===-1){return c}var j=g.substr(f+1);if(j===-1){return c}c.search=d(j);return c}return a(arguments[0],arguments[1])}));