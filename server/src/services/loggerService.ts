import chalk from "chalk";

export default {

    log(text: string): void {
        console.log(chalk.blueBright.bold(`[${new Date().toLocaleString()}]`) + ' ' + chalk.cyanBright.bold('[LOG]') + ' ' + text)
    },

    info(text: string): void {
        console.log(chalk.blueBright.bold(`[${new Date().toLocaleString()}]`) + ' ' + chalk.greenBright.bold('[INFO]') + ' ' + text)
    },

    error(text: string): void {
        console.log(chalk.blueBright.bold(`[${new Date().toLocaleString()}]`) + ' ' + chalk.redBright.bold('[ERROR]') + ' ' + text)
    }
    
}