<template>
    <FullscreenLoader v-if="!user" />

    <div v-else>
        <h1 class="oleo">Hoe laat ik een contact slagen?</h1>
        <p>
            Om eerlijk te zijn: een geslaagd contact heb je niet altijd in de hand. De vonk moet immers overslaan, en
            dat is een stukje chemie waar je geen invloed op hebt. Toch kun je veel doen om een goed contact te krijgen
            en te houden. Voor alle tips geldt: gebruik ze als je er het nut van inziet. Wees wie je bent!
        </p>

        <h2 class="oleo">Hoe krijg ik contact?</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="$router.push('/reactietips')">Tips bij het reageren op voorstellen</li>
        </ul>

        <h2 class="oleo">Maak een afspraak!</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('neutrale-plek')">
                Spreek af op een neutrale plek elkaar te ontmoeten
            </li>
            <li class="table-clickable" @click="scrollToItem('hou-het-kort')">Hou de eerste ontmoeting kort</li>
            <li class="table-clickable" @click="scrollToItem('herkennen')">Hoe herken je elkaar?</li>
            <li class="table-clickable" @click="scrollToItem('welke-foto-gezien')">Welke foto is er van je te zien?</li>
            <li class="table-clickable" @click="scrollToItem('mobiele-nummers')">Wissel mobiele telefoonnummers uit</li>
        </ul>

        <h2 class="oleo">Bereid je voor op de ontmoeting</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('verwacht-niet-teveel')">Verwacht niet teveel!</li>
            <li class="table-clickable" @click="scrollToItem('verzorging')">Verzorging / voorkomen</li>
            <li class="table-clickable" @click="scrollToItem('kom-op-tijd')">Kom op tijd!</li>
        </ul>

        <h2 class="oleo">De ontmoeting</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('wees-beleefd')">Wees vriendelijk en open</li>
            <li class="table-clickable" @click="scrollToItem('mobiel-uit')">Zet je mobiele telefoon uit</li>
        </ul>

        <h2 class="oleo">Het gesprek</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('gesprekstechnieken')">Gesprekstechnieken</li>
            <li class="table-clickable" @click="scrollToItem('luister-aandachtig')">Luister aandachtig</li>
            <li class="table-clickable" @click="scrollToItem('stel-vragen')">Stel vragen en vertel over jezelf!</li>
            <li class="table-clickable" @click="scrollToItem('stel-waarom-vragen')">Stel waarom-vragen</li>
            <li class="table-clickable" @click="scrollToItem('stel-oordeel-uit')">Stel je oordeel uit</li>
        </ul>

        <h2 class="oleo">Ongeschikte gespreksonderwerpen</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('onzin-leugens')">Onzin en leugens</li>
            <li class="table-clickable" @click="scrollToItem('voorgaande-liefdesleven')">Je voorgaande liefdesleven</li>
            <li class="table-clickable" @click="scrollToItem('zware-onderwerpen')">Zware onderwerpen</li>
        </ul>

        <h2 class="oleo">Tips</h2>
        <ul class="mijnps-ul" v-if="user.Geslacht === 'M'">
            <li class="table-clickable" @click="scrollToItem('heer-betaalt')">Een heer betaalt?</li>
            <li class="table-clickable" @click="scrollToItem('wees-een-heer')">Wees een heer!</li>
        </ul>

        <ul class="mijnps-ul" v-if="user.Geslacht === 'V'">
            <li class="table-clickable" @click="scrollToItem('vriendinnen-thuis')">De vriendinnen blijven thuis!</li>
            <li class="table-clickable" @click="scrollToItem('financieel-voorbereid')">Wees financieel voorbereid</li>
        </ul>

        <h2 class="oleo">Sluit de ontmoeting goed af</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('klik-is-er-niet')">De klik is er niet?</li>
            <li class="table-clickable" @click="scrollToItem('klik-is-er-wel')">De klik is er wel!</li>
            <li class="table-clickable" @click="scrollToItem('weet-nog-niet')">Je weet het niet?</li>
        </ul>

        <hr />

        <h3 class="oleo-black" id="reactietips">Hoe krijg ik contact?</h3>
        <p>
            Je ontvangt elkaars beschrijving en nadat jullie allebei positief gereageerd hebben, krijg je elkaars
            telefoonnummer.<br />
            <router-link to="/reactietips">Lees hier de tips voor het geven van een reactie</router-link>
        </p>

        <h3 class="oleo-black" id="neutrale-plek">Spreek af op een neutrale plek elkaar te ontmoeten</h3>
        <p>
            Je mag verwachten dat PartnerSelect je aan een betrouwbaar persoon voorstelt. Wij geven geen adresgegevens
            door. Volg jouw gevoel wanneer je dit wilt doen. Kies voor een eerste date bij voorkeur wel voor een plek
            die voor jullie allebei nieuw is. Ergens halverwege tussen jullie woonplaatsen. Op die manier ga je toch op
            een meer gelijke voet op date.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="hou-het-kort">Hou de eerste ontmoeting kort</h3>
        <p>
            Kies niet direct voor een uitgebreid diner. Mocht het niet klikken of komt het gesprek niet van de grond,
            kun je de date sneller afsluiten. Ga liever een kopje koffie drinken met elkaar of spreek af om samen een
            korte activiteit te ondernemen. Ga ook niet naar de film. Het staat bekend als een klassieke eerste date,
            maar je komt niet met elkaar in gesprek.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="herkennen">Hoe herken je elkaar?</h3>
        <p>
            Spreek af hoe jullie elkaar kunnen herkennen (een recente foto op de persoonsbeschrijving is daarom ook
            essentieel). Wees specifiek waar je afspreekt. Onder het vertrektijdenbord voor loket 1 op het Centraal
            Station is beter dan alleen afspreken dat je elkaar op het station ontmoet.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="welke-foto-gezien">Welke foto is er van je te zien?</h3>
        <p>
            Rondom jouw profielfoto denken we natuurlijk met je mee, maar vergeet niet dat foto's die je ergens anders
            op social media hebt staan ook gevonden kunnen worden. Let vooral goed op de foto die bij jouw WhatsApp
            contact te zien is. Sta je er samen met je vorige partner op of in een dolle bui met een glas alcohol?
            Gebruik neutrale foto's. Zolang iemand je nog niet kent, adviseren we je hier bewust mee om te gaan.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="mobiele-nummers">Wissel mobiele telefoonnummers uit</h3>
        <p>
            Mocht je door onvoorziene omstandigheden te laat komen, dan kun je altijd bellen. Zet jouw mobiel ook aan,
            want ook de andere persoon kan onvoorzien te laat arriveren op de afspraak.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="verwacht-niet-teveel">Verwacht niet teveel!</h3>
        <p>
            Misschien wel de belangrijkste tip bij de voorbereiding. Een afspraakje is leuk, je hebt elkaars interesse
            gewekt, maar of de klik er komt? Zie het eerste contact als een kennismakingsgesprek en niet meer dan dat.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="verzorging">Verzorging / voorkomen</h3>
        <p>
            Kom goed verzorgd voor de dag, maar kleed je natuurlijk ook naar de gelegenheid. Een driedelig kostuum of
            galajurk zijn voor de meeste dates nogal overdreven. Kies een outfit waar je je comfortabel in voelt.
            <span v-if="user.Geslacht === 'M'"
                >Een snor of baard kan verkeerd vallen als deze niet netjes onderhouden is. Gladgeschoren is zelden een
                probleem. Luchtje? Goed idee. Maar bedenk wel: <em>Less is more.</em></span
            >
            <span v-if="user.Geslacht === 'V'">Parfum? Goed idee. Maar bedenk: <em>Less is more</em>.</span>
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="kom-op-tijd">Kom op tijd!</h3>
        <p>
            Een eerste indruk maak je maar één keer en te laat komen is niet de beste indruk. Bereid je dan ook goed
            voor en vertrek op tijd. Wanneer je je hebt moeten haasten om op tijd te komen, zit je lichaam nog vol
            adrenaline als je aankomt. Dit versterkt eventuele zenuwen op de date zelf. Natuurlijk kunnen onvoorziene
            dingen onderweg gebeuren. Laat de ander dit dan wel tijdig weten. Vergeet elkaars mobiele nummer dan ook
            niet op te slaan.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="wees-beleefd">Wees vriendelijk en open</h3>
        <p>
            Begroet de ander hartelijk en geef aan dat je blij bent dat je elkaar kunt ontmoeten. Het eerste wat je ziet
            van je date, is de uitstraling. Kom dus met een open houding binnen en lach. Geef het ook eerlijk toe als je
            zenuwachtig bent. Dat is de ander vast ook.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="mobiel-uit">Zet de mobiele telefoon uit.</h3>
        <p>
            Je bent samen op date, daar richt je de aandacht op. Zet je telefoon dan ook uit. Teveel op je telefoon
            kijken, blijkt de allergrootste afknapper tijdens een eerste date te zijn. Mocht je om een of andere reden
            echt bereikbaar moeten blijven, neem de telefoon dan alleen op als het echt noodzakelijk is.
            SMSjes/Whatsappjes kunnen wachten tot na de date.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="gesprekstechnieken">Gesprekstechnieken</h3>
        <p>
            Een goed gesprek leidt zichzelf. Toch kun je wat handvatten gebruiken. De uiteindelijke bedoeling is
            natuurlijk dat jullie elkaar beter leren kennen.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="luister-aandachtig">Luister aandachtig</h3>
        <p>
            Het doel van de ontmoeting is de ander beter te leren kennen. Luister daarom aandachtig. Luisteren doe je
            trouwens niet alleen met de oren. Je kijkt de ander aan, reageert met je ogen en knikt bevestigend met je
            hoofd. Een valkuil tijdens een eerste date is dat je teveel met jezelf bezig bent doordat je een goede
            indruk wilt maken en je afvraagt hoe je overkomt. Logisch, maar probeer je echt op de ander te richten. Dit
            doe je door écht naar hem of haar te luisteren.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="stel-vragen">Stel vragen en vertel over jezelf!</h3>
        <p>
            In het verlengde van luisteren, hoort het stellen van vragen ook bij het luisteren. Reageer op wat de ander
            vertelt, stel vragen en vertel natuurlijk zelf ook iets. Je wilt elkaar leren kennen dus geef ook een open
            antwoord als jou iets gevraagd wordt. Geef elkaar de ruimte om iets te vertellen en zorg voor een goede
            balans. Je hebt elkaars beschrijving al gelezen, dus vaak heb je al de nodige onderwerpen waarover je door
            kunt praten.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="stel-waarom-vragen">Stel waarom-vragen</h3>
        <p>
            Lijken jouw afspraakjes tot nu toe op ongezellige interviews? Begin vragen dan minder met ‘wat’ en meer met
            ‘waarom’ ( “Waarom doe je dat werk?” / “Waarom is dat je lievelingsboek?” ). Een waarom vertelt je meer over
            iemand dan alleen een wat. Ook kun je de standaard vragen naar werk, achtergrond en hobby’s omzetten in of
            aanvullen met vragen waarbij je net iets meer te weten komt.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="stel-oordeel-uit">Stel je oordeel uit</h3>
        <p>
            Stel je open voor de ander; stel je oordeel uit. Mensen hebben snel een oordeel, maar vaak blijkt zo’n
            eerste indruk niet te kloppen. Probeer iemand echt te leren kennen. In plaats van te denken waarom iemand
            niet bij je past, kun je je tijdens een eerste date beter afvragen waarom iemand wel bij jou zou passen. Dit
            helpt je om je echt open te stellen.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="onzin-leugens">Onzin en leugens</h3>
        <p>
            Zonneklaar natuurlijk, niet liegen. Een leugen is geen goede basis voor een relatie. Een leugen achterhaalt
            zich snel. Maar wat is een leugen? Ook als je de zaken enkel wat aandikt, vertel je eigenlijk niet de
            waarheid. Voor een duurzame relatie is het belangrijk dat de ander jóu leert kennen. Niet een leukere versie
            van jezelf. Wees gewoon eerlijk, ook over de wat minder positieve punten. Dit betekent natuurlijk niet dat
            je alle negatieve ervaringen of slechte eigenschappen gaat opbiechten, dat mag je doen, wanneer jullie
            relatie al wat verder gevorderd is.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="voorgaande-liefdesleven">Je voorgaande liefdesleven</h3>
        <p>
            Vertel niet over je voorgaande liefdesleven. Breng de ander dus niet direct op de hoogte van scheiding(en),
            ex(en), voorgaande liefdesaffaire(s) of ervaring(en) bij je vorige contactvoorstel(len). Uiteraard kun je
            wel vertellen dat je gescheiden bent, of dat je partner is overleden, maar laat details tijdens de eerst
            ontmoeting achterwege, deze zouden de ander kunnen afschrikken. Dit gesprek gaat niet over jullie eigen
            verleden, maar over de toekomst van jullie samen. Maak geen seksuele toespelingen of zinspelingen. Veel
            mensen, zowel vrouwen als mannen, knappen af bij dergelijke opmerkingen bij het eerste contact. Je komt
            gefrustreerd en onfatsoenlijk over. Bij een eerste ontmoeting past geen seksuele ervaring, dus ga daar ook
            niet van uit.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="zware-onderwerpen">Zware onderwerpen</h3>
        <p>
            Stel niet meteen diepe filosofische, religieuze, politieke of te persoonlijke vragen. Hou het bij voorkeur
            een beetje luchtig tijdens een eerste afspraakje. Komt een zwaar onderwerp als de dood van bijvoorbeeld een
            vorige partner of de scheiding toch aan bod, ga er dan niet te diep op in en stel voor er later nog eens
            over te praten. Ook positieve onderwerpen liggen soms wat zwaar: praat niet direct over trouwen, een
            kinderwens of toekomstige verhuizing. Merk je dat het gesprek vanzelf meer de diepte ingaat en jullie je
            hier allebei comfortabel bij voelen? Dan kun je hier natuurlijk wel in mee gaan. Vertrouw op je gevoel en
            houd de reactie van de ander in de gaten.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <template v-if="user.Geslacht === 'M'">
            <h3 class="oleo-black" id="heer-betaalt">Een heer betaalt?</h3>
            <p>
                Het was lang gebruikelijk dat de man de eerste date betaalt. Tegenwoordig is dit minder vanzelfsprekend.
                Niet elke vrouw zal het verwachten. Sommigen vinden het betuttelend of niet gelijkwaardig. Anderen
                willen niet het idee hebben dat er een tegenprestatie tegenover moet staan. Aan de andere kant zijn er
                ook veel vrouwen die het wel verwachten. Net zoals zij verwachten dat de man het initiatief moet nemen
                om te bellen. Wees erop voorbereid de rekening te betalen, maar maak het bespreekbaar.
            </p>
            <a href="#" @click.prevent="scrollToTop">Naar boven</a>

            <h3 class="oleo-black" id="wees-een-heer">Wees een heer!</h3>
            <p>
                Dat wil zeggen wees attent. Volg de etiquette. Suggestieve opmerkingen of te aanhankelijk gedrag wordt
                bij het eerste contact vaak als zeer hinderlijk ervaren: laat dit dan ook achterwege.
            </p>
            <a href="#" @click.prevent="scrollToTop">Naar boven</a>
        </template>

        <template v-if="user.Geslacht === 'V'">
            <h3 class="oleo-black" id="vriendinnen-thuis">De vriendinnen blijven thuis!</h3>
            <p>
                Hoe spannend het ook is, een ontmoeting zul je alleen aan moeten gaan. Vriendin(nen) gaa(t/n) dus niet
                met je mee! Ook niet op een afstandje.
            </p>
            <a href="#" @click.prevent="scrollToTop">Naar boven</a>

            <h3 class="oleo-black" id="financieel-voorbereid">Wees financieel voorbereid</h3>
            <p>
                Niet elke vrouw kan het waarderen dat de man de rekening betaalt. En niet elke man gaat er nog vanuit
                dit te zullen doen. Wees dus voorbereid de rekening te delen, al zullen veel mannen toch aanbieden de
                (eerste) rekening te betalen. Maak het in elk geval altijd bespreekbaar.
            </p>
            <a href="#" @click.prevent="scrollToTop">Naar boven</a>
        </template>

        <h3 class="oleo-black" id="klik-is-er-niet">De klik is er niet?</h3>
        <p>
            Er is een verschil tussen het ontbreken van de klik en het totaal niet zien zitten van de ander. Een
            ontmoeting kan om verschillende redenen stroef verlopen: zenuwachtigheid, verlegenheid, lichamelijke stress
            of werk- of privé-omstandigheden. Deze aspecten hoeven niet direct te betekenen dat de klik nooit komt. Wees
            eerlijk over je gevoelens en stel voor om nog eens af te spreken. Je bent bij een tweede ontmoeting allebei
            over de ergste zenuwen heen, zodat je meer oog hebt voor elkaar. Jullie zouden niet de eersten zijn waarbij
            het na een tweede ontmoeting ineens wel klikt. Weet je zeker dat de ander niets voor je is? Meld dit dan
            eerlijk en beleefd. Wees duidelijk, vertel dat je het bij deze ontmoeting wilt laten.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="klik-is-er-wel">De klik is er wel!</h3>
        <p>
            Geef de ander te kennen dat je het naar je zin hebt gehad. Stel voor elkaar nogmaals te ontmoeten. Je hoeft
            niet direct een nieuwe afspraak te maken. Wanneer je belooft de ander te bellen, spreek dan af wanneer je
            dit doet en hou je eraan. Spreek je het niet specifiek af? Wacht dan niet langer dan 2 dagen. Een
            sms-bericht sturen mag wel direct na de ontmoeting, maar overdrijf het niet, één bericht is heus voldoende.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="weet-nog-niet">Je weet het niet?</h3>
        <p>
            Uiteraard hoef je niet direct te beslissen om de ander nogmaals te ontmoeten. Vraag bedenktijd, slaap er nog
            een nachtje over. Laat de ander echter geen dagen wachten. Reageer zo snel mogelijk, liefst de volgende dag,
            of hooguit na twee dagen. Nog langer wachten is echt onbeleefd en zal de beslissing niet makkelijker maken.
            Tenslotte: gun de ander het voordeel van de twijfel. Vaak komt de klik pas echt bij de tweede ontmoeting.
            Het ijs is dan gebroken, en jullie kunnen meer ontspannen met elkaar praten.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>
    </div>
</template>

<script>
    import { scrollToItem, scrollToTop } from '../functions/scrollFunctions';
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {};
        },
        mounted() {
            scrollTo(0, 0);
        },
        computed: {
            ...mapGetters(['user']),
        },
        methods: {
            scrollToItem,
            scrollToTop,
        },
    };
</script>
