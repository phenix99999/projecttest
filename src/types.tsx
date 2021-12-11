import { AvisRecord } from "./stores/PremierAvisStore";

export type RootStackParamList = {
    Logout: undefined;
    Login: undefined;
    NotFound: undefined;
};

export type BottomTabParamList = {
    DossierList: undefined;
    Barcode: undefined;
};

export type TabOneParamList = {
    TabOneScreen: undefined;
};

export type TabTwoParamList = {
    TabTwoScreen: undefined;
};

export type DossierStackParamList = {
    DossierList: undefined;
    DossierFilters: undefined;
    Bottom: undefined;
};
export type Operation = "create" | "edit";

export type AvisStackParamList = {
    CreateAvis: { operation: "create" } | { operation: "edit"; record: AvisRecord };
    ListAvis: undefined;
};
export type LoginStackParamList = {
    Welcome: undefined;
    Form: undefined;
    Complexes: undefined;
    PremierAvisIntro: undefined;
    LesSentiers: undefined;
    CimetiereLaval: undefined;
    Services: undefined;
    ServicesDetails: { title: string; md: string };
    Login: undefined;
    DossierList: undefined;
};

export type DrawerStackParamList = {
    BottomTabs: undefined;
    Location: undefined;
};
