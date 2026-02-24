module.exports = {
    // publicPath: process.env.NODE_ENV === 'development' ? '/' : 'https://mijn.partnerselect.net/',
    publicPath: '/',
    pwa: {
        name: 'Mijn PartnerSelect',
        themeColor: '#ff5500',
        msTileColor: '#ff5500',
        manifestOptions: {
            short_name: 'MijnPS',
            start_url: '/',
            background_color: '#ffffff',
            display: 'standalone',
        },
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            cacheId: 'newmijnps3',
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            navigateFallback: '/',
        },
    },
};
