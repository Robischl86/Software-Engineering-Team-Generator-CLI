const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,

const employees = [];
const engineers = [];
const interns = [];
const managers = [];
let id = 0;

function TeamQuestion() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which team member would you like to add?",
            name: "addMember",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function(data){
        role = data.addMember;
        if (data.addMember === "Manager") {
            addManager();
        }
        else if (data.addMember === "Engineer") {
            addEngineer();
        }
        else if (data.addMember === "Intern") {
            addIntern();
        }
    })
}

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the manager's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the manager's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the office number?",
            name: "officeNumber"
        }
    ]).then(function(info) {
        const manager = new Manager(
            info.name,
            info.id,
            info.email,
            //info.github,
            info.officeNumber
        );
        console.log(manager);
        employees.push(manager);
        repeatQuestion();
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineer's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the engineer's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is the engineer's gitHub?",
            name: "github"
        }
    ]).then(function(info) {
        const engineeer = new Engineer(
            info.name,
            info.id,
            info.email,
            info.github,
            "Engineer"
        );
        employees.push(engineeer);
        console.log(engineeer);
        repeatQuestion();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the intern's ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What school did your intern go to?",
            name: "school"
        }
    ]).then(function(info) {
        const intern = new Intern(
            info.name,
            info.id,
            info.email,
            info.school
        )
        console.log(intern);
        employees.push(intern);
        repeatQuestion();
    })
}

function repeatQuestion() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Add another team member?",
            name: "repeat"
        }
    ]).then(function(data) {
        if (data.repeat == true) {
            TeamQuestion();
        }
        else {
            completeTeam(employees);
        }
    })
}

function completeTeam(employees) {
    console.log("Success!");
    console.log(employees);
    const html = render(employees);
    console.log(html);
    fs.writeFileSync("./output/team.html", html, "utf-8")

}

TeamQuestion();
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
// for the provided `render` function to work! ```
