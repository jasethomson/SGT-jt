# Version 0.1

<<<<<<< HEAD
## Version 0.1
#### Description
Version 0.1 is the starting point of the Student Grade Table Project. LearningFuze has provided a base structure that
includes HTML structure that is formatted with bootstrap.  For this version, you will adapt this to NOT use bootstrap.  Look up the CSS classes and figure out what bootstrap does for it, and then apply it manually.  Remember, don't take longer than one day working on this.

- Start with the v.1lf branch and work from there.

- <a href="https://github.com/Learning-Fuze/SGT/tree/v.1lf#design">View Design</a>

##### startup instructions
- start at v.1lf
- make a new branch v.1
- perform work on v.1
- no need to do pull request

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

##### startup instructions
- start at v.1
- make a new branch v.25
- perform work on v.25
- no need to do pull request

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

##### startup instructions
- start at v.25
- make a new branch v.5
- perform work on v.5
- no need to do pull request

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

##### startup instructions
- start at v.5
- make a new branch v.75
- perform work on v.75
- do a pull request for v.75

## Version 1.0
#### Description
Version 1.0 picks up where 0.75 left off. You will now be populating records from a database via the LearningFuze SGT API. This version will only be pulling entries, you will not be adding anything to the database for this version. You should still be able to add entries locally as you did before.

- <a href="https://github.com/Learning-Fuze/SGT/tree/v1.0lf#getting-started" target="_blank">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v1.0lf#scope" target="_blank">View Scope</a>

##### startup instructions
- start at v.75
- make a new branch v1.0
- perform work on v1.0
- no need to do a pull request

## Version 2.0
#### Description
Version 2.0 adds more CRUD functionality.  Previously you added R (Read), and now you will be adding Create and Delete functionality. You will now be adding records to a database via the LearningFuze SGT API.

- <a href="https://github.com/Learning-Fuze/SGT/tree/v2.0lf#getting-started" target="_blank">Getting Started</a>
- <a href="https://github.com/Learning-Fuze/SGT/tree/v2.0lf#scope" target="_blank">View Scope</a>

##### Don't forget to check out the additional "error checking" section in the scope above!  This can be critical to a good user experience!

##### startup instructions
- start at v1.0
- make a new branch v2.0
- perform work on v2.0
- do a pull request for v2.0

## Version 3.0 - not done now
#### Description
Version 3.0 will see you writing the server aspects of the SGT.  You will make PHP endpoints that will take over from the LFZ servers.

## Version 4.0 - not done now
#### Description
Version 4.0 will introduce databases to your backend.  You will create, read, and delete information from the database through your backend endpoint, serving the data to your front end.
=======
Version 1 is the starting point.  The HTML/CSS has already been made.  You will start from this version.
- it already has html
- it already has bootstrap css
- it has template files for the JS
- it has an auto-tester that will give you feedback on your code

# Student object
- start with mod2_base branch
- review /components/student.js constructor
- review the incoming data into the constructor
- review the binding and note how it works
### Version .2 - getData (30 minutes) - return the data stored in the object's data object
- takes in no parameters
- reads the object's data property
- returns an object of the data in the object's data object
### Version .21 - render (2 hours) - create the dom elements for the student 
- takes in no parameters
- reads the object's data property
- makes a row to hold the object's visual data. 
    - creates TR
    - Stores the row into the object's domElements property
- makes a td to hold the name
    - creates a TD
    - puts the student's name in the td
    - saves the TD to the object's domElements propery
- makes a td to hold the course
    - creates a TD
    - puts the student's course into the td
    - saves the TD to the object's domElements property
- makes a TD to hold the grade
    - creates a TD
    - puts the student's grade into the td
    - saves the TD into the object's domElements property
- makes an operation TD to hold the button
    - saves the TD into the domElement's property
