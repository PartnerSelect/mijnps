export function errorToMessage(error) {

    if (error.message) {
        // Return strings for error messages
        if (error.message.match(/Network error/i)) {
            return 'Er kon geen verbinding gemaakt worden met de server.';
        }
    }


    // Nieuwe variant
    if (error.response.status === 401) {
        return 'Onjuiste logingegevens';
    }



    // ------------------------------------------------
    // PS ERRORS IN PRODUCTIE
    // ------------------------------------------------
    if (error.response.data.ps_error) {
        let err = error.response.data.ps_error;

        if (err.match(/FIREBASE_FOUT/i)) {
            return 'Fout bij authenticatie gegevens.';
        }

        if (err.match(/GEEN_MIJNPS_GEGEVENS/i)) {
            return 'Gegevens konden niet geladen worden.';
        }

        if (err.match(/EMAIL_WACHTWOORD_ONJUIST/i)) {
            return 'Deze email / wachtwoord combinatie is ongeldig.';
        }

        if (err.match(/FIREBASE_REFRESH_TOKEN_ERROR/i)) {
            return 'Sessie kon niet ververst worden.';
        }

        if (err.match(/FOUT_BIJ_WACHTWOORD_WIJZIGEN/i)) {
            return 'FOUT: Wachtwoord kon niet gewijzigd worden.';
        }

        if (err.match(/WACHTWOORD_ONJUIST_OF_OOB_CODE_ONJUIST_OF_VERLOPEN/i)) {
            return 'Wachtwoord kon niet opgeslagen worden. Mogelijk is de link uit de e-mail ouder dan 30 minuten of al een keer eerder gebruikt. <a href=\'/reset-wachtwoord\' style=\'color:black\'>Klik hier om een nieuwe e-mail aan te vragen</a> met een geldige link om je wachtwoord in te stellen.'
        }

        if (err.match(/FOUT_BIJ_UPDATE_BERICHT/i)) {
            return 'Fout bij statuswijziging van bericht.';
        }

        if (err.match(/Geen geldig foto formaat/i)) {
            return 'Controleer bestand. Geen geldig foto bestand.';
        }
    }

    // ------------------------------------------------
    // FIREBASE FOUTMELDINGEN INDIEN IN TESTOMGEVING
    // ------------------------------------------------
    if (error.response.data.error) {
        let err = error.response.data.error;
        // LOGIN ERRORS
        // Gebruikersnaam / wachtwoord onjuist of onbekend.
        if (err.message.match(/INVALID_PASSWORD/i) || err.message.match(/EMAIL_NOT_FOUND/i)) {
            return 'Deze gebruikersnaam / wachtwoord combinatie is onjuist of onbekend';
        }
        // Wachtwoord ontbreekt. Zou alleen mogelijk moeten zijn als het formulier kapot is.
        if (err.message.match(/MISSING_PASSWORD/i)) {
            return 'Er is geen wachtwoord ingevuld';
        }
        // Als account uitgeschakeld is.
        if (err.message.match(/USER_DISABLED/i)) {
            return 'Geen toegang - Dit account bestaat niet (meer)';
        }
        // Te veel onjuiste pogingen
        if (err.message.match(/TOO_MANY_ATTEMPTS_TRY_LATER/i)) {
            return 'Te vaak verkeerde logingegevens ingevuld. Probeer het later opnieuw';
        }

        // CHANGE PASSWORD ERRORS
        // Token is niet meer geldig
        if (err.message.match(/INVALID_ID_TOKEN/i)) {
            return 'Sessie ongeldig - Wachtwoord kan niet gewijzigd worden.';
        }
        // Wachtwoord onveilig
        if (err.message.match(/WEAK_PASSWORD/i)) {
            return 'Wachtwoord voldoet niet aan de veiligheidseisen';
        }
        // Token verlopen
        if (err.message.match(/CREDENTIAL_TOO_OLD_TO_LOGIN_AGAIN/i)) {
            return 'Sessie is verlopen - Wachtwoord kan niet gewijzigd worden.';
        }

        // PASSWORD RESET ERRORS
        // Herstelcode verlopen
        if (err.message.match(/EXPIRED_OOB_CODE/i)) {
            return 'De wachtwoord herstelcode is verlopen en kan niet meer gebruikt worden.';
        }
        // Herstelcode ongeldig
        if (err.message.match(/INVALID_OOB_CODE/i)) {
            return 'De herstelcode is ongeldig. Deze is reeds gebruikt of er ging iets mis met verzenden.';
        }
    }

    // If nothing above returned
    return 'ONBEKENDE FOUT: Er ging iets mis. Neem contact op met PartnerSelect als deze fout zich voor blijft doen.';
}
