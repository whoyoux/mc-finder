import type { AppProps } from 'next/app';
import {
    ChakraProvider,
    extendTheme,
    ThemeConfig,
    ColorModeScript,
    CSSReset
} from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
    const config: ThemeConfig = {
        initialColorMode: 'dark',
        useSystemColorMode: false
    };

    const theme = extendTheme({ config });
    return (
        <ChakraProvider>
            <CSSReset />
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
