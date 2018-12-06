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
		displayMessage(['error with Student Record handleDelete(): ',error],'error');
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
		displayMessage(['error with Student Record getData(): ',error],'error');
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
		displayMessage(['error with Student Record update(): ', error],'error');
		return false;
	}
	displayMessage('update method passed','message');
	displayMessage('StudentRecord passed all tests','green');
	return true;
}

function model_tests(){
	displayMessage('--Model tests', 'header');
	if(typeof Model === 'undefined' ){
		displayMessage('Model object does not exist.  Check components/model.js and make sure the object is defined still and there are no syntax errors in the console');
		return false;
	}
	var testModel = new Model();
	if(testMethod( testModel, 'getNextID')) return
	try{
		var id = testModel.getNextID();
		if(id !== 1){
			throw( 'Exepected 1 as first ID from getNextID, got'+id);
		}
		id = testModel.getNextID();
		if(id !== 2){
			throw( 'Expected 2 as next ID from getNextID, got '+id);
		}
	} catch( error ){
		displayMessage(['error with Model getNextID: ',error],'error');
		return false;
	}
	displayMessage('constructor and getNextID methods passed','message');

	if(testMethod( testModel, 'add')) return
	try{
		testModel = new Model(); //reset the model for testing;
		var count = testModel.add('student1', 'course1', 50);
		if(count !== 1){
			throw( 'added a student, expected 1 as returned count, got'+count);
		}
		var count2 = testModel.add('student2', 'course2', 51);
		if(count2 !== 2){
			throw( 'added a student, expected 2 as returned count, got'+count);
		}
	} catch( error ){
		displayMessage(['error with Model getNextID: ',error],'error');
		return false;
	}
	displayMessage('add method passed','message');
	if(testMethod( testModel, 'getAllStudents')) return
	try{
		
		var studentList = testModel.getAllStudents();
		if(!Array.isArray( studentList )){
			throw('method should return an array, returned a ' + typeof studentList)
		}
		if(studentList.length!==2){
			throw('There should be 2 items in the array, there were '+studentList.length);
		}
		if(studentList[0].constructor !== StudentRecord){
			throw('method must return an array of StudentRecord, the contained pieces were made by a ' + studentList.constructor)
		}
		if(studentList[0].getData().name !== 'student1'){
			throw('first student added did not have a name of "student1", had '+ studentList[0].getData().name);
		}
		if(studentList[1].getData().name !== 'student2'){
			throw('second student added did not have a name of "student1", had '+ studentList[1].getData().name);
		}
		if(studentList[0].getData().course !== 'course1'){
			throw('first student added did not have a course of "course1", had '+ studentList[0].getData().course);
		}
		if(studentList[1].getData().course !== 'course2'){
			throw('second student added did not have a course of "course2", had '+ studentList[1].getData().course);
		}
		if(studentList[0].getData().grade !== 50){
			throw('first student added did not have a grade of 50, had '+ studentList[0].getData().grade);
		}
		if(studentList[1].getData().grade !== 51){
			throw('second student added did not have a grade of 51, had '+ studentList[1].getData().grade);
		}
	} catch( error ){
		displayMessage(['error with getAllStudents : ',error],'error');
		return false;
	}
	displayMessage('getAllStudents method passed','message');
	//REMOVE
	if(testMethod( testModel, 'remove')) return
	try{
		var studentListCopy = studentList.slice();
		var result = testModel.remove(studentListCopy[0]);
		if(result!==true){
			throw('Should have returned true after successfully removing student, returned',result);
		}
		var newList = testModel.getAllStudents();
		if(newList.length !== 1){
			throw('There should be 1 student left, but count is '+ newList.length);
		}
		if(newList[0] !== studentListCopy[1]){
			throw('Remaining item in model should be '+JSON.stringify(studentListCopy[1])+ ' but is '+JSON.stringify(newList[0]));
		}
		result = testModel.remove('haha');
		if(result!==false){
			throw('Tried to remove "haha" from student list, should have gotten false, but got '+result);
		}
		result = testModel.remove(studentListCopy[0]);
		if(result!==false){
			throw('Tried to remove a student that was already removed.  Should have gotten false, but got '+ result);
		}
	} catch( error ){
		displayMessage(['error with remove : ',error],'error');
		return false;
	}
	displayMessage('remove method passed','message');
	if(testMethod( testModel, 'getStudentByField')) return
	try{
		var result = testModel.getStudentByField('name','student2');
		if(result !== studentListCopy[1]){
			throw('Tried to fetch student by name "student2", should have gotten '+JSON.stringify(studentListCopy[1])+', but got ' + result);
		}
		result = testModel.getStudentByField('grade',51);
		if(result !== studentListCopy[1]){
			throw('Tried to fetch student by grade 52, should have gotten '+JSON.stringify(studentListCopy[1])+', but got ' + result);
		}
		result = testModel.getStudentByField('splunge', 'student2');
		if(result !== -1){
			throw('Tried to find a student by a field that does not exist, expected -1, but got '+result);
		}
		result = testModel.getStudentByField('name','chuck');
		if(result !== -1){
			throw('Tried to find a student by a name called "chuck" that does not exist, should have gotten -1, but got '+result);
		}
	} catch( error ){
		displayMessage(['error with getStudentByField : ',error],'error');
		return false;
	}
	displayMessage('getStudentByField method passed','message');
	if(testMethod( testModel, 'calculateGradeAverage')) return
	try{
		result = testModel.calculateGradeAverage();
		if(result!==51){
			throw('Tried to get average of 1 student with a grade of 51.  Expected average of 51.  Got '+ result);
		}
		testModel.add('student3', 'course3', 51);
		result = testModel.calculateGradeAverage();
		if(result!==51){
			throw('Tried to get average of 2 students both with a grade of 51.  Expected average of 51.  Got '+ result);
		}
		testModel.add('student4', 'course4', 100);
		result = testModel.calculateGradeAverage();
		if(result!==(51+51+100)/3){
			throw('Tried to get average of 51, 51, and 100.  Expected average of 67.33(repeating).  Got '+ result);
		}		
	} catch( error ){
		displayMessage(['error with calculateGradeAverage : ',error],'error');
		return false;
	}
	displayMessage('calculateGradeAverage method passed','message');
	displayMessage('Model passed all tests','green');
	return true;
}

