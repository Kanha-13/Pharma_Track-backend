const spawn = require('child_process').spawn
let backupProcess = spawn('mongodump', [
    '--db=apnidukan',
    '--archive=F:/Apnidukan/Backup',
    '--gzip'
    ]);

const mongo_backup = backupProcess.on('exit', (code, signal) => {
    if(code) 
        console.log('Backup process exited with code ', code);
    else if (signal)
        console.error('Backup process was killed with singal ', signal);
    else 
        console.log('Successfully backedup the database')
});

module.exports = mongo_backup