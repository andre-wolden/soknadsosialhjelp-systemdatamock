var endpoints_json_1 = require("./endpoints.json");
var mockRestUtils_1 = require("./mockRestUtils");
var adresser_json_1 = require("./jsonTemplates/adresser.json");
var arbeid_json_1 = require("./jsonTemplates/arbeid.json");
var brukerprofil_json_1 = require("./jsonTemplates/brukerprofil.json");
var familie_json_1 = require("./jsonTemplates/familie.json");
var norg_json_1 = require("./jsonTemplates/norg.json");
var organisasjon_json_1 = require("./jsonTemplates/organisasjon.json");
var telefon_json_1 = require("./jsonTemplates/telefon.json");
var utbetaling_json_1 = require("./jsonTemplates/utbetaling.json");
var midlertidigPostadresse_json_1 = require("./jsonPartialTemplates/midlertidigPostadresse.json");
var adresser = adresser_json_1["default"];
var arbeid = arbeid_json_1["default"];
var brukerprofil = brukerprofil_json_1["default"];
var familie = familie_json_1["default"];
var norg = norg_json_1["default"];
var organisasjon = organisasjon_json_1["default"];
var telefon = telefon_json_1["default"];
var utbetaling = utbetaling_json_1["default"];
var midlertidigPostadresse = midlertidigPostadresse_json_1["default"];
var PERSON = "person";
var MIDLERTIDIGPOSTADRESSE = "midlertidigPostadresse";
var BANKKONTO = "bankkonto";
var VERDI = "verdi";
var ARBEIDSFORHOLD = "arbeidsforhold";
var ORGANISASJON = "organisasjon";
var PERSONNAVN = "personnavn";
(function (Valg) {
    Valg[Valg["Nei"] = "nei"] = "Nei";
    Valg[Valg["Default"] = "default"] = "Default";
    Valg[Valg["Egendefinert"] = "egendefinert"] = "Egendefinert";
})(exports.Valg || (exports.Valg = {}));
var Valg = exports.Valg;
var systemdatamock = {
    "settNavn": function (fornavn, mellomnavn, etternavn) {
        var navnObject = {
            "etternavn": etternavn,
            "fornavn": fornavn,
            "mellomnavn": mellomnavn,
            "sammensattNavn": null,
            "endringstidspunkt": null,
            "endretAv": null,
            "endringstype": null
        };
        familie[PERSONNAVN] = navnObject;
    },
    "settMidlertidigPostadresse": function (valg, midlertidigPostadresseEgendefinertValue) {
        if (valg === Valg.Default) {
            brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresse_json_1["default"];
        }
        else if (valg === Valg.Egendefinert) {
            brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
        }
        else {
            brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
        }
    },
    "settTelefonnummer": function (telefonnummer) {
        if (telefonnummer === void 0) { telefonnummer = null; }
        if (typeof telefonnummer === "undefined") {
            throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).");
        }
        telefon[VERDI] = telefonnummer;
    },
    "settBankkontonummer": function (bankkontonummer) {
        if (bankkontonummer === void 0) { bankkontonummer = null; }
        if (bankkontonummer !== null) {
            brukerprofil[PERSON][BANKKONTO] = { "bankkonto": { "bankkontonummer": bankkontonummer } };
        }
        else {
            brukerprofil[PERSON][BANKKONTO] = null;
        }
    },
    "settArbeidsforholdMedArbeidsgivernummer": function (startDato, sluttDato, stillingsProsent, arbeidsgiverNummer, arbeidsgiverNavn) {
        var nyttArbeidsForhold = {
            "arbeidsforholdIDnav": 0,
            "ansettelsesPeriode": {
                "periode": {
                    "fom": startDato,
                    "tom": sluttDato
                }
            },
            "arbeidsavtale": [{
                    "stillingsprosent": parseInt(stillingsProsent, 10)
                }],
            "arbeidsgiver": {
                "arbeidsgivernummer": arbeidsgiverNummer,
                "navn": arbeidsgiverNavn
            }
        };
        arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
    },
    "settArbeidsforholdMedIdent": function (startDato, sluttDato, stillingsProsent, ident) {
        var nyttArbeidsForhold = {
            "arbeidsforholdIDnav": 0,
            "ansettelsesPeriode": {
                "periode": {
                    "fom": startDato,
                    "tom": sluttDato
                }
            },
            "arbeidsavtale": [{
                    "stillingsprosent": stillingsProsent
                }],
            "arbeidsgiver": {
                "ident": {
                    "ident": ident
                }
            }
        };
        arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
    },
    "settArbeidsforholdMedOrganisasjonsnummer": function (startDato, sluttDato, stillingsProsent, orgnummer) {
        var nyttArbeidsForhold = {
            "arbeidsforholdIDnav": 0,
            "ansettelsesPeriode": {
                "periode": {
                    "fom": startDato,
                    "tom": sluttDato
                }
            },
            "arbeidsavtale": [{
                    "stillingsprosent": stillingsProsent
                }],
            "arbeidsgiver": {
                "orgnummer": orgnummer
            }
        };
        arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
        var nyOrganisasjon = {
            "orgnummer": orgnummer,
            "navn": {
                "navnelinje": [
                    "Navn på organisasjon."
                ]
            },
            "organisasjonDetaljer": null,
            "bestaarAvOrgledd": [],
            "inngaarIJuridiskEnhet": [],
            "virksomhetDetaljer": null
        };
        organisasjon[ORGANISASJON] = nyOrganisasjon;
    },
    "send": function () {
        mockRestUtils_1.settMockData(endpoints_json_1["default"].telefon, telefon);
        mockRestUtils_1.settMockData(endpoints_json_1["default"].familie, familie);
        mockRestUtils_1.settMockData(endpoints_json_1["default"].brukerprofil, brukerprofil);
        mockRestUtils_1.settMockData(endpoints_json_1["default"].arbeid, arbeid);
        mockRestUtils_1.settMockData(endpoints_json_1["default"].organisasjon, organisasjon);
    },
    "NoOp": function () {
        console.warn(adresser);
        console.warn(arbeid);
        console.warn(familie);
        console.warn(norg);
        console.warn(organisasjon);
        console.warn(utbetaling);
        console.warn(midlertidigPostadresse);
    }
};
exports["default"] = systemdatamock;
