// const sql = require('mssql');

// const config = {
//   server: 'localhost',                // or your actual server name
//   database: 'LAPTOP-OJDGINPO',
//   options: {
//     trustedConnection: true,
//     trustServerCertificate: true
//   },
//   authentication: {
//     type: 'ntlm',
//     options: {
//       domain: '',                     // Leave blank or add your domain if needed
//       userName: '',
//       password: ''
//     }
//   }
// };

// module.exports = {
//   sql,
//   config
// };
const sql = require('mssql');

const config = {
  server: 'LAPTOP-OJDGINPO',         // Same as in your .NET project
  database: 'AxionAssignmentDB',     // Your actual DB name
  options: {
    trustServerCertificate: true     // Required for local setup
  },
  authentication: {
    type: 'ntlm',
    options: {
      domain: '',        // Leave empty unless you're in a domain
      userName: '',      // Empty for Windows auth if running as current user
      password: ''       // Same as above
    }
  }
};

module.exports = { sql, config };
