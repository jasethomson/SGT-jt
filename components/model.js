

class Model{
	constructor(){
		this.students = [];
		this.remove = this.remove.bind( this );
	}

	add( newName, newCourse, newGrade ){
		var id = this.students.length;
		var student = new StudentRecord( id, newName, newCourse, newGrade, this.remove );
		this.students.push( student );

	}

	remove( student ){
		var studentIndex = this.students.indexOf( student );
		this.students.splice( studentIndex, 1);
	}

	getAllStudents(){
		return this.students;
	}
	getStudentByField( field, value ){
		for( var i = 0; i < this.students.length; i++){
			var currentStudent = this.students[i];
			var data = currentStudent.getData();
			if(data[field] === value){
				return currentStudent;
			}
		}
		return -1;
	}
	calculateGradeAverage(){
		var sum = 0;
		for( var i=0; i< this.students.length; i++){
			sum += this.students[i].getData().grade;
		}
		return sum/ this.students.length;
	}
}