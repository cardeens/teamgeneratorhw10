const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const info = [
        {
            type: "list",
            message: "What is the title of the employee?",
            choices: ["Manager", "Engineer", "Intern"],
            name: "empTitle"
        },
        {
            type: "input",
            message: "What is the employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employee's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",
            when: (answers) => answers.empTitle ==="Manager"
        },
        {
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "github",
            when: (answers) => answers.empTitle ==="Engineer"
        },
        {
            type: "input",
            message: "What school does the intern go to?",
            name: "school",
            when: (answers) => answers.empTitle ==="Intern"
        },
        {
            type: "confirm",
            message: "Would you like to add another employee?",
            name: "continue",
        }
    ]

    const empInfo = []

    const ask = () => inquirer.prompt(info).then(gatherInfo)

    const gatherInfo = (answers) => {
        empInfo.push(answers)
        if (answers.continue) {
            ask()
        } else {
        createEmployee(empInfo)
        }
    }
    
    const employees = []

    const createEmployee = () => {
        empInfo.forEach(employee => {
        let newEmp
        if (employee.empTitle === "Manager") {
            let name = employee.name
            let id = employee.id
            let email = employee.email
            let officeNumber = employee.officeNumber
            newEmp = new Manager(name, id, email, officeNumber)
        } else if (employee.empTitle === "Engineer") {
            let name = employee.name
            let id = employee.id
            let email = employee.email
            let github = employee.github
            newEmp = new Engineer(name, id, email, github)
        } else if (employee.empTitle === "Intern") {
            let name = employee.name
            let id = employee.id
            let email = employee.email
            let school = employee.school;
            newEmp = new Intern(name, id, email, school)
        }

        employees.push(newEmp)
        })

        createRoster(employees)
    }


    const createRoster = () => {
        const renderHTML = render(employees)
        console.log(employees)
        fs.writeFile(outputPath, renderHTML, function(err) {
            if(err) {
                return console.log(err)
            }

            console.log("Roster created!")
        })

        
    }

    ask();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```



