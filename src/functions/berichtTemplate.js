/* 
idToken
Relator_nummer
Soort_bericht_code(zie onder)
Voorstelnummer(0 als geen voorstel)
Bericht()

Soort bericht code:

1 - PB Wijzig
2 - POS reactie
3 - NEG reactie
5 - Foto upload
6 - Bericht naar PS: Administratie DONE
7 - Bericht naar PS: Suggestie / verbetertip DONE
8 - Bericht naar PS: Klacht DONE
9 - Bericht naar PS: Succesverhaal DONE
10 - Bericht naar PS: Uitschrijving DONE
11 - Bericht naar PS: Directie DONE
12 - Bericht naar bemiddelaar DONE

Berichttypes:
- Foto WEL laten zien
- Foto NIET laten zien

*/

export function initBericht() {
    return {
        idToken: null,
        Relator_nummer: null,
        Soort_bericht_code: null,
        Voorstelnummer: 0,
        Bericht: null,
    };
}
