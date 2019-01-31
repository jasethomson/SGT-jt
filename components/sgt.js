


class SGT_template{
	/* constructor - sets up sgt object 
	params: (object) elementConfig - all pre-made dom elements used by the app
	purpose: instantiates a model and stores it in the object
	return: undefined
	*/
	constructor( elementConfig ){
		this.data = {};
		this.studentCount = 0;
		this.buttons = {
			add: elementConfig.addButton,
			cancel: elementConfig.cancelButton
		}
		this.inputs = {
			name: elementConfig.nameInput,
			course: elementConfig.courseInput,
			grade: elementConfig.gradeInput
		}
		this.displayAreas = {
			students : elementConfig.displayArea,
			average : elementConfig.averageArea
		}
		this.handleAdd = this.handleAdd.bind( this );
		this.handleCancel = this.handleCancel.bind( this );
		this.deleteStudent = this.deleteStudent.bind(this);
	}
	/* addEventHandlers - add event handlers to premade dom elements
	adds click handlers to add and cancel buttons using the dom elements passed into constructor
	params: none
	return: undefined
	*/

	addEventHandlers(){
		this.buttons.add.click( this.handleAdd );
		this.buttons.cancel.click( this.handleCancel );
	}
	/* clearInputs - take the three inputs and clear their values
	params: none
	return: undefined
	*/
	clearInputs(){
		this.inputs.name.val('');
		this.inputs.course.val('');
		this.inputs.grade.val('');
	}
	/* handleCancel - function to handle the cancel button press
	params: none
	return: undefined
	*/
	handleCancel(){
		this.clearInputs();
	}
	/* handleAdd - function to handle the add button click
	purpose: grabs values from inputs, utilizes the model's add method to save them, then clears the inputs and displays all students
	params: none
	return: undefined
	*/
	handleAdd(){
		this.createStudent( this.inputs.name.val(), this.inputs.course.val(), this.inputs.grade.val() );
		this.clearInputs();
		this.displayAllStudents();
	}
	/* displayAllStudents - iterate through all students in the model
	purpose: 
		grab all students from model, 
		iterate through the retrieved list, 
		then render every student's dom element
		then append every student to the dom's display area
		then display the grade average
	params: none
	return: undefined
	*/
	displayAllStudents(){
		var studentDoms = [];
		var allStudents = this.readStudent();
		for( var i=0; i< allStudents.length; i++){
			var currentStudent = allStudents[i];
			studentDoms.push( currentStudent.render() );
		}
		this.displayAreas.students.empty().append( studentDoms );
		this.displayAverage();
	}
	/* displayAverage - get the grade average and display it
	purpose: grab the average grade from the model, and show it on the dom
	params: none
	return: undefined */
	displayAverage(){
		this.displayAreas.average.text( this.model.calculateGradeAverage() );
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
	*/
	createStudent(name, course, grade, id){
		if(this.data.hasOwnProperty(id)){
			return false;
		}
		if(id===undefined){
			id = this.studentCount+1;
			while(this.data.hasOwnProperty(id)){
				id++;
			}
		}
		var student = new Student(id, name, course, grade, this.deleteStudent);
		this.data[id] = student;
		return true;
	}
	/* doesStudentExist - 
		deermines if a student exists by ID.  returns true if yes, false if no
	purpose: 
			check if passed in ID is a value, if it exists in this.data, and return the presence of the student
	params: 
		id: (number) the id of the student to search for
	return: false if id is undefined or that student doesn't exist, true if the student does exist
	*/
	doesStudentExist(id){
		if(id===undefined){
			return false;
		}		
		if(this.data.hasOwnProperty(id)){
			return true
		}
		return false;
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
	*/
	readStudent(id){
		if(id!==undefined && this.doesStudentExist(id)){
			return this.data[id];
		} else {
			return Object.values(this.data);
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
		true if it updatd, false if it did not
	*/
	updateStudent(id, field, value){
		if(id!==undefined && this.doesStudentExist(id)){
			this.data[id][field] = value;
			return true;
		}
		return false;
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
	*/
	deleteStudent(id){
		if(id!==undefined && this.doesStudentExist(id)){
			delete this.data[id];
			return true;
		}
		return false;
	}


}