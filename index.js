const s = require('./systemdatamock/systemdatamock');

systemdatamock = s.systemdatamock;

systemdatamock.settTelefonnummer("99326807");
systemdatamock.send();

console.warn(systemdatamock);