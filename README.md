# Version 0.1

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
- returns the object's data property
### Version .21 - render (2 hours) - create the dom elements for the student 
- takes in no parameters
- reads the object's data property
- makes a row to hold the object's visual data. 
    - creates TR
    - Stores the row into the object's domElements property
- makes a td to hold the name
    - creates a TD
    - puts the student's name in the td
    - saves the TD to the object's domElements property
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
    - passes in the ID property of the data object to the deleteCallback
- removes the row from the DOM

### Version .23 - update (1.5 hours) - update the stored data AND the dom elements
- takes in field and value.  field is the name, course, or grade as a string, then value is the new value
- calls the deleteCallback property stored in this object
    - passes in the ID property of the data object to the deleteCallback
- updates the row of the field with the new text.

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

