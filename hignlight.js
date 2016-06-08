/**Код честно позаимствован (с кучей доработок) с Codepen. Безымянный автор, спасибо тебе*/
var isIE,isWinPhone;
var highlight, textarea;
function startHighlight(fieldId) {
	textarea = document.getElementById(fieldId);
	highlight = createDiv(fieldId);
	var ua = window.navigator.userAgent.toLowerCase();
	isIE = !!ua.match(/msie|trident\/7|edge/);
	isWinPhone = ua.indexOf('windows phone') !== -1;
	
	textarea.oninput = function(){handleInput();}
	handleInput();
}

	
function applyhighlight(text) {
  text = text
    .replace(/\n$/g, '\n\n')
    .replace(/нач|кон|нц|кц|алг|ввод|вывод|если|то|иначе|при|пока|все|использовать|\:\=/g, '<mark class="keyword">$&</mark>')
	.replace(/\s(и|или|не|да|нет)\s/g, ' <mark class="keyword">$1</mark> ')
	.replace(/цел|вещ|лог|сим|лит/g, '<mark class="variable">$&</mark>')
	.replace(/вправо|влево|вверх|вниз|сверху|снизу|слева|справа|свободно|стена|закрасить|клетка|чистая|закрашена/g,'<mark class="command">$&</mark>');
  
  if (isIE) text = text.replace(/ /g, ' <wbr>');
  return text;
}

function handleInput() {
  var text = textarea.value;
  var highlightedText = applyhighlight(text);
  highlight.innerHTML = highlightedText;
}

function createDiv(fieldId) {
	//Создаётся div, по стилю дублирующий текстовое поле, но расположенный над ним
	//Также у тегов mark убирается фон, а у текстового поля - граница (так надо).
	
	var div = document.createElement('div');
	div.id = fieldId+'HighlightDiv';
	
	var sheet = document.createElement('style');
	sheet.innerHTML += '#'+fieldId+'{border:0}';
	sheet.innerHTML += '#'+ fieldId+'HighlightDiv mark {background-color:transparent}';
	sheet.innerHTML += '#'+ fieldId+'HighlightDiv{position:absolute;top:'+textarea.offsetTop+';left:'+textarea.offsetLeft+';font:'+getStyle(textarea,'font')+';padding:'+getStyle(textarea,'padding')+';white-space:pre-wrap;color:transparent;background-color:transparent;pointer-events:none;z-index:2}'
	
	document.head.appendChild(sheet);
	return textarea.parentNode.appendChild(div);
}

// http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
function getStyle(el, cssprop) {
	if (el.currentStyle) return el.currentStyle[cssprop]; // IE & Opera
	else if (document.defaultView && document.defaultView.getComputedStyle) // Gecko & WebKit
		return document.defaultView.getComputedStyle(el, '')[cssprop];
		else // try and get inline style
			return el.style[cssprop]; // XXX I have no idea who is using that
}