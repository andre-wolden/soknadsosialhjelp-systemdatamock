const systemdatamock = require('./systemdatamock/systemdatamock');


systemdatamock.settArbeidsforholdMedArbeidsgivernummer("2019-01-01", "2019-01-02", '99', '123', 'Team Liquid');
console.warn(systemdatamock.getArbeidJson().arbeidsforhold[0]);

