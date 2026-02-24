/*
Dit bestand bevat de menu items die op MijnPS getoond worden. Zowel in balk op volledig scherm, als in de uitschuifbare versie op mobiele apparaten.
LET OP: Het path van elk item dient ook in router.js te bestaan. Anders komt het nergens uit.

*/

export default [
    { path: '/home', name: 'Home' },
    { path: '/berichten', name: 'Berichten' },
    { path: '/nieuw-bericht', name: 'Stuur bericht' },
    { path: '/voorstellen', name: 'Voorstellen' },
    { path: '/mijn-beschrijving', name: 'Beschrijving & Foto' },
    { path: '/slagingskanstips', name: 'Slagingskanstips' },
    { path: '/belangrijke-informatie', name: 'Belangrijke Informatie' },
    // { path: '/test', name: 'Test' },
    { path: '/logout', name: 'Uitloggen' },
];
