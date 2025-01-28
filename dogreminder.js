const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
 
let dogs = []; // Array to store dog information
 
function addDog() {
    rl.question('What is the name of your dog? ', (dogName) => {
        const formattedName = dogName.trim().charAt(0).toUpperCase() + dogName.trim().slice(1);
 
        rl.question(`How much food does ${formattedName} eat (e.g., 2 cups)? `, (foodQuantity) => {
            rl.question(`Do you want the same feeding schedule as other dogs? (yes/no): `, (sameSchedule) => {
                const dog = {
                    name: formattedName,
                    food: foodQuantity.trim(),
                    reminders: []
                };
 
                if (sameSchedule.toLowerCase() === 'yes') {
                    if (dogs.length > 0) {
                        dog.reminders = dogs[0].reminders; // Copy reminders from the first dog
                        console.log(`Same schedule set for ${formattedName}.`);
                        dogs.push(dog);
                        askToAddMoreDogs();
                    } else {
                        console.log("There are no existing schedules to copy. Let's set one for this dog.");
                        setDogReminders(dog);
                    }
                } else {
                    setDogReminders(dog); // Set unique schedule
                }
            });
        });
    });
}
 
function setDogReminders(dog) {
    rl.question(`How many reminders would you like to set for ${dog.name}? `, (numReminders) => {
        const totalReminders = parseInt(numReminders, 10);
 
        if (isNaN(totalReminders) || totalReminders <= 0) {
            console.log('Please enter a valid number greater than 0.');
            setDogReminders(dog);
            return;
        }
 
        console.log(`You want to set ${totalReminders} reminders for ${dog.name}.`);
 
        let count = 0;
 
        function askForTime() {
            rl.question(`Enter time for reminder #${count + 1} (in HH:MM AM/PM format): `, (time) => {
                const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
                const match = time.match(timeRegex);
 
                if (!match) {
                    console.log('Invalid time format. Please enter time in HH:MM AM/PM format (e.g., 2:30 PM).');
                    askForTime();
                    return;
                }
 
                let [_, hours, minutes, period] = match;
                hours = parseInt(hours, 10);
                minutes = parseInt(minutes, 10);
 
                // Convert to 24-hour format
                if (period.toUpperCase() === 'PM' && hours !== 12) {
                    hours += 12;
                }
                if (period.toUpperCase() === 'AM' && hours === 12) {
                    hours = 0;
                }
 
                dog.reminders.push({ hours, minutes });
                count++;
 
                if (count < totalReminders) {
                    askForTime();
                } else {
                    dogs.push(dog);
                    askToAddMoreDogs();
                }
            });
        }
 
        askForTime();
    });
}
 
function askToAddMoreDogs() {
    rl.question('Do you want to add another dog? (yes/no): ', (answer) => {
        if (answer.trim().toLowerCase() === 'yes') {
            addDog();
        } else {
            scheduleReminders();
        }
    });
}
 
function scheduleReminders() {
    dogs.forEach((dog) => {
        console.log(`\nScheduling reminders for ${dog.name} (${dog.food} of food):`);
        dog.reminders.forEach((reminder, index) => {
            const now = new Date();
            let reminderTime = new Date();
            reminderTime.setHours(reminder.hours, reminder.minutes, 0, 0);
 
            // If the reminder time has passed today, set it for tomorrow
            if (reminderTime < now) {
                reminderTime.setDate(reminderTime.getDate() + 1);
            }
 
            const initialDelay = reminderTime - now; // Time until the first reminder triggers
 
            // Schedule the first reminder
            setTimeout(() => {
                handleReminder(dog);
                // Schedule it to repeat daily
                setInterval(() => {
                    handleReminder(dog);
                }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
            }, initialDelay);
 
            console.log(
                `Reminder #${index + 1} set for ${reminderTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })} daily.`
            );
        });
    });
 
    rl.close(); // Close the interface after scheduling all reminders
}
 
function handleReminder(dog) {
    console.log(`\nReminder for ${dog.name}: Time to feed! (${dog.food})`);
    askIfAvailable(dog);
}
 
function askIfAvailable(dog) {
    rl.question(`Do you have time to feed ${dog.name} now? (yes/no): `, (answer) => {
        if (answer.trim().toLowerCase() === 'yes') {
            console.log(`Great! Make sure ${dog.name} gets ${dog.food} of food.`);
        } else if (answer.trim().toLowerCase() === 'no') {
            askSnoozeOption(dog);
        } else {
            console.log("Invalid input. Please answer with 'yes' or 'no'.");
            askIfAvailable(dog);
        }
    });
}
 
function askSnoozeOption(dog) {
    rl.question('Would you like to snooze the reminder for 5, 10, or 15 minutes? (Enter 5, 10, or 15): ', (snoozeTime) => {
        const snoozeMinutes = parseInt(snoozeTime, 10);
 
        if ([5, 10, 15].includes(snoozeMinutes)) {
            console.log(`Snoozing reminder for ${snoozeMinutes} minutes...`);
            setTimeout(() => {
                handleReminder(dog);
            }, snoozeMinutes * 60 * 1000); // Convert minutes to milliseconds
        } else {
            console.log('Invalid input. Please enter 5, 10, or 15.');
            askSnoozeOption(dog);
        }
    });
}
 
console.log("Welcome to the Dog Feeding Reminder App!");
addDog();