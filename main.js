#! /usr/bin/env node 
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns/differenceInSeconds";
const res = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: "Please Enter The Amount Of Seconds!",
        validate: (input) => {
            if (isNaN(input)) {
                return "please Enter Valid Number";
            }
            else if (input > 60) {
                return "Seconds Must Be In 60";
            }
            else {
                return true;
            }
            ;
        }
    }
]);
let input = res.userInput; // yaani res k var k name mn userinput mn jo user input dega wo input k ar mn add hojayga  
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log("Timer Has Expired");
            process.exit(); // 1 hour mn 3600 sec hoty hyn
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor((timeDiff % 60)); // "0" or yahan empty sace ko 0 sy fill kardo
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`); // (2,"0" y hamny 2 max length di hy k hamary 0 double yaani 2 ayn
    }), 1000); // yaan hamny arrow func banaya jo harsec k bad fire hoga
} // new date s ham sec mints hour get karsakty hynnn...
startTime(input);
