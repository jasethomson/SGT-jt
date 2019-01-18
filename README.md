# SGT - Student Grade Table

## Version 0.1
#### Description
Version 0.1 is the starting point of the Student Grade Table Project. LearningFuze has provided a base structure that
includes HTML structure that is formatted with bootstrap.  For this version, you will adapt this to NOT use bootstrap.  Look up the CSS classes and figure out what bootstrap does for it, and then apply it manually.  Remember, don't take longer than one day working on this.

- Start with the v.1lf branch and work from there.

- <a href="https://github.com/Learning-Fuze/SGT/tree/v.1lf#getting-started">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v.1lf#scope">View Scope</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v.1lf#design">View Design</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v.1lf#assignments---aka-criteria-for-success-on-this-version-of-the-project">View Assignments</a>

## Version .25 - student view
#### Description
Version .25 starts the base functionality of the application.  You'll start with your bootstrapless .1 version and code the smallest component that is used by the other components: components/studentrecord.js
- This component is the basis for each student's visible record (what we will later call a student "view")
- methods: 
    - constructor - takes in base student data (id, name, course, grade) and delete callback from the parent
    - update - update the record's internal data and then reflect that change on the object's dom element
    - getData - get the student's current stored data
    - render - create the dom elements for the object, store them, and return them
    - handleDelete - remove the dom element associated with this object and notify this object's parent of a pending deletion

## Version .5 - sgt model
#### Description
Version .5 adds functionality for the model, which will store student record objects and general data storage.  Kind of like a bank of data for the app.
- code will be placed in components/model.js
- We often call these sorts of storage "models".  This is part of a paradigm called "MVC", or "model-view-controller"
- methods: 
    - constructor - creates storage for data
    - getNextID - increments the id counter and returns the new value
    - add - takes in a name, course, and grade and creates a new student record.  then stores that record
    - remove - removes the indicated student from the data storage
    - getStudentByField - takes in a given field/value, searches the student records, and returns the matching student record
    - calculateGradeAverage - goes through all students and calculates the average amongst all the grades

### version.75 - sgt controller
#### Description
Version .75 adds the main controller object that ties in the model and the view.
- found in file components/sgt.js
- doesn't have to be called a controller.  The controller basically acts like a traffic cop between the model and the view.
- This is not a true MVC (if there is such a thing) in that this controller acts as both the view and the controller for the application, while studentRecord acts as both the model, view, and controller for a student
- methods: 
    - constructor -  loads in the configuration and stores the dom elements the app needs to track, like buttons, inputs, and display areas
    - addEventHandlers - adds event handlers to main buttons
    - clearInputs - goes to the inputs and removes their contents
    - handleCancel - performs operations when cancel button is pressed
    - handleAdd - performs operations when add buttons is pressed
    - displayAllStudents - show all the student records from the model on the display area
    - displayAverage - have the model calculate the average and display that average

## Version 1.0
#### Description
Version 1.0 picks up where 0.5 left off. You will now be populating records from a database via the LearningFuze SGT API. This version will only be pulling entries, you will not be adding anything to the database for this version. You should still be able to add entries locally as you did before.

- <a href="https://github.com/Learning-Fuze/SGT/tree/v1.0lf#getting-started" target="_blank">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v1.0lf#scope" target="_blank">View Scope</a>

## Version 2.0
#### Description
Version 2.0 adds more CRUD functionality.  Previously you added R (Read), and now you will be adding Create and Delete functionality. You will now be adding records to a database via the LearningFuze SGT API.

- <a href="https://github.com/Learning-Fuze/SGT/tree/v2.0lf#getting-started" target="_blank">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v2.0lf#scope" target="_blank">View Scope</a>

## Version 3.0 - not done now
#### Description
Version 3.0 will see you writing the server aspects of the SGT.  You will make PHP endpoints that will take over from the LFZ servers.

## Version 4.0 - not done now
#### Description
Version 4.0 will introduce databases to your backend.  You will create, read, and delete information from the database through your backend endpoint, serving the data to your front end.

