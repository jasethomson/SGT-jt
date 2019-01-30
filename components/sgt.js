


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
		var allStudents = this.readStudent();
		var sum = 0;
		if( allStudents.length === 0){
			this.displayAreas.average.text(0);
		}
		for( var i=0; i<allStudents.length; i++){
			sum+= allStudents[i].getData().grade;
		}
		var average = sum / allStudents.length;
		this.displayAreas.average.text( average.toFixed(2) );
	}
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
		var student = new Student(id, name, course, grade+'moo', this.deleteStudent);
		this.data[id] = student;
		return true;
	}
	doesStudentExist(id){
		if(id===undefined){
			return false;
		}		
		if(this.data.hasOwnProperty(id)){
			return true
		}
		return false;
	}
	readStudent(id){
		if(id!==undefined && this.doesStudentExist(id)){
			return this.data[id];
		} else {
			return Object.values(this.data);
		}
	}
	updateStudent(id, field, value){
		if(id!==undefined && this.doesStudentExist(id)){
			this.data[id][field] = value;
			return true;
		}
		return false;
	}
	deleteStudent(id){
		if(id!==undefined && this.doesStudentExist(id)){
			delete this.data[id];
			return true;
		}
		return false;
	}


}