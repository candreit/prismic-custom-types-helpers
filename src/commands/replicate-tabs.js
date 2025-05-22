const { exec } = require('child_process');
const log = console.log;

const replicate = async (tabsString) => {
    const tabs = tabsString.split(',').map(tab => tab.trim());

    const chalk = (await import('chalk')).default;

    log(chalk.bgCyan.black('START'));

    exec('pbpaste', (error, stdout) => {
        if (error) {
            log(chalk.red('Error: No valid JSON data found in clipboard'));
            fail = true;
            return;
        }
    
        const input = `{${stdout}}`;

        try {
            const inputJSON = JSON.parse(input);
            log(chalk.bgGreen.black('Valid JSON provided'));
            const replicationData = inputJSON[Object.keys(inputJSON)[0]];
        
            for (let tab of tabs) {
                const label = tab.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
                const ref = inputJSON[label] = {};
        
                for (let key of Object.keys(replicationData)) { 
                    const data = replicationData[key];
                    const tabKey = `${tab}_${key}`;
                    log(chalk.green(`Replicating ${key} to ${tabKey}`));
        
                    ref[tabKey] = data;   
                }
            }
        
            exec(`echo '${JSON.stringify(inputJSON, null, 2)}' | pbcopy`, (error) => {
                if (error) {
                    log(chalk.red('Error: Failed to copy JSON data to clipboard'));
                    return;
                }
                log(chalk.bgGreen.black('JSON data copied to clipboard'));
                log(chalk.bgCyan.black('END'));
            });
        } catch (error) {
            log(chalk.red('Error: Invalid JSON data found in clipboard'));
            log(chalk.red(error));
            return;
        };
    });
}

module.exports = {
    replicate,
}