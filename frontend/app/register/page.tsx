"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useAuth } from "../../lib/auth-context"
import { useRouter } from "next/navigation"

const translations = {
  en: {
    title: "Create Account",
    subtitle: "Join ExoCad Script Pack community",
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to your account",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    register: "Create Account",
    login: "Already have an account? Sign in",
    createAccount: "Don't have an account? Sign up",
    loginButton: "Sign In",
    terms: "By creating an account, you agree to our",
    termsLink: "Terms & Conditions",
    forgotPassword: "Forgot your password?",
    emailSent: "Check Your Email",
    emailSentText:
      "We've sent you an activation link. Please check your email and click the link to activate your account.",
    resend: "Resend Email",
    backToHome: "Back to Home",
    googleLogin: "Sign in with Google",
    orDivider: "or",
    showPassword: "Show password",
    hidePassword: "Hide password",
  },
  de: {
    title: "Konto Erstellen",
    subtitle: "Treten Sie der ExoCad Script Pack Community bei",
    loginTitle: "Willkommen Zurück",
    loginSubtitle: "Melden Sie sich in Ihrem Konto an",
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort Bestätigen",
    register: "Konto Erstellen",
    login: "Haben Sie bereits ein Konto? Anmelden",
    createAccount: "Haben Sie kein Konto? Registrieren",
    loginButton: "Anmelden",
    terms: "Durch die Erstellung eines Kontos stimmen Sie unseren",
    termsLink: "Geschäftsbedingungen",
    forgotPassword: "Passwort vergessen?",
    emailSent: "Überprüfen Sie Ihre E-Mail",
    emailSentText:
      "Wir haben Ihnen einen Aktivierungslink gesendet. Bitte überprüfen Sie Ihre E-Mail und klicken Sie auf den Link, um Ihr Konto zu aktivieren.",
    resend: "E-Mail Erneut Senden",
    backToHome: "Zurück zur Startseite",
    googleLogin: "Mit Google Anmelden",
    orDivider: "oder",
    showPassword: "Passwort anzeigen",
    hidePassword: "Passwort verbergen",
  },
  es: {
    title: "Crear Cuenta",
    subtitle: "Únete a la comunidad ExoCad Script Pack",
    loginTitle: "Bienvenido de Nuevo",
    loginSubtitle: "Inicia sesión en tu cuenta",
    email: "Correo Electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    register: "Crear Cuenta",
    login: "¿Ya tienes una cuenta? Iniciar sesión",
    createAccount: "¿No tienes una cuenta? Registrarse",
    loginButton: "Iniciar Sesión",
    terms: "Al crear una cuenta, aceptas nuestros",
    termsLink: "Términos y Condiciones",
    forgotPassword: "¿Olvidaste tu contraseña?",
    emailSent: "Revisa Tu Correo",
    emailSentText:
      "Te hemos enviado un enlace de activación. Por favor revisa tu correo y haz clic en el enlace para activar tu cuenta.",
    resend: "Reenviar Correo",
    backToHome: "Volver al Inicio",
    googleLogin: "Iniciar Sesión con Google",
    orDivider: "o",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
  },
  pt: {
    title: "Criar Conta",
    subtitle: "Junte-se à comunidade ExoCad Script Pack",
    loginTitle: "Bem-vindo de Volta",
    loginSubtitle: "Entre na sua conta",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirmar Senha",
    register: "Criar Conta",
    login: "Já tem uma conta? Entrar",
    createAccount: "Não tem uma conta? Cadastrar-se",
    loginButton: "Entrar",
    terms: "Ao criar uma conta, você concorda com nossos",
    termsLink: "Termos e Condições",
    forgotPassword: "Esqueceu sua senha?",
    emailSent: "Verifique Seu E-mail",
    emailSentText:
      "Enviamos um link de ativação para você. Por favor, verifique seu e-mail e clique no link para ativar sua conta.",
    resend: "Reenviar E-mail",
    backToHome: "Voltar ao Início",
    googleLogin: "Entrar com Google",
    orDivider: "ou",
    showPassword: "Mostrar senha",
    hidePassword: "Ocultar senha",
  },
  pl: {
    title: "Utwórz Konto",
    subtitle: "Dołącz do społeczności ExoCad Script Pack",
    loginTitle: "Witaj Ponownie",
    loginSubtitle: "Zaloguj się do swojego konta",
    email: "E-mail",
    password: "Hasło",
    confirmPassword: "Potwierdź Hasło",
    register: "Utwórz Konto",
    login: "Masz już konto? Zaloguj się",
    createAccount: "Nie masz konta? Zarejestruj się",
    loginButton: "Zaloguj się",
    terms: "Tworząc konto, zgadzasz się z naszymi",
    termsLink: "Warunkami i Zasadami",
    forgotPassword: "Zapomniałeś hasła?",
    emailSent: "Sprawdź Swoją Pocztę",
    emailSentText: "Wysłaliśmy Ci link aktywacyjny. Sprawdź swoją pocztę i kliknij link, aby aktywować swoje konto.",
    resend: "Wyślij Ponownie",
    backToHome: "Powrót do Strony Głównej",
    googleLogin: "Zaloguj się przez Google",
    orDivider: "lub",
    showPassword: "Pokaż hasło",
    hidePassword: "Ukryj hasło",
  },
  cs: {
    title: "Vytvořit Účet",
    subtitle: "Připojte se ke komunitě ExoCad Script Pack",
    loginTitle: "Vítejte Zpět",
    loginSubtitle: "Přihlaste se do svého účtu",
    email: "E-mail",
    password: "Heslo",
    confirmPassword: "Potvrdit Heslo",
    register: "Vytvořit Účet",
    login: "Již máte účet? Přihlásit se",
    createAccount: "Nemáte účet? Zaregistrovat se",
    loginButton: "Přihlásit se",
    terms: "Vytvřením účtu souhlasíte s našimi",
    termsLink: "Podmínkami a Pravidly",
    forgotPassword: "Zapomněli jste heslo?",
    emailSent: "Zkontrolujte Svůj E-mail",
    emailSentText: "Poslali jsme vám aktivační odkaz. Zkontrolujte svůj e-mail a klikněte na odkaz pro aktivaci účtu.",
    resend: "Poslat Znovu",
    backToHome: "Zpět na Hlavní Stránku",
    googleLogin: "Přihlásit se přes Google",
    orDivider: "nebo",
    showPassword: "Zobrazit heslo",
    hidePassword: "Skrýt heslo",
  },
  sk: {
    title: "Vytvoriť Účet",
    subtitle: "Pripojte sa ku komunite ExoCad Script Pack",
    loginTitle: "Vitajte Späť",
    loginSubtitle: "Prihláste sa do svojho účtu",
    email: "E-mail",
    password: "Heslo",
    confirmPassword: "Potvrdiť Heslo",
    register: "Vytvoriť Účet",
    login: "Již máte účet? Prihlásiť sa",
    createAccount: "Nemáte účet? Zaregistrovať sa",
    loginButton: "Prihlásiť sa",
    terms: "Vytvorením účtu súhlasíte s našimi",
    termsLink: "Podmienkami a Pravidlami",
    forgotPassword: "Zabudli ste heslo?",
    emailSent: "Skontrolujte Svoj E-mail",
    emailSentText: "Poslali sme vám aktivačný odkaz. Skontrolujte svoj e-mail a kliknite na odkaz pre aktiváciu účtu.",
    resend: "Poslať Znovu",
    backToHome: "Späť na Hlavnú Stránku",
    googleLogin: "Prihlásiť sa cez Google",
    orDivider: "alebo",
    showPassword: "Zobraziť heslo",
    hidePassword: "Skryť heslo",
  },
  uk: {
    title: "Створити Акаунт",
    subtitle: "Приєднайтесь до спільноти ExoCad Script Pack",
    loginTitle: "Ласкаво Просимо Назад",
    loginSubtitle: "Увійдіть до свого акаунту",
    email: "Електронна Пошта",
    password: "Пароль",
    confirmPassword: "Підтвердити Пароль",
    register: "Створити Аккаунт",
    login: "Вже маєте акаунт? Увійти",
    createAccount: "Немає акаунту? Зареєструватися",
    loginButton: "Увійти",
    terms: "Створюючи акаунт, ви погоджуєтесь з нашими",
    termsLink: "Умовами та Правилами",
    forgotPassword: "Забули пароль?",
    emailSent: "Перевірте Свою Пошту",
    emailSentText:
      "Ми надіслали вам посилання для активації. Перевірте свою пошту та натисніть посилання для активації акаунту.",
    resend: "Надіслати Знову",
    backToHome: "Повернутися на Головну",
    googleLogin: "Увійти через Google",
    orDivider: "або",
    showPassword: "Показати пароль",
    hidePassword: "Приховати пароль",
  },
  ru: {
    title: "Создать Аккаунт",
    subtitle: "Присоединяйтесь к сообществу ExoCad Script Pack",
    loginTitle: "Добро Пожаловать Обратно",
    loginSubtitle: "Войдите в свой аккаунт",
    email: "Электронная Почта",
    password: "Пароль",
    confirmPassword: "Подтвердить Пароль",
    register: "Создать Аккаунт",
    login: "Уже есть аккаунт? Войти",
    createAccount: "Нет аккаунта? Зарегистрироваться",
    loginButton: "Войти",
    terms: "Создавая аккаунт, вы соглашаетесь с нашими",
    termsLink: "Условиями и Правилами",
    forgotPassword: "Забыли пароль?",
    emailSent: "Проверьте Свою Почту",
    emailSentText:
      "Мы отправили вам ссылку для активации. Проверьте свою почту и нажмите на ссылку для активации аккаунта.",
    resend: "Отправить Снова",
    backToHome: "Вернуться на Главную",
    googleLogin: "Войти через Google",
    orDivider: "или",
    showPassword: "Показать пароль",
    hidePassword: "Скрыть пароль",
  },
  ja: {
    title: "アカウント作成",
    subtitle: "ExoCad Script Pack コミュニティに参加",
    loginTitle: "おかえりなさい",
    loginSubtitle: "アカウントにサインイン",
    email: "メールアドレス",
    password: "パスワード",
    confirmPassword: "パスワード確認",
    register: "アカウント作成",
    login: "既にアカウントをお持ちですか？サインイン",
    createAccount: "アカウントをお持ちでないですか？サインアップ",
    loginButton: "サインイン",
    terms: "アカウントを作成することで、当社の",
    termsLink: "利用規約",
    forgotPassword: "パスワードをお忘れですか？",
    emailSent: "メールを確認してください",
    emailSentText:
      "アクティベーションリンクをお送りしました。メールを確認し、リンクをクリックしてアカウントを有効化してください。",
    resend: "再送信",
    backToHome: "ホームに戻る",
    googleLogin: "Googleでサインイン",
    orDivider: "または",
    showPassword: "パスワードを表示",
    hidePassword: "パスワードを非表示",
  },
  zh: {
    title: "创建账户",
    subtitle: "加入 ExoCad Script Pack 社区",
    loginTitle: "欢迎回来",
    loginSubtitle: "登录您的账户",
    email: "电子邮箱",
    password: "密码",
    confirmPassword: "确认密码",
    register: "创建账户",
    login: "已有账户？登录",
    createAccount: "没有账户？注册",
    loginButton: "登录",
    terms: "创建账户即表示您同意我们的",
    termsLink: "条款和条件",
    forgotPassword: "忘记密码？",
    emailSent: "检查您的邮箱",
    emailSentText: "我们已向您发送激活链接。请检查您的邮箱并点击链接激活您的账户。",
    resend: "重新发送",
    backToHome: "返回首页",
    googleLogin: "使用 Google 登录",
    orDivider: "或",
    showPassword: "显示密码",
    hidePassword: "隐藏密码",
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

export default function RegisterPage() {
  const { login, register, loading } = useAuth()
  const router = useRouter()
  const [language, setLanguage] = useState("en")
  const [isLogin, setIsLogin] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode)
    localStorage.setItem("selectedLanguage", langCode)
  }

  const t = translations[language as keyof typeof translations]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let success = false
      if (isLogin) {
        success = await login(formData.email, formData.password)
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match")
          return
        }
        success = await register(formData.email, formData.password)
      }

      if (success) {
        // Redirect to home page after successful auth
        router.push("/")
      } else {
        alert("Authentication failed")
      }
    } catch (error) {
      alert("An error occurred")
    }
  }

  if (emailSent) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "white", color: "black" }}>
        {/* Language Selector */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 50 }}>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "white",
              color: "black",
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
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
              maxWidth: "28rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            <CheckCircle size={64} style={{ color: "#10b981", margin: "0 auto 1.5rem" }} />
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", color: "black" }}>
              {t.emailSent}
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem", lineHeight: "1.6" }}>{t.emailSentText}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <button
                onClick={() => setEmailSent(false)}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
              >
                {t.resend}
              </button>
              <Link
                href="/"
                style={{
                  color: "#7c3aed",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
                {t.backToHome}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", color: "black" }}>
      {/* Language Selector */}
      <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 50 }}>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "white",
            color: "black",
          }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
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
            maxWidth: "28rem",
            width: "100%",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "black" }}>
              {isLogin ? t.loginTitle : t.title}
            </h1>
            <p style={{ color: "#6b7280" }}>{isLogin ? t.loginSubtitle : t.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                {t.email}
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={20}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "1rem",
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "black",
                }}
              >
                {t.password}
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={20}
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 2.5rem 0.75rem 2.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "1rem",
                    color: "black",
                    backgroundColor: "white",
                  }}
                />
                {/* Password visibility toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? t.hidePassword : t.showPassword}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9ca3af",
                    padding: "0",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (only for registration) */}
            {!isLogin && (
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  {t.confirmPassword}
                </label>
                <div style={{ position: "relative" }}>
                  <Lock
                    size={20}
                    style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 2.5rem 0.75rem 2.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.375rem",
                      fontSize: "1rem",
                      color: "black",
                      backgroundColor: "white",
                    }}
                  />
                  {/* Confirm password visibility toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? t.hidePassword : t.showPassword}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9ca3af",
                      padding: "0",
                    }}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms Agreement (only for registration) */}
            {!isLogin && (
              <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                {t.terms}{" "}
                <Link href="/terms" style={{ color: "#7c3aed", textDecoration: "none", fontWeight: "bold" }}>
                  {t.termsLink}
                </Link>
              </div>
            )}

            {/* Forgot Password (only for login) */}
            {isLogin && (
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#7c3aed",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {t.forgotPassword}
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
            >
              {loading ? "Loading..." : isLogin ? t.loginButton : t.register}
            </button>

            {/* Google Login Section with Divider */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#d1d5db" }}></div>
                <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{t.orDivider}</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#d1d5db" }}></div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #d1d5db",
                  borderRadius: "0.375rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                🔑 {t.googleLogin}
              </button>
            </div>

            {/* Toggle Login/Register */}
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#7c3aed",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                {isLogin ? t.createAccount : t.login}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
