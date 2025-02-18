// Larger JS source to exercise off-thread parsing.

// List of words to bulk up output file.
const words = [
    "A",
    "a",
    "aa",
    "aal",
    "aalii",
    "aam",
    "Aani",
    "aardvark",
    "aardwolf",
    "Aaron",
    "Aaronic",
    "Aaronical",
    "Aaronite",
    "Aaronitic",
    "Aaru",
    "Ab",
    "aba",
    "Ababdeh",
    "Ababua",
    "abac",
    "abaca",
    "abacate",
    "abacay",
    "abacinate",
    "abacination",
    "abaciscus",
    "abacist",
    "aback",
    "abactinal",
    "abactinally",
    "abaction",
    "abactor",
    "abaculus",
    "abacus",
    "Abadite",
    "abaff",
    "abaft",
    "abaisance",
    "abaiser",
    "abaissed",
    "abalienate",
    "abalienation",
    "abalone",
    "Abama",
    "abampere",
    "abandon",
    "abandonable",
    "abandoned",
    "abandonedly",
    "abandonee",
    "abandoner",
    "abandonment",
    "Abanic",
    "Abantes",
    "abaptiston",
    "Abarambo",
    "Abaris",
    "abarthrosis",
    "abarticular",
    "abarticulation",
    "abas",
    "abase",
    "abased",
    "abasedly",
    "abasedness",
    "abasement",
    "abaser",
    "Abasgi",
    "abash",
    "abashed",
    "abashedly",
    "abashedness",
    "abashless",
    "abashlessly",
    "abashment",
    "abasia",
    "abasic",
    "abask",
    "Abassin",
    "abastardize",
    "abatable",
    "abate",
    "abatement",
    "abater",
    "abatis",
    "abatised",
    "abaton",
    "abator",
    "abattoir",
    "Abatua",
    "abature",
    "abave",
    "abaxial",
    "abaxile",
    "abaze",
    "abb",
    "Abba",
    "abbacomes",
    "abbacy",
    "Abbadide",
    "abbas",
    "abbasi",
    "abbassi",
    "Abbasside",
    "abbatial",
    "abbatical",
    "abbess",
    "abbey",
    "abbeystede",
    "Abbie",
    "abbot",
    "abbotcy",
    "abbotnullius",
    "abbotship",
    "abbreviate",
    "abbreviately",
    "abbreviation",
    "abbreviator",
    "abbreviatory",
    "abbreviature",
    "Abby",
    "abcoulomb",
    "abdal",
    "abdat",
    "Abderian",
    "Abderite",
    "abdest",
    "abdicable",
    "abdicant",
    "abdicate",
    "abdication",
    "abdicative",
    "abdicator",
    "Abdiel",
    "abditive",
    "abditory",
    "abdomen",
    "abdominal",
    "Abdominales",
    "abdominalian",
    "abdominally",
    "abdominoanterior",
    "abdominocardiac",
    "abdominocentesis",
    "abdominocystic",
    "abdominogenital",
    "abdominohysterectomy",
    "abdominohysterotomy",
    "abdominoposterior",
    "abdominoscope",
    "abdominoscopy",
    "abdominothoracic",
    "abdominous",
    "abdominovaginal",
    "abdominovesical",
    "abduce",
    "abducens",
    "abducent",
    "abduct",
    "abduction",
    "abductor",
    "Abe",
    "abeam",
    "abear",
    "abearance",
    "abecedarian",
    "abecedarium",
    "abecedary",
    "abed",
    "abeigh",
    "Abel",
    "abele",
    "Abelia",
    "Abelian",
    "Abelicea",
    "Abelite",
    "abelite",
    "Abelmoschus",
    "abelmosk",
    "Abelonian",
    "abeltree",
    "Abencerrages",
    "abenteric",
    "abepithymia",
    "Aberdeen",
    "aberdevine",
    "Aberdonian",
    "Aberia",
    "aberrance",
    "aberrancy",
    "aberrant",
    "aberrate",
    "aberration",
    "aberrational",
    "aberrator",
    "aberrometer",
    "aberroscope",
    "aberuncator",
    "abet",
    "abetment",
    "abettal",
    "abettor",
    "abevacuation",
    "abey",
    "abeyance",
    "abeyancy",
    "abeyant",
    "abfarad",
    "abhenry",
    "abhiseka",
    "abhominable",
    "abhor",
    "abhorrence",
    "abhorrency",
    "abhorrent",
    "abhorrently",
    "abhorrer",
    "abhorrible",
    "abhorring",
    "Abhorson",
    "abidal",
    "abidance",
    "abide",
    "abider",
    "abidi",
    "abiding",
    "abidingly",
    "abidingness",
    "Abie",
    "Abies",
    "abietate",
    "abietene",
    "abietic",
    "abietin",
    "Abietineae",
    "abietineous",
    "abietinic",
    "Abiezer",
    "Abigail",
    "abigail",
    "abigailship",
    "abigeat",
    "abigeus",
    "abilao",
    "ability",
    "abilla",
    "abilo",
    "abintestate",
    "abiogenesis",
    "abiogenesist",
    "abiogenetic",
    "abiogenetical",
    "abiogenetically",
    "abiogenist",
    "abiogenous",
    "abiogeny",
    "abiological",
    "abiologically",
    "abiology",
    "abiosis",
    "abiotic",
    "abiotrophic",
    "abiotrophy",
    "Abipon",
    "abir",
    "abirritant",
    "abirritate",
    "abirritation",
    "abirritative",
    "abiston",
    "Abitibi",
    "abiuret",
    "abject",
    "abjectedness",
    "abjection",
    "abjective",
    "abjectly",
    "abjectness",
    "abjoint",
    "abjudge",
    "abjudicate",
    "abjudication",
    "abjunction",
    "abjunctive",
    "abjuration",
    "abjuratory",
    "abjure",
    "abjurement",
    "abjurer",
    "abkar",
    "abkari",
    "Abkhas",
    "Abkhasian",
    "ablach",
    "ablactate",
    "ablactation",
    "ablare",
    "ablastemic",
    "ablastous",
    "ablate",
    "ablation",
    "ablatitious",
    "ablatival",
    "ablative",
    "ablator",
    "ablaut",
    "ablaze",
    "able",
    "ableeze",
    "ablegate",
    "ableness",
    "ablepharia",
    "ablepharon",
    "ablepharous",
    "Ablepharus",
    "ablepsia",
    "ableptical",
    "ableptically",
    "abler",
    "ablest",
    "ablewhackets",
    "ablins",
    "abloom",
    "ablow",
    "ablude",
    "abluent",
    "ablush",
    "ablution",
    "ablutionary",
    "abluvion",
    "ably",
    "abmho",
    "Abnaki",
    "abnegate",
    "abnegation",
    "abnegative",
    "abnegator",
    "Abner",
    "abnerval",
    "abnet",
    "abneural",
    "abnormal",
    "abnormalism",
    "abnormalist",
    "abnormality",
    "abnormalize",
    "abnormally",
    "abnormalness",
    "abnormity",
    "abnormous",
    "abnumerable",
    "Abo",
    "aboard",
    "Abobra",
    "abode",
    "abodement",
    "abody",
    "abohm",
    "aboil",
    "abolish",
    "abolisher",
    "abolishment",
    "abolition",
    "abolitionary",
    "abolitionism",
    "abolitionist",
    "abolitionize",
    "abolla",
    "aboma",
    "abomasum",
    "abomasus",
    "abominable",
    "abominableness",
    "abominably",
    "abominate",
    "abomination",
    "abominator",
    "abomine",
    "Abongo",
    "aboon",
    "aborad",
    "aboral",
    "aborally",
    "abord",
    "aboriginal",
    "aboriginality",
    "aboriginally",
    "aboriginary",
    "aborigine",
    "abort",
    "aborted",
    "aborticide",
    "abortient",
    "abortifacient",
    "abortin",
    "abortion",
    "abortional",
    "abortionist",
    "abortive",
    "abortively",
    "abortiveness",
    "abortus",
    "abouchement",
    "abound",
    "abounder",
    "abounding",
    "aboundingly",
    "about",
    "abouts",
    "above",
    "aboveboard",
    "abovedeck",
    "aboveground",
    "aboveproof",
    "abovestairs",
    "abox",
    "abracadabra",
    "abrachia",
    "abradant",
    "abrade",
    "abrader",
    "Abraham",
    "Abrahamic",
    "Abrahamidae",
    "Abrahamite",
    "Abrahamitic",
    "abraid",
    "Abram",
    "Abramis",
    "abranchial",
    "abranchialism",
    "abranchian",
    "Abranchiata",
    "abranchiate",
    "abranchious",
    "abrasax",
    "abrase",
    "abrash",
    "abrasiometer",
    "abrasion",
    "abrasive",
    "abrastol",
    "abraum",
    "abraxas",
    "abreact",
    "abreaction",
    "abreast",
    "abrenounce",
    "abret",
    "abrico",
    "abridge",
    "abridgeable",
    "abridged",
    "abridgedly",
    "abridger",
    "abridgment",
    "abrim",
    "abrin",
    "abristle",
    "abroach",
    "abroad",
    "Abrocoma",
    "abrocome",
    "abrogable",
    "abrogate",
    "abrogation",
    "abrogative",
    "abrogator",
    "Abroma",
    "Abronia",
    "abrook",
    "abrotanum",
    "abrotine",
    "abrupt",
    "abruptedly",
    "abruption",
    "abruptly",
    "abruptness",
    "Abrus",
    "Absalom",
    "absampere",
    "Absaroka",
    "absarokite",
    "abscess",
    "abscessed",
    "abscession",
    "abscessroot",
    "abscind",
    "abscise",
    "abscision",
    "absciss",
    "abscissa",
    "abscissae",
    "abscisse",
    "abscission",
    "absconce",
    "abscond",
    "absconded",
    "abscondedly",
    "abscondence",
    "absconder",
    "absconsa",
    "abscoulomb",
    "absence",
    "absent",
    "absentation",
    "absentee",
    "absenteeism",
    "absenteeship",
    "absenter",
    "absently",
    "absentment",
    "absentmindedly",
    "absentness",
    "absfarad",
    "abshenry",
    "Absi",
    "absinthe",
    "absinthial",
    "absinthian",
    "absinthiate",
    "absinthic",
    "absinthin",
    "absinthine",
    "absinthism",
    "absinthismic",
    "absinthium",
    "absinthol",
    "absit",
    "absmho",
    "absohm",
    "absolute",
    "absolutely",
    "absoluteness",
    "absolution",
    "absolutism",
    "absolutist",
    "absolutistic",
    "absolutistically",
    "absolutive",
    "absolutization",
    "absolutize",
    "absolutory",
    "absolvable",
    "absolvatory",
    "absolve",
    "absolvent",
    "absolver",
    "absolvitor",
    "absolvitory",
    "absonant",
    "absonous",
    "absorb",
    "absorbability",
    "absorbable",
    "absorbed",
    "absorbedly",
    "absorbedness",
    "absorbefacient",
    "absorbency",
    "absorbent",
    "absorber",
    "absorbing",
    "absorbingly",
    "absorbition",
    "absorpt",
    "absorptance",
    "absorptiometer",
    "absorptiometric",
    "absorption",
    "absorptive",
    "absorptively",
    "absorptiveness",
    "absorptivity",
    "absquatulate",
    "abstain",
    "abstainer",
    "abstainment",
    "abstemious",
    "abstemiously",
    "abstemiousness",
    "abstention",
    "abstentionist",
    "abstentious",
    "absterge",
    "abstergent",
    "abstersion",
    "abstersive",
    "abstersiveness",
    "abstinence",
    "abstinency",
    "abstinent",
    "abstinential",
    "abstinently",
    "abstract",
    "abstracted",
    "abstractedly",
    "abstractedness",
    "abstracter",
    "abstraction",
    "abstractional",
    "abstractionism",
    "abstractionist",
    "abstractitious",
    "abstractive",
    "abstractively",
    "abstractiveness",
    "abstractly",
    "abstractness",
    "abstractor",
    "abstrahent",
    "abstricted",
    "abstriction",
    "abstruse",
    "abstrusely",
    "abstruseness",
    "abstrusion",
    "abstrusity",
    "absume",
    "absumption",
    "absurd",
    "absurdity",
    "absurdly",
    "absurdness",
    "absvolt",
    "Absyrtus",
    "abterminal",
    "abthain",
    "abthainrie",
    "abthainry",
    "abthanage",
    "Abu",
    "abu",
    "abucco",
    "abulia",
    "abulic",
    "abulomania",
    "abuna",
    "abundance",
    "abundancy",
    "abundant",
    "Abundantia",
    "abundantly",
    "abura",
    "aburabozu",
    "aburban",
    "aburst",
    "aburton",
    "abusable",
    "abuse",
    "abusedly",
    "abusee",
    "abuseful",
    "abusefully",
    "abusefulness",
    "abuser",
    "abusion",
    "abusious",
    "abusive",
    "abusively",
    "abusiveness",
    "abut",
    "Abuta",
    "Abutilon",
    "abutment",
    "abuttal",
    "abutter",
    "abutting",
    "abuzz",
    "abvolt",
    "abwab",
    "aby",
    "abysm",
    "abysmal",
    "abysmally",
    "abyss",
    "abyssal",
    "Abyssinian",
    "abyssobenthonic",
    "abyssolith",
    "abyssopelagic",
    "acacatechin",
    "acacatechol",
    "acacetin",
    "Acacia",
    "Acacian",
    "acaciin",
    "acacin",
    "academe",
    "academial",
    "academian",
    "Academic",
    "academic",
    "academical",
    "academically",
    "academicals",
    "academician",
    "academicism",
    "academism",
    "academist",
    "academite",
    "academization",
    "academize",
    "Academus",
    "academy",
    "Acadia",
    "acadialite",
    "Acadian",
    "Acadie",
    "Acaena",
    "acajou",
    "acaleph",
    "Acalepha",
    "Acalephae",
    "acalephan",
    "acalephoid",
    "acalycal",
    "acalycine",
    "acalycinous",
    "acalyculate",
    "Acalypha",
    "Acalypterae",
    "Acalyptrata",
    "Acalyptratae",
    "acalyptrate",
    "Acamar",
    "acampsia",
    "acana",
    "acanaceous",
    "acanonical",
    "acanth",
    "acantha",
    "Acanthaceae",
    "acanthaceous",
    "acanthad",
    "Acantharia",
    "Acanthia",
    "acanthial",
    "acanthin",
    "acanthine",
    "acanthion",
    "acanthite",
    "acanthocarpous",
    "Acanthocephala",
    "acanthocephalan",
    "Acanthocephali",
    "acanthocephalous",
    "Acanthocereus",
    "acanthocladous",
    "Acanthodea",
    "acanthodean",
    "Acanthodei",
    "Acanthodes",
    "acanthodian",
    "Acanthodidae",
    "Acanthodii",
    "Acanthodini",
    "acanthoid",
    "Acantholimon",
    "acanthological",
    "acanthology",
    "acantholysis",
    "acanthoma",
    "Acanthomeridae",
    "acanthon",
    "Acanthopanax",
    "Acanthophis",
    "acanthophorous",
    "acanthopod",
    "acanthopodous",
    "acanthopomatous",
    "acanthopore",
    "acanthopteran",
    "Acanthopteri",
    "acanthopterous",
    "acanthopterygian",
    "Acanthopterygii",
    "acanthosis",
    "acanthous",
    "Acanthuridae",
    "Acanthurus",
    "acanthus",
    "acapnia",
    "acapnial",
    "acapsular",
    "acapu",
    "acapulco",
    "acara",
    "Acarapis",
    "acardia",
    "acardiac",
    "acari",
    "acarian",
    "acariasis",
    "acaricidal",
    "acaricide",
    "acarid",
    "Acarida",
    "Acaridea",
    "acaridean",
    "acaridomatium",
    "acariform",
    "Acarina",
    "acarine",
    "acarinosis",
    "acarocecidium",
    "acarodermatitis",
    "acaroid",
    "acarol",
    "acarologist",
    "acarology",
    "acarophilous",
    "acarophobia",
    "acarotoxic",
    "acarpelous",
    "acarpous",
    "Acarus",
    "Acastus",
    "acatalectic",
    "acatalepsia",
    "acatalepsy",
    "acataleptic",
    "acatallactic",
    "acatamathesia",
    "acataphasia",
    "acataposis",
    "acatastasia",
    "acatastatic",
    "acate",
    "acategorical",
    "acatery",
    "acatharsia",
    "acatharsy",
    "acatholic",
    "acaudal",
    "acaudate",
    "acaulescent",
    "acauline",
    "acaulose",
    "acaulous",
    "acca",
    "accede",
    "accedence",
    "acceder",
    "accelerable",
    "accelerando",
    "accelerant",
    "accelerate",
    "accelerated",
    "acceleratedly",
    "acceleration",
    "accelerative",
    "accelerator",
    "acceleratory",
    "accelerograph",
    "accelerometer",
    "accend",
    "accendibility",
    "accendible",
    "accension",
    "accensor",
    "accent",
    "accentless",
    "accentor",
    "accentuable",
    "accentual",
    "accentuality",
    "accentually",
    "accentuate",
    "accentuation",
    "accentuator",
    "accentus",
    "accept",
    "acceptability",
    "acceptable",
    "acceptableness",
    "acceptably",
    "acceptance"
];
var binASTLoaded = false
var wordCount = words.length;
