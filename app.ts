#! /usr/bin/env node 

import chalk from "chalk";
import inquirer from "inquirer";


let todos: string[] = [];
console.log(chalk.blueBright.italic.bold("\n\t\tTo-Do List Project\n"))

let ask = await inquirer.prompt({
    name : "ans",
    type : "input",
    message : chalk.magentaBright("\nToDo List Name :")
})
let listName = ask.ans;
console.log(chalk.yellow.bold.italic(`ToDo List Of : ${listName}`))
//--------------------WHILE LOOP-----------------//
let whileCondition: boolean = true;

while (whileCondition === true) {

    //---------------------LOOP OPTIONS----------------//

    let list = await inquirer.prompt
        (
            [
                {
                    name: "qno1",
                    type: "list",
                    message: chalk.magentaBright("\nSelect an action you want to perform : "),
                    choices: ["Add", "Edit","Remove","View"]
                }
            ]
        )

    //---------------------- IF ADD OPTION SELECT--------------------//
    if (list.qno1 === "Add") {
        let ans = await inquirer.prompt
            (
                [
                    {
                        name: "userAns",
                        type: "input",
                        message: chalk.magentaBright("\nWhat do you want to add in your list?"),
                    }])
        if (ans.userAns !== "") {
            todos.push(ans.userAns);
            console.log(todos);

        }
        else {
            console.log(chalk.red.italic("\nPlease write something to add in the todo list !\n"));

        }
    }
    //-------------------IF EDIT OPTION SELECT ----------------------------//
    else if (list.qno1 === "Edit"){
        if (todos.length === 0){
            console.log(chalk.red.italic(`\nThe to-do list is empty!\n`));
        }
        else {

        let editAns = await inquirer.prompt([{
            name : "edit",
            type : "list",
            message : chalk.magentaBright("\nWhich item do you want to edit from the list?"),
            choices : todos
        },
        {
            name : "edited",
            type : "input",
            message : chalk.magentaBright("\nwrite new item in replace of older item!"),
        }
    ])

   
    let indexEdit = todos.indexOf(editAns.edit)
    if (indexEdit >= 0 && indexEdit < todos.length){
        todos.splice(indexEdit,1,editAns.edited)
        console.log(chalk.cyanBright(`\nYou Edit: `)+chalk.yellowBright(`${editAns.edit}`)+chalk.cyanBright(`\nEdited Item  :` )+chalk.yellowBright(`${editAns.edited}`));
        console.log(chalk.cyanBright.italic("Here Is Your Updated ToDo List : " )+(todos))
          
    }
}       
   
    }

    //---------------------IF REMOVE OPTION SELECT-----------------------//

    else if (list.qno1 === "Remove"){
        if (todos.length === 0 ){
            console.log(chalk.redBright.italic("\nThe to-do list is empty\n"));
        }
        else {
        let removeChoice = await inquirer.prompt(
            [
                {
                    name: "removeList",
                    type: "list",
                    message: chalk.cyan("\nSelect List to remove ! "),
                    choices: todos,

                }]);
                   

        let indexRemove = todos.indexOf(removeChoice.removeList)

        if (indexRemove >= 0) {
            todos.splice(indexRemove,1,);
            console.log(chalk.cyanBright(`You Remove : `)+chalk.yellow(`${removeChoice.removeList}! `));
            console.log(chalk.cyanBright("Current ToDo List :  ")+(todos));
        }
    }
    }
    //--------------------IF VIEW OPTION SELECT---------------------------------//

    if (list.qno1 === "View"){
        if (todos.length === 0 ){
            console.log(chalk.red.italic("\nThe to-do list is empty\n"));
        }
        else {
            console.log(chalk.cyanBright(`Your current to-do list is: \n`)+ chalk.yellow(`${todos}`));
            
        }
    }

    //-------------------CONFIRMATION FOR COUNTINUE PROGRAM--------------------------------//
    let user_ans = await inquirer.prompt(
        [
            {
                name: "selection",
                type: "confirm",
                message: chalk.cyan("\nDo you want to continue?"),
                default: true,
            }
        ]
    )
    if (user_ans.selection === false) {
        whileCondition = false;
    }



    

}
console.log(chalk.grey.bold(`\nThank you for using to-do list. Here is your list at the end of the program`) + chalk.yellowBright(`\n"${todos}". `));

