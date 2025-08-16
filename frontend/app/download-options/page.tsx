"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Globe, ChevronDown } from "lucide-react"
import { useAuth } from "../../lib/auth-context"
import { useRouter } from "next/navigation"

const translations = {
  en: {
    title: "Select Download Options",
    subtitle: "Choose the modifications you want to download",
    options: {
      brush: "Brush Thickness & Intensity Mod",
      screw: "Screw Channel Angulation Mod",
      tibase: "Virtual TiBase Cutting Mod",
      order: "Order Form Mod",
      selectAll: "Select All Mods",
    },
    buttons: {
      back: "Back",
      next: "Next",
    },
    backToHome: "Back to Home",
  },
  de: {
    title: "Download-Optionen Auswählen",
    subtitle: "Wählen Sie die Modifikationen aus, die Sie herunterladen möchten",
    options: {
      brush: "Pinseldicke & Intensitäts-Mod",
      screw: "Schraubenkanal-Angulations-Mod",
      tibase: "Virtueller TiBase-Schnitt-Mod",
      order: "Bestellformular-Mod",
      selectAll: "Alle Mods Auswählen",
    },
    buttons: {
      back: "Zurück",
      next: "Weiter",
    },
    backToHome: "Zurück zur Startseite",
  },
  es: {
    title: "Seleccionar Opciones de Descarga",
    subtitle: "Elige las modificaciones que quieres descargar",
    options: {
      brush: "Mod de Grosor e Intensidad del Pincel",
      screw: "Mod de Angulación del Canal del Tornillo",
      tibase: "Mod de Corte Virtual TiBase",
      order: "Mod de Formulario de Pedido",
      selectAll: "Seleccionar Todos los Mods",
    },
    buttons: {
      back: "Atrás",
      next: "Siguiente",
    },
    backToHome: "Volver al Inicio",
  },
  pt: {
    title: "Selecionar Opções de Download",
    subtitle: "Escolha as modificações que deseja baixar",
    options: {
      brush: "Mod de Espessura e Intensidade do Pincel",
      screw: "Mod de Angulação do Canal do Parafuso",
      tibase: "Mod de Corte Virtual TiBase",
      order: "Mod de Formulário de Pedido",
      selectAll: "Selecionar Todos os Mods",
    },
    buttons: {
      back: "Voltar",
      next: "Próximo",
    },
    backToHome: "Voltar ao Início",
  },
  pl: {
    title: "Wybierz Opcje Pobierania",
    subtitle: "Wybierz modyfikacje, które chcesz pobrać",
    options: {
      brush: "Mod Grubości i Intensywności Pędzla",
      screw: "Mod Angulacji Kanału Śruby",
      tibase: "Mod Wirtualnego Cięcia TiBase",
      order: "Mod Formularza Zamówienia",
      selectAll: "Wybierz Wszystkie Mody",
    },
    buttons: {
      back: "Wstecz",
      next: "Dalej",
    },
    backToHome: "Powrót do Strony Głównej",
  },
  cs: {
    title: "Vybrat Možnosti Stahování",
    subtitle: "Vyberte modifikace, které chcete stáhnout",
    options: {
      brush: "Mod Tloušťky a Intenzity Štětce",
      screw: "Mod Angulace Kanálu Šroubu",
      tibase: "Mod Virtuálního Řezání TiBase",
      order: "Mod Objednávkového Formuláře",
      selectAll: "Vybrat Všechny Mody",
    },
    buttons: {
      back: "Zpět",
      next: "Další",
    },
    backToHome: "Zpět na Hlavní Stránku",
  },
  sk: {
    title: "Vybrať Možnosti Sťahovania",
    subtitle: "Vyberte modifikácie, ktoré chcete stiahnuť",
    options: {
      brush: "Mod Hrúbky a Intenzity Štetca",
      screw: "Mod Angulácie Kanála Skrutky",
      tibase: "Mod Virtuálneho Rezania TiBase",
      order: "Mod Objednávkového Formulára",
      selectAll: "Vybrať Všetky Módy",
    },
    buttons: {
      back: "Späť",
      next: "Ďalej",
    },
    backToHome: "Späť na Hlavnú Stránku",
  },
  uk: {
    title: "Вибрати Опції Завантаження",
    subtitle: "Виберіть модифікації, які хочете завантажити",
    options: {
      brush: "Мод Товщини та Інтенсивності Пензля",
      screw: "Мод Кутової Орієнтації Каналу Гвинта",
      tibase: "Мод Віртуального Різання TiBase",
      order: "Мод Форми Замовлення",
      selectAll: "Вибрати Всі Моди",
    },
    buttons: {
      back: "Назад",
      next: "Далі",
    },
    backToHome: "Повернутися на Головну",
  },
  ru: {
    title: "Выбрать Опции Загрузки",
    subtitle: "Выберите модификации, которые хотите скачать",
    options: {
      brush: "Мод Толщины и Интенсивности Кисти",
      screw: "Мод Угловой Ориентации Канала Винта",
      tibase: "Мод Виртуального Резания TiBase",
      order: "Мод Формы Заказа",
      selectAll: "Выбрать Все Моды",
    },
    buttons: {
      back: "Назад",
      next: "Далее",
    },
    backToHome: "Вернуться на Главную",
  },
  ja: {
    title: "ダウンロードオプションを選択",
    subtitle: "ダウンロードしたい修正を選択してください",
    options: {
      brush: "ブラシ厚さ・強度モッド",
      screw: "スクリューチャンネル角度モッド",
      tibase: "バーチャルTiBaseカッティングモッド",
      order: "注文フォームモッド",
      selectAll: "すべてのモッドを選択",
    },
    buttons: {
      back: "戻る",
      next: "次へ",
    },
    backToHome: "ホームに戻る",
  },
  zh: {
    title: "选择下载选项",
    subtitle: "选择您想要下载的修改",
    options: {
      brush: "画笔厚度和强度模组",
      screw: "螺钉通道角度模组",
      tibase: "虚拟TiBase切割模组",
      order: "订单表格模组",
      selectAll: "选择所有模组",
    },
    buttons: {
      back: "返回",
      next: "下一步",
    },
    backToHome: "返回首页",
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

export default function DownloadOptionsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [language, setLanguage] = useState("en")
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({
    brush: false,
    screw: false,
    tibase: false,
    order: false,
    selectAll: false,
  })

  useEffect(() => {
    // Redirect to register if not authenticated
    if (!isAuthenticated) {
      router.push("/register")
      return
    }

    // Load saved language
    const savedLang = localStorage.getItem("selectedLanguage")
    if (savedLang && languages.find((lang) => lang.code === savedLang)) {
      setLanguage(savedLang)
    }
  }, [isAuthenticated, router])

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    localStorage.setItem("selectedLanguage", langCode)
    setIsLangDropdownOpen(false)
  }

  const handleOptionChange = (option: string) => {
    if (option === "selectAll") {
      const newSelectAll = !selectedOptions.selectAll
      setSelectedOptions({
        brush: newSelectAll,
        screw: newSelectAll,
        tibase: newSelectAll,
        order: newSelectAll,
        selectAll: newSelectAll,
      })
    } else {
      const newOptions = {
        ...selectedOptions,
        [option]: !selectedOptions[option as keyof typeof selectedOptions],
      }

      // Update selectAll based on individual selections
      const individualOptions = ["brush", "screw", "tibase", "order"]
      const allSelected = individualOptions.every((opt) => newOptions[opt as keyof typeof newOptions])
      newOptions.selectAll = allSelected

      setSelectedOptions(newOptions)
    }
  }

  const t = translations[language as keyof typeof translations]

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", color: "black" }}>
      {/* Language Selector */}
      <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 50 }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "white",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              cursor: "pointer",
              color: "black",
            }}
          >
            <Globe size={16} />
            {languages.find((lang) => lang.code === language)?.name}
            <ChevronDown size={16} />
          </button>

          {isLangDropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                marginTop: "0.5rem",
                width: "8rem",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
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
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    backgroundColor: language === lang.code ? "#f3f4f6" : "transparent",
                    color: language === lang.code ? "#7c3aed" : "black",
                    border: "none",
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Back to Home */}
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#7c3aed",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          <ArrowLeft size={16} />
          {t.backToHome}
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "42rem",
            width: "100%",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "black",
              }}
            >
              {t.title}
            </h1>
            <p style={{ color: "#6b7280" }}>{t.subtitle}</p>
          </div>

          {/* Options List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            {/* Individual Options */}
            {[
              { key: "brush", label: t.options.brush },
              { key: "screw", label: t.options.screw },
              { key: "tibase", label: t.options.tibase },
              { key: "order", label: t.options.order },
            ].map((option) => (
              <label
                key={option.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  backgroundColor: selectedOptions[option.key as keyof typeof selectedOptions] ? "#f3f4f6" : "white",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    border: "2px solid #7c3aed",
                    borderRadius: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: selectedOptions[option.key as keyof typeof selectedOptions] ? "#7c3aed" : "white",
                  }}
                >
                  {selectedOptions[option.key as keyof typeof selectedOptions] && <Check size={16} color="white" />}
                </div>
                <input
                  type="checkbox"
                  checked={selectedOptions[option.key as keyof typeof selectedOptions]}
                  onChange={() => handleOptionChange(option.key)}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    fontSize: "1rem",
                    color: "black",
                    fontWeight: selectedOptions[option.key as keyof typeof selectedOptions] ? "500" : "normal",
                  }}
                >
                  {option.label}
                </span>
              </label>
            ))}

            {/* Select All Option */}
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "1rem",
                marginTop: "0.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  border: "2px solid #f97316",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  backgroundColor: selectedOptions.selectAll ? "#fff7ed" : "white",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    border: "2px solid #f97316",
                    borderRadius: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: selectedOptions.selectAll ? "#f97316" : "white",
                  }}
                >
                  {selectedOptions.selectAll && <Check size={16} color="white" />}
                </div>
                <input
                  type="checkbox"
                  checked={selectedOptions.selectAll}
                  onChange={() => handleOptionChange("selectAll")}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#f97316",
                    fontWeight: "600",
                  }}
                >
                  {t.options.selectAll}
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Link href="/">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "white",
                  color: "#6b7280",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb"
                  e.currentTarget.style.color = "#374151"
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white"
                  e.currentTarget.style.color = "#6b7280"
                }}
              >
                <ArrowLeft size={20} />
                {t.buttons.back}
              </button>
            </Link>

            <button
              disabled={
                !Object.values(selectedOptions).some(Boolean) ||
                (selectedOptions.selectAll === false &&
                  !selectedOptions.brush &&
                  !selectedOptions.screw &&
                  !selectedOptions.tibase &&
                  !selectedOptions.order)
              }
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.2s",
                opacity:
                  !Object.values(selectedOptions).some(Boolean) ||
                  (selectedOptions.selectAll === false &&
                    !selectedOptions.brush &&
                    !selectedOptions.screw &&
                    !selectedOptions.tibase &&
                    !selectedOptions.order)
                    ? 0.5
                    : 1,
              }}
              onMouseOver={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "#6d28d9"
                }
              }}
              onMouseOut={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "#7c3aed"
                }
              }}
            >
              {t.buttons.next}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
