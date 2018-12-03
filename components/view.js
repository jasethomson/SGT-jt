


class View{
	constructor( elementConfig ){
		this.model = new Model();
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
	}
	addEventHandlers(){
		this.buttons.add.click( this.handleAdd );
		this.buttons.cancel.click( this.handleCancel );
	}
	clearInputs(){
		this.inputs.name.val('');
		this.inputs.course.val('');
		this.inputs.grade.val('');
	}
	handleCancel(){
		this.clearInputs();
	}
	handleAdd(){
		this.model.add( this.inputs.name.val(), this.inputs.course.val(), this.inputs.grade.val() );
		this.clearInputs();
		this.displayAllStudents();
	}
	displayAllStudents(){
		var allStudents = this.model.getAllStudents();
		var studentDoms = [];
		for( var i=0; i< allStudents.length; i++){
			studentDoms.push( allStudents[i].render() );
		}
		this.displayAreas.students.empty().append( studentDoms );
		this.displayAverage();
	}
	displayAverage(){
		this.displayAreas.average.text( this.model.calculateGradeAverage() );
	}
}