"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Globe } from "lucide-react"
import Link from "next/link"

const translations = {
  en: {
    title: "Before You Download",
    disclaimer:
      "This software tool is for use ONLY with a legally licensed copy of <strong>exocad</strong> software. Use with pirated, cracked, or unauthorized versions is strictly prohibited. By continuing, you confirm that you own a valid <strong>exocad</strong> license and agree to the Terms of Use.",
    readTerms: "Read full Terms of Use",
    agreement: "I confirm that I own a valid <strong>exocad</strong> license and agree to the Terms of Use.",
    downloadButton: "I Agree & Download",
    backButton: "Back", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — All rights reserved.",
  },
  de: {
    title: "Bevor Sie herunterladen",
    disclaimer:
      "Dieses Software-Tool ist NUR für die Verwendung mit einer legal lizenzierten Kopie der <strong>exocad</strong>-Software bestimmt. Die Verwendung mit raubkopierten, gecrackten oder nicht autorisierten Versionen ist strengstens untersagt. Durch Fortfahren bestätigen Sie, dass Sie eine gültige <strong>exocad</strong>-Lizenz besitzen und den Nutzungsbedingungen zustimmen.",
    readTerms: "Vollständige Nutzungsbedingungen lesen",
    agreement:
      "Ich bestätige, dass ich eine gültige <strong>exocad</strong>-Lizenz besitze und den Nutzungsbedingungen zustimme.",
    downloadButton: "Ich stimme zu & Herunterladen",
    backButton: "Zurück", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Alle Rechte vorbehalten.",
  },
  es: {
    title: "Antes de Descargar",
    disclaimer:
      "Esta herramienta de software es para uso ÚNICAMENTE con una copia legalmente licenciada del software <strong>exocad</strong>. El uso con versiones pirateadas, crackeadas o no autorizadas está estrictamente prohibido. Al continuar, confirma que posee una licencia válida de <strong>exocad</strong> y acepta los Términos de Uso.",
    readTerms: "Leer Términos de Uso completos",
    agreement: "Confirmo que poseo una licencia válida de <strong>exocad</strong> y acepto los Términos de Uso.",
    downloadButton: "Acepto y Descargar",
    backButton: "Atrás", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Todos los derechos reservados.",
  },
  pt: {
    title: "Antes de Baixar",
    disclaimer:
      "Esta ferramenta de software é para uso APENAS com uma cópia legalmente licenciada do software <strong>exocad</strong>. O uso com versões pirateadas, crackeadas ou não autorizadas é estritamente proibido. Ao continuar, você confirma que possui uma licença válida do <strong>exocad</strong> e concorda com os Termos de Uso.",
    readTerms: "Ler Termos de Uso completos",
    agreement: "Confirmo que possuo uma licença válida do <strong>exocad</strong> e concordo com os Termos de Uso.",
    downloadButton: "Concordo e Baixar",
    backButton: "Voltar", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Todos os direitos reservados.",
  },
  pl: {
    title: "Przed Pobraniem",
    disclaimer:
      "To narzędzie programowe jest przeznaczone TYLKO do użytku z legalnie licencjonowaną kopią oprogramowania <strong>exocad</strong>. Użycie z pirackimi, złamanymi lub nieautoryzowanymi wersjami jest surowo zabronione. Kontynuując, potwierdzasz, że posiadasz ważną licencję <strong>exocad</strong> i zgadzasz się z Warunkami Użytkowania.",
    readTerms: "Przeczytaj pełne Warunki Użytkowania",
    agreement:
      "Potwierdzam, że posiadasz ważną licencję <strong>exocad</strong> i zgadzasz się z Warunkami Użytkowania.",
    downloadButton: "Zgadzam się i Pobierz",
    backButton: "Wstecz", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Wszystkie prawa zastrzeżone.",
  },
  cs: {
    title: "Před Stažením",
    disclaimer:
      "Tento softwarový nástroj je určen POUZE pro použití s legálně licencovanou kopií softwaru <strong>exocad</strong>. Použití s pirátskými, cracknutými nebo neautorizovanými verzemi je přísně zakázáno. Pokračováním potvrzujete, že vlastníte platnou licenci <strong>exocad</strong> a souhlasíte s Podmínkami Použití.",
    readTerms: "Přečíst úplné Podmínky Použití",
    agreement: "Potvrzuji, že vlastním platnou licenci <strong>exocad</strong> a souhlasím s Podmínkami Použití.",
    downloadButton: "Souhlasím a Stáhnout",
    backButton: "Zpět", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Všechna práva vyhrazena.",
  },
  sk: {
    title: "Pred Stiahnutím",
    disclaimer:
      "Tento softvérový nástroj je určený IBA na použitie s legálne licencovanou kópiou softvéru <strong>exocad</strong>. Použitie s pirátskymi, cracknutými alebo neautorizovanými verziami je prísne zakázané. Pokračovaním potvrdzujete, že vlastníte platnú licenciu <strong>exocad</strong> a súhlasíte s Podmienkami Používania.",
    readTerms: "Prečítať úplné Podmienky Používania",
    agreement: "Potvrdzujem, že vlastním platnú licenciu <strong>exocad</strong> a súhlasím s Podmienkami Používania.",
    downloadButton: "Súhlasím a Stiahnuť",
    backButton: "Späť", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Všetky práva vyhradené.",
  },
  uk: {
    title: "Перед Завантаженням",
    disclaimer:
      "Цей програмний інструмент призначений ТІЛЬКИ для використання з законно ліцензованою копією програмного забезпечення <strong>exocad</strong>. Використання з піратськими, зламаними або неавторизованими версіями суворо заборонено. Продовжуючи, ви підтверджуєте, що володієте дійсною ліцензією <strong>exocad</strong> і погоджуєтесь з Умовами Використання.",
    readTerms: "Прочитати повні Умови Використання",
    agreement:
      "Я підтверджую, що володієте дійсною ліцензією <strong>exocad</strong> і погоджуєтесь з Умовами Використання.",
    downloadButton: "Погоджуюсь і Завантажити",
    backButton: "Назад", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Всі права захищені.",
  },
  ru: {
    title: "Перед Загрузкой",
    disclaimer:
      "Этот программный инструмент предназначен ТОЛЬКО для использования с законно лицензированной копией программного обеспечения <strong>exocad</strong>. Использование с пиратскими, взломанными или неавторизованными версиями строго запрещено. Продолжая, вы подтверждаете, что владеете действительной лицензией <strong>exocad</strong> и соглашаетесь с Условиями Использования.",
    readTerms: "Прочитать полные Условия Использования",
    agreement:
      "Я подтверждаю, что владею действительной лицензией <strong>exocad</strong> и соглашаетесь с Условиями Использования.",
    downloadButton: "Соглашаюсь и Скачать",
    backButton: "Назад", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — Все права защищены.",
  },
  ja: {
    title: "ダウンロード前に",
    disclaimer:
      "このソフトウェアツールは、合法的にライセンスされた<strong>exocad</strong>ソフトウェアのコピーでのみ使用できます。海賊版、クラック版、または未承認版での使用は厳しく禁止されています。続行することで、有効な<strong>exocad</strong>ライセンスを所有し、利用規約に同意することを確認します。",
    readTerms: "完全な利用規約を読む",
    agreement: "有効な<strong>exocad</strong>ライセンスを所有し、利用規約に同意することを確認します。",
    downloadButton: "同意してダウンロード",
    backButton: "戻る", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — 全著作権所有。",
  },
  zh: {
    title: "下载前须知",
    disclaimer:
      "此软件工具仅供与合法许可的<strong>exocad</strong>软件副本一起使用。严禁与盗版、破解或未经授权的版本一起使用。继续操作即确认您拥有有效的<strong>exocad</strong>许可证并同意使用条款。",
    readTerms: "阅读完整使用条款",
    agreement: "我确认拥有有效的<strong>exocad</strong>许可证并同意使用条款。",
    downloadButton: "我同意并下载",
    backButton: "返回", // Added back button translation
    footer: "ExoCad Script Pack by CadTechX — 版权所有。",
  },
}

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "pl", name: "Polski" },
  { code: "cs", name: "Čeština" },
  { code: "sk", name: "Slovenčina" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
]

