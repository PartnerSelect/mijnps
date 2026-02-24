<template>
    <div class="mijnps-edit">
        <template v-if="!fotoVerzonden">
            <button class="btn" @click="$router.go(-1)">Ga terug</button>
            <h3 class="oleo">Upload nieuwe foto</h3>
            <p style="margin-bottom: 2rem">
                Hieronder kun je een of meerdere foto's uploaden. We gebruiken één profielfoto. Overige foto's kunnen de
                matchmakers gebruiken voor het vinden van de juiste match.
            </p>

            <form>
                <vue-dropzone
                    ref="fotoDropzone"
                    id="fotoDropzone"
                    :duplicateCheck="true"
                    :options="dropzoneOptions"
                    @vdropzone-complete="completeResponse"
                    @vdropzone-error="handleError"
                    @vdropzone-sending="handleSend"
                    @vdropzone-queue-complete="queueComplete"
                ></vue-dropzone>
                <input
                    type="submit"
                    class="btn btn-rounded"
                    style="width: 100%"
                    value="Verstuur"
                    :disabled="fotoVerzendingActief"
                    @click.prevent="verwerkFoto"
                />
            </form>
        </template>
        <template v-else>
            <h3 class="oleo">Foto verzonden</h3>
            <p>
                Het verzenden naar PartnerSelect is gelukt! De foto's nemen we bij de gegevens op. Er staat altijd maar
                één foto naast de beschrijving. Jouw matchmaker maakt een inschatting welke foto hiervoor het meest
                geschikt is.
            </p>
            <button class="btn" @click="$router.push('/mijn-beschrijving')">Terug naar mijn beschrijving</button>
        </template>
    </div>
</template>

<script>
    import vue2dropzone from 'vue2-dropzone';
    import 'vue2-dropzone/dist/vue2Dropzone.min.css';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        data() {
            return {
                fotoVerzonden: false,
                fotoVerzendingActief: false,
                dropzoneOptions: {
                    url: `${this.$baseUrl}/upload`,
                    thumbnailWidth: 180,
                    uploadMultiple: false,
                    maxFilesize: 10,
                    acceptedFiles: 'image/*,.jpg,.jpeg,.gif,.png',
                    addRemoveLinks: true,
                    autoProcessQueue: false,
                    paramName: 'file',

                    dictDefaultMessage: 'Sleep een bestand hier naartoe of klik op dit veld om te uploaden.',
                    dictFallbackMessage: 'Deze browser ondersteunt het uploaden niet.',
                    dictFileTooBig: 'Dit bestand is te groot om te uploaden',
                    dictInvalidFileType: 'Dit bestandstype wordt niet geaccepteerd',
                    dictResponseError: 'Bestand kon niet geupload worden',
                    dictRemoveFile: 'Verwijderen',
                    dictCancelUpload: 'Annuleer',
                    dictUploadCanceled: 'Upload geannuleerd',
                    dictCancelUploadConfirmation: 'Weet je zeker dat je dit bestand niet wilt uploaden?',
                    dictRemoveFileConfirmation: 'Weet je zeker dat je dit bestand niet wilt uploaden?',
                },
            };
        },
        mounted() {
            scrollTo(0, 0);
        },
        components: {
            vueDropzone: vue2dropzone,
        },
        methods: {
            ...mapActions(['addNotification']),
            async handleSend(file, xhr, formData) {
                xhr.withCredentials = true;
                formData.append('userId', this.user.Id);
            },
            async verwerkFoto() {
                this.fotoVerzendingActief = true;
                this.$refs.fotoDropzone.processQueue();
            },
            completeResponse(response) {
                if (response.xhr && response.xhr.status === 200) {
                    this.addNotification('Bestand verzonden.');
                }
            },
            queueComplete() {
                this.clearUploadField();
                this.fotoVerzendingActief = false;
                this.$router.push('/bedankt?type=foto');
            },
            clearUploadField() {
                this.$refs.fotoDropzone.removeAllFiles();
            },
            handleError(file, message, xhr) {
                // ERRORS voor verzending
                if (message.match(/bestandstype wordt niet geaccepteerd/i)) {
                    this.addNotification(
                        file.name + ' - Is geen geldig beeldbestand. Het bestand wordt uit de wachtrij verwijderd.'
                    );
                } else if (message.match(/bestand is te groot om te uploaden/i)) {
                    this.addNotification(
                        file.name + ' - Bestand is te groot. Het bestand wordt uit de wachtrij verwijderd.'
                    );
                } else if (xhr && xhr.response) {
                    // ERRORS na verzending
                    if (message.match(/BESTAND_TE_GROOT/i)) {
                        this.addNotification(
                            file.name + ' - Bestand is te groot. Het bestand wordt uit de wachtrij verwijderd.'
                        );
                    }
                    if (message.match(/BESTAND_GEEN_PNG_GIF_JPG/i)) {
                        this.addNotification(
                            file.name +
                                ' - Bestand is geen geldig beeldbestand. Het bestand wordt uit de wachtrij verwijderd.'
                        );
                    }
                } else {
                    this.addNotification(
                        file.name + ' - Er ging iets mis met uploaden. Het bestand wordt uit de wachtrij verwijderd'
                    );
                }

                this.$refs.fotoDropzone.removeFile(file);
            },
        },
        computed: {
            ...mapGetters(['user']),
        },
    };
</script>
