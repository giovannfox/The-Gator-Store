const mysql = require('mysql2');
const {
    Client
} = require('ssh2');
const sshClient = new Client();

const dbServer = {
    host: "35.163.149.5",
    port: "22",
    user: "prod",
    password: "Production1!"
}

const tunnelConfig = {
    host: "35.163.149.5",
    port: 22,
    username: "ubuntu",
    privateKey: require('fs').readFileSync('../../credentials/team2.pem')
}

const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: "127.0.0.1",
    dstPort: 3306
};

// const SSHConnection = new Promise((resolve, reject) => {
//     sshClient.on('ready', () => {
//         sshClient.forwardOut(
//             forwardConfig.srcHost,
//             forwardConfig.srcPort,
//             forwardConfig.dstHost,
//             forwardConfig.dstPort,
//             (err, stream) => {
//                 if (err) reject(err);
//                 const updatedDbServer = {
//                     ...dbServer,
//                     stream
//                 };
//                 const connection = mysql.createConnection(updatedDbServer);
//                 connection.connect((error) => {
//                     if (error) {
//                         reject(error);
//                     }
//                     resolve(connection);
//                 });
//             });
//     }).connect(tunnelConfig);
// });

const mysqlssh = require('mysql-ssh');

var dbClient = null;

const connect = () => {
    if (dbClient === null) {
        dbClient = mysqlssh.connect({
                host: "35.163.149.5",
                port: 22,
                username: "ubuntu",
                privateKey: require('fs').readFileSync('../../credentials/team2.pem')
            }, {
                host: '127.0.0.1',
                user: 'prod',
                password: 'Production1!',
                database: 'dev'
            })
            .then(client => {
                console.log("DB Connected!")
                return client;
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const client = () => {
    return client
}

const close = () => {
    mysqlssh.close()
    console.log("Closing DB Connection.")
}

module.exports = {
    connect,
    client,
    close
}