export default function DownloadDisclaimer() {
  const [agreed, setAgreed] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage")
    if (savedLang && languages.find((lang) => lang.code === savedLang)) {
      setCurrentLang(savedLang)
    }
  }, [])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    localStorage.setItem("selectedLanguage", langCode)
    setIsLangDropdownOpen(false)
  }

  const t = translations[currentLang as keyof typeof translations]

  const handleDownload = () => {
    if (agreed) {
      // Trigger download from placeholder URL
      window.open("#", "_blank")
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        color: "black",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "32rem",
          margin: "0 auto",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <CardContent style={{ padding: "2rem" }}>
          {/* Language Selector */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "transparent",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <Globe size={16} />
                {languages.find((lang) => lang.code === currentLang)?.name}
                <ChevronDown size={16} />
              </button>

              {isLangDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "0.5rem",
                    width: "12rem",
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #d1d5db",
                    padding: "0.5rem 0",
                    zIndex: 10,
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.5rem 1rem",
                        backgroundColor: currentLang === lang.code ? "#f3f4f6" : "transparent",
                        color: currentLang === lang.code ? "#7c3aed" : "black",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "black", marginBottom: "1.5rem" }}>
              {t.title}
            </h1>

            <div
              style={{
                textAlign: "left",
                backgroundColor: "#f9fafb",
                padding: "1.5rem",
                borderRadius: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <p style={{ color: "#374151", lineHeight: "1.625" }} dangerouslySetInnerHTML={{ __html: t.disclaimer }} />
            </div>

            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <Link
                href="/terms"
                target="_blank"
                style={{ color: "#7c3aed", textDecoration: "underline", transition: "color 0.3s ease" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#f97316")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#7c3aed")}
              >
                {t.readTerms}
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                marginBottom: "2rem",
                textAlign: "left",
              }}
            >
              <Checkbox
                id="agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                style={{ marginTop: "0.25rem" }}
              />
              <label
                htmlFor="agreement"
                style={{ fontSize: "0.875rem", color: "#374151", lineHeight: "1.625", cursor: "pointer" }}
                dangerouslySetInnerHTML={{ __html: t.agreement }}
              />
            </div>

            <Button
              onClick={handleDownload}
              disabled={!agreed}
              size="lg"
              style={{
                width: "100%",
                height: "3rem",
                fontSize: "1.125rem",
                transition: "all 0.3s ease",
                backgroundColor: agreed ? "#7c3aed" : "#d1d5db",
                color: agreed ? "white" : "#9ca3af",
                cursor: agreed ? "pointer" : "not-allowed",
                border: "none",
                borderRadius: "0.375rem",
                transform: "scale(1)",
                marginBottom: "1rem", // Added margin bottom for spacing
              }}
              onMouseOver={(e) => {
                if (agreed) {
                  e.currentTarget.style.backgroundColor = "#f97316"
                  e.currentTarget.style.transform = "scale(1.05)"
                }
              }}
              onMouseOut={(e) => {
                if (agreed) {
                  e.currentTarget.style.backgroundColor = "#7c3aed"
                  e.currentTarget.style.transform = "scale(1)"
                }
              }}
            >
              {t.downloadButton}
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                style={{
                  width: "100%",
                  height: "3rem",
                  fontSize: "1.125rem",
                  transition: "all 0.3s ease",
                  backgroundColor: "transparent",
                  color: "#7c3aed",
                  border: "2px solid #7c3aed",
                  borderRadius: "0.375rem",
                  transform: "scale(1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#7c3aed"
                  e.currentTarget.style.color = "white"
                  e.currentTarget.style.transform = "scale(1.05)"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#7c3aed"
                  e.currentTarget.style.transform = "scale(1)"
                }}
              >
                {t.backButton}
              </Button>
            </Link>
          </div>

          <footer
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#6b7280",
              marginTop: "2rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p>&copy; {t.footer}</p>
          </footer>
        </CardContent>
      </Card>
    </div>
  )
}
