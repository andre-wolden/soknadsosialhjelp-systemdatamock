const s = require('./systemdatamock/systemdatamock');

systemdatamock = s.systemdatamock;

systemdatamock.settTelefonnummer("99887766");
systemdatamock.settNavn("Andre", "Kang", "Wolden");

systemdatamock.send();

