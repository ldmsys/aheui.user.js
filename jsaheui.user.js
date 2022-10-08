// ==UserScript==
// @name         아희 for UserScript
// @namespace    https://github.com/ldmsys/aheui.user.js
// @version      0.1
// @description  아희("밯망희")
// @author       Original jsaheui: Puzzlet Chung, Did nothing by ldmsys
// @match        *://*/*
// @icon         https://avatars.githubusercontent.com/u/1641215?s=200&v=4
// @grant        none
// ==/UserScript==

(function() {
    window.아희 = (code, inbuf, useoutbuf, numbuf) => {
//상수, constants
var cheossori = new Array("ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ");
var holsori = new Array("ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ");
var batchim = new Array(" ", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ");
var batchim_hoek = new Array(0, 2, 4, 4, 2, 5, 5, 3, 5, 7, 9, 9, 7, 9, 9, 8, 4, 4, 6, 2, 4, 1, 3, 4, 3, 4, 4, 3);
var required_elem = new Array(0, 0, 2, 2, 2, 2, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 2, 2, 0);

//변수, variables
var code_gonggan = new Array; //codespace
var stack = new Array(28);
var stack_index = new Number;

var x = new Number;
var y = new Number;
var dx = new Number;
var dy = new Number;
var timer = new Number;
var meomchum = new Boolean(true); //is_stopped
var input_buffer = new String;
var output_buffer = new String;
var number_buffer = new Array;

var msg_input_number = "숫자를 입력하세요. 실행을 멈추려면 !!!를 입력하세요.";
var msg_input_character = "글자를 입력하세요. 실행을 멈추려면 !!!를 입력하세요.";

//함수, functions

function haechae(c){ //disassembles a Hangul character into parts
	if(c < 0xAC00 || c > 0xD7A3) return "";
	c -= 0xAC00;
	return new Array(Math.floor(c/28/21), Math.floor(c/28) % 21, c % 28);
}

function push(i, n){
	switch(i){
		case 27: break; //ㅎ
		default: stack[i].push(parseInt(n));
	}
}

function pop(i){
	switch(i){
		case 21: return parseInt(stack[i].shift()); //ㅇ
		case 27: break;                             //ㅎ
		default: return parseInt(stack[i].pop());
	}
}

function output(obj){
	useoutbuf ? (obj == "\n" ? console.log(output_buffer) || (output_buffer = ""): output_buffer += obj): console.log(obj);
}


function chogi(){ //initialize
	meomchum = true;
	clearTimeout(timer);

	input_buffer = inbuf || "";

	x = 0; dx = 0;
	y = 0; dx = 0;
	code_gonggan = code.split('\n');

	stack_index = 0;
	for(let i=0; i<28; i++) stack[i] = new Array;

	/*document.forms[0].output.value = "";
	document.forms[0].dumps.value = "";*/
}

function cursor_omgyeo(){ //move cursor
	x+=dx; y+=dy;

	if(y<0) y = code_gonggan.length-1;
	if(y>=code_gonggan.length) y = 0;

	if(x<0) x = code_gonggan[y].length-1;
	if(x>=code_gonggan[y].length && dx!=0) x = 0;
}

function dan_gye(han_beon){ //step; han_beon means whether it executes a single step
	if(!han_beon){
		if(meomchum){ clearTimeout(timer); return; }
		if(timer) clearTimeout(timer);
	}

	code_gonggan = code.split('\n');

	let k = han_beon ? 1 : 100;
	while(k-- > 0){
		if(!han_beon && meomchum) break;

		if(x >= code_gonggan[y].length){
			cursor_omgyeo();
			continue;
		}
		let c = code_gonggan[y].charCodeAt(x);
		if(c < 0xac00 || c > 0xd7a3){
			cursor_omgyeo();
			continue;
		}
		let ch = haechae(c);

		switch(ch[1]){
			case 0:  dx=1;  dy=0;  break; //ㅏ
			case 2:  dx=2;  dy=0;  break; //ㅑ
			case 4:  dx=-1; dy=0;  break; //ㅓ
			case 6:  dx=-2; dy=0;  break; //ㅕ
			case 8:  dx=0;  dy=-1; break; //ㅗ
			case 12: dx=0;  dy=-2; break; //ㅛ
			case 13: dx=0;  dy=1;  break; //ㅜ
			case 17: dx=0;  dy=2;  break; //ㅠ

			case 18: dy=-dy;         break; //ㅡ
			case 19: dx=-dx; dy=-dy; break; //ㅢ
			case 20: dx=-dx;         break; //ㅣ

			case 1:  //ㅐ
			case 3:  //ㅒ
			case 5:  //ㅔ
			case 7:  //ㅖ
			case 9:  //ㅘ
			case 10: //ㅙ
			case 11: //ㅚ
			case 14: //ㅝ
			case 15: //ㅞ
			case 16: //ㅟ
			default:
		}
        let a, b;
		if(stack[stack_index].length < required_elem[ch[0]]){ dx=-dx; dy=-dy; }
		else switch(ch[0]){
			case 2:  a = pop(stack_index); b = pop(stack_index); push(stack_index, b/a);          break; //ㄴ
			case 3:  a = pop(stack_index); b = pop(stack_index); push(stack_index, b+a);          break; //ㄷ
			case 4:  a = pop(stack_index); b = pop(stack_index); push(stack_index, b*a);          break; //ㄸ
			case 5:  a = pop(stack_index); b = pop(stack_index); push(stack_index, b%a);          break; //ㄹ
			case 6:                                                                                      //ㅁ
				switch(ch[2]){
					case 21: output(pop(stack_index));                      break; //ㅇ
					case 27: output(String.fromCharCode(pop(stack_index))); break; //ㅎ
					default: pop(stack_index);
				}
				break;
			case 7:                                                                                      //ㅂ
				switch(ch[2]){
					case 21:
						k = number_buffer.splice(0,1)[0] || prompt(msg_input_number);
						if(k == "!!!"){ meomchum=true; return; }
						push(stack_index, k);                        break; //ㅇ
					case 27:
						while(!input_buffer){
							input_buffer = prompt(msg_input_character);
							if(input_buffer == "!!!"){ meomchum=true; return; }
						}
						push(stack_index, input_buffer.charCodeAt(0));
						input_buffer = input_buffer.substring(1);    break; //ㅎ
					default: push(stack_index, batchim_hoek[ch[2]]); break;
				}
				break;
			case 8:                                                                                      //ㅃ
				switch(stack_index){
					case 21: stack[21].unshift(stack[21][0]); break; //ㅇ
					case 27:                                  break; //ㅎ
					default: stack[stack_index].push(stack[stack_index][stack[stack_index].length-1]);
				}
				break;
			case 9:  stack_index = ch[2];                                                         break; //ㅅ
			case 10: push(ch[2], pop(stack_index));                                               break; //ㅆ
			case 12: a = pop(stack_index); b = pop(stack_index); push(stack_index, (b>=a) ? 1:0); break; //ㅈ
			case 14: if(pop(stack_index) == 0){ dx=-dx; dy=-dy; }                                 break; //ㅊ
			case 16: a = pop(stack_index); b = pop(stack_index); push(stack_index, b-a);          break; //ㅌ
			case 17:                                                                                     //ㅍ
				switch(stack_index){
					case 21: a = stack[21][0]; stack[21][0] = stack[21][1]; stack[21][1] = a; break; //ㅇ
					case 27:                                                                  break; //ㅎ
					default: a = pop(stack_index); b = pop(stack_index); push(stack_index, a); push(stack_index, b);
				}
				break; //ㅍ
			case 18: meomchum = true;                                                             break; //ㅎ

			case 0:  //ㄱ
			case 1:  //ㄲ
			case 11: //ㅇ
			case 13: //ㅉ
			case 15: //ㅋ
			default:
		}

		cursor_omgyeo();
	}

	if(!han_beon && !meomchum) timer = setTimeout(() => {dan_gye(false)}, 0);
}

function silhaeng(){ //execute
    number_buffer = typeof numbuf == "string" ? numbuf.split(' ') : (numbuf || []); // https://github.com/aheui/aheui.github.io/issues/12
	chogi();

	meomchum = false;
	dan_gye(false);
    if(meomchum && useoutbuf && output_buffer) console.log(output_buffer);
}
silhaeng();
};
})();