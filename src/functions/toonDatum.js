export const toonKorteDatumTijd = (datum) => {
    return new Date(datum).toLocaleString('nl', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const toonKorteDatum = (datum) => {
    return new Date(datum).toLocaleString('nl', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    // return new Date(iosCompatibleDate(datum)).toLocaleString('nl', {
    //     // dateStyle: 'short',
    //     day: 'numeric',
    //     month: 'numeric',
    //     year: 'numeric',
    // });
};

export const toonLangeDatum = (datum) => {
    return new Date(datum).toLocaleDateString('nl', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    // return new Date(iosCompatibleDate(datum)).toLocaleDateString('nl', {
    //     weekday: 'long',
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    // });
};

export const toonVoorstelDatum = (datum) => {
    return new Date(iosCompatibleDate(datum)).toLocaleDateString('nl', {
        month: 'long',
        year: 'numeric',
    });
};

export const iosCompatibleDate = (datum) => {
    return datum.replace(/-/g, '/');
};
