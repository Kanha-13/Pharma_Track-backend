const spawn = require('child_process').spawn
const fs = require("fs");
const path = require('path');

const mongo_backup = () => {
    let backupProcess = spawn('mongodump', [
        '--gzip',
        '--archive=F:/Apnidukan_Backup.gz',
        '--db=apnidukan'
    ]);

    backupProcess.on('exit', (code, signal) => {
        if (code) console.log('Backup process exited with code ', code);
        else if (signal) console.error('Backup process was killed with singal ', signal);
        else {
            fs.writeFileSync(path.join(__dirname, '../logs/backup.txt'), `Last backup at: Date - ${new Date().toDateString()} || Time - ${new Date().toTimeString()}`)
        }
    });
}

const mongo_restore = () => {
    let restoreProcess = spawn('mongorestore', [
        '--gzip',
        '--archive=F:/Apnidukan_Backup.gz'
    ]);

    restoreProcess.on('exit', (code, signal) => {
        if (code) console.log('Restore process exited with code ', code);
        else if (signal) console.error('Restore process was killed with singal ', signal);
        else console.log('Successfully restore the database')
    });
}

module.exports = { mongo_backup, mongo_restore }