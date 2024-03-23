import{Stack} from 'expo-router';
import { useCallback } from 'react';
import {useFonts} from 'expo-font';

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Bold.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Bold.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {}, [fontsLoaded])

    if (!fontsLoaded) return null;

    return <Stack onLayout={onLayoutRootView}/>;
}

export default Layout;
