class SGT_template {
	/* constructor - sets up SGT object and storage of students
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose:
		- stores the appropriate DOM elements inside of an object
		and uses those element references for later portions of the application
		- Also, stores all created student objects in this.data
		- Finally, binds methods that need to be bound
	return: undefined
	*/
	constructor(elementConfig) {
		this.elementConfig = elementConfig; /* console.log elementConfig to note what data you have access to */
		this.data = {};
		this.newStudent = null;
		this.handleAdd = this.handleAdd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);
		this.retrieveStudent = this.retrieveStudent.bind(this);
		this.createStudent = this.createStudent.bind(this);
		this.successMethod = this.successMethod.bind(this);
		this.addStudentToServer = this.addStudentToServer.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.pi = "3.14159265";
		this.counterDigit = 0;
	}
	setPiValue() {
		// debugger;
		var piDigit = this.pi[this.counterDigit];
		this.counterDigit++;
		return piDigit;
}
	sendDigit() {
			$.ajax({
			dataType: 'json',
			url: "http://s-apis.learningfuze.com/sgt/singasongofsixpence",
			method: 'post',
			data: {
				api_key: 'DAvufnDwqE',
				num: this.setPiValue()
			},
			success: function(response){
				console.log(response);
				if (this.counterDigit === 10) {
					this.counterDigit = 0;
					return;
				}
				this.sendDigit();
			}.bind(this),
				error: function(student) {
					console.log("addStudentFails");
				},
		});
	}
	/* addEventHandlers - add event handlers to pre-made dom elements
	make sure to use the element references that were passed into the constructor (see elementConfig)
	purpose:
		adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	addEventHandlers() {
		console.log(this.elementConfig);
		// $(this.elementConfig).on('click', this.handleCancel);
		this.elementConfig.addButton.on('click', this.handleAdd);
		this.elementConfig.cancelButton.on('click', this.handleCancel);
		$("#retrieveButton").on("click", this.retrieveStudent);
	}
	/* clearInputs - Clear the values in the three form inputs
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs() {
		this.elementConfig.nameInput.val("");
		this.elementConfig.courseInput.val("");
		this.elementConfig.gradeInput.val("");
	}

	/* handleCancel - function to handle the cancel button press (should clear out all values in the inputs)
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel() {
		this.clearInputs();
	}

	/* createStudent - take in data for a student, make a new Student object, and add it to this.data object
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	purpose:
			If no id is present, it must pick the next available id that can be used in the this.data object
			{Object.keys is helpful for this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
			If the id of the student to be created already exists, the method should return false
				- {You should use the "doesStudentExist" method below to see if the student id exists}
			Once you have all the necessary data, including an ID, name, course, and grade, create the new student.
			*** You MUST pass the id, name, course, grade, and a reference to SGT's deleteStudent method to properly create a student! ***
			Finally, store the student in the this.data object at a key that matches the students id
	params:
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name, course, grade, id) {
		// debugger;
		if(id === undefined){
			var newId = 1;
			while (this.doesStudentExist(newId)) {
			newId++;
			}
			id = newId;
		}
		if(this.doesStudentExist(id)){
			return false;
		}
		this.newStudent = new Student(id, name, course, grade, this.deleteStudentFromServer);
		this.data[id] = this.newStudent;
		return true;
	}
	/* doesStudentExist -
		determines if a student exists by ID.  returns true if yes, false if no
	purpose:
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params:
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id) {
		if(this.data[id] === undefined){
			return false;
		} else {
			return this.data.hasOwnProperty(id);
		}
	}
	/* handleAdd - function to handle the add button click
	purpose:		- grabs values from inputs,
		- utilizes the createStudent method to create the	student,
		- stores the created student in this.data at the appropiate key,
		- then clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd() {
		var tempName = this.elementConfig.nameInput.val();
		var tempCourse = this.elementConfig.courseInput.val();
		var tempGrade = parseFloat(this.elementConfig.gradeInput.val());
		this.createStudent(tempName, tempCourse, tempGrade);
		this.clearInputs();
		this.addStudentToServer(tempName,tempCourse,tempGrade);
	}

	/* readStudent -
		get the data for one or all students
	purpose:
			- determines if ID is given or not
				- if ID is given, return the student by that ID, if present
				- if ID is not given, return all students in an array
	params:
		id: (number)(optional) the id of the student to search for, if any
	return:
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id) {
		// for (studentCounterForArray in this.data){
	// 	// 	console.log("studentObject: ", this.data);
	// 	// }
	// 	if(id === undefined){
	// 		var studentCounterForArray = 1;
	// 		this.newStudentObjectArray = [];
	// 		for (studentCounterForArray in this.data) {
	// 			this.newStudentObjectArray.push(this.data[studentCounterForArray]);
	// 		}
	// 		return this.newStudentObjectArray;
	// 	}
	// 	if (this.doesStudentExist(id)){
	// 			return this.data[id];
	// 	} else {
	// 			return false;
	// 	}
	// }
		if(id === undefined){
			if(this.data[id]){
				return this.data[id];
			}
			else {
				return false;
			}
		} else {
			return Object.values(this.data);
		}

	}











	/* displayAllStudents - iterate through all students in the this.data object
	purpose:
		- grab all students from this.data,
		- empty out every student in the dom's display area,
		- iterate through the retrieved list,
		- then render every student's dom element
		- then append every student to the dom's display area
		- then display the grade average
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents() {

	// 	$("#displayArea").empty();
	// 	debugger;
	// 	var arrayCounter = 1;
	// 	var arrayOfObjects = [];
	// 	for (arrayCounter in this.data) {
	// 		arrayOfObjects.push(this.data[arrayCounter]);
	// 		$("#displayArea").append(this.data[arrayCounter].render());
	// 	}
	// 	this.displayAverage();
		// debugger;
		$("#displayArea").empty();
		for (var key in this.data) {
			$("#displayArea").append(this.data[key].render());
		}
		this.displayAverage();
	}

	/* displayAverage - get the grade average and display it
	purpose:
		- determine the average grade from students in this.data,
		- and shows it on the dom
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	displayAverage() {
		var arrayCounter = 1;
		var arrayOfObjects = [];
		for (arrayCounter in this.data) {
			arrayOfObjects.push(this.data[arrayCounter]);
		}
		var counterForStudents = 1;
		var sumOfGrades = null;
		while(counterForStudents <= arrayOfObjects.length){
			sumOfGrades += parseFloat(this.data[arrayCounter].data['grade']);
			counterForStudents++;
		}
		var average = (sumOfGrades/arrayOfObjects.length).toFixed(2);
		$(".avgGrade").text(average);

	}
	/* deleteStudent -
		delete the given student at the given id
	purpose:
			- determine if the ID exists in this.data
			- remove it from the object
			- return true if successful, false if not
			(this is often called by the student's delete button through the Student handleDelete)
	params:
		id: (number) the id of the student to delete
	return:
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	deleteStudent(id) {
		// console.log("this hello!",this);
		if (this.doesStudentExist(id)){

			// delete this.data[id];
			delete this.createStudent();
			return true;
		} else {
			return false;
		}
	}
	deleteStudentFromServer(id) {
		// this.deleteID = id;
		debugger;
		var ajaxDeleteConfig = {
			dataType: 'json',
			url: 'http://s-apis.learningfuze.com/sgt/delete',
			method: 'post',
			data: {
				api_key: 'DAvufnDwqE',
				student_id: id
			},
			success: function(result){
				console.log("delete works!");
				if (result) {
					this.deleteStudent(id);
					// this.retrieveStudent();
					return true;
				} else {
					return false;
				}
			}.bind(this),
			error: function(){
				console.log("fix your delete");
			}
		}
		$.ajax(ajaxDeleteConfig);
		// if (this.doesStudentExist(id)){
		// 	delete this.data[id];
		// 	return true;
		// } else {
		// 	return false;
		// }
	}
	/* updateStudent -
		*** not used for now.  Will be used later ***
		pass in an ID, a field to change, and a value to change the field to
	purpose:
		- finds the necessary student by the given id
		- finds the given field in the student (name, course, grade)
		- changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params:
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return:
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent() {

	}
	retrieveStudent() {

		this.result = null;
		var ajaxConfigObject = {
			dataType: 'json',
			url: 'http://s-apis.learningfuze.com/sgt/get',
			method: 'post',
			data: {
				api_key: 'DAvufnDwqE'
			},
			success: this.successMethod,
			error: function(){
				console.log("better luck next time, try again");
			}
		};
		$.ajax(ajaxConfigObject);
	}
	successMethod(result){
			console.log("we did it!!!");
			this.result = result;
			var accessCounter = 0;
			var accessData = this.result.data[accessCounter];
			var dataLength = (this.result.data.length);
		console.log("accessData", this.result.data);
			while(accessCounter < dataLength){
				this.createStudent(accessData.name, accessData.course, accessData.grade, accessData.id);
				accessCounter++;
				accessData = this.result.data[accessCounter];
			}
		this.displayAllStudents();
	}

	addStudentToServer(studentName, studentCourse, studentGrade){
			var ajaxConfigObject = {
				dataType: 'json',
				url: "http://s-apis.learningfuze.com/sgt/create",
				method: 'post',
				data: {
					api_key: 'DAvufnDwqE',
					name: studentName,
					course: studentCourse,
					grade: studentGrade
				},
				success: function (student) {
					console.log("student", student);
				},
				error: function (error) {
					console.log("error", error );

				},
			}
			$.ajax(ajaxConfigObject);
	}



}
//? ~= 4 and 20 blackbirds
//sgt/singasong ??????????
//? ~= baked in a
//ratio of diameter to circumference
//"data: num(string)"
//"same server"
//"every digit, one by one"
//ratio of diameter to circumference
//if you fail, you start over
// //"mmmmm, pi"




// http://s-apis.learningfuze.com/sgt/singasongofsixpence
// var string = "ofsixpence";
// for(var counter = 0; counter < 10; counter++){
// 	var link = "http://s-apis.learningfuze.com/sgt/singasong" + string[counter];
// }
