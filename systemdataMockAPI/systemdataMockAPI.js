import endpoints from "./endpoints.js";
import { settMockData } from "./mockRestUtils";

import adresserJSON from "./jsonTemplates/adresser.js";
import arbeidJSON from "./jsonTemplates/arbeid.js";
import brukerprofilJSON from "./jsonTemplates/brukerprofil.js";
import familieJSON from "./jsonTemplates/familie.js";
import norgJSON from "./jsonTemplates/norg.js";
import organisasjonJSON from "./jsonTemplates/organisasjon.js";
import telefonJSON from "./jsonTemplates/telefon.js";
import utbetalingJSON from "./jsonTemplates/utbetaling.js";

import midlertidigPostadresseJSON from "./jsonPartialTemplates/midlertidigPostadresse.js";


const adresser = adresserJSON;
const arbeid = arbeidJSON;
const brukerprofil = brukerprofilJSON;
const familie = familieJSON;
const norg = norgJSON;
const organisasjon = organisasjonJSON;
var telefon = telefonJSON;
const utbetaling = utbetalingJSON;

const midlertidigPostadresse = midlertidigPostadresseJSON;

const PERSON = "person";
const MIDLERTIDIGPOSTADRESSE = "midlertidigPostadresse";
const BANKKONTO = "bankkonto";
const VERDI = "verdi";
const ARBEIDSFORHOLD = "arbeidsforhold";
const ORGANISASJON = "organisasjon";
const PERSONNAVN= "personnavn";



export const SystemdataMockAPI = {

	"settNavn" : (fornavn, mellomnavn, etternavn) => {
		const navnObject =
		{
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

	"settMidlertidigPostadresse" : (midlertidigPostadresseEgendefinertValue) => {
		brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
	},

	"settTelefonnummer" : (telefonnummer) => {
		if (typeof telefonnummer === "undefined") {
			throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).")
		}
		telefon = { "verdi" : telefonnummer};
	},

	"settBankkontonummer" : (bankkontonummer) => {

		if (bankkontonummer !== null){
			brukerprofil[PERSON][BANKKONTO] = { "bankkonto" : { "bankkontonummer": bankkontonummer} }
		} else {
			brukerprofil[PERSON][BANKKONTO] = null;
		}
	},

	"settArbeidsforholdMedArbeidsgivernummer" : (startDato, sluttDato, stillingsProsent, arbeidsgiverNummer, arbeidsgiverNavn ) => {
		const nyttArbeidsForhold =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : parseInt(stillingsProsent, 10),
				} ],
				"arbeidsgiver" : {
					"arbeidsgivernummer": arbeidsgiverNummer,
					"navn": arbeidsgiverNavn
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	"settArbeidsforholdMedIdent" : (startDato, sluttDato, stillingsProsent, ident ) => {
		const nyttArbeidsForhold =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : stillingsProsent
				} ],
				"arbeidsgiver" : {
					"ident": {
						"ident": ident
					}
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	"settArbeidsforholdMedOrganisasjonsnummer" : ( startDato, sluttDato, stillingsProsent, orgnummer ) => {
		const nyttArbeidsForhold =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : stillingsProsent
				} ],
				"arbeidsgiver" : {
					"orgnummer" : orgnummer
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);

		const nyOrganisasjon =
		{
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

	"send" : () => {
		settMockData(endpoints.telefon, telefon);
		settMockData(endpoints.familie, familie);
		settMockData(endpoints.brukerprofil, brukerprofil);
		settMockData(endpoints.arbeid, arbeid);
		settMockData(endpoints.organisasjon, organisasjon);

	},

	"NoOp" : () => {
		console.warn(telefon);

	}
};

