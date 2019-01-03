const systemdatamock = require('./systemdatamock/systemdatamock');


systemdatamock.settTelefonnummer("99887766");
let telefon = systemdatamock.getTelefonJson();

console.warn(telefon);

systemdatamock.settOrganisasjon("1337", "Team Liquied");
let organisasjon = systemdatamock.getOrganisasjonJson();
console.warn(organisasjon.organisasjon.navn.navnelinje);

