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
  forWhomSubheading?: string;
  forWhomIntro: string;
  forWhom: string[];
  forWhomClosing?: string;
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
    metaDescription: `Online-Einzeltherapie bei ${site.name}: vertrauliche, einfühlsame Begleitung bei Ängsten, Stress, Selbstwert, Krisen und persönlichen Herausforderungen – per Video, deutschland- & europaweit.`,
    eyebrow: "Einzeltherapie",
    heroTitle: "Ein Raum, der ganz Ihnen gehört",
    heroLead:
      "Manchmal braucht es einen Ort, an dem nur Sie zählen – an dem Sie laut denken, fühlen und sortieren dürfen. In der Einzeltherapie begleite ich Sie behutsam durch das, was Sie gerade beschäftigt.",
    imageLabel: "Foto Einzeltherapie – zwei Personen im Gespräch (siehe Ordner)",
    introHeading: "Wenn vieles gleichzeitig zu viel wird",
    introParagraphs: [
      "Vielleicht funktionieren Sie nach außen, während es sich innerlich längst erschöpft anfühlt. Vielleicht kreisen Ihre Gedanken ununterbrochen, Sie schlafen schlecht oder tragen eine Anspannung mit sich, die inzwischen ganz normal geworden ist. Vielleicht stehen Sie vor einer schwierigen Entscheidung, erleben eine Krise oder haben einfach das Gefühl, sich selbst verloren zu haben.",
      "In der Online-Psychotherapie schaffen wir gemeinsam einen geschützten Raum, in dem Sie verstehen dürfen, was Sie belastet. Ohne Druck, ohne Bewertung und in Ihrem eigenen Tempo entwickeln wir neue Perspektiven und konkrete Wege, die sich nachhaltig in Ihren Alltag integrieren lassen.",
    ],
    forWhomHeading: "Wobei ich Sie unterstütze",
    forWhomSubheading:
      "Einzeltherapie bei psychischen Belastungen und persönlichen Krisen",
    forWhomIntro:
      "Nicht jede Belastung braucht eine Diagnose. Oft reicht das Gefühl, dass etwas nicht mehr so weitergehen soll wie bisher. Ich begleite Erwachsene unter anderem bei:",
    forWhom: [
      "Ängsten, Sorgen und Panik",
      "Depressionen, Erschöpfung und innerer Leere",
      "Stress, Burnout und anhaltender Überforderung",
      "ADHS im Erwachsenenalter",
      "Perfektionismus und hohem Leistungsdruck",
      "Selbstwertproblemen und einem starken inneren Kritiker",
      "Schwierigkeiten, Grenzen zu setzen und für sich einzustehen",
      "Wut, intensiven Emotionen und emotionaler Regulation",
      "Trauer, Verlust und einschneidenden Veränderungen",
    ],
    forWhomClosing:
      "Ganz gleich, mit welchem Anliegen Sie kommen – wir beginnen dort, wo Sie gerade stehen.",
    approachHeading: "Wie wir zusammenarbeiten",
    approachIntro:
      "Therapie bedeutet für mich, einen sicheren Rahmen zu schaffen, in dem Veränderung möglich wird. Ich arbeite ressourcenorientiert, wissenschaftlich fundiert und gleichzeitig individuell auf Ihre persönliche Situation abgestimmt. Sie bestimmen die Richtung und das Tempo, ich begleite Sie mit fachlicher Kompetenz, Klarheit und Empathie.",
    approach: [
      {
        title: "Verstehen",
        text: "Am Anfang geht es nicht darum, Probleme möglichst schnell zu lösen. Wir nehmen uns Zeit, Ihr Erleben, Ihre Geschichte und die Muster hinter Ihren Belastungen wirklich zu verstehen. Oft entsteht allein dadurch bereits spürbare Entlastung.",
      },
      {
        title: "Ordnen",
        text: "Gemeinsam bringen wir Struktur in Gedanken, Gefühle und innere Konflikte. Wir erkennen Zusammenhänge, entwickeln neue Perspektiven und finden heraus, welche Bedürfnisse, Werte und Ziele für Sie wirklich wichtig sind.",
      },
      {
        title: "Verändern",
        text: "Veränderung entsteht nicht durch Druck, sondern durch kleine, realistische Schritte. Gemeinsam entwickeln wir Strategien, die zu Ihrem Alltag passen und Sie langfristig dabei unterstützen, mehr innere Ruhe, Selbstvertrauen und Handlungsfähigkeit zu gewinnen.",
      },
    ],
    quote:
      "Sie müssen nicht erst wissen, was genau los ist, bevor Sie Unterstützung suchen.",
    faqs: [
      {
        q: "Brauche ich eine Diagnose oder einen konkreten Grund?",
        a: "Nein. Sie müssen keine Diagnose haben, um Unterstützung in Anspruch zu nehmen. Viele Menschen kommen mit dem Wunsch, sich selbst besser zu verstehen, belastende Situationen zu bewältigen oder neue Wege im Umgang mit ihren Gedanken, Gefühlen oder Beziehungen zu entwickeln. Sie entscheiden, womit Sie beginnen möchten.",
      },
      {
        q: "Wie lange dauert eine Einzeltherapie?",
        a: "Das ist individuell. Manche Anliegen lassen sich in wenigen Sitzungen klären, andere brauchen mehr Zeit. Gemeinsam schauen wir regelmäßig, was Sie gerade brauchen und wie sich der Prozess entwickelt. Sie entscheiden jederzeit selbst, wie lange Sie begleitet werden möchten.",
      },
      {
        q: "Wie läuft eine Online-Sitzung ab?",
        a: "Ganz unkompliziert. Wir treffen uns zum vereinbarten Termin über eine verschlüsselte Videoverbindung. Sie benötigen lediglich einen ruhigen Ort, eine stabile Internetverbindung und ein Gerät mit Kamera und/oder Mikrofon. Den Zugangslink erhalten Sie vorab per E-Mail.",
      },
      {
        q: "Was, wenn ich gar nicht weiß, wo ich anfangen soll?",
        a: "Das ist völlig in Ordnung. Sie müssen Ihre Gedanken nicht sortiert oder „fertig formuliert“ mitbringen. Gemeinsam finden wir heraus, was Sie beschäftigt und wo Sie ansetzen möchten. Oft entsteht Klarheit erst im Gespräch.",
      },
    ],
  },

  paartherapie: {
    slug: "paartherapie",
    metaTitle: `Paartherapie online | ${site.name}`,
    metaDescription: `Online-Paartherapie bei ${site.name}: einfühlsame, allparteiliche Begleitung bei Konflikten, Distanz und Vertrauensfragen – offen für jede Beziehungsform, per Video.`,
    eyebrow: "Paartherapie",
    heroTitle: "Wieder zueinander finden",
    heroLead:
      "Wenn aus Nähe Distanz geworden ist, aus Gesprächen Streit oder Schweigen, dann lohnt es sich, gemeinsam hinzuschauen. Ich begleite Sie als Paar mit Allparteilichkeit und Respekt für beide Seiten.",
    imageLabel: "Foto Paartherapie (siehe Ordner)",
    introHeading: "Wenn die gemeinsame Sprache abhandenkommt",
    introParagraphs: [
      "Viele Paare erleben Phasen, in denen dieselben Konflikte sich wiederholen, in denen man sich missversteht oder einander kaum noch erreicht. Das ist kein Zeichen von Scheitern, sondern oft der Wunsch nach Verbindung, der gerade keinen guten Weg findet.",
      "In der Paartherapie schaffen wir einen Raum, in dem beide gehört werden. Wir verlangsamen festgefahrene Muster, machen unausgesprochene Bedürfnisse sichtbar und üben, einander wieder wirklich zuzuhören.",
      "Egal, wie Ihre Beziehung gestaltet ist, ich begleite Sie einfühlsam und wertschätzend bei Ihren individuellen Anliegen. Mein Ansatz ist offen und inklusiv, sodass sich jeder Mensch und jede Beziehungsform in meiner Praxis willkommen und verstanden fühlen kann.",
    ],
    forWhomHeading: "Worum es gehen kann",
    forWhomIntro:
      "Sie müssen sich nicht einig sein, um gemeinsam zu kommen. Typische Themen sind:",
    forWhom: [
      "Kommunikationsprobleme und wiederkehrende Missverständnisse",
      "Konflikte, Streit und belastende Beziehungsmuster",
      "Distanz, emotionale Entfremdung und fehlende Nähe",
      "Vertrauensbrüche, Untreue und verletztes Vertrauen",
      "Unterschiedliche Bedürfnisse, Erwartungen und Lebensziele",
      "Eifersucht, Unsicherheiten und emotionale Belastungen",
      "Intimität, Sexualität und körperliche Nähe",
      "Veränderungen durch Familie, Elternschaft oder Kinderwunsch",
      "Berufliche Belastungen und neue Lebensphasen als Paar",
      "Trennungsgedanken oder Begleitung einer respektvollen Trennung",
      "Polyamore und ethisch nicht-monogame Beziehungen",
    ],
    approachHeading: "Wie wir zusammenarbeiten",
    approachIntro:
      "Ich begleite Sie allparteilich und mit Blick auf Ihre Beziehung als Ganzes. Gemeinsam verstehen wir die Muster hinter Ihren Konflikten und entwickeln neue Wege, wieder miteinander in Verbindung zu kommen.",
    approach: [
      {
        title: "Zuhören und Verstehen",
        text: "Jede Beziehung entwickelt ihre eigenen Muster. Gemeinsam schauen wir ohne Schuldzuweisungen darauf, was zwischen Ihnen geschieht und warum immer wieder dieselben Konflikte entstehen.",
      },
      {
        title: "Neue Perspektiven entwickeln",
        text: "Wir machen Bedürfnisse, Gefühle und unausgesprochene Dynamiken sichtbar. Dadurch entsteht mehr Verständnis füreinander und Raum für neue Sichtweisen.",
      },
      {
        title: "Beziehung neu gestalten",
        text: "Sie entwickeln neue Wege, miteinander zu sprechen, Konflikte zu lösen und wieder mehr Vertrauen, Nähe und Verbundenheit im Alltag zu erleben.",
      },
    ],
    quote:
      "Hinter den meisten Konflikten steht der Wunsch, einander wieder zu erreichen.",
    faqs: [
      {
        q: "Müssen wir beide an der Paartherapie teilnehmen?",
        a: "Ja. Paartherapie lebt davon, dass Sie beide gemeinsam teilnehmen. Nur so können wir Ihre Dynamik als Paar verstehen und gemeinsam verändern. In Einzelfällen kann zu Beginn oder zwischendurch ein kurzes Einzelgespräch sinnvoll sein. Der Schwerpunkt liegt jedoch immer auf den gemeinsamen Sitzungen.",
      },
      {
        q: "Funktioniert Paartherapie auch online?",
        a: "Ja und sogar überraschend gut. Viele Paare erleben die Gespräche von zu Hause aus als entspannter und authentischer. In Ihrer gewohnten Umgebung zeigen sich vertraute Kommunikationsmuster häufig ganz natürlich, wodurch wir schneller verstehen können, was zwischen Ihnen passiert. Idealerweise nehmen Sie gemeinsam an einem Bildschirm teil und sorgen für einen ungestörten Raum.",
      },
      {
        q: "Wie viele Sitzungen sind sinnvoll?",
        a: "Das hängt von Ihrem Anliegen und Ihren Zielen ab. Manche Paare gewinnen bereits nach wenigen Sitzungen neue Perspektiven, andere wünschen sich eine längerfristige Begleitung. Nach den ersten Gesprächen entwickeln wir gemeinsam einen passenden Rahmen, ohne Verpflichtung für eine bestimmte Anzahl an Sitzungen.",
      },
      {
        q: "Müssen unsere Probleme schon sehr groß sein?",
        a: "Nein. Viele Paare kommen nicht erst in einer akuten Krise, sondern sobald sie merken, dass Gespräche immer häufiger im Streit enden, Nähe verloren geht oder sie sich im Alltag auseinanderleben. Je früher Sie Unterstützung suchen, desto leichter lassen sich festgefahrene Muster oft verändern.",
      },
    ],
  },

  sexualtherapie: {
    slug: "sexualtherapie",
    metaTitle: `Sexualtherapie online | ${site.name}`,
    metaDescription: `Online-Sexualtherapie bei ${site.name}: ein geschützter, wertfreier Raum für Fragen rund um Sexualität, Intimität, Lust und Unsicherheiten – diskret, einfühlsam und per Video.`,
    eyebrow: "Sexualtherapie",
    heroTitle: "Über Sexualität sprechen – ohne Scham",
    heroLead:
      "Sexualität ist ein wesentlicher Bestandteil des Lebens und kann in verschiedenen Lebensphasen herausfordernd sein. Wenn Unsicherheiten, Lustlosigkeit, Schmerzen, Scham oder Konflikte Ihre Intimität belasten, müssen Sie damit nicht allein bleiben. Ich begleite Sie in einem geschützten, wertfreien Rahmen dabei, Ihre Sexualität besser zu verstehen, Blockaden zu lösen und wieder mehr Verbindung zu sich selbst oder zueinander zu entwickeln.",
    imageLabel: "Foto: KI-generiert – Person in Therapie (siehe Ordner)",
    introHeading: "Sexualität verstehen statt bewerten",
    introParagraphs: [
      "Über Sexualität zu sprechen fällt vielen Menschen schwer. Häufig prägen persönliche Erfahrungen, gesellschaftliche Erwartungen oder Beziehungsdynamiken unser sexuelles Erleben und führen zu Unsicherheit, Druck oder dem Gefühl, mit den eigenen Fragen allein zu sein.",
      "In der Sexualtherapie schaffen wir einen geschützten Raum, in dem alles Platz haben darf. Gemeinsam erkunden wir Ihre Wünsche, Bedürfnisse und Grenzen, verstehen hinderliche Muster und entwickeln neue Wege zu einer erfüllteren Sexualität und mehr Intimität.",
    ],
    forWhomHeading: "Wobei Sexualtherapie unterstützen kann",
    forWhomIntro:
      "Ob alleine oder in Beziehung, in der Sexualtherapie dürfen alle Fragen rund um Sexualität, Intimität und Beziehungen ihren Platz haben. Zum Beispiel:",
    forWhom: [
      "Unterschiedliche Lust und sexuelles Verlangen in der Partnerschaft",
      "Weniger Nähe oder Intimität in der Beziehung",
      "Veränderungen nach Geburt, Krankheit oder in neuen Lebensphasen",
      "Erektions-, Erregungs- oder Orgasmusschwierigkeiten",
      "Schmerzen beim Sex",
      "Scham, Unsicherheit oder ein belastetes Körperbild",
      "Die eigene Sexualität besser kennenlernen oder neu entdecken",
      "Fragen zu sexueller Identität oder Orientierung",
      "BDSM, Kink, Fetische und sexuelle Vielfalt",
      "Polyamore und nicht-monogame Beziehungen",
      "Auswirkungen belastender oder traumatischer Erfahrungen",
    ],
    approachHeading: "Wie wir zusammenarbeiten",
    approachIntro:
      "Sexualität ist so individuell wie jeder Mensch. Gemeinsam schaffen wir einen geschützten, wertfreien Raum, in dem wir Ihre Anliegen verstehen und neue Wege entwickeln, in Ihrem Tempo und ohne vorgefertigte Vorstellungen davon, wie Sexualität sein sollte.",
    approach: [
      {
        title: "Raum schaffen",
        text: "Ein sicherer, diskreter Rahmen, in dem alle Fragen rund um Sexualität ihren Platz haben, unabhängig davon, ob Sie alleine oder in Beziehung kommen.",
      },
      {
        title: "Zusammenhänge verstehen",
        text: "Wir erkunden gemeinsam, wie persönliche Erfahrungen, Beziehungen, gesellschaftliche Prägungen oder aktuelle Lebensumstände Ihr sexuelles Erleben beeinflussen.",
      },
      {
        title: "Passende Veränderungen gestalten",
        text: "Auf dieser Grundlage entwickeln wir neue Möglichkeiten, Ihre Sexualität bewusster, selbstbestimmter und erfüllender zu gestalten, in Ihrem eigenen Tempo.",
      },
    ],
    quote: "Sexualität kennt keine Norm, die für alle Menschen gleich ist.",
    faqs: [
      {
        q: "Muss ich mich für meine Themen schämen?",
        a: "Nein. In der Sexualtherapie gibt es kein „zu intim“, „zu ungewöhnlich“ oder „zu peinlich“. Menschen kommen mit ganz unterschiedlichen Anliegen, von Lustlosigkeit oder Schmerzen beim Sex über unterschiedliche Bedürfnisse in der Partnerschaft bis hin zum Wunsch, die eigene Sexualität besser kennenzulernen. Sie bestimmen, worüber Sie sprechen möchten und in welchem Tempo.",
      },
      {
        q: "Kann ich auch alleine zur Sexualtherapie kommen?",
        a: "Ja. Sexualtherapie ist sowohl für Einzelpersonen als auch für Menschen in Beziehung geeignet. Ob Sie Ihre Sexualität besser verstehen, eine konkrete Schwierigkeit verändern oder gemeinsam an Ihrer Intimität arbeiten möchten, wir finden den Rahmen, der zu Ihrem Anliegen passt.",
      },
      {
        q: "Funktioniert Sexualtherapie auch online?",
        a: "Ja, sehr gut. Viele Menschen empfinden es sogar als leichter, über intime Themen in ihrer vertrauten Umgebung zu sprechen. Die Online-Sitzungen finden über eine datenschutzkonforme, verschlüsselte Verbindung statt und bieten denselben geschützten Rahmen wie Gespräche vor Ort.",
      },
      {
        q: "Ist Sexualtherapie nur bei sexuellen Problemen sinnvoll?",
        a: "Nein. Sexualtherapie richtet sich nicht nur an Menschen mit einer konkreten Diagnose oder Funktionsstörung. Viele kommen, weil sie ihre Sexualität besser verstehen, mehr Nähe in ihrer Beziehung erleben, unterschiedliche Bedürfnisse klären oder ihre Sexualität neu entdecken möchten. Es geht nicht darum, einer Norm zu entsprechen, sondern einen Umgang mit Sexualität zu finden, der sich für Sie stimmig anfühlt.",
      },
    ],
  },
};
