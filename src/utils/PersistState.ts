
const NAVIGATION_KEY = 'NAVIGATION_KEY'
export type Screen = 'Login' | 'Logout'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function setNavigationState(screen: Screen) {
    try {
        await AsyncStorage.setItem(NAVIGATION_KEY, screen);
    } catch (error) {
        return
    }
}

export async function getNavigationState(): Promise<Screen> {
    // return 'Logout';

    try {
        const value = await AsyncStorage.getItem(NAVIGATION_KEY);
        if (value !== null && (value === 'Login' || value === 'Logout')) {
            return value as Screen
        }
        return 'Logout'
    } catch (error) {
        return 'Logout'
    }
}