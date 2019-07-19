class TestError extends Error {
	constructor(className, method, message, error = null, filePath = null) {
		super(message);

		this.filePath = filePath;
		this.method = method;
		this.name = className;
		this.originalError = error;
	}

	get lineNumber(){
		if(this.originalError && this.filePath){
			const foundError = RegExp(`${this.escapedFilePath}:(\\d+)`)
				.exec(this.originalError.stack);

			return foundError && foundError[1];
		}

		return null;
	}

	get escapedFilePath(){
		if(this.filePath){
			return this.filePath.replace(/(\/|\.|\-)/g, (char) => '\\' + char);
		}

		return null;
	}

	displayError() {
		const html = `<strong>${this.name}${this.method ? `.${this.method}()` : '' } Failed Test:</strong> ${this.message}`;

		const element = $('<div>', { class: 'error errorMessage', html });
		let additionalInfo = null;

		if(this.lineNumber){
			const text = `Error occurred in ${this.filePath} on line: ${this.lineNumber}`;
			additionalInfo = $('<div>', { class: 'warning errorMessage', text});
		}

		$("#errorArea").prepend(element, additionalInfo);

		console.error(this.originalError || this);
	}
}

class SectionError {
	constructor(className) {
		this.name = className;
	}

	throw(testMethod, errorMessage) {
		return new TestError(this.name, testMethod, errorMessage);
	}
}

