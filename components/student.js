

class Student{
	/* constructor - take in params for the student and save them,
		create storage for student dom elements
		store the deletion callback from the SGT_template class
		bind event handlers
	params:
		(number) id - the id of this student
		(string) name - the name of the student
		(string) course - the course of the student
		(number) grade - the grade of the student
		(function) deleteCallback - the removal function from the SGT_template to call when this student wants to be removed from the SGT_templates's list
	return: undefined (don't return undefined, it will screw it up a constructor, don't put a return)
	ESTIMATED TIME: 30 minutes to understand
	*/
	constructor(id, name, course, grade, deleteCallback=()=>{}){
		//this method has been built out to help you understand the general structure better
		this.data = {
			id: id,
			name: name,
			course: course,
			grade: parseInt(grade)
		};
		this.deleteCallback = deleteCallback;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operations: null,
			deleteButton: null
		};
		this.handleDelete = this.handleDelete.bind( this );
		this.render = this.render.bind(this);
	}

	/* getData - get all the student data as a simple object
	params: none
	return: (object) an object with the following data
		(number): id
		(string): name
		(string): course
		(number): grade
	ESTIMATED TIME: 30 minutes
	*/
	getData(){
		return this.data;
	}

	/* render - create and return a table row (TR) with 4 table cells (TD) in them:
		name : the student's name
		course : the student's course
		grade: the student's grade
		operations: holds any buttons for the student - will hold a delete button
	purpose:
		create the TR and 4 TDs,
		put the 4 TDs inside the TR.
		Add the button to the operation TD
		add the StudentRecord's handleDelete method to the delete button's click handler
		store all these values for any needed changes later
		return the TR
	params: none
	return: (jquery dom element) the row that contains the student dom elements
	ESTIMATED TIME: 2 hours
	*/
	render(){
		var tr = $("<tr>");
		var nameTD = $("<td>").text(this.data.name);
		var courseTD = $("<td>").text(this.data.course);
		var gradeTD = $("<td>").text(this.data.grade);
		var operationsTD = $("<td>");
		var deleteButton = $("<button>").on("click", this.handleDelete).text("delete");
		$(operationsTD).append(deleteButton);
		$(tr).append(nameTD, courseTD, gradeTD, operationsTD);
		this.domElements.row = tr;
		this.domElements.name = nameTD;
		this.domElements.course = courseTD;
		this.domElements.grade = gradeTD;
		this.domElements.operations = operationsTD;
		this.domElements.deleteButton = deleteButton;
		return tr;

		//TODO after completion of render, should be instructed to look at handleDelete;

	}

	/* handleDelete - call the SGT_template delete callback, and remove this student's dom element
	purpose:
		call the callback that was passed into the constructor - give it this object's reference
		remove this object's dom element row to erase the entire dom element
	ESTIMATED TIME: 15 minutes
	*/
	handleDelete(){
		console.log("handleDelete");
		this.deleteCallback(this.data.id);
		$(this.domElements.row).remove();



	}

	/* update - change a value in the student record
	purpose: ensure that the field is one that can be changed (either id, name, course, or grade)
		if not changable, return false
		otherwise update the value
			save the value into the properties stored in the constructor
			go to the dom element of the appropriate field and change the text
				(for example, if name was changed, go to the student's name TD and change the name as well)
			and return true
	params:
		(string) field - the field in the object to change
		(multiple) value - the value to change the field to
	return: (boolean) true if it was changed, false if it was not
	ESTIMATED TIME: 1.5 hours
	*/
	update( field, value ){
		console.log(field);
		if (typeof field !== "number" && typeof field !== "string") {
			return false;
		}

		switch (field) {
			case "id":
			  this.data.id = value;
			  break;
			case "name":
			  this.data.name = value;
			  $(this.domElements.name).text(value);
			  break;
			case "course":
			  this.data.course = value;
			  $(this.domElements.course).text(value);
			  break;
			case "grade":
			  this.data.grade = parseInt(value);
			  $(this.domElements.grade).text(value);
			  break;



		}

	}
}
