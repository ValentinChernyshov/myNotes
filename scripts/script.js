var board = document.createElement("div");
board.setAttribute("id","board");
board.setAttribute("class","board");
document.body.appendChild(board);

var btn = document.createElement("button");
btn.setAttribute("id","newnote");
btn.setAttribute("class","newnote");
btn.textContent = "+";
document.body.appendChild(btn);

var notesArr = [];

var deltaX, deltaY;

function Notes(){
	this.text = "New Note";
	this.posX = 40;
	this.posY = 40;
}

function addData(){
	var obj = new Notes();
	notesArr.push(obj);
	createView(notesArr);
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

function createNote(text, posX, posY, index, arr) {

	var note = document.createElement("div");
	note.className = "note";
	note.style.left = posX + "px";
	note.style.top = posY + "px";
	note.style.transform = 'rotate('+randomInteger(-10, 10)+'deg)';
	note.style.backgroundImage = 'url(images/'+randomInteger(0, 9)+'.jpg)';

	var innerDiv = document.createElement("div");
	var delBtn = document.createElement("button");
	delBtn.textContent = "x";
	
	var textarea = document.createElement("textarea");
	innerDiv.textContent = text;

	function trackMouse(e){ //// отслеживает движение курсорв
		var posX = e.pageX;
		var posY = e.pageY;
		note.style.left = (posX - deltaX) + "px";
		note.style.top = (posY - deltaY) + "px";
	}

	innerDiv.ondblclick = function(){ ////открывает текстарею при дабблклике
		innerDiv.style.display = "none";
		textarea.style.display = "block";
		textarea.value = innerDiv.textContent;
	}

	note.onmousedown = function(e){ //////перетаскивает стикер при нажатии  
		var posX = e.pageX;
		var posY = e.pageY;
		var dX = note.offsetLeft;
		var dY = note.offsetTop;
		deltaX = posX - dX;
		deltaY = posY - dY;
		window.addEventListener("mousemove", trackMouse);
	}

	note.onmouseup = function(e){ ///// прекращает перетаскивание при отпускании кноппки мыши
		window.removeEventListener("mousemove", trackMouse);
		arr[index].posX = note.offsetLeft;
		arr[index].posY = note.offsetTop;
	}

	textarea.ondblclick = function(){ //// закрывает текстарею и сохраняет текст заметки при дабл клике
		innerDiv.style.display = "block";
		textarea.style.display = "none";
		innerDiv.textContent = textarea.value;
		arr[index].text = textarea.value;
	}

	delBtn.onclick = function(){ //// кнопка удаления стика
		arr.splice(index, 1);
		createView(arr);
	}

	note.onmouseover = function(e){   ///// увеличивает стикер и поднимает его над всеми при наведении
		 note.style.transform = 'scale(1.25)';
		 note.style.zIndex = "4";
	}

	note.onmouseout = function(e){ /////// после того как курсор убирается, стикер принимает прежние размеры и zed индекс 
		 note.style.transform = 'scale(1.0)';
		 note.style.zIndex = "3";
	}


	note.appendChild(delBtn);
	note.appendChild(innerDiv);
	note.appendChild(textarea);
	board.appendChild(note);

}

function createView(arr){
	board.innerHTML = "";
	arr.map(function(item, index, arr){
		createNote(item.text, item.posX, item.posY, index, arr);
	})
}

btn.onclick = addData;