function student_tests(){
	const fileName = 'components/student.js';
	const handleStudentError = handleError('Student', fileName);
	const studentError = new SectionError('Student');

	try {
		displayMessage(`--Testing - Student | ${fileName}`, 'header');
		if(typeof Student === 'undefined'){
			throw studentError.throw(null, 'Student object does not exist. Check components/student.js and make sure the object is still defined and there are no syntax errors in the console.');
		}
		var testVal = false;
		function testCallback(input){
			if(input === undefined){
				throw new Error('click callback for delete button did not provide an argument of the Student that was clicked.  returned undefined');
			}
			if(typeof input !== 'number'){
				throw( new Error('click callback for delete button did not provide an argument of the Student id (a number) that was clicked.  returned ' + JSON.stringify( input )));
			}
			testVal = true;
		}
		var testStudent1 = { id: 1, name: 'name1', course: 'course1', grade: 100};
		var testStudent2 = { id: 2, name: 'name2', course: 'course2', grade: '50'};
		var testStudent3 = { id: 2, name: 'name3', course: 'course3', grade: '60'};
		var student = new Student(testStudent1.id,testStudent1.name,testStudent1.course,testStudent1.grade,testCallback);
		var student2 = new Student(testStudent2.id,testStudent2.name,testStudent2.course,testStudent2.grade,testCallback);
		var student3 = new Student(testStudent3.id,testStudent3.name,testStudent3.course,testStudent3.grade,testCallback);

		displayMessage(`Student object Exists`, 'message');
		try{
			const method = 'getData';
			const hasGetData = hasMethod(student, method);

			displayMessage(`--Testing - Student.${method}() | ${fileName}`, 'header');

			if( hasGetData !== true){
				throw studentError.throw(method, hasGetData);
			}

			var result = student.getData();
			var result2 = student2.getData();

			if(!(result instanceof Object)){
				throw studentError.throw(method, 'Method did not return a standard object like it was supposed to')
			}
			if(result.id !== testStudent1.id){
				throw studentError.throw(method, `Student was created with an id of "${testStudent1.id}", but ${method} returned an id of "${result.id}"`);
			}
			if(result.name !== testStudent1.name){
				throw studentError.throw(method, `Student was created with a name of "${testStudent1.name}", but ${method} returned a name of "${result.name}"`);
			}
			if(result.course !== testStudent1.course){
				throw studentError.throw(method, `Student was created with a course of "${testStudent1.course}", but ${method} returned a course of "${result.course}"`);
			}
			if(result.grade != testStudent1.grade	){
				throw studentError.throw(method, `Student was created with a grade of "${testStudent1.grade}", but ${method} returned a grade of "${result.grade}"`);
			}
			if(typeof result.grade !== 'number'	){
				throw studentError.throw(method, `Student was created with a grade of type: "number", but ${method} returned a grade of type: "${typeof result.grade}"`);
			}
			if(result2.grade != testStudent2.grade	){
				throw studentError.throw(method, `Student was created with a grade of "${testStudent2.grade}", but ${method} returned a grade of "${result2.grade}"`);
			}
			if(typeof result2.grade!== 'number'	){
				throw studentError.throw(method, `Student was created with a grade of type: "string". Grade should be converted to a number, but ${method} returned a grade of type: "${typeof result2.grade}". The grade should be converted to a number in the constructor when it is saved to the grade property.`);
			}

			displayMessage(`${method} method tests passed`, 'message');
		} catch( error ){
			return handleStudentError(error, 'getData');
		}
		
		try{
			const dom = student.render();
			const method = 'render';
			const tr = '&lt;tr&gt;';
			const td = '&lt;td&gt;';

			displayMessage(`--Testing - Student.${method}() | ${fileName}`, 'header');
			$('#displayArea').append(dom);

			if($('#displayArea tr').length !== 1){
				throw studentError.throw(method, `Render did not return a table row, html output should have been wrapped in a table row (${tr})`);
			}

			var selectedChildren = $("#displayArea tr td")
			if(selectedChildren.length !== 4){
				throw studentError.throw(method, `Render should return a ${tr} that has 4 ${td} children. The returned ${tr} has ${selectedChildren.length} ${td}s`);
			}
			if(selectedChildren.eq(0).text()!==testStudent1.name){
				throw studentError.throw(method, `Render's first ${td} should have had the student name of "${testStudent1.name}", but it had "${selectedChildren.eq(0).text()}"`);
			}
			if(selectedChildren.eq(1).text()!==testStudent1.course){
				throw studentError.throw(method, `Render's second ${td} should have had the student course of "${testStudent1.course}", but it had "${selectedChildren.eq(1).text()}"`);
			}
			if(selectedChildren.eq(2).text()!=testStudent1.grade){
				throw studentError.throw(method, `Render's third ${td} should have had the student grade of "${testStudent1.grade}", but it had "${selectedChildren.eq(2).text()}"`);
			}
			var deleteButton = selectedChildren.eq(3).find('button');
			if(deleteButton.length!==1){
				throw( new Error(`render fourth td should have had a button inside of it, but didn't`));
			}
			if(deleteButton.text()!=='delete'){
				throw( new Error(`render fourth td should have had a button with text of 'delete', but had ${deleteButton.text()}`));
			}

		} catch( error ){
			return handleStudentError(error, 'render');

			displayMessage(['error with Student render(): ', error],'error');
			return;
		}
		try{
			deleteButton.click();
			if(testVal!==true){
				throw( new Error(`delete button was called, but didn't properly execute callback function`));
			}
			if($("#displayArea > tr").length!==0){
				throw( new Error(`Student's tr should be removed after delete called, but was not`))
			}
		} catch( error ){
			displayMessage(['error with Student handleDelete(): ', error],'error');
			return;
		}

		try{
			var dom = student3.render();
			$("#displayArea").append(dom);
			if($("#displayArea tr").length!==1){
				throw( new Error('render did not return a table row, html output should have been wrapped in a table row (tr)'));
			}
			testStudent3.name = "name4";
			testStudent3.course = "course4";
			testStudent3.grade = "75";
			student3.update("name", testStudent3.name);
			student3.update("course", testStudent3.course);
			student3.update("grade", testStudent3.grade);

			var result = student3.getData();
			if(result.name!==testStudent3.name){
				throw( new Error(`update should have updated the data property with the student name to ${testStudent3.name}, but getData returned ${result.name}`));
			}
			if(result.course!==testStudent3.course){
				throw( new Error(`update should have updated the data property with the student course to ${testStudent3.course}, but getData returned ${result.course}`));
			}
			if(typeof result.grade!== 'number'	){
				throw new Error('update of the student grade should have changed to type number, but getData returned a grade of type ' + typeof result.grade);
			}
			if(result.grade!=testStudent3.grade){
				throw( new Error(`update should have updated the data property with the student grade to ${testStudent3.grade}, but getData returned ${result.grade}`));
			}
			var selectedChildren = $("#displayArea tr td");
			if(selectedChildren.length!==4){
				throw( new Error('update should not remove the tr that has 4 tds in it.  It only had ' + selectedChildren.length));
			}
			if(selectedChildren.eq(0).text()!==testStudent3.name){
				throw( new Error(`update first td should now have had the student name of ${testStudent3.name}, but it had ${selectedChildren.eq(0).text()}`));
			}
			if(selectedChildren.eq(1).text()!==testStudent3.course){
				throw( new Error(`update second td should now have had the student course of ${testStudent3.course}, but it had ${selectedChildren.eq(1).text()}`));
			}
			if(selectedChildren.eq(2).text()!=testStudent3.grade){
				throw( new Error(`update third td should now have had the student grade of ${testStudent3.grade}, but it had ${selectedChildren.eq(2).text()}`));
			}
			var deleteButton = selectedChildren.eq(3).find('button');
			if(deleteButton.length!==1){
				throw( new Error(`update fourth td should have had a button inside of it, but didn't`));
			}
			if(deleteButton.text()!=='delete'){
				throw( new Error(`update fourth td should have had a button with text of 'delete', but had ${deleteButton.text()}`));
			}
			deleteButton.click();

		} catch( error ){
			displayMessage(['error with Student update(): ', error],'error');
			return;
		}
		displayMessage('update method passed','message');
		displayMessage('StudentRecord passed all tests','green');
		return true;
	} catch(error) {
		handleStudentError(error);
	}
}