- makes a delete button to delete the student
    - creates a button element
    - puts the word "delete" into it
    - adds a click handler that calls this object's handleDelete method
    - add the delete button to the object's domElements properties
    - add the delete button to the operations TD
- return the TR to the function that called this function

### Version .22 - handleDelete (15 minutes) - handle the click of the delete button
- takes in no parameters
- calls the deleteCallback property stored in this object
    - passes back the ID of the deleteCallback
- makes a row to hold the object's visual data. 

### Version .23 - update (1.5 hours) - update the stored data AND the dom elements
- takes in field and value.  field is the name, course, or grade as a string, then value is the value to change
- calls the deleteCallback property stored in this object
    - passes back the ID of the deleteCallback
- makes a row to hold the object's visual data.

# SGT_Template
- start with version.23 branch
- review /components/sgt.js constructor
### Version .5 - constructor (1 hour) - store construction data
- take in parameters
- store parameters into properties/methods

### Version .51 - addEVentHandlers (15 minutes) - add eventhandlers to dom elements

### Version .52 - clearInputs (15 minutes) - clear the inputs on the dom

### Version .53 - handleCancel (15 minutes) - handle the click on the cancel button and clear the inputs

### 


## Getting Started
> - Are you on your master branch?
    - **Yes** - continue to "Pull Latest Changes"
    - **I dont know** Run the command below
        - `git branch` - this will highlight the branch you are currently on
    - **No** - Make sure you `git add .` and `git commit` to your current branch before you switch to your master branch
> - Pull Latest Changes
        - `git checkout master`
        - `git pull origin master` - **Now continue with the next steps**
> - Create a feature branch
    - `git checkout -b v0.1`
> - Work on the scope defined <a href="https://github.com/Learning-Fuze/SGT/tree/v.1#scope">Below</a>
> - Add files to git
    - `git add .`
> - Commit files (Group files together)
    - `git commit -m "SGT v0.1 - Your Name"`
    - **Replace "Your Name" with your first and last name**
> - Send to gitHub (Push)
    - `git push origin v0.1`
> - Create pull request
    - Pull request should be made from v0.1 to **your repository's/teams** master branch


## Scope
> - Styling
    - Apply bootstrap styling to all <a href="http://getbootstrap.com/css/#buttons">buttons</a> & <a href="http://getbootstrap.com/css/#forms" target="_blank">form elements</a>
    - Apply bootstrap <a href="http://getbootstrap.com/css/#tables" target="_blank">table styling</a>
    - Apply look using boostrap only based on the designs <a href="https://github.com/ej020586/SGT/tree/v.1#design">below</a>. <b>Please note that no additional style sheets have been added</b>
- JS Functionality
    - Build out all functions & variables based on jsDoc (<a href="https://en.wikipedia.org/wiki/JSDoc" target="_blank">What is this?</a>) comments inside the script.js file
    - Form
        - On click of add button
            - call appropriate function in on click attribute
            - Add values inside the form into an object and store that object in the student_array global variable
            - Display all student data stored in the student_array inside the bootstrap table structure
            - Clear values inside the form elements
        - On click of cancel button
            - Clear values inside the form elements
    - on Dom Load
        - Reset application to its default state
        - Display all student data stored in the student_array inside the bootstrap table structure
    - on update of student_array data, calculate and show average student grade rounded to the nearest whole number and display inside .avgGrade element

## Design
> #### Mobile appearance
<img src="https://cloud.githubusercontent.com/assets/10343746/9148427/0384d076-3d30-11e5-83ff-4d10ae2daf70.png" width="200"/>
#### No Data available appearance
<img src="https://cloud.githubusercontent.com/assets/10343746/9148435/1d8f2bc4-3d30-11e5-926d-72a2a086fd8b.png" width="500"/>
#### Data available appearance
<img src="https://cloud.githubusercontent.com/assets/10343746/9148437/22e2566e-3d30-11e5-9401-ba2cb8309d65.png" width="500"/>
>>>>>>> mod2_base

