import type { SupportedLocale, TranslationDictionary } from "../types";
import en from "./en.json";
import am from "./am.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";
import fr from "./fr.json";
import de from "./de.json";
import es from "./es.json";
import ar from "./ar.json";
import nl from "./nl.json";
import it from "./it.json";
import pt from "./pt.json";

export const dictionaries: Record<SupportedLocale, TranslationDictionary> = {
  en: en as unknown as TranslationDictionary,
  am: am as unknown as TranslationDictionary,
  zh: zh as unknown as TranslationDictionary,
  ja: ja as unknown as TranslationDictionary,
  ko: ko as unknown as TranslationDictionary,
  fr: fr as unknown as TranslationDictionary,
  de: de as unknown as TranslationDictionary,
  es: es as unknown as TranslationDictionary,
  ar: ar as unknown as TranslationDictionary,
  nl: nl as unknown as TranslationDictionary,
  it: it as unknown as TranslationDictionary,
  pt: pt as unknown as TranslationDictionary,
};

export function getDictionary(locale: SupportedLocale): TranslationDictionary {
  return dictionaries[locale] || dictionaries.en;
}