function handleError(className = null, filePath = null){
	return function(error, method = null){
		if (error instanceof TestError) {
			return error.displayError();
		}

		const userMessage = 'This is most likely an error caused by your code';

		if (className) {
			const testError = new TestError(className, method, `${error.message} | ${userMessage}`, error, filePath);


			// var lineNumber = /tests\.js:(\d+)/.exec(stackOutput.stack)[1];

			return testError.displayError();
		}

		displayMessage([userMessage, error]);
	}
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
			throw( new Error('Could not find handleAdd as a click handler on the add button'));
		}
		eventData = $._data( $("#cancelButton")[0], "events" );
		for(var i=0; i< eventData.click.length; i++){
			if( eventData.click[i].handler.name.indexOf('handleCancel') !== -1){
				break;
			}
		}
		if(i===eventData.click.length){
			throw( new Error('Could not find handleCancel as a click handler on the add button'));
		}
	} catch( error ){
		displayMessage(['error with SGT addEventHandlers: ',error],'error');
		return false;
	}
	displayMessage('addEventHandlers method passed','message');
	if(testMethod( testSGT, 'clearInputs')) return
	elementSelectors.nameInput.val('name');
	elementSelectors.courseInput.val('course');
	elementSelectors.gradeInput.val('grade');
	try{
		testSGT.clearInputs();
		if(elementSelectors.nameInput.val()!==''){
			throw new Error(`called clearInput: name input value should be '', but is ${elementSelectors.nameInput.val()}`)
		}
		if(elementSelectors.courseInput.val()!==''){
			throw new Error(`called clearInput: course input value should be '', but is ${elementSelectors.courseInput.val()}`)
		}
		if(elementSelectors.gradeInput.val()!==''){
			throw new Error(`called clearInput: grade input value should be '', but is ${elementSelectors.gradeInput.val()}`)
		}
		elementSelectors.nameInput.val('name');
		elementSelectors.courseInput.val('course');
		elementSelectors.gradeInput.val('grade');
		elementSelectors.cancelButton.click();
		if(elementSelectors.nameInput.val()!=='' || elementSelectors.courseInput.val()!=='' || elementSelectors.gradeInput.val()!==''){
			throw new Error(`cancel button was pressed, but the name, course, and grade inputs were not cleared.  Cancel button should call clearInputs`)
		}
	} catch( error ){
		displayMessage(['error with SGT clearInput: ',error],'error');
		return false;
	}
	displayMessage('SGT clearInputs passed','green');
	if(testMethod( testSGT, 'createStudent')) return
	try{
		var result = testSGT.createStudent('john','math',50,1);
		if(Array.isArray(testSGT.data)){
			throw new Error(`data property of SGT_template should be an object, but it was an array`);
		}
		if(testSGT.data['1'] === undefined){
			throw new Error(`SGT_template createStudent('john','math',50,1) was called.  Should have made a student with those values and added it to data.  Student not found in data at key 1 `)
		}
		if(!(testSGT.data['1'] instanceof Student)){
			throw new Error(`SGT_template createStudent('john','math',50,1) was called. Should have added an object that is an instance of Student, but it was a ${testSGT.data['1'].constructor}`)
		}
		if(result!==true){
			throw new Error(`SGT_template createStudent should have returned true for a successful add, but returned ${result}`);
		}
		result = testSGT.createStudent('john2','math2',50,1);
		if(result!==false){
			throw new Error(`SGT_template createStudent should have returned false for trying to add a student with the same ID as an existing student, but returned ${result}`);
		}
		var items = Object.values(testSGT.data);
		if(items.length!==1){
			throw new Error(`SGT_template data should have had 1 item in it after successfully adding 1 student and failing to add the same student again, but had ${items.length}`)
		}
		result = testSGT.createStudent('student3','math',50,3);
		items = Object.values(testSGT.data);
		if(items.length!==2){
			throw new Error(`SGT_template was given another student (createStudent('student3','math',50,3)), should now have 2, but had ${items.length}`)
		}
		result = testSGT.createStudent('student4','math',50);
		items = Object.values(testSGT.data);
		if(items.length!==3){
			throw new Error(`SGT_template was given another student, but with no id. (createStudent('student4','math',50)), should now have 3 items, but had ${items.length}`)
		}
		result = testSGT.createStudent('student5','math',50);
		items = Object.values(testSGT.data);
		if(items.length!==4){
			throw new Error(`SGT_template was given another student, again with no id. (createStudent('student5','math',50)), should now have 4 items, but had ${items.length}`)
		}
		if(testSGT.data['4']===undefined){
			throw new Error(`SGT_template was given another student with no id, but the next id slot was taken by a previous entry.  It should have added this student at the next available ID of 4, but did not`)
		}
		if(testSGT.data['4'].getData().name!=='student5'){
			throw new Error(`SGT_template student was added with the following: createStudent('student5','math',50).  Should have had a name of student5, but had ${testSGT.data['4'].getData().name}`)
		}
		if(testSGT.data['4'].getData().course!=='math'){
			throw new Error(`SGT_template student was added with the following: createStudent('student5','math',50).  Should have had a course of math, but had ${testSGT.data['4'].getData().course}`)
		}
		if(typeof testSGT.data['4'].getData().grade !== 'number'){
			throw new Error(`SGT_template student was added with the following: createStudent('student5','math',50).  Should have had a grade of type ${typeof testSGT.data['4'].getData().grade}`)
		}
		if(testSGT.data['4'].getData().grade !== 50){
			throw new Error(`SGT_template student was added with the following: createStudent('student5','math',50).  Should have had a grade of number 50, but had ${testSGT.data['4'].getData().grade}`)
		}
		elementSelectors.nameInput.val('name');
		elementSelectors.courseInput.val('course');
		elementSelectors.gradeInput.val(100);
		elementSelectors.addButton.click();
		items = Object.values(testSGT.data);
		var studentData = testSGT.data[5].getData();
		console.log(studentData);
		var dom = $("#displayArea > tr:nth-of-type(5)");
		if(items.length!==5){
			throw new Error(`SGT_template createStudent should have been triggered by button 'add' being clicked.  Either function wasn't triggered, or createStudent didn't get proper data from inputs`)
		}
		if(studentData.name!=='name'){
			throw new Error(`Name input had 'name' in it when add was clicked, but created Student has a name of ${studentData.name}`)
		}
		if(studentData.course!=='course'){
			throw new Error(`Course input had 'course' in it when add was clicked, but created Studenthas a course of ${studentData.course}`)
		}
		if(studentData.grade!==100){
			throw new Error(`Grade input had 100 in it when add was clicked, but created Student has a grade of ${studentData.grade}`)
		}

	} catch( error ){
		displayMessage(['error with SGT handleAdd: ',error],'error');
		return false;
	}
	displayMessage('SGT createStudent passed','green');



	if(testMethod( testSGT, 'doesStudentExist')) return
	try{
		if(testSGT.doesStudentExist(3)!==true){
			throw new Error(`Student id 3 should exist, but doesStudentExist returned false`);
		}
		if(testSGT.doesStudentExist(40)!==false){
			throw new Error(`Student id 40 was checked.  Should not exist, but doesStudentExist returned`);
		}
		//still need to test if there is 0 students... guess I could test that when I delete all students

	} catch( error ){
		displayMessage(['error with SGT doesStudentExist: ',error],'error');
		return false;
	}
	displayMessage('SGT doesStudentExist passed','green');

	if(testMethod( testSGT, 'readStudent')) return
	try{
		var pulledStudent = testSGT.readStudent(3);
		if(pulledStudent.constructor!==Student){
			throw new Error(`readStudent(3) should have returned a Student object, but returned a ${pulledStudent.constructor}`);
		}
		if(pulledStudent.getData().name!=='student3'){
			throw new Error(`readStudent(3) should have returned a student with a name of student3, but had ${pulledStudent.getData().name}`);
		}
		if(pulledStudent.getData().course!=='math'){
			throw new Error(`readStudent(3) should have returned a student with a course of math, but had ${pulledStudent.getData().course}`);
		}
		if(pulledStudent.getData().grade!==50){
			throw new Error(`readStudent(3) should have returned a student with a grade of 50, but had ${pulledStudent.getData().grade}`);
		}
		if(pulledStudent.getData().id!=3){
			throw new Error(`readStudent(3) should have returned a student with a id of 3, but had ${pulledStudent.getData().id}`);
		}
		if(testSGT.readStudent(40)!==false){
			throw new Error(`readStudent(40) should have returned false, as no student by that id exists.  It returned ${testSGT.readStudent(40)}`)
		}
		var allStudents = testSGT.readStudent();
		if(!Array.isArray(allStudents)){
			throw new Error(`readStudent() (with no id given) should have returned an array of students.  It returned ${JSON.stringify(allStudents, null, 2)}`)
		}
		if(allStudents.length!==5){
			throw new Error(`readStudent() (with no id given) should have returned an array of 5 elements (as there are 5 students added) it had ${allStudents.length} elements`)
		}
		if(allStudents[0].constructor !== Student){
			throw new Error(`readStudent() (with no id given) should have returned an array of 5 students (Student objects), but they were ${allStudents[0].constructor} constructed`)
		}

	} catch( error ){
		displayMessage(['error with SGT readStudent: ',error],'error');
		return false;
	}
	displayMessage('SGT readStudent passed','green');

	if(testMethod( testSGT, 'displayAllStudents')) return
	try{
		elementSelectors.nameInput.val('name2');
		elementSelectors.courseInput.val('course2');
		elementSelectors.gradeInput.val(99);
		elementSelectors.addButton.click();
		items = Object.values(testSGT.data);
		var dom = $("#displayArea > tr:nth-of-type(1)");
		console.log(dom);
		var result = dom.find('td:nth-of-type(1)').text()
		if(result!=='john'){
			//TODO Might want to add something that says ("check your display all students method");
			throw new Error(`Name input had 'john' in it when add was clicked, but created Student dom element has a name of ${result}`)
		}
		var result = dom.find('td:nth-of-type(2)').text()
		if(result!=='math'){
			throw new Error(`Course input had 'math' in it when add was clicked, but created Student dom element has a course of ${result}`)
		}
		var result = dom.find('td:nth-of-type(3)').text()
		if(result!=='50'){
			throw new Error(`Grade input had 50 in it when add was clicked, but created Student dom element has a grade of ${result}`)
		}
		var dom = $("#displayArea > tr:nth-of-type(6)");
		console.log(dom);
		var result = dom.find('td:nth-of-type(1)').text()
		if(result!=='name2'){
			throw new Error(`Name input had 'name2' in it when add was clicked, but created Student dom element has a name of ${result}`)
		}
		var result = dom.find('td:nth-of-type(2)').text()
		if(result!=='course2'){
			throw new Error(`Course input had 'course2' in it when add was clicked, but created Student dom element has a course of ${result}`)
		}
		var result = dom.find('td:nth-of-type(3)').text()
		if(result!=='99'){
			throw new Error(`Grade input had 99 in it when add was clicked, but created Student dom element has a grade of ${result}`)
		}
		var rows = $("#displayArea > tr")
		$(rows[3]).remove();
		if( rows.length !== 6){
			throw new Error(`6 students have been added.  There should be 6 students present on the dom in TR elements, but found ${rows.length}`)
		}
	} catch( error ){
		displayMessage(['error with SGT displayAllStudents: ',error],'error');
		return false;
	}
	displayMessage('SGT displayAllStudents passed','green');

	if(testMethod( testSGT, 'displayAverage')) return
	try{
		if(parseFloat(elementSelectors.averageArea.eq(0).text()) != 66.5){
			throw new Error(`average area should have had a value of 66.5 after being stripped of extra zeros, but had an average of ${elementSelectors.averageArea.eq(0).text()}.  Did you calculate the average incorrectly?`)
		}
		if(elementSelectors.averageArea.eq(0).text() !== '66.50'){
			throw new Error(`average area should have had a value of 66.50, but had 66.5.  Make sure you used toFixed(2) on output to fix the precision of the output`)
		}
	} catch( error ){
		displayMessage(['error with SGT displayAverage: ',error],'error');
		return false;
	}
	displayMessage('SGT displayAverage passed','green');

	if(testMethod( testSGT, 'deleteStudent')) return
	try{
		var result = testSGT.deleteStudent(100);
		if(result!== false){
			throw new Error(`deleteStudent(100) should have returned false because there is no student by ID 100.  It returned ${result}`)
		}
		testSGT.createStudent('delete name','delete class',100,40,function(){});
		var allStudents = testSGT.readStudent();
		result = testSGT.deleteStudent(40);
		if(result!==true){
			throw new Error(`A new student with ID 40 was added.  deleteStudent(40) was called.  It should have returned true after deleting the student successfully.  It returned ${result}`)
		}
		var afterAllStudents = testSGT.readStudent();
		if(allStudents.length === afterAllStudents.length){
			throw new Error(`after deleteStudent(40) ran, students should only have ${allStudents.length-1}, but it had ${afterAllStudents.length}`)
		}

	} catch( error ){
		displayMessage(['error with SGT deleteStudent: ',error],'error');
		return false;
	}

	try{
		var beforeAllStudents = testSGT.readStudent();
		$buttons = $("#displayArea tr button");
		$($buttons[3]).click();
		var afterAllStudents = testSGT.readStudent();
		if($("#displayArea tr").length===5){
			throw new Error(`delete button on fourth student ("name") was clicked, but a row wasn't deleted`);
		}
		if(beforeAllStudents.length === afterAllStudents.length){
			throw new Error(`delete button on fourth student ("name") was clicked, but there are still ${beforeAllStudents.length} students in the SGT `);
		}
		if($("#displayArea tr td").eq(0).text()==='student3'){
			throw new Error(`delete button on fourth student ("name") was clicked, but still reading that a student with name 'student3' is in the dom`);
		}

	} catch( error ){
		displayMessage(['error with SGT deleting: ',error],'error');
		return false;
	}
	displayMessage('SGT deleteStudent passed','green');
	displayMessage('SGT object passed','green');
	displayMessage('SGT passed all tests','green');
	return true;
}

