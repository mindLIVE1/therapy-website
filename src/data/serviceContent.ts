// Long-form content for each therapy offering. Rendered by the dynamic
// route src/pages/therapieangebote/[slug].astro.
import { site } from "./site";

export type ServiceContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  imageLabel: string;
  introHeading: string;
  introParagraphs: string[];
  forWhomHeading: string;
  forWhomIntro: string;
  forWhom: string[];
  approachHeading: string;
  approachIntro: string;
  approach: { title: string; text: string }[];
  quote: string;
  faqs: { q: string; a: string }[];
};

export const serviceContent: Record<string, ServiceContent> = {
  einzeltherapie: {
    slug: "einzeltherapie",
    metaTitle: `Einzeltherapie online | ${site.name}`,
    metaDescription:
      `Online-Einzeltherapie bei ${site.name}: vertrauliche, einfühlsame Begleitung bei Ängsten, depressiven Phasen, Stress und Lebenskrisen – per Video, deutschlandweit.`,
    eyebrow: "Einzeltherapie",
    heroTitle: "Ein Raum, der ganz Ihnen gehört",
    heroLead:
      "Manchmal braucht es einen Ort, an dem nur Sie zählen – an dem Sie laut denken, fühlen und sortieren dürfen. In der Einzeltherapie begleite ich Sie behutsam durch das, was Sie gerade beschäftigt.",
    imageLabel: "Ruhige, einladende Szene – Sessel, Fenster, Tageslicht",
    introHeading: "Wenn vieles gleichzeitig zu viel wird",
    introParagraphs: [
      "Vielleicht funktionieren Sie nach außen, während es innen längst leiser geworden ist. Vielleicht kreisen die Gedanken nachts, oder eine Anspannung sitzt schon so lange in Ihnen, dass sie sich normal anfühlt. Was auch immer Sie hierhergeführt hat – es verdient Aufmerksamkeit.",
      "In der Einzeltherapie schauen wir gemeinsam und ohne Wertung auf Ihre Themen. Wir verstehen, was sie nährt, und entwickeln Schritt für Schritt neue Wege – in einem Tempo, das sich für Sie sicher anfühlt.",
    ],
    forWhomHeading: "Wobei ich Sie unterstütze",
    forWhomIntro:
      "Sie brauchen keine fertige Diagnose und keinen „triftigen Grund“. Häufige Anliegen sind:",
    forWhom: [
      "Ängste, Sorgen und Panik",
      "Depressive Verstimmungen und innere Leere",
      "Stress, Erschöpfung und drohendes Ausbrennen",
      "Selbstwert und ein strenger innerer Kritiker",
      "Lebenskrisen, Übergänge und Sinnfragen",
      "Trauer, Verlust und einschneidende Veränderungen",
    ],
    approachHeading: "Wie wir zusammenarbeiten",
    approachIntro:
      "Mein Vorgehen verbindet Wärme mit Struktur. Sie geben die Richtung vor, ich halte den Rahmen.",
    approach: [
      {
        title: "Verstehen",
        text: "Wir beginnen damit, Ihr Erleben wirklich zu verstehen – ohne Eile und ohne vorschnelle Lösungen.",
      },
      {
        title: "Ordnen",
        text: "Gemeinsam bringen wir Klarheit in das, was sich verworren anfühlt, und benennen, was Sie sich wünschen.",
      },
      {
        title: "Verändern",
        text: "Mit konkreten, alltagstauglichen Schritten finden Sie zurück zu mehr Handlungsfähigkeit und Ruhe.",
      },
    ],
    quote:
      "Sie müssen nicht erst zusammenbrechen, um sich Unterstützung zu erlauben.",
    faqs: [
      {
        q: "Wie lange dauert eine Einzeltherapie?",
        a: "Das ist sehr individuell. Manche Anliegen lassen sich in wenigen Sitzungen klären, andere brauchen länger. Wir besprechen den Verlauf regelmäßig und Sie entscheiden, wie weit Sie gehen möchten.",
      },
      {
        q: "Wie läuft eine Sitzung online ab?",
        a: "Wir treffen uns zur vereinbarten Zeit über eine verschlüsselte Videoverbindung. Sie brauchen nur einen ruhigen Ort und ein Gerät mit Kamera – den Link erhalten Sie vorab per E-Mail.",
      },
    ],
  },

  paartherapie: {
    slug: "paartherapie",
    metaTitle: `Paartherapie online | ${site.name}`,
    metaDescription:
      `Online-Paartherapie bei ${site.name}: einfühlsame Begleitung bei Konflikten, Distanz und Sprachlosigkeit. Gemeinsam zurück zu Verständnis und Nähe – per Video.`,
    eyebrow: "Paartherapie",
    heroTitle: "Wieder zueinander finden",
    heroLead:
      "Wenn aus Nähe Distanz geworden ist, aus Gesprächen Streit oder Schweigen – dann lohnt es sich, gemeinsam hinzuschauen. Ich begleite Sie als Paar mit Allparteilichkeit und Respekt für beide Seiten.",
    imageLabel: "Zwei Personen im Gespräch – warm, verbunden, unaufgeregt",
    introHeading: "Wenn die gemeinsame Sprache abhandenkommt",
    introParagraphs: [
      "Viele Paare erleben Phasen, in denen dieselben Konflikte sich wiederholen, in denen man sich missversteht oder einander kaum noch erreicht. Das ist kein Zeichen von Scheitern – sondern oft der Wunsch nach Verbindung, der gerade keinen guten Weg findet.",
      "In der Paartherapie schaffen wir einen Raum, in dem beide gehört werden. Wir verlangsamen festgefahrene Muster, machen unausgesprochene Bedürfnisse sichtbar und üben, einander wieder wirklich zuzuhören.",
    ],
    forWhomHeading: "Worum es gehen kann",
    forWhomIntro:
      "Sie müssen sich nicht einig sein, um gemeinsam zu kommen. Typische Themen sind:",
    forWhom: [
      "Wiederkehrende Konflikte und Streitmuster",
      "Distanz, Entfremdung und das Gefühl, sich verloren zu haben",
      "Kommunikation, die immer wieder ins Leere läuft",
      "Vertrauen nach Verletzungen oder Krisen",
      "Veränderte Lebensphasen – Familie, Beruf, Übergänge",
      "Intimität und Nähe, die aus dem Gleichgewicht geraten sind",
    ],
    approachHeading: "Wie wir zusammenarbeiten",
    approachIntro:
      "Ich ergreife für niemanden Partei – sondern für Ihre Beziehung. Beide Perspektiven haben bei mir gleichermaßen Platz.",
    approach: [
      {
        title: "Zuhören",
        text: "Beide kommen zu Wort. Wir schaffen Sicherheit, damit auch Heikles ausgesprochen werden kann.",
      },
      {
        title: "Verstehen",
        text: "Wir entschlüsseln die Muster hinter den Konflikten – und die Bedürfnisse, die dahinterliegen.",
      },
      {
        title: "Annähern",
        text: "Sie erproben neue Wege, miteinander zu sprechen, und finden Schritt für Schritt wieder zueinander.",
      },
    ],
    quote:
      "Hinter den meisten Konflikten steht der Wunsch, einander wieder zu erreichen.",
    faqs: [
      {
        q: "Müssen wir beide an der Online-Sitzung teilnehmen?",
        a: "In der Regel ja – die gemeinsame Sitzung ist der Kern der Paartherapie. Bei Bedarf können auch einzelne Gespräche sinnvoll sein. Das stimmen wir gemeinsam ab.",
      },
      {
        q: "Funktioniert Paartherapie auch per Video?",
        a: "Ja. Sie können bequem von zu Hause teilnehmen – das senkt die Hürde und Sie sprechen aus Ihrer vertrauten Umgebung. Wichtig ist nur ein ungestörter Raum für Sie beide.",
      },
    ],
  },

  sexualtherapie: {
    slug: "sexualtherapie",
    metaTitle: `Sexualtherapie online | ${site.name}`,
    metaDescription:
      `Online-Sexualtherapie bei ${site.name}: ein geschützter, wertfreier Raum für Fragen rund um Sexualität, Lust, Unsicherheiten und Intimität – diskret und per Video.`,
    eyebrow: "Sexualtherapie",
    heroTitle: "Über Intimität sprechen – ohne Scham",
    heroLead:
      "Sexualität berührt etwas zutiefst Persönliches. Hier finden Sie einen geschützten, wertfreien Raum, in dem alle Fragen erlaubt sind – offen, respektvoll und in Ihrem Tempo.",
    imageLabel: "Zarte, abstrakte Aufnahme – weiches Licht, Geborgenheit",
    introHeading: "Ein Thema, das Vertrauen verdient",
    introParagraphs: [
      "Über Sexualität zu sprechen fällt vielen Menschen schwer – gerade weil sie so eng mit Selbstbild, Nähe und Verletzlichkeit verbunden ist. Unsicherheiten, Veränderungen oder das Gefühl, „nicht normal“ zu sein, bleiben deshalb oft unausgesprochen.",
      "In der Sexualtherapie nehme ich Ihre Anliegen ernst und begegne ihnen ohne Wertung. Wir schaffen Raum für das, was sich sonst schwer aussprechen lässt – diskret, einfühlsam und auf Augenhöhe.",
    ],
    forWhomHeading: "Womit Sie kommen dürfen",
    forWhomIntro:
      "Es gibt kein „zu kleines“ und kein „zu intimes“ Anliegen. Zum Beispiel:",
    forWhom: [
      "Lust und Begehren, die sich verändert haben",
      "Unsicherheiten rund um den eigenen Körper und Sexualität",
      "Sexuelle Funktionsschwierigkeiten und Druck",
      "Fragen zu sexueller Identität und Orientierung",
      "Unterschiedliche Bedürfnisse in der Partnerschaft",
      "Folgen belastender oder verletzender Erfahrungen",
    ],
    approachHeading: "Wie wir zusammenarbeiten",
    approachIntro:
      "Diskretion und Respekt stehen an erster Stelle. Sie bestimmen, worüber und wie offen wir sprechen.",
    approach: [
      {
        title: "Vertrauen",
        text: "Wir bauen zunächst Sicherheit auf. Nichts muss – alles darf in Ihrem Tempo zur Sprache kommen.",
      },
      {
        title: "Verstehen",
        text: "Wir betrachten Ihr Anliegen im Zusammenhang mit Körper, Gefühlen und Beziehungen.",
      },
      {
        title: "Entlasten",
        text: "Sie gewinnen neue Sichtweisen, lösen Druck und entdecken einen freieren Umgang mit Ihrer Sexualität.",
      },
    ],
    quote: "Es gibt nichts an Ihnen, das hier keinen Platz hätte.",
    faqs: [
      {
        q: "Ist das Ganze wirklich vertraulich?",
        a: "Absolut. Ich unterliege der Schweigepflicht, und wir sprechen über eine verschlüsselte Verbindung. Was Sie teilen, bleibt vollständig zwischen uns.",
      },
      {
        q: "Kann ich auch als Einzelperson kommen?",
        a: "Ja. Sexualtherapie ist sowohl einzeln als auch als Paar möglich. Wir finden den Rahmen, der für Ihr Anliegen passt.",
      },
    ],
  },
};
