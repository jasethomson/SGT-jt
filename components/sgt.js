


class SGT_template{
	/* constructor - sets up SGT object and storage of students
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: stores the appropriate DOM elements inside of an object
		and uses those reference for later portions of the application
	return: undefined
	*/
	constructor( elementConfig ){
		console.log(elementConfig);
		this.data = {};
		this.domElements = elementConfig;

		// this.clearInputs = this.clearInputs.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.createStudent = this.createStudent.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.doesStudentExist = this.doesStudentExist.bind(this);


	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	addEventHandlers(){
		$(this.domElements.addButton).on("click", this.handleAdd);
		$(this.domElements.cancelButton).on("click", this.handleCancel);


	}

	/* clearInputs - take the three inputs and clear their values
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	clearInputs(){
		$(this.domElements.nameInput[0]).val("");
		$(this.domElements.courseInput[0]).val("");
		$(this.domElements.gradeInput[0]).val("");


	}

	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/
	handleCancel(){
		this.clearInputs();

	}

	/* createStudent - take in data for a student, make a new Student object, and add it to this.data object

		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	purpose:
			If no id is present, it must pick the next available id that can be used
			when it creates the Student object, it must pass the id, name, course, grade,
			and a reference to SGT's deleteStudent method
	params:
		name : the student's name
		course : the student's course
		grade: the student's grade
		id: the id of the student
	return: false if unsuccessful in adding student, true if successful
	ESTIMATED TIME: 1.5 hours
	*/
	createStudent(name, course, grade, id){
		if (this.data[id]){
			return false;
		}
		if(!id) {
			for (var student in this.data){
				id = student;
			}
			id++;

		}

		var newStudent = new Student(id, name, course, grade, this.deleteStudent);
		this.data[id] = newStudent;
		return true;

	}

	/* doesStudentExist -
		deermines if a student exists by ID.  returns true if yes, false if no
	purpose:
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params:
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	ESTIMATED TIME: 15 minutes
	*/
	doesStudentExist(id){

		if(this.data.hasOwnProperty(id)){
			return true;
		} else {
			return false;
		}

	}

	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the createStudent method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	ESTIMATED TIME: 1 hour
	*/
	handleAdd(){
		var name = $(this.domElements.nameInput[0]).val();
		var course = $(this.domElements.courseInput[0]).val();
		var grade = $(this.domElements.gradeInput[0]).val();
		this.createStudent(name, course, grade);
		this.clearInputs();
		this.displayAllStudents();

	}

	/* readStudent -
		get the data for one or all students
	purpose:
			determines if ID is given or not
			if ID is given, return the student by that ID, if present
			if ID is not given, return all students in an array
	params:
		id: (number)(optional) the id of the student to search for, if any
	return:
		a singular Student object if an ID was given, an array of Student objects if no ID was given
		ESTIMATED TIME: 45 minutes
	*/
	readStudent(id){
		if(!id) {
			var studentArray =  Object.values(this.data);
			console.log(studentArray);
			return studentArray;
		}
		if(id){
			if (!this.data.hasOwnProperty(id)){
				return false;
			}
			return this.data[id];
		}

	}

	/* displayAllStudents - iterate through all students in the this.data object
	purpose:
		grab all students from this.data,
		empty out every student in the dom's display area,
		iterate through the retrieved list,
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	ESTIMATED TIME: 1.5 hours
	*/
	displayAllStudents(){
		$("#displayArea").empty();
		for (var students in this.data){
			console.log(this.data[students]);
			$("#displayArea").append(this.data[students].render());
		}
		this.displayAverage();

	}

	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from students in this.data, and shows it on the dom
	params: none
	return: undefined
	ESTIMATED TIME: 15 minutes
	*/

	displayAverage(){
		var grade = null;
		var numberOfStudents = null;
		for (var students in this.data){
			console.log(this.data[students].data.grade);
			grade += this.data[students].data.grade;
			numberOfStudents++;
		}
		var average = grade/numberOfStudents;
		var prettyAverage = average.toFixed(2);
		$(".avgGrade").text(prettyAverage);


	}

	/* deleteStudent -
		delete the given student at the given id
	purpose:
			determine if the ID exists in this.data
			remove it from the object
			return true if successful, false if not
			this is often called by the student's delete button through the Student handleDelete
	params:
		id: (number) the id of the student to delete
	return:
		true if it was successful, false if not
		ESTIMATED TIME: 30 minutes
	*/
	deleteStudent(id){
		console.log(id);
		if(this.data.hasOwnProperty(id)){
			console.log(this.data.id);
			delete this.data[id];
			return true;
		} else {
			return false;
		}

	}

	/* updateStudent -
		not used for now.  Will be used later
		pass in an ID, a field to change, and a value to change the field to
	purpose:
		finds the necessary student by the given id
		finds the given field in the student (name, course, grade)
		changes the value of the student to the given value
		for example updateStudent(2, 'name','joe') would change the name of student 2 to "joe"
	params:
		id: (number) the id of the student to change in this.data
		field: (string) the field to change in the student
		value: (multi) the value to change the field to
	return:
		true if it updated, false if it did not
		ESTIMATED TIME: no needed for first versions: 30 minutes
	*/
	updateStudent(){

	}


}
