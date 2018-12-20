const systemdatamock = require('./systemdatamock/systemdatamock');


systemdatamock.settTelefonnummer("99887766");
let dkifJson = systemdatamock.getDkifJson();

console.warn(dkifJson);

