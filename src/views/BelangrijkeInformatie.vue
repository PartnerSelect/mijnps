<template>
    <div>
        <h1 class="oleo">Belangrijke informatie</h1>
        <p>
            Het is belangrijk dat je volledig op de hoogte bent, zodat je precies weet wat je van PartnerSelect kunt
            verwachten. Jouw consulent heeft al veel uitleg gegeven. Op deze pagina vind je alles wat je moet weten.
        </p>

        <h2 class="oleo">Contact met PartnerSelect</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('bemiddelaar-bereiken')">
                Hoe kan ik het beste mijn matchmaker bereiken?
            </li>
            <li class="table-clickable" @click="scrollToItem('postadres')">Naar welk adres stuur ik post?</li>
            <li class="table-clickable" @click="scrollToItem('wie-ziet-mijn-gegevens')">
                Kunnen andere mensen mijn gegevens ook zien op Mijn PartnerSelect?
            </li>
        </ul>
        <h2 class="oleo">De bemiddeling</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('hoe-vaak-voorstel')">Hoe vaak krijg ik een voorstel?</li>
            <li class="table-clickable" @click="scrollToItem('wanneer-voorstel')">
                Wanneer kan ik bericht van de bemiddeling verwachten?
            </li>
            <li class="table-clickable" @click="scrollToItem('wat-als-contact')">
                Hoe zit het met de bemiddeling als ik iemand beter wil leren kennen?
            </li>
            <li class="table-clickable" @click="scrollToItem('geen-bericht-bemiddeling')">
                Ik hoor niets meer van de matching, hoe komt dat?
            </li>
            <li class="table-clickable" @click="scrollToItem('geen-voorstel-gekregen')">
                Ik kon deze matchpoging geen voorstel krijgen, wat kan ik hieraan doen?
            </li>
        </ul>
        <h2 class="oleo">Administratie</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('rekeningnummer')">Wat is jullie bankrekeningnummer?</li>
            <li class="table-clickable" @click="scrollToItem('betalingen-stoppen')">
                Hoe kan ik mijn betalingen stoppen?
            </li>
        </ul>
        <h2 class="oleo">Overig</h2>
        <ul class="mijnps-ul">
            <li class="table-clickable" @click="scrollToItem('andere-vraag')">
                Komt jouw vraag in deze lijst niet voor?
            </li>
        </ul>

        <hr />

        <h3 class="oleo-black" id="bemiddelaar-bereiken">Hoe kan ik het beste mijn matchmaker bereiken?</h3>
        <p>
            <BelLink>Klik hier om een terugbelafspraak met jouw matchmaker te maken</BelLink>. Je kiest in zijn of haar
            agenda een tijdvak dat je goed uit komt en wordt dan gebeld. Natuurlijk kun je via Mijn PartnerSelect ook
            gericht aan je matchmaker een persoonlijk bericht sturen.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="postadres">Naar welk adres stuur ik post?</h3>
        <p>
            Ons postadres is PartnerSelect, Nijverheidsweg 31, 3161 GJ te Rhoon. Het is niet nodig om post ter attentie
            van iemand of een afdeling te sturen. Wij hebben een centrale administratie die ervoor zorgt dat de post bij
            de juiste persoon terecht komt.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="wie-ziet-mijn-gegevens">
            Kunnen andere mensen mijn gegevens ook zien op Mijn PartnerSelect?
        </h3>
        <p>
            Het antwoord is: Nee. Alleen jij hebt toegang tot jouw gegevens op Mijn PartnerSelect. We vragen je om deze
            reden zorgvuldig om te gaan met je inloggegevens.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="hoe-vaak-voorstel">Hoe vaak krijg ik een voorstel?</h3>
        <p>
            Het aantal voorstellen is afhankelijk van het pakket dat je hebt gekozen, maar ook van jouw wensen en wie je
            bent. De ene persoon kunnen we eens per 6 maanden een voorstel doen en weer andere mensen kunnen in 3
            maanden wel 4 voorstellen krijgen. Na het intakegesprek is een indicatie van het te verwachten aantal
            voorstellen gedaan. Heb je hier nog vragen over, benader dan gerust je matchmaker.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="wanneer-voorstel">Wanneer kan ik bericht van de bemiddeling verwachten?</h3>
        <p>
            Elke 20e van de maand versturen we updates rondom de bemiddeling. Je kunt op dat moment een voorstel
            ontvangen, of bericht dat het op dat moment niet mogelijk is om je aan iemand voor te stellen.
        </p>
        <p>
            Ook buiten de 20e kun je bericht rondom de bemiddeling krijgen. Het is daarom belangrijk dat je het tijdig
            aan ons doorgeeft wanneer je niet beschikbaar bent. Bijvoorbeeld omdat je in eigen kring iemand hebt
            ontmoet.
        </p>

        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="wat-als-contact">
            Hoe zit het met de bemiddeling als ik iemand beter wil leren kennen?
        </h3>
        <p>
            Wanneer je een voorstel hebt gekregen en na een geslaagde eerste ontmoeting elkaar beter wilt leren kennen,
            kunnen jullie de bemiddeling tijdelijk stopzetten. De betaling loopt dan wel door. Wil je dat ook de
            betaling stopt, overweeg dan om jezelf uit te schrijven. Dit is met een kalendermaand opzegtermijn mogelijk.
            Meld je in bijvoorbeeld oktober dat je verder wilt met je date en de betaling wilt stoppen, dan betaal je
            alleen de maand oktober en november nog. Stopt jullie contact na enige tijd en wil je nieuwe matches
            ontvangen, dan start op dat moment de betaling opnieuw.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="geen-bericht-bemiddeling">Ik hoor niets meer van de bemiddeling, hoe komt dat?</h3>
        <p>
            Is het de 20e geweest en heb je geen bericht ontvangen terwijl je dit wel had verwacht? Neem dan even
            contact met ons op. Mogelijk is er een misverstand in het spel en gaan wij er van uit dat je geen nieuwe
            voorstellen wenst. Stuur een bericht via Mijn PartnerSelect of <BelLink>maak een belafspraak</BelLink>.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="geen-voorstel-gekregen">
            Ik kon deze matchpoging geen voorstel krijgen, wat kan ik hieraan doen?
        </h3>
        <p>
            Wees in eerste instantie gerust. Niemand kan iedere matchpoging een voorstel krijgen. Hoe goed we ook ons
            best doen, het bestand is nooit volledig in evenwicht. Vaak ontstaan er mogelijkheden als we net even anders
            naar je voorkeuren mogen kijken of we ontdekken samen dat er meer geduld nodig is. Het gaat tenslotte om je
            toekomstige partner en als die een maand langer op zich laat wachten, dan is het achteraf het wachten waard
            geweest.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="rekeningnummer">Wat is jullie bankrekeningnummer?</h3>
        <p>Ons Rabobank rekeningnumer is NL89 RABO 0125 4758 10</p>
        <p>
            Geef bij een betaling altijd het factuurnummer door als betalingskenmerk en voldoe bij grote voorkeur de
            factuur met de Ideal link die in de e-mail staat.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="betalingen-stoppen">Hoe kan ik mijn betalingen stoppen?</h3>
        <p>
            Je staat met een kalendermaand opzegtermijn ingeschreven. Wanneer je je in bijvoorbeeld april uitschrijft,
            dan betaal je alleen de maand april en mei nog. Daarna stoppen de betalingen. Wil je je uitschrijven? Stuur
            dan een bericht en wij zullen de uitschrijving binnen enkele werkdagen bevestigen.
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>

        <h3 class="oleo-black" id="andere-vraag">Komt jouw vraag in deze lijst niet voor?</h3>
        <p>
            Je kunt altijd een bericht sturen. Ga hiervoor naar Berichten of
            <BelLink>maak een belafspraak.</BelLink>
        </p>
        <a href="#" @click.prevent="scrollToTop">Naar boven</a>
    </div>
</template>

<script>
    import { scrollToItem, scrollToTop } from '../functions/scrollFunctions';

    export default {
        data() {
            return {};
        },
        mounted() {
            scrollTo(0, 0);
        },
        methods: {
            scrollToItem,
            scrollToTop,
        },
    };
</script>
