"use strict";
exports.__esModule = true;
var endpoints_js_1 = require("./endpoints.js");
var mockRestUtils_1 = require("./mockRestUtils");
var adresser_js_1 = require("./jsonTemplates/adresser.js");
var arbeid_js_1 = require("./jsonTemplates/arbeid.js");
var brukerprofil_js_1 = require("./jsonTemplates/brukerprofil.js");
var familie_js_1 = require("./jsonTemplates/familie.js");
var norg_js_1 = require("./jsonTemplates/norg.js");
var organisasjon_js_1 = require("./jsonTemplates/organisasjon.js");
var telefon_js_1 = require("./jsonTemplates/telefon.js");
var utbetaling_js_1 = require("./jsonTemplates/utbetaling.js");
var midlertidigPostadresse_js_1 = require("./jsonPartialTemplates/midlertidigPostadresse.js");
var adresser = adresser_js_1["default"];
var arbeid = arbeid_js_1["default"];
var brukerprofil = brukerprofil_js_1["default"];
var familie = familie_js_1["default"];
var norg = norg_js_1["default"];
var organisasjon = organisasjon_js_1["default"];
var telefon = telefon_js_1["default"];
var utbetaling = utbetaling_js_1["default"];
var midlertidigPostadresse = midlertidigPostadresse_js_1["default"];
var PERSON = "person";
var MIDLERTIDIGPOSTADRESSE = "midlertidigPostadresse";
var BANKKONTO = "bankkonto";
var VERDI = "verdi";
var ARBEIDSFORHOLD = "arbeidsforhold";
var ORGANISASJON = "organisasjon";
var PERSONNAVN = "personnavn";
var Valg;
(function (Valg) {
    Valg["Nei"] = "nei";
    Valg["Default"] = "default";
    Valg["Egendefinert"] = "egendefinert";
})(Valg = exports.Valg || (exports.Valg = {}));
exports.systemdatamock = {
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
            brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresse_js_1["default"];
        }
        else if (valg === Valg.Egendefinert) {
            brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
        }
        else {
            brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = null;
        }
    },
    "settTelefonnummer": function (telefonnummer) {
        if (typeof telefonnummer === "undefined") {
            throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).");
        }
        telefon[VERDI] = telefonnummer;
    },
    "settBankkontonummer": function (bankkontonummer) {
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
        mockRestUtils_1.settMockData(endpoints_js_1["default"].telefon, telefon);
        mockRestUtils_1.settMockData(endpoints_js_1["default"].familie, familie);
        mockRestUtils_1.settMockData(endpoints_js_1["default"].brukerprofil, brukerprofil);
        mockRestUtils_1.settMockData(endpoints_js_1["default"].arbeid, arbeid);
        mockRestUtils_1.settMockData(endpoints_js_1["default"].organisasjon, organisasjon);
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
