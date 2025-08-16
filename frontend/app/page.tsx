"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download, Mail, Instagram, Globe, Play, Menu, X, FileText } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../lib/auth-context"

const translations = {
  en: {
    hero: {
      title: "ExoCad Script Pack",
      by: "by CadTechX",
      subtitle: "Makes Your ExoCad Experience Better",
      download: "Register & Download",
      downloadAuth: "Download",
    },
    description: {
      title: "About the Script",
      text: "ExoCad Script Pack helps unlock hidden capabilities of the program and improve existing functions, making your work experience easier and more pleasant. Suitable for every designer working in ExoCad.",
    },
    demo: {
      title: "Demo",
      subtitle: "See the script in action",
    },
    installation: {
      title: "Installation & Usage",
      text: "Simply download the modifications you're interested in, run the installer and in just a minute enjoy the new capabilities of the program.",
    },
    contact: {
      reach: "Reach us directly:",
      email: "Email",
    },
    footer: {
      social: "Follow us on social media",
      language: "Language",
    },
    menu: {
      download: "Register & Download",
      downloadAuth: "Download",
      terms: "Terms & Conditions",
      contact: "Contact Us",
    },
  },
  de: {
    hero: {
      title: "ExoCad Script Pack",
      by: "von CadTechX",
      subtitle: "Macht Ihre ExoCad-Erfahrung besser",
      download: "Registrieren & Herunterladen",
      downloadAuth: "Herunterladen",
    },
    description: {
      title: "Über das Skript",
      text: "ExoCad Script Pack hilft dabei, versteckte Funktionen des Programms freizuschalten und bestehende Funktionen zu verbessern, wodurch Ihre Arbeitserfahrung einfacher und angenehmer wird.",
    },
    demo: {
      title: "Demo",
      subtitle: "Sehen Sie das Skript in Aktion",
    },
    installation: {
      title: "Installation & Verwendung",
      text: "Laden Sie einfach die gewünschten Modifikationen herunter, führen Sie das Installationsprogramm aus und genießen Sie in nur einer Minute die neuen Funktionen des Programms.",
    },
    contact: {
      reach: "Kontaktieren Sie uns direkt:",
      email: "E-Mail",
    },
    footer: {
      social: "Folgen Sie uns in den sozialen Medien",
      language: "Sprache",
    },
    menu: {
      download: "Registrieren & Herunterladen",
      downloadAuth: "Herunterladen",
      terms: "Geschäftsbedingungen",
      contact: "Kontakt",
    },
  },
  es: {
    hero: {
      title: "ExoCad Script Pack",
      by: "por CadTechX",
      subtitle: "Mejora tu experiencia con ExoCad",
      download: "Registrarse y Descargar",
      downloadAuth: "Descargar",
    },
    description: {
      title: "Acerca del Script",
      text: "ExoCad Script Pack ayuda a desbloquear capacidades ocultas del programa y mejorar las funciones existentes, haciendo que tu experiencia de trabajo sea más fácil y placentera.",
    },
    demo: {
      title: "Demo",
      subtitle: "Ve el script en acción",
    },
    installation: {
      title: "Instalación y Uso",
      text: "Simplemente descarga las modificaciones que te interesen, ejecuta el instalador y en solo un minuto disfrutas de las nuevas capacidades del programa.",
    },
    contact: {
      reach: "Contáctanos directamente:",
      email: "Correo",
    },
    footer: {
      social: "Síguenos en redes sociales",
      language: "Idioma",
    },
    menu: {
      download: "Registrarse y Descargar",
      downloadAuth: "Descargar",
      terms: "Términos y Condiciones",
      contact: "Contacto",
    },
  },
  pt: {
    hero: {
      title: "ExoCad Script Pack",
      by: "por CadTechX",
      subtitle: "Torna sua experiência ExoCad melhor",
      download: "Registrar e Baixar",
      downloadAuth: "Baixar",
    },
    description: {
      title: "Sobre o Script",
      text: "ExoCad Script Pack ajuda a desbloquear recursos ocultos do programa e melhorar funções existentes, tornando sua experiência de trabalho mais fácil e agradável.",
    },
    demo: {
      title: "Demo",
      subtitle: "Veja o script em ação",
    },
    installation: {
      title: "Instalação e Uso",
      text: "Simplesmente baixe as modificações que lhe interessam, execute o instalador e em apenas um minuto desfrute dos novos recursos do programa.",
    },
    contact: {
      reach: "Entre em contato diretamente:",
      email: "Email",
    },
    footer: {
      social: "Siga-nos nas redes sociais",
      language: "Idioma",
    },
    menu: {
      download: "Registrar e Baixar",
      downloadAuth: "Baixar",
      terms: "Termos e Condições",
      contact: "Contato",
    },
  },
  pl: {
    hero: {
      title: "ExoCad Script Pack",
      by: "od CadTechX",
      subtitle: "Czyni Twoje doświadczenie z ExoCad lepszym",
      download: "Zarejestruj się i Pobierz",
      downloadAuth: "Pobierz",
    },
    description: {
      title: "O Skrypcie",
      text: "ExoCad Script Pack pomaga odblokować ukryte możliwości programu i ulepszyć istniejące funkcje, czyniąc Twoje doświadczenie pracy łatwiejszym i przyjemniejszym.",
    },
    demo: {
      title: "Demo",
      subtitle: "Zobacz skrypt w akcji",
    },
    installation: {
      title: "Instalacja i Użycie",
      text: "Po prostu pobierz interesujące Cię modyfikacje, uruchom instalator i w ciągu minuty ciesz się nowymi możliwościami programu.",
    },
    contact: {
      reach: "Skontaktuj się z nami bezpośrednio:",
      email: "Email",
    },
    footer: {
      social: "Śledź nas w mediach społecznościowych",
      language: "Język",
    },
    menu: {
      download: "Zarejestruj się i Pobierz",
      downloadAuth: "Pobierz",
      terms: "Regulamin",
      contact: "Kontakt",
    },
  },
  uk: {
    hero: {
      title: "ExoCad Script Pack",
      by: "від CadTechX",
      subtitle: "Робить ваш досвід роботи з ExoCad кращим",
      download: "Зареєструватися та Завантажити",
      downloadAuth: "Завантажити",
    },
    description: {
      title: "Про Скрипт",
      text: "ExoCad Script Pack допомагає розблокувати приховані можливості програми та покращити існуючі функції, роблячи ваш досвід роботи простішим та приємнішим.",
    },
    demo: {
      title: "Демо",
      subtitle: "Подивіться скрипт в дії",
    },
    installation: {
      title: "Встановлення та Використання",
      text: "Просто завантажте цікаві вам модифікації, запустіть інсталятор і за хвилину насолоджуйтесь новими можливостями програми.",
    },
    contact: {
      reach: "Зв'яжіться з нами безпосередньо:",
      email: "Email",
    },
    footer: {
      social: "Слідкуйте за нами в соціальних мережах",
      language: "Мова",
    },
    menu: {
      download: "Зареєструватися та Завантажити",
      downloadAuth: "Завантажити",
      terms: "Умови використання",
      contact: "Контакти",
    },
  },
  ja: {
    hero: {
      title: "ExoCad Script Pack",
      by: "by CadTechX",
      subtitle: "ExoCadの体験をより良くします",
      download: "登録してダウンロード",
      downloadAuth: "ダウンロード",
    },
    description: {
      title: "スクリプトについて",
      text: "ExoCad Script Packは、プログラムの隠れた機能を解放し、既存の機能を改善することで、あなたの作業体験をより簡単で快適にします。",
    },
    demo: {
      title: "デモ",
      subtitle: "スクリプトの動作をご覧ください",
    },
    installation: {
      title: "インストールと使用方法",
      text: "興味のある修正をダウンロードし、インストーラーを実行するだけで、わずか1分でプログラムの新機能をお楽しみいただけます。",
    },
    contact: {
      reach: "直接お問い合わせください：",
      email: "メール",
    },
    footer: {
      social: "ソーシャルメディアでフォローしてください",
      language: "言語",
    },
    menu: {
      download: "登録してダウンロード",
      downloadAuth: "ダウンロード",
      terms: "利用規約",
      contact: "お問い合わせ",
    },
  },
  zh: {
    hero: {
      title: "ExoCad Script Pack",
      by: "by CadTechX",
      subtitle: "让您的ExoCad体验更好",
      download: "注册并下载",
      downloadAuth: "下载",
    },
    description: {
      title: "关于脚本",
      text: "ExoCad Script Pack帮助解锁程序的隐藏功能并改进现有功能，使您的工作体验更加轻松愉快。",
    },
    demo: {
      title: "演示",
      subtitle: "查看脚本的实际效果",
    },
    installation: {
      title: "安装和使用",
      text: "只需下载您感兴趣的修改，运行安装程序，一分钟内即可享受程序的新功能。",
    },
    contact: {
      reach: "直接联系我们：",
      email: "邮箱",
    },
    footer: {
      social: "在社交媒体上关注我们",
      language: "语言",
    },
    menu: {
      download: "注册并下载",
      downloadAuth: "下载",
      terms: "条款和条件",
      contact: "联系我们",
    },
  },
  ru: {
    hero: {
      title: "ExoCad Script Pack",
      by: "от CadTechX",
      subtitle: "Делает ваш опыт работы с ExoCad лучше",
      download: "Зарегистрироваться и скачать",
      downloadAuth: "Скачать",
    },
    description: {
      title: "Описание скрипта",
      text: "ExoCad Script Pack поможет разблокировать скрытые возможности программы и улучшить уже существующие функции, делая ваш опыт работы проще и приятнее.",
    },
    demo: {
      title: "Демонстрация",
      subtitle: "Посмотрите скрипт в действии",
    },
    installation: {
      title: "Инструкция по установке",
      text: "Просто скачайте интересующие вас модификации, запустите установщик, и уже через минуту наслаждайтесь новыми возможностями программы.",
    },
    contact: {
      reach: "Свяжитесь с нами напрямую:",
      email: "Email",
    },
    footer: {
      social: "Следите за нами в социальных сетях",
      language: "Язык",
    },
    menu: {
      download: "Зарегистрироваться и скачать",
      downloadAuth: "Скачать",
      terms: "Условия использования",
      contact: "Связаться с нами",
    },
  },
  cs: {
    hero: {
      title: "ExoCad Script Pack",
      by: "od CadTechX",
      subtitle: "Ulepší vaši ExoCad zkušenost",
      download: "Registrovat a Stáhnout",
      downloadAuth: "Stáhnout",
    },
    description: {
      title: "O skriptu",
      text: "ExoCad Script Pack pomáhá odhalit skryté schopnosti programu a zlepšit existující funkce, čímž usnadní vaši práci a zlepší ji.",
    },
    demo: {
      title: "Demo",
      subtitle: "Podívejte se na skript v akci",
    },
    installation: {
      title: "Instalace a Použití",
      text: "Jednoduše si stáhněte upravy, které vás zajímají, spusťte instalační program a už za minutu užijete nové schopnosti programu.",
    },
    contact: {
      reach: "Spojte se s námi přímo:",
      email: "Email",
    },
    footer: {
      social: "Sledujte nás na sociálních médiích",
      language: "Jazyk",
    },
    menu: {
      download: "Registrovat a Stáhnout",
      downloadAuth: "Stáhnout",
      terms: "Obchodní podmínky",
      contact: "Kontaktujte nás",
    },
  },
  sk: {
    hero: {
      title: "ExoCad Script Pack",
      by: "od CadTechX",
      subtitle: "Ulepší vašu ExoCad zážitok",
      download: "Registrovať a Stiahnuť",
      downloadAuth: "Stiahnuť",
    },
    description: {
      title: "O skripte",
      text: "ExoCad Script Pack pomáha odhalovať skryté schopnosti programu a zlepšovať existujúce funkcie, čímž uspokojí vašu prácu a užívanie.",
    },
    demo: {
      title: "Demo",
      subtitle: "Podívejte sa na skript v akcií",
    },
    installation: {
      title: "Inštalácia a Použitie",
      text: "Jednoducho si stiahnite upravy, ktoré vás zaujímajú, spustite inštalátor a už za minútu užijete nové schopnosti programu.",
    },
    contact: {
      reach: "Spojte sa s nami priamo:",
      email: "Email",
    },
    footer: {
      social: "Sledujte nás na sociálnych médiách",
      language: "Jazyk",
    },
    menu: {
      download: "Registrovať a Stiahnuť",
      downloadAuth: "Stiahnuť",
      terms: "Podmínky používania",
      contact: "Kontaktujte nás",
    },
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

export default function ExoCadLanding() {
  const { isAuthenticated } = useAuth()
  const [currentLang, setCurrentLang] = useState("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-transparent border-none cursor-pointer text-violet-600"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="flex items-center gap-2 p-2 px-4 bg-transparent border border-gray-300 rounded-lg cursor-pointer text-black"
          >
            <Globe size={16} />
            {languages.find((lang) => lang.code === currentLang)?.name}
            <ChevronDown size={16} />
          </button>

          {isLangDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-md border border-gray-300 p-2 z-10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left p-2 px-4 rounded-lg cursor-pointer ${
                    currentLang === lang.code ? "bg-gray-100 text-violet-600" : "bg-transparent text-black"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-64 bg-white border-r border-b border-gray-200 shadow-md p-4 z-40">
            <Link
              href={isAuthenticated ? "/download-options" : "/register"}
              className="w-full text-left p-3 flex items-center gap-2 text-violet-600 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
            >
              <Download size={18} />
              {isAuthenticated ? t.menu.downloadAuth : t.menu.download}
            </Link>
            <Link
              href="/terms"
              className="w-full text-left p-3 flex items-center gap-2 text-violet-600 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
            >
              <FileText size={18} />
              {t.menu.terms}
            </Link>
            <button
              className="w-full text-left p-3 flex items-center gap-2 text-violet-600 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                setIsMenuOpen(false)
              }}
            >
              <Mail size={18} />
              {t.menu.contact}
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal text-violet-600 mb-2 leading-tight">
              {t.hero.title}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-normal text-orange-500 leading-tight">{t.hero.by}</h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 px-4">{t.hero.subtitle}</p>
          <Link href={isAuthenticated ? "/download-options" : "/register"}>
            <button className="bg-violet-600 hover:bg-orange-500 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-md inline-flex items-center gap-2 transition-all duration-300">
              <Download size={20} />
              {isAuthenticated ? t.hero.downloadAuth : t.hero.download}
            </button>
          </Link>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8">{t.description.title}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            {t.description.text}
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">{t.demo.title}</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">{t.demo.subtitle}</p>
          </div>

          <div className="flex flex-col gap-6 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Play size={32} color="#7c3aed" />
                      </div>
                      <p className="text-sm text-gray-600">Demo {i}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
              {[4, 5].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Play size={32} color="#7c3aed" />
                      </div>
                      <p className="text-sm text-gray-600">Demo {i}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8">{t.installation.title}</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-4">
            {t.installation.text}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-8">{t.contact.reach}</h2>
          <div className="flex justify-center items-center">
            <a
              href="mailto:cadtechx.exe@gmail.com"
              className="text-violet-600 hover:text-orange-500 flex items-center gap-2 transition-colors duration-300 text-sm sm:text-base"
            >
              <Mail size={24} />
              <span>{t.contact.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-500 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <div className="font-bold text-xl sm:text-2xl text-white mb-2">CadTechX</div>
              <p className="text-white text-sm sm:text-base">{t.footer.social}</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-gray-200 transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          <div className="border-t border-white/30 mt-8 pt-8 text-center text-white">
            <p className="text-sm sm:text-base">&copy; 2025 ExoCad Script Pack by CadTechX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