function sgt_tests(){
	displayMessage('--SGT tests', 'header');
	if(typeof SGT_template === 'undefined' ){
		displayMessage('SGT object does not exist.  Check components/sgt.js and make sure the object is defined still and there are no syntax errors in the console');
		return false;
	}
	var elementList = {
		addButton: "#addButton",
		cancelButton: "#cancelButton",
		nameInput: "#studentName",
		courseInput: "#studentCourse",
		gradeInput: "#studentGrade",
		displayArea: "#displayArea",
		averageArea: ".avgGrade"
	}
	var elementSelectors = {
		addButton: $("#addButton"),
		cancelButton: $("#cancelButton"),
		nameInput: $("#studentName"),
		courseInput: $("#studentCourse"),
		gradeInput: $("#studentGrade"),
		displayArea: $("#displayArea"),
		averageArea: $(".avgGrade")
	}
	var testSGT = new SGT_template( elementSelectors );
	if(testMethod( testSGT, 'addEventHandlers')) return
	try{
		testSGT.addEventHandlers();
		var eventData = $._data( $("#addButton")[0], "events" );
		for(var i=0; i< eventData.click.length; i++){
			if( eventData.click[i].handler.name.indexOf('handleAdd') !== -1){
				break;
			}
		}
		if(i===eventData.click.length){
			throw('Could not find handleAdd as a click handler on the add button');
		}
		eventData = $._data( $("#cancelButton")[0], "events" );
		for(var i=0; i< eventData.click.length; i++){
			if( eventData.click[i].handler.name.indexOf('handleCancel') !== -1){
				break;
			}
		}
		if(i===eventData.click.length){
			throw('Could not find handleAdd as a click handler on the add button');
		}
	} catch( error ){
		displayMessage(['error with SGT addEventHandlers: ',error],'error');
		return false;
	}
	displayMessage('addEventHandlers method passed','message');

	if(testMethod( testSGT, 'clearInputs')) return
	try{
		elementSelectors.nameInput.val('test');
		elementSelectors.courseInput.val('test');
		elementSelectors.gradeInput.val('test');
		testSGT.clearInputs();
		if(elementSelectors.nameInput.val()!==''){
			throw('clearInputs didn\'t clear the name input');
		}
		if(elementSelectors.courseInput.val()!==''){
			throw('clearInputs didn\'t clear the course input');
		}
		if(elementSelectors.gradeInput.val()!==''){
			throw('clearInputs didn\'t clear the grade input');
		}
		displayMessage('clearInputs cleared all inputs','message');	
	} catch( error ){
		displayMessage(['error with SGT clearInputs: ',error],'error');
		return false;
	}
	displayMessage('clearInputs method passed','message');

	try{
		elementSelectors.nameInput.val('test');

		testSGT.handleCancel();
		if(elementSelectors.nameInput.val()!==''){
			throw('handleCancel didn\'t clear the name input');
		}
		if(elementSelectors.courseInput.val()!==''){
			throw('handleCancel didn\'t clear the course input');
		}
		if(elementSelectors.gradeInput.val()!==''){
			throw('handleCancel didn\'t clear the grade input');
		}
		displayMessage('handleCancel cleared all inputs','message');
		elementSelectors.nameInput.val('test');
		elementSelectors.cancelButton.click();
		if(elementSelectors.nameInput.val()!==''){
			throw('cancel button click did not clear the inputs');
		}		
	} catch( error ){
		displayMessage(['error with SGT handleCancel: ',error],'error');
		return false;
	}
	displayMessage('handleCancel method passed','message');
	//HANDLE displayAverage
	if(testMethod( testSGT, 'displayAverage')) return
	try{
		testSGT.displayAverage();
		var text = elementSelectors.averageArea.text();
		if(text !== '00'){ //there are 2 display areas
			throw('expected to see 0 in both average display areas, got ' + text.substr(0,text.length/2))
		}
		testSGT.model.add('dude', 'hockey', 0);
		testSGT.model.add('dudette', 'thermonuclear war', 100);
		testSGT.displayAverage();
		var text = elementSelectors.averageArea.text();
		if(text !== '5050'){ //there are 2 display areas
			throw('expected to see 50 in both average display areas, got ' + text.substr(0,text.length/2))
		}
	} catch( error ){
		displayMessage(['error with SGT displayAverage: ',error],'error');
		return false;
	}
	displayMessage('displayAverage method passed','message');
	//HANDLE displayAllStudents
	if(testMethod( testSGT, 'displayAllStudents')) return
	try{
		testSGT.displayAllStudents();
		var trs = elementSelectors.displayArea.find("tr");
		if(trs.length!==2){
			throw('Expected to see 2 student records displayed, got ' + trs.length);
		}
		var firstName = trs.eq(0).find('td:first-child').text()
		if(firstName!=='dude'){
			throw('Expected first student\'s display name to be "dude", found '+firstName)
		}
		var secondName = trs.eq(1).find('td:first-child').text()
		if(secondName!=='dudette'){
			throw('Expected second student\'s display name to be "dudette", found '+firstName)
		}
		testSGT.displayAllStudents();
		var trs2 = elementSelectors.displayArea.find("tr");
		if(trs2.length!==2){
			if(trs2.length === 4){
				throw('Expected to see 2 student records displayed, got 4.  Did you forget to clear the display area?');
			}
			throw('Expected to see 2 student records displayed, got ' + trs2.length);
		}
		var secondGrade = trs.eq(1).find('td:nth-child(3)').text()
		if(secondGrade!=='100'){
			throw('Expected second student\'s display grade to be 100, found '+secondGrade);
		}
	} catch( error ){
		displayMessage(['error with SGT displayAllStudents: ',error],'error');
		return false;
	}
	displayMessage('displayAllStudents method passed','message');
	//HANDLE ADD
	if(testMethod( testSGT, 'handleAdd')) return
	try{
		elementSelectors.nameInput.val('testStudent1');
		elementSelectors.courseInput.val('testCourse1');
		elementSelectors.gradeInput.val(100);
		var pre_students = testSGT.model.getAllStudents().slice();	
		testSGT.handleAdd();
		if(elementSelectors.nameInput.val()!==''){
			throw('handleAdd did not invoke clearInputs or did not clear the inputs after add');
		}
		var post_students = testSGT.model.getAllStudents();
		elementSelectors.nameInput.val('testStudent2');
		elementSelectors.courseInput.val('testCourse2');
		elementSelectors.gradeInput.val(100);
		var post_students = testSGT.model.getAllStudents();
		elementSelectors.addButton.click();
		if(post_students.length !== pre_students.length + 2){
			throw('clicking on the add button did not save the data to a new student in the model');
		}
		var text = elementSelectors.averageArea.text();
		if(text !== '7575'){ //there are 2 display areas
			throw('expected to see 75 in both average display areas, got ' + text.substr(0,text.length/2))
		}		
	} catch( error ){
		displayMessage(['error with SGT handleAdd: ',error],'error');
		return false;
	}
	displayMessage('handleAdd method passed','message');

	displayMessage('SGT passed all tests','green');
	return true;
}

function startTests(){
	intiateTestDisplay();
	var testFunctions = ['studentrecord_tests', 'model_tests', 'sgt_tests'];
	var i = 0;
	while( i<testFunctions.length && window[testFunctions[i]]() === true){
		i++;
	}
	displayMessage(' All tests passed! ', 'header');	
}


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
	$("#errorArea").prepend(element);
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






