function startTests(){
	$(".errorMessage").remove();
	var testFunctions = ['student_tests', 'sgt_tests'];
	var i = 0;
	while( i<testFunctions.length){
		if (!window[testFunctions[i]]())
			return;
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



	if(modalMessage instanceof Error){
		// debugger;
		// var stackOutput = {};
		// Error.captureStackTrace(stackOutput, modalMessage);
		// var lineNumber = /tests\.js:(\d+)/.exec(stackOutput.stack)[1];
		// var preppedMessage = `tests.js: line ${lineNumber} ${modalMessage}`;
		console.error(modalMessage);
		preppedMessage = modalMessage;
		var advisor = $("<div>").text('CHECK CONSOLE FOR MORE INFO.').addClass('errorMessage')
	} else {
		preppedMessage = modalMessage;
		console.log(wholeMessage);
		advisor = '';
	}
	var element = $("<div>").text(preppedMessage).addClass(type + ' errorMessage');

	$("#errorArea").prepend(element, advisor);
}

function hasMethod(object, method){
	const name = object.constructor.name;

	if (object[method] === undefined) {
		return `Missing ${method} method in ${name}`;
	}

	if(typeof object[method] !== 'function') {
		return `${name} has a property named ${method} but it is not a method. Expected ${name}.${method} to be a method.`;
	}

	return true;
}

function testMethod( object, method ){
	try{
		if(object[method] === undefined){
			throw( new Error('missing method '+method+' in ' + object.constructor.name));
		}
	}
	catch (error){
		displayMessage(error);
		return false;
	}
}
var shadow;
var displayModal;
var modalContents;
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

		},
		id:'errorArea',
	})
	modalContents = $("<div>",{
		class: 'modalContainer'
	})
	modalContents.append(displayModal);

	runTestButton = $("<div>",{
		text: 'RUN',
		'class': 'runTestButton',
		on: {
			click: startTests
		}
	})
	minimizeButton = $("<div>",{
		text: '^',
		css: {
		},
		'class': 'minimizeButton',
		on: {
			click: hideModal
		}
	})
	modalContents.append(runTestButton);
	//modalContainer.hide();
	$('body').append( minimizeButton, modalContents );
	showModal();
}
function showModal(){
	minimizeButton.appendTo(modalContents);
	modalContents.show();
	minimizeButton.text('^').off('click', showModal).on('click', hideModal)
	//shadow.show();
}
function hideModal(){
	minimizeButton.appendTo('body');
	minimizeButton.text('v').off('click', hideModal).on('click', showModal)
	modalContents.hide();
	//shadow.hide();
}
