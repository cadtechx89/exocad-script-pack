"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Globe } from "lucide-react"
import Link from "next/link"

const translations = {
  en: {
    title: "Terms of Use and Disclaimer",
    lastUpdated: "Last updated: 12.08.2025",
    backToHome: "Back to Home",
    sections: {
      general: {
        title: "1. General Information",
        content: [
          'This software tool ("the Tool") is a third-party utility designed to assist with modifying configuration files for <strong>exocad</strong> software. It is not affiliated with, endorsed by, or supported by <strong>exocad GmbH</strong> or any of its subsidiaries.',
          "The Tool does not contain, distribute, or provide access to any copyrighted materials of <strong>exocad GmbH</strong>. All modifications are performed exclusively on configuration files located on the user's own device.",
        ],
      },
      permitted: {
        title: "2. Permitted Use",
        intro: "You may use the Tool only if:",
        items: [
          "You own a valid, legally obtained license for the <strong>exocad</strong> software.",
          "You use the Tool in accordance with the laws of your country.",
          "You accept and comply with these Terms of Use.",
        ],
      },
      prohibited: {
        title: "3. Prohibited Use",
        intro: "You are strictly prohibited from:",
        items: [
          "Using the Tool with pirated, cracked, or otherwise unauthorized versions of <strong>exocad</strong>.",
          "Distributing the Tool together with any illegal software or instructions on how to obtain it.",
          "Circumventing or attempting to circumvent licensing, copy protection, or security mechanisms of <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Liability Disclaimer",
        intro: "The author of the Tool assumes no responsibility for:",
        items: [
          "Any damage to your hardware, software, or data resulting from use of the Tool.",
          "Loss of functionality or compatibility caused by updates to <strong>exocad</strong> or your operating system.",
          "Any legal consequences of your use of the Tool.",
        ],
        footer:
          "You are solely responsible for ensuring that your use of the Tool is legal in your jurisdiction and in compliance with your license agreement with <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Acceptance of Terms",
        intro: "By downloading, installing, or using the Tool, you confirm that:",
        items: [
          "You have read, understood, and agree to these Terms of Use.",
          "You own a valid license for <strong>exocad</strong> software.",
          "You will not use the Tool in violation of applicable laws or agreements.",
        ],
      },
      contact: {
        title: "6. Contact",
        intro: "If you have questions about these Terms, please contact:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  de: {
    title: "Nutzungsbedingungen und Haftungsausschluss",
    lastUpdated: "Zuletzt aktualisiert: 12.08.2025",
    backToHome: "Zurück zur Startseite",
    sections: {
      general: {
        title: "1. Allgemeine Informationen",
        content: [
          'Dieses Software-Tool ("das Tool") ist ein Drittanbieter-Dienstprogramm, das beim Ändern von Konfigurationsdateien für <strong>exocad</strong>-Software hilft. Es ist nicht mit <strong>exocad GmbH</strong> oder deren Tochtergesellschaften verbunden, von diesen unterstützt oder befürwortet.',
          "Das Tool enthält, verteilt oder bietet keinen Zugang zu urheberrechtlich geschützten Materialien der <strong>exocad GmbH</strong>. Alle Änderungen werden ausschließlich an Konfigurationsdateien auf dem eigenen Gerät des Benutzers durchgeführt.",
        ],
      },
      permitted: {
        title: "2. Erlaubte Nutzung",
        intro: "Sie dürfen das Tool nur verwenden, wenn:",
        items: [
          "Sie eine gültige, legal erworbene Lizenz für die <strong>exocad</strong>-Software besitzen.",
          "Sie das Tool in Übereinstimmung mit den Gesetzen Ihres Landes verwenden.",
          "Sie diese Nutzungsbedingungen akzeptieren und befolgen.",
        ],
      },
      prohibited: {
        title: "3. Verbotene Nutzung",
        intro: "Sie sind strengstens verboten:",
        items: [
          "Das Tool mit piratischen, gekrackten oder anderweitig nicht autorisierten Versionen von <strong>exocad</strong> zu verwenden.",
          "Das Tool zusammen mit jedem illegalen Software oder Anleitungen zur Beschaffung davon zu verbreiten.",
          "Lizenzierungs-, Kopierschutz- oder Sicherheitsmechanismen von <strong>exocad</strong> zu umgehen oder zu versuchen, dies zu tun.",
        ],
      },
      liability: {
        title: "4. Haftungsausschluss",
        intro: "Der Autor des Tools übernimmt keine Haftung für:",
        items: [
          "Jeden Schaden an Ihrer Hardware, Software oder Daten, der durch die Verwendung des Tools entsteht.",
          "Verlust der Funktionalität oder Kompatibilität durch Updates von <strong>exocad</strong> oder Ihrem Betriebssystem.",
          "Jede rechtliche Folge Ihrer Verwendung des Tools.",
        ],
        footer:
          "Sie sind allein verantwortlich dafür, sicherzustellen, dass Ihre Verwendung des Tools in Ihrem Rechtsgebiet und in Übereinstimmung mit Ihrem Lizenzvertrag mit <strong>exocad GmbH</strong> zulässig ist.",
      },
      acceptance: {
        title: "5. Annahme der Bedingungen",
        intro: "Indem Sie das Tool herunterladen, installieren oder verwenden, bestätigen Sie, dass Sie:",
        items: [
          "Diese Nutzungsbedingungen gelesen, verstanden und akzeptiert haben.",
          "Eine gültige Lizenz für die <strong>exocad</strong>-Software besitzen.",
          "Das Tool nicht gegen die geltenden Gesetze oder Vereinbarungen verletzen werden.",
        ],
      },
      contact: {
        title: "6. Kontakt",
        intro: "Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie bitte:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  es: {
    title: "Términos de Uso y Descargo de Responsabilidad",
    lastUpdated: "Última actualización: 12.08.2025",
    backToHome: "Volver al Inicio",
    sections: {
      general: {
        title: "1. Información General",
        content: [
          'Esta herramienta de software ("la Herramienta") es una utilidad de terceros diseñada para ayudar con la modificación de archivos de configuración para el software <strong>exocad</strong>. No está afiliada, respaldada o soportada por <strong>exocad GmbH</strong> o cualquiera de sus subsidiarias.',
          "La Herramienta no contiene, distribuye o proporciona acceso a materiales con derechos de autor de <strong>exocad GmbH</strong>. Todas las modificaciones se realizan exclusivamente en archivos de configuración ubicados en el propio dispositivo del usuario.",
        ],
      },
      permitted: {
        title: "2. Uso Permitido",
        intro: "Puede usar la Herramienta solo si:",
        items: [
          "Posee una licencia válida y legalmente obtenida para el software <strong>exocad</strong>.",
          "Usa la Herramienta de acuerdo con las leyes de su país.",
          "Acepta y cumple con estos Términos de Uso.",
        ],
      },
      prohibited: {
        title: "3. Uso Prohibido",
        intro: "Está estrictamente prohibido:",
        items: [
          "Usar la Herramienta con versiones pirateadas, crackeadas o no autorizadas de <strong>exocad</strong>.",
          "Distribuir la Herramienta junto con cualquier software ilegal o instrucciones sobre cómo obtenerlo.",
          "Eludir o intentar eludir mecanismos de licencia, protección contra copia o seguridad de <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Descargo de Responsabilidad",
        intro: "El autor de la Herramienta no asume responsabilidad por:",
        items: [
          "Cualquier daño a su hardware, software o datos resultante del uso de la Herramienta.",
          "Pérdida de funcionalidad o compatibilidad causada por actualizaciones de <strong>exocad</strong> o su sistema operativo.",
          "Cualquier consecuencia legal de su uso de la Herramienta.",
        ],
        footer:
          "Usted es el único responsable de asegurar que su uso de la Herramienta sea legal en su jurisdicción y en cumplimiento con su acuerdo de licencia con <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Aceptación de Términos",
        intro: "Al descargar, instalar o usar la Herramienta, confirma que:",
        items: [
          "Ha leído, entendido y acepta estos Términos de Uso.",
          "Posee una licencia válida para el software <strong>exocad</strong>.",
          "No usará la Herramienta en violación de leyes aplicables o acuerdos.",
        ],
      },
      contact: {
        title: "6. Contacto",
        intro: "Si tiene preguntas sobre estos Términos, por favor contacte:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  pt: {
    title: "Termos de Uso e Isenção de Responsabilidade",
    lastUpdated: "Última atualização: 12.08.2025",
    backToHome: "Voltar ao Início",
    sections: {
      general: {
        title: "1. Informações Gerais",
        content: [
          'Esta ferramenta de software ("a Ferramenta") é um utilitário de terceiros projetado para auxiliar na modificação de arquivos de configuração para o software <strong>exocad</strong>. Não é afiliada, endossada ou suportada pela <strong>exocad GmbH</strong> ou qualquer de suas subsidiárias.',
          "A Ferramenta não contém, distribui ou fornece acesso a materiais protegidos por direitos autorais da <strong>exocad GmbH</strong>. Todas as modificações são realizadas exclusivamente em arquivos de configuração localizados no próprio dispositivo do usuário.",
        ],
      },
      permitted: {
        title: "2. Uso Permitido",
        intro: "Você pode usar a Ferramenta apenas se:",
        items: [
          "Possui uma licença válida e legalmente obtida para o software <strong>exocad</strong>.",
          "Usa a Ferramenta de acordo com as leis do seu país.",
          "Aceita e cumpre com estes Termos de Uso.",
        ],
      },
      prohibited: {
        title: "3. Uso Proibido",
        intro: "É estritamente proibido:",
        items: [
          "Usar a Ferramenta com versões pirateadas, crackeadas ou não autorizadas do <strong>exocad</strong>.",
          "Distribuir a Ferramenta junto com qualquer software ilegal ou instruções sobre como obtê-lo.",
          "Contornar ou tentar contornar mecanismos de licenciamento, proteção contra cópia ou segurança do <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Isenção de Responsabilidade",
        intro: "O autor da Ferramenta não assume responsabilidade por:",
        items: [
          "Qualquer dano ao seu hardware, software ou dados resultante do uso da Ferramenta.",
          "Perda de funcionalidade ou compatibilidade causada por atualizações do <strong>exocad</strong> ou seu sistema operacional.",
          "Qualquer consequência legal do seu uso da Ferramenta.",
        ],
        footer:
          "Você é o único responsável por garantir que seu uso da Ferramenta seja legal em sua jurisdição e em conformidade com seu acordo de licença com a <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Aceitação dos Termos",
        intro: "Ao baixar, instalar ou usar a Ferramenta, você confirma que:",
        items: [
          "Leu, entendeu e súhlasíte s týmito Podmienkami Používania.",
          "Vlastníte platnú licenciu pre softvér <strong>exocad</strong>.",
          "Nebudete používať Nástroj v rozpore s platnými zákonmi alebo zmluvami.",
        ],
      },
      contact: {
        title: "6. Kontakt",
        intro: "Se você tiver otázky ohľadom týchto Podmienok, kontaktujte:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  pl: {
    title: "Warunki Użytkowania i Zrzeczenie się Odpowiedzialności",
    lastUpdated: "Ostatnia aktualizacja: 12.08.2025",
    backToHome: "Powrót do Strony Głównej",
    sections: {
      general: {
        title: "1. Informacje Ogólne",
        content: [
          'To narzędzie programowe ("Narzędzie") to narzędzie stron trzecich zaprojektowane do pomocy w modyfikacji plików konfiguracyjnych dla oprogramowania <strong>exocad</strong>. Nie jest powiązane, popierane ani wspierane przez <strong>exocad GmbH</strong> lub którekolwiek z jej spółek zależnych.',
          "Narzędzie nie zawiera, nie dystrybuuje ani nie zapewnia dostępu do materiałów chronionych prawami autorskimi <strong>exocad GmbH</strong>. Wszystkie modyfikacje są wykonywane wyłącznie na plikach konfiguracyjnych znajdujących się na własnym urządzeniu użytkownika.",
        ],
      },
      permitted: {
        title: "2. Dozwolone Użycie",
        intro: "Możesz używać Narzędzia tylko jeśli:",
        items: [
          "Posiadasz ważną, legalnie uzyskaną licencję na oprogramowanie <strong>exocad</strong>.",
          "Używasz Narzędzia zgodnie z prawem swojego kraju.",
          "Akceptujesz i przestrzegasz tych Warunków Użytkowania.",
        ],
      },
      prohibited: {
        title: "3. Zabronione Użycie",
        intro: "Surowo zabronione jest:",
        items: [
          "Używanie Narzędzia z pirackich, złamanych lub w inny sposób nieautoryzowanych версіями <strong>exocad</strong>.",
          "Dystrybuowanie Narzędzia wraz z jakimkolwiek nielegalnym oprogramowaniem lub instrukcjami jak je uzyskać.",
          "Omijanie lub próba omijania mechanizmów licencyjnych, ochrony przed kopiowaniem або безпекових механізмів <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Zrzeczenie się Odpowiedzialności",
        intro: "Autor Narzędzia nie ponosi odpowiedzialności za:",
        items: [
          "Jakiekolwiek poшodzenia sprzętu, oprogramowania або даних, które виникли внаслідок використання Narzędzia.",
          "Втрату функціональності або сумісності, спричинену оновленнями <strong>exocad</strong> або систему operacyjnoї.",
          "Jakiekolwiek prawovі наслідки вашого використання Narzędzia.",
        ],
        footer:
          "Jesteś wyłącznie odpowiedzialny za zapewnienie того, що ваше використання Narzędzia є законним у вашій юрисдикції та відповідає вашій ліцензійній угоді з <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Akceptacja Warunków",
        intro: "Pobierając, встановлюючи або використовуючи Narzędzia, ви підтверджуєте, що:",
        items: [
          "Ви прочитали, зрозуміли і погоджуєтесь з цими Умовами Використання.",
          "Ви володієте дійсною ліцензією на oprogramowanie <strong>exocad</strong>.",
          "Ви не будете використовувати Narzędzia з порушенням чинних законів або угод.",
        ],
      },
      contact: {
        title: "6. Kontakt",
        intro: "Якщо у вас є питання щодо цих Умов, будь ласка, зверніться:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  cs: {
    title: "Podmínky Použití a Zřeknutí se Odpovědnosti",
    lastUpdated: "Poslední aktualizace: 12.08.2025",
    backToHome: "Zpět na Hlavní Stránku",
    sections: {
      general: {
        title: "1. Obecné Informace",
        content: [
          'Tento softwarový nástroj ("Nástroj") je utilita třetí strany navržená k pomoci s úpravou konfiguračních souborů pro software <strong>exocad</strong>. Není spojena, schválena nebo podporována společností <strong>exocad GmbH</strong> nebo kteroukoliv z jejích dceřiných společností.',
          "Nástroj neobsahuje, nedistribuuje ani neposkytuje přístup k materiálům chráněným autorskými právy společnosti <strong>exocad GmbH</strong>. Všechny úpravy jsou prováděny výhradně na konfiguračních souborech umístěných na vlastním zařízení uživatele.",
        ],
      },
      permitted: {
        title: "2. Povolené Použití",
        intro: "Nástroj můžete používat pouze pokud:",
        items: [
          "Vlastníte platnou, legálně získanou licenci pro software <strong>exocad</strong>.",
          "Používáte Nástroj v souladu se zákony vaší země.",
          "Přijímáte a dodržujete tyto Podmínky Použití.",
        ],
      },
      prohibited: {
        title: "3. Zakázané Použití",
        intro: "Přísně zakázáno je:",
        items: [
          "Používání Nástroje s pirátskými, cracknutými nebo jinak neautorizovanými verzemi <strong>exocad</strong>.",
          "Distribuce Nástroje spolu s jakýmkoliv nelegálním softwarem nebo pokyny k jeho získaniu.",
          "Obcházení nebo pokus o obcházení licenčních, kopírovacích nebo bezpečnostních mechanismů <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Zřeknutí se Odpovědnosti",
        intro: "Autor Nástroje nepřebírá odpovědnost za:",
        items: [
          "Jakékoli poškození vašeho hardwaru, softwaru nebo dat, která vyplývají z použití Nástroje.",
          "Ztrátu funkčnosti nebo kompatibility způsobenou aktualizacemi <strong>exocad</strong> nebo vašeho operačního systému.",
          "Jakékoli právní důsledky vašeho použití Nástroje.",
        ],
        footer:
          "Jste výhradně odpovědní za zajištění, že vaše použití Nástroje je legální ve vaší jurisdikci a v souladu s vaší licenční smlouvou s <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Přijetí Podmínek",
        intro: "Stažením, instalací nebo použitím Nástroje potvrzujete, že:",
        items: [
          "Přečetli jste si, porozuměli a souhlasíte s těmito Podmínkami Použití.",
          "Vlastníte platnou licenci pro software <strong>exocad</strong>.",
          "Nebudete používat Nástroj v rozporu s platnými zákony nebo smlouvami.",
        ],
      },
      contact: {
        title: "6. Kontakt",
        intro: "Pokud máte otázky ohledně těchto Podmínek, kontaktujte:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  sk: {
    title: "Podmienky Používania a Zrieknutie sa Zodpovednosti",
    lastUpdated: "Posledná aktualizácia: 12.08.2025",
    backToHome: "Späť na Hlavnú Stránku",
    sections: {
      general: {
        title: "1. Všeobecné Informácie",
        content: [
          'Tento softvérový nástroj ("Nástroj") je utilita tretej strany navrhnutá na pomoc s úpravou konfiguračných súborov pre softvér <strong>exocad</strong>. Nie je spojený, schválený alebo podporovaný spoločnosťou <strong>exocad GmbH</strong> alebo ktoroukoľvek z jej dcérskych spoločností.',
          "Nástroj neobsahuje, nedistribuuje ani neposkytuje prístup k materiálom chráneným autorskými právami spoločnosti <strong>exocad GmbH</strong>. Všetky úpravy sa vykonávajú výhradne na konfiguračných súboroch umiestnených na vlastnom zariadení používateľa.",
        ],
      },
      permitted: {
        title: "2. Povolené Používanie",
        intro: "Nástroj môžete používať iba ak:",
        items: [
          "Vlastníte platnú, legálne získanú licenciu pre softvér <strong>exocad</strong>.",
          "Používate Nástroj v súlade so zákonmi vašej krajiny.",
          "Prijímate a dodržiavate tieto Podmienky Používania.",
        ],
      },
      prohibited: {
        title: "3. Zakázané Používanie",
        intro: "Prísne zakázané je:",
        items: [
          "Používanie Nástroja s pirátskymi, cracknutými alebo inak neautorizovanými verziami <strong>exocad</strong>.",
          "Distribúcia Nástroja spolu s akýmkoľvek nelegálnym softvérom alebo pokynmi na jeho získanie.",
          "Obchádzanie alebo pokus o obchádzanie licenčných, kopírovacích alebo bezpečnostných mechanizmov <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Zrieknutie sa Zodpovednosti",
        intro: "Autor Nástroja nepreberá zodpovednosť za:",
        items: [
          "Akékoľvek poškodenie vášho hardvéru, softvéru alebo dát vyplývajúce z použitia Nástroja.",
          "Stratu funkčnosti alebo kompatibility spôsobenú aktualizáciami <strong>exocad</strong> alebo vášho operačného systému.",
          "Akékoľvek právne dôsledky vášho použitia Nástroja.",
        ],
        footer:
          "Ste výhradne zodpovední za zabezpečenie, že vaše použitie Nástroja je legálne vo vašej jurisdikcii a v súlade s vašou licenčnou zmluvou s <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Prijatie Podmienok",
        intro: "Stiahnutím, inštaláciou alebo použitím Nástroja potvrdzujete, že:",
        items: [
          "Prečítali ste si, porozumeli a súhlasíte s týmito Podmienkami Používania.",
          "Vlastníte platnú licenciu pre softvér <strong>exocad</strong>.",
          "Nebudete používať Nástroj v rozpore s platnými zákonmi alebo zmluvami.",
        ],
      },
      contact: {
        title: "6. Kontakt",
        intro: "Ak máte otázky ohľadom týchto Podmienok, kontaktujte:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  uk: {
    title: "Умови Використання та Відмова від Відповідальності",
    lastUpdated: "Останнє оновлення: 12.08.2025",
    backToHome: "Повернутися на Головну",
    sections: {
      general: {
        title: "1. Загальна Інформація",
        content: [
          'Цей програмний інструмент ("Інструмент") є утилітою третьої сторони, призначеною для допомоги в модифікації конфігураційних файлів для програмного забезпечення <strong>exocad</strong>. Він не пов\'язаний, не схвалений і не підтримується <strong>exocad GmbH</strong> або будь-якими її дочірніми компаніями.',
          "Інструмент не містить, не розповсюджує і не надає доступ до матеріалів, захищених авторським правом <strong>exocad GmbH</strong>. Всі модифікації виконуються виключно на конфігураційних файлах, розташованих на власному пристрої користувача.",
        ],
      },
      permitted: {
        title: "2. Дозволене Використання",
        intro: "Ви можете використовувати Інструмент тільки якщо:",
        items: [
          "Ви володієте дійсною, законно отриманою ліцензією на програмне забезпечення <strong>exocad</strong>.",
          "Ви використовуєте Інструмент відповідно до законів вашої країни.",
          "Ви приймаєте і дотримуєтесь цих Умов Використання.",
        ],
      },
      prohibited: {
        title: "3. Заборонене Використання",
        intro: "Суворо заборонено:",
        items: [
          "Використання Інструменту з піратськими, зламаними або іншим чином неавторизованими версіями <strong>exocad</strong>.",
          "Розповсюдження Інструменту разом з будь-яким нелегальним програмним забезпеченням або інструкціями щодо його отримання.",
          "Обхід або спроба обходу ліцензійних, захисних від копіювання або безпекових механізмів <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Відмова від Відповідальності",
        intro: "Автор Інструменту не несе відповідальності за:",
        items: [
          "Будь-які пошкодження вашого обладнання, програмного забезпечення або даних, що виникли внаслідок використання Інструменту.",
          "Втрату функціональності або сумісності, спричинену оновленнями <strong>exocad</strong> або вашої операційної системи.",
          "Будь-які правові наслідки вашого використання Інструменту.",
        ],
        footer:
          "Ви несете виключну відповідальність за забезпечення того, що ваше використання Інструменту є законним у вашій юрисдикції та відповідає вашій ліцензійній угоді з <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Прийняття Умов",
        intro: "Завантажуючи, встановлюючи або використовуючи Інструмент, ви підтверджуєте, що:",
        items: [
          "Ви прочитали, зрозуміли і погоджуєтесь з цими Умовами Використання.",
          "Ви володієте дійсною ліцензією на програмне забезпечення <strong>exocad</strong>.",
          "Ви не будете використовувати Інструмент з порушенням чинних законів або угод.",
        ],
      },
      contact: {
        title: "6. Контакт",
        intro: "Якщо у вас є питання щодо цих Умов, будь ласка, зверніться:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  ru: {
    title: "Условия Использования и Отказ от Ответственности",
    lastUpdated: "Последнее обновление: 12.08.2025",
    backToHome: "Вернуться на Главную",
    sections: {
      general: {
        title: "1. Общая Информация",
        content: [
          'Этот программный инструмент ("Инструмент") является утилитой третьей стороны, предназначенной для помощи в модификации конфигурационных файлов для программного обеспечения <strong>exocad</strong>. Он не связан, не одобрен и не поддерживается <strong>exocad GmbH</strong> или любыми её дочерними компаниями.',
          "Инструмент не содержит, не распространяет и не предоставляет доступ к материалам, защищённым авторским правом <strong>exocad GmbH</strong>. Все модификации выполняются исключительно на конфигурационных файлах, расположенных на собственном устройстве пользователя.",
        ],
      },
      permitted: {
        title: "2. Разрешённое Использование",
        intro: "Вы можете использовать Инструмент только если:",
        items: [
          "Вы владеете действительной, законно полученной лицензией на программное обеспечение <strong>exocad</strong>.",
          "Вы используете Инструмент в соответствии с законами вашей страны.",
          "Вы принимаете и соблюдаете эти Условия Использования.",
        ],
      },
      prohibited: {
        title: "3. Запрещённое Использование",
        intro: "Строго запрещено:",
        items: [
          "Использование Инструмента с пиратскими, взломанными или иным образом неавторизованными версиями <strong>exocad</strong>.",
          "Распространение Инструмента вместе с любым нелегальным программным обеспечением или инструкциями по его получению.",
          "Обход или попытка обхода лицензионных, защитных от копирования или безопасностных механизмов <strong>exocad</strong>.",
        ],
      },
      liability: {
        title: "4. Отказ от Ответственности",
        intro: "Автор Инструмента не несёт ответственности за:",
        items: [
          "Любые повреждения вашего оборудования, программного обеспечения или данных, возникшие в результате использования Инструмента.",
          "Потерю функциональности или совместимости, вызванную обновлениями <strong>exocad</strong> или вашей операционной системы.",
          "Любые правовые последствия вашего использования Инструмента.",
        ],
        footer:
          "Вы несёте исключительную ответственность за обеспечение того, что ваше использование Инструмента является законным в вашей юрисдикции и соответствует вашему лицензионному соглашению с <strong>exocad GmbH</strong>.",
      },
      acceptance: {
        title: "5. Принятие Условий",
        intro: "Загружая, устанавливая или используя Инструмент, вы подтверждаете, что:",
        items: [
          "Вы прочитали, поняли и согласны с этими Условиями Использования.",
          "Вы владеете действительной лицензией на программное обеспечение <strong>exocad</strong>.",
          "Вы не будете использовать Инструмент в нарушение применимых законов или соглашений.",
        ],
      },
      contact: {
        title: "6. Контакт",
        intro: "Если у вас есть вопросы относительно этих Условий, пожалуйста, обратитесь:",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  ja: {
    title: "利用規約および免責事項",
    lastUpdated: "最終更新: 12.08.2025",
    backToHome: "ホームに戻る",
    sections: {
      general: {
        title: "1. 一般情報",
        content: [
          "このソフトウェアツール（「ツール」）は、<strong>exocad</strong>ソフトウェアの設定ファイルの変更を支援するために設計されたサードパーティユーティリティです。<strong>exocad GmbH</strong>またはその子会社と提携、承認、またはサポートされていません。",
          "ツールは、<strong>exocad GmbH</strong>の著作権で保護された素材を含有、配布、またはアクセスを提供しません。すべての変更は、ユーザー自身のデバイスに配置された設定ファイルでのみ実行されます。",
        ],
      },
      permitted: {
        title: "2. 許可された使用",
        intro: "以下の場合にのみツールを使用できます：",
        items: [
          "<strong>exocad</strong>ソフトウェアの有効で合法的に取得されたライセンスを所有している。",
          "お住まいの国の法律に従ってツールを使用している。",
          "これらの利用規約を受け入れ、遵守している。",
        ],
      },
      prohibited: {
        title: "3. 禁止された使用",
        intro: "以下は厳しく禁止されています：",
        items: [
          "海賊版、クラック版、またはその他の不正な<strong>exocad</strong>バージョンでツールを使用すること。",
          "違法なソフトウェアまたはその取得方法の指示と一緒にツールを配布すること。",
          "<strong>exocad</strong>のライセンス、コピー保護、またはセキュリティメカニズムを回避または回避しようとすること。",
        ],
      },
      liability: {
        title: "4. 免責事項",
        intro: "ツールの作者は以下について責任を負いません：",
        items: [
          "ツールの使用によるハードウェア、ソフトウェア、またはデータへの損害。",
          "<strong>exocad</strong>またはオペレーティングシステムの更新による機能性または互換性の損失。",
          "ツールの使用による法的結果。",
        ],
        footer:
          "お住まいの管轄区域でのツールの使用が合法であり、<strong>exocad GmbH</strong>とのライセンス契約に準拠していることを確保する責任は、お客様にあります。",
      },
      acceptance: {
        title: "5. 規約の受諾",
        intro: "ツールをダウンロード、インストール、または使用することにより、以下を確認します：",
        items: [
          "これらの利用規約を読み、理解し、同意している。",
          "<strong>exocad</strong>ソフトウェアの有効なライセンスを所有している。",
          "適用される法律または契約に違反してツールを使用しない。",
        ],
      },
      contact: {
        title: "6. 連絡先",
        intro: "これらの規約について質問がある場合は、お問い合わせください：",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
  zh: {
    title: "使用条款和免责声明",
    lastUpdated: "最后更新：12.08.2025",
    backToHome: "返回首页",
    sections: {
      general: {
        title: "1. 一般信息",
        content: [
          '此软件工具（"工具"）是第三方实用程序，旨在协助修改<strong>exocad</strong>软件的配置文件。它与<strong>exocad GmbH</strong>或其任何子公司没有关联、认可或支持。',
          "该工具不包含、分发或提供对<strong>exocad GmbH</strong>版权材料的访问。所有修改仅在用户自己设备上的配置文件中执行。",
        ],
      },
      permitted: {
        title: "2. 允许的使用",
        intro: "只有在以下情况下才能使用工具：",
        items: [
          "您拥有<strong>exocad</strong>软件的有效、合法获得的许可证。",
          "您根据您所在国家的法律使用工具。",
          "您接受并遵守这些使用条款。",
        ],
      },
      prohibited: {
        title: "3. 禁止的使用",
        intro: "严格禁止：",
        items: [
          "将工具与盗版、破解或其他未经授权的<strong>exocad</strong>版本一起使用。",
          "将工具与任何非法软件或获取方法的说明一起分发。",
          "规避或试图规避<strong>exocad</strong>的许可、复制保护或安全机制。",
        ],
      },
      liability: {
        title: "4. 免责声明",
        intro: "工具作者不承担以下责任：",
        items: [
          "因使用工具而对您的硬件、软件或数据造成的任何损害。",
          "由于<strong>exocad</strong>或操作系统更新导致的功能或兼容性损失。",
          "您使用工具的任何法律后果。",
        ],
        footer: "您有责任确保您在所在司法管辖区使用工具是合法的，并符合您与<strong>exocad GmbH</strong>的许可协议。",
      },
      acceptance: {
        title: "5. 条款接受",
        intro: "通过下载、安装或使用工具，您确认：",
        items: [
          "您已阅读、理解并同意这些使用条款。",
          "您拥有<strong>exocad</strong>软件的有效许可证。",
          "您不会违反适用法律或协议使用工具。",
        ],
      },
      contact: {
        title: "6. 联系方式",
        intro: "如果您对这些条款有疑问，请联系：",
        company: "CadTechX",
        email: "Email:",
      },
    },
  },
}

const TermsPage = () => {
  const [language, setLanguage] = useState("en")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage")
    if (storedLanguage && translations[storedLanguage]) {
      setLanguage(storedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    localStorage.setItem("selectedLanguage", lang)
    setIsDropdownOpen(false)
  }

  const currentTranslations = translations[language] || translations.en
  const languages = Object.keys(translations)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Language Selector */}
      <div className="fixed top-20 right-20 z-10">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer text-sm text-black"
          >
            <Globe className="mr-2 w-4 h-4" />
            {language.toUpperCase()}
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[120px]">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`block w-full px-3 py-2 text-left cursor-pointer text-sm text-black ${
                    language === lang ? "bg-gray-100" : ""
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Card className="max-w-4xl w-full">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">{currentTranslations.title}</h1>
          <p className="text-sm text-muted-foreground mb-4">{currentTranslations.lastUpdated}</p>
          {currentTranslations.sections &&
            Object.values(currentTranslations.sections).map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                {section.content && (
                  <div className="mb-4">
                    {section.content.map((content, contentIndex) => (
                      <p key={contentIndex} className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: content }} />
                    ))}
                  </div>
                )}
                {section.intro && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: section.intro }} />
                    {section.items &&
                      section.items.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                  </div>
                )}
                {section.footer && (
                  <p
                    className="text-sm text-muted-foreground mt-4"
                    dangerouslySetInnerHTML={{ __html: section.footer }}
                  />
                )}
                {section.company && (
                  <div className="mt-4">
                    <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: section.company }} />
                    <p className="text-sm">Email: cadtechx.exe@gmail.com</p>
                  </div>
                )}
              </div>
            ))}
          <Link href="/" className="text-sm font-medium hover:underline">
            {currentTranslations.backToHome}
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default TermsPage
