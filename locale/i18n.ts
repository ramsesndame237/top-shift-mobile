import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from "./en";
import fr from "./fr";

const i18n = new I18n({  en, fr });

i18n.locale =Localization.locale;
i18n.enableFallback = true;

export default i18n;
export const t = i18n.t.bind(i18n);