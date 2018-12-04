function studentrecord_tests(){
	displayMessage('--Student Records Test', 'header');
	if(typeof StudentRecord === 'undefined' ){
		displayMessage('StudentRecord object does not exist.  Check components/studentrecord.js and make sure the object is defined still and there are no syntax errors in the console');
		return false;
	}
	var testVal = false;
	function testCallback(input){
		if(input === undefined){
			throw 'click callback for delete button did not provide an argument of the StudentRecord that was clicked.  returned undefined'
		}
		if(input.constructor !== StudentRecord){
			throw 'click callback for delete button did not provide an argument of the StudentRecord that was clicked.  returned ' + JSON.stringify( input );
		}
		testVal = true;
	}
	var student = new StudentRecord(1,'name','course',100,testCallback);
	var student2 = new StudentRecord(1,'name','course',100,testCallback);
	if(testMethod( student, 'render')) return
	try{
		var dom = student.render();
		var dom2 = student2.render();
		if(dom.prop('tagName')!=='TR'){
			throw 'render() did not return a table row (TR)'
		}
		var children = dom.find('td');
		if( children.length !== 4){
			throw 'render() should return a TR with 4 TDs, found ' + children.length;
		}
		if( children[0].innerHTML !== 'name'){
			throw `constructor was given name of "name", first TD should have had "name".  It had ${children[0].innerHTML}`
		}
		if( children[1].innerHTML !== 'course'){
			throw `constructor was given name of "course", first TD should have had "course".  It had ${children[1].innerHTML}`
		}
		if( children[2].innerHTML !== '100'){
			throw `constructor was given name of 100, first TD should have had 100.  It had ${children[2].innerHTML}`
		}
		var button = $(children[3]).find('button');
		if( button.length !== 1){
			throw '4th TD should have had a button in it, could not find one';
		}
		if( button.text() !== 'delete' ){
			throw '4th TD button should have had text of DELETE, it had ' + button.text();
		}
	} catch( error ){
		displayMessage(['error with Student Record render(): ',error],'error');
		return false;
	}
	displayMessage('constructor and render methods passed','message');
	if(testMethod( student, 'handleDelete')) return
	try{
		$("body").append(dom2);
		student2.handleDelete();		
		if(!testVal ){
			throw( 'callback function passed into constructor was not called upon calling handleDelete.');
		}
		if( document.querySelector('body').contains(dom2[0])){
			throw( 'dom elements for StudentRecord were not removed with calling handleDelete');
		}
		testVal = false;
		$("body").append(dom);
		button.click();
		
		if(!testVal ){
			throw( 'callback function passed into constructor was not called upon clicking the delete button.');
		}
		if( document.querySelector('body').contains(dom[0])){
			throw( 'dom elements for StudentRecord were not removed with the click of the delete button');
		}

	} catch( error ){
		displayMessage(['error with Student Record render(): ',error],'error');
		return false;
	}
	displayMessage('handleDelete method and delete button clicking passed','message');
	var student = new StudentRecord(1,'John','Math','100',testCallback);
	if(testMethod( student, 'getData')) return
	try{
		
		data = 	student.getData();
		if(data === undefined ){
			throw( 'callback function passed into constructor was not called upon calling handleDelete.');
		}
		if(data.constructor !== Object){
			throw( 'returned object from getData was not a native object, it was of type '  + data.constructor.name);
		}
		if(data.name === undefined){
			throw( 'returned object from getData did not have the key "name"');
		}
		if(data.name !== 'John'){
			throw( 'returned object from getData did not have correct value for the key "name", expected "John" but got ' + data.name);
		}
		if(data.course === undefined){
			throw( 'returned object from getData did not have the key "course"');
		}
		if(data.course !== 'Math'){
			throw( 'returned object from getData did not have correct value for the key "course", expected "Math" but got ' + data.course);
		}
		if(data.grade === undefined){
			throw( 'returned object from getData did not have the key "grade"');
		}
		if(typeof data.grade !== 'number'){
			throw( 'returned object from getData did not return the appropriate datatype.  expected number but got ' + typeof data.grade);
		}
		if(data.grade !== 100){
			throw( 'returned object from getData did not have correct value for the key "grade", expected 100 but got ' + data.grade);
		}
	} catch( error ){
		displayMessage(['error with Student Record render(): ',error],'error');
		return false;
	}
	displayMessage('getData method passed','message');

	if(testMethod( student, 'update')) return
	try{
		var result = student.update('mooo',4);
		if(result!==false){
			throw('update method did not return false when given an illegal field name of "mooo", gave ' + result + ' instead');
		}
		var dom = student.render();
		result = student.update('name','Jack');
		data = 	student.getData();
		if(result!==true){
			throw('update method did not return true when given a valid value to change');
		}
		if(data.name !== 'Jack'){
			throw('update method did not change the student name to "Jack", it is '+ data.name);
		}
		if(dom.find('td')[0].innerHTML !== 'Jack'){
			throw('update method did not update the name dom element of the student, the value in the dom element should have been "Jack" but was '+dom.find('td')[0].innerHTML);
		}


	} catch( error ){
		displayMessage(['error with Student Record render(): ', error],'error');
		return false;
	}
	displayMessage('update method passed','message');
	return true;
}


$(document).ready( function(){
	intiateTestDisplay();
	var testFunctions = ['studentrecord_tests'];

	var i = 0;
	while( i<testFunctions.length && window[testFunctions[i]]() === true){
		i++;
	}

	displayMessage(' All tests passed! ', 'header');
})


function displayMessage(message, type='error'){
	showModal();
	if(Array.isArray(message)){
		var wholeMessage = message.join(': ');
		var modalMessage = message[1];
	} else {
		wholeMessage = modalMessage = message;
	}
	var element = $("<div>").text(modalMessage).addClass(type);
	if(type==='error'){
		console.error(wholeMessage);
	} else {
		console.log(wholeMessage);
	}
	element.appendTo('#errorArea');
}

function testMethod( object, method ){
	try{
		if(object[method] === undefined){
			throw 'missing method '+method+' in ' + object.constructor.name;
		}
	}
	catch (error){
		displayMessage(error);
		return false;
	}
}
var shadow;
var displayModal;
var minimizeButton;
function intiateTestDisplay(){
	shadow = $("<div>",{
		css: {
			'background-color': 'rgba(0,0,0,.4)',
			position: 'fixed',
			left: 0,
			top: 0,
			height: '100vh',
			width: '100vw',
		}
	})
	shadow.hide();
	displayModal = $("<div>",{
		css: {
			'background-color': 'white',
			position: 'fixed',
			bottom: 0,
			left: '50%',
			'height': '15%',
			width: '50%',
			'transform': 'translateX(-50%)',
			border: '1px solid black',
			overflow: 'scroll'
		},
		id:'errorArea',
	})
	minimizeButton = $("<div>",{
		text: '^',
		css: {
			'background-color': 'grey',
			padding: '5px',
			cursor: 'pointer',
			position: 'absolute',
			color: 'white',
			'font-size': '14px',
			top: 0,
			right: 0
		},
		on: {
			click: hideModal
		}
	})
	displayModal.hide();
	$('body').append(minimizeButton, displayModal);
}
function showModal(){
	minimizeButton.appendTo(displayModal);
	displayModal.show();
	minimizeButton.text('^').off('click', showModal).on('click', hideModal)
	//shadow.show();
}
function hideModal(){
	minimizeButton.appendTo('body');
	minimizeButton.text('v').off('click', hideModal).on('click', showModal)
	displayModal.hide();
	shadow.hide();
}






















