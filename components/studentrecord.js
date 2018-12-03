

class StudentRecord{
	constructor(id, name, course, grade, deleteCallback=()=>{}){
		this.data = {
			id: id,
			name: name,
			course: course,
			grade: parseInt(grade)
		}
		this.deleteCallback = deleteCallback;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operations: null,
			deleteButton: null
		}
		this.handleDelete = this.handleDelete.bind( this );
	}
	update( field, value ){
		var allowedFields = ['id', 'name', 'course', 'grade'];
		if( allowedFields.indexOf( field ) !== -1 ){
			this.data[field] = value;
			return true;
		}
		console.error('cannot modify '+ field);
		return false;
	}
	getData(){
		return this.data;
	}
	render(){
		this.domElements.row = $("<tr>");
		this.domElements.name = $("<td>").text( this.data.name );
		this.domElements.course = $("<td>").text( this.data.course );
		this.domElements.grade = $("<td>").text( this.data.grade );
		this.domElements.operations = $("<td>");
		this.deleteButton = $("<button>",{
			text: 'delete',
			'class': 'btn btn-lrg btn-danger',
			on: {
				click: this.handleDelete
			}
		});
		this.domElements.operations.append( this.deleteButton );
		this.domElements.row.append(this.domElements.name, this.domElements.course, this.domElements.grade , this.domElements.operations);
		return this.domElements.row;
	}
	handleDelete(){
		this.deleteCallback( this );
		this.domElements.row.remove();
	}
}