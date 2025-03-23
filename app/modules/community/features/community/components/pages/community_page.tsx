import { PlusIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/atoms";
import { LegalDisclamer } from "~/modules/community/components/atoms";
import { PostPreviewCollection } from "~/modules/community/components/organisms";
import { CommunityInfoCard } from "../organisms";

export const legalPosts = [
  {
    id: 1,
    avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    username: "Jorge Perez Julian",
    title:
      "¿Sabes qué hacer si sufres acoso laboral? Guía completa para proteger tus derechos y mantener tu salud mental en el trabajo",
    content: `El acoso laboral, también conocido como mobbing, es un problema grave que afecta a miles de trabajadores y se manifiesta a través de humillaciones constantes, aislamiento social en el trabajo, sobrecarga injustificada de tareas, críticas destructivas continuas o boicot profesional. Si estás enfrentando estas situaciones, es fundamental actuar: documenta todo meticulosamente guardando correos, mensajes y tomando notas de conversaciones con fecha y hora; si es legal en tu comunidad, graba las interacciones. Busca apoyo psicológico, ya que el acoso puede tener graves consecuencias en tu salud mental. Comunica la situación a Recursos Humanos por escrito, guardando una copia, y contacta con tu sindicato o representantes de los trabajadores. Si la empresa no toma medidas, acude a la Inspección de Trabajo. Recuerda que el acoso laboral está penado por la ley y tienes derecho a trabajar en un ambiente seguro y respetuoso. No estás solo o sola en esto.`,
    datePosted: "2024-01-10",
    likes: 1240,
    comments: 89,
  },
  {
    id: 2,
    avatar:
      "https://images.pexels.com/photos/7971167/pexels-photo-7971167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Marco Rivera",
    title: "Rompe el silencio",
    content: `La violencia de género no se limita a las agresiones físicas. Si tu pareja controla tu móvil, tus redes sociales, tu forma de vestir, tus amistades, o constantemente te hace sentir culpable, también estás siendo víctima de violencia. Este tipo de control y manipulación es igualmente dañino y no debe ser ignorado. Es importante reconocer estas señales y buscar ayuda para protegerte y recuperar tu libertad.

Debes saber que tienes derecho a una orden de protección inmediata, que puede tramitarse en cuestión de horas. El 016 es un servicio gratuito disponible las 24 horas, que no deja rastro en la factura telefónica. Además, existen casas de acogida donde puedes alojarte con tus hijos/as si lo necesitas, y tienes derecho a asistencia jurídica gratuita inmediata. Si eres extranjera en situación irregular, no temas denunciar, ya que no se iniciará un expediente de expulsión. Puedes presentar la denuncia en cualquier comisaría, juzgado o Guardia Civil, y no necesitas pruebas en ese momento, ya que tu testimonio es suficiente para iniciar medidas de protección. No estás sola, y hay recursos disponibles para ayudarte.`,
    datePosted: "2024-01-11",
    likes: 2350,
    comments: 156,
  },
  {
    id: 3,
    avatar:
      "https://images.pexels.com/photos/19154346/pexels-photo-19154346/free-photo-of-hombre-retrato-pensando-barba.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Romulo Culis",
    title:
      "URGENTE: Nueva ley de vivienda - Tus derechos en caso de desahucio 2024",
    content: `La nueva ley de vivienda ha introducido medidas importantes para proteger a quienes enfrentan el riesgo de perder su hogar. Si perteneces a una familia vulnerable, puedes solicitar una paralización inmediata del desahucio: dos meses si el propietario es un gran tenedor, y cuatro meses en caso contrario. Los servicios sociales están obligados a emitir un informe de vulnerabilidad y, en casos extremos, el juez puede extender la paralización hasta dos años.

Además, se debe garantizar una alternativa habitacional. Los servicios sociales tienen la responsabilidad de buscar opciones y los grandes tenedores deben ofrecer un alquiler social antes de proceder con el desahucio. También hay ayudas económicas disponibles para cubrir el pago del alquiler. Recuerda que tienes derecho a asistencia jurídica gratuita e inmediata, además de mediación obligatoria antes de un desahucio. No abandones tu vivienda sin una orden judicial, ya que un desalojo sin orden es un delito.`,
    datePosted: "2024-01-09",
    likes: 890,
    comments: 234,
  },
  {
    id: 4,
    avatar:
      "https://images.pexels.com/photos/8087874/pexels-photo-8087874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Roberto Sacarias",
    title: "Impago de pensión de alimentos: Actúa ya",
    content: `El impago de la pensión de alimentos es un delito grave que puede llevar a penas de prisión. Si el otro progenitor no cumple con el pago, comienza documentando todos los impagos mediante extractos bancarios. Luego, envía un burofax solicitando el pago, asegurándote de guardar el comprobante. Si no puedes pagar un abogado privado, solicita asistencia jurídica gratuita.

Existen ayudas disponibles para estas situaciones, como el Fondo de Garantía de Pensiones, que ofrece hasta 100 euros por hijo al mes, y ayudas de emergencia social a través de tu ayuntamiento. Además, puedes optar por la Renta Activa de Inserción (RAI) si eres víctima. No demores más de tres meses en actuar, ya que el derecho a reclamar prescribe mes a mes.`,
    datePosted: "2024-01-08",
    likes: 1567,
    comments: 289,
  },
  {
    id: 5,
    avatar:
      "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Antonio Taipe",
    title: "Ciberacoso: Guía de emergencia",
    content: `El ciberacoso es un delito que puede tener consecuencias devastadoras. Si eres víctima, toma capturas de pantalla de todos los mensajes o interacciones, asegurándote de que la fecha sea visible. No borres ninguna evidencia, incluso si es doloroso revisarla, y guarda las URL, correos y mensajes relacionados. Para proteger tus cuentas, activa la autenticación en dos factores y cambia todas tus contraseñas.

En el ámbito legal, denuncia el caso en la policía, específicamente en la unidad de delitos informáticos, y solicita una orden de alejamiento digital si es necesario. Contacta a las plataformas donde se haya publicado contenido ofensivo para solicitar su retirada. Recuerda que el ciberacoso es un delito que puede conllevar hasta dos años de prisión. No estás solo; hay organizaciones que pueden ofrecerte ayuda y apoyo las 24 horas del día.`,
    datePosted: "2024-01-07",
    likes: 2890,
    comments: 445,
  },
  {
    id: 6,
    avatar:
      "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "DefensoraLGTBI",
    title:
      "Discriminación laboral por orientación sexual o identidad de género",
    content: `La discriminación en el trabajo por orientación sexual o identidad de género es ilegal. Casos frecuentes incluyen comentarios humillantes, denegación de ascensos, obstáculos durante una transición de género y acoso por parte de compañeros. Tienes derecho a un ambiente laboral libre de discriminación, al respeto de tu identidad de género manifestada, al uso de instalaciones acordes a tu identidad, y a la confidencialidad sobre tu orientación o identidad.

Si eres víctima, documenta todo lo ocurrido. La carga de la prueba recae sobre la empresa, que deberá demostrar que no ha discriminado. Contacta a asociaciones LGTBI para obtener asesoramiento especializado y explorar tus opciones legales.`,
    datePosted: "2024-01-06",
    likes: 1678,
    comments: 234,
  },
  {
    id: 7,
    avatar:
      "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Pedro Zarai",
    title: "¡Cuidado! Estafas bancarias 2024",
    content: `Las estafas bancarias han evolucionado, con modalidades como el phishing y las estafas Bizum siendo las más comunes. El phishing implica correos, SMS o llamadas que simulan ser de tu banco, solicitando datos de verificación. En las estafas Bizum, los delincuentes envían solicitudes de pago disfrazadas como cobros legítimos.

Recuerda que tu banco nunca pedirá tus claves por teléfono, y no debes hacer clic en enlaces sospechosos. Si eres víctima de una estafa, bloquea tus tarjetas inmediatamente, denuncia el caso a la policía y presenta un reclamo al banco dentro de las primeras 24 horas. Guarda toda la documentación para respaldar tu caso.`,
    datePosted: "2024-01-05",
    likes: 3456,
    comments: 567,
  },
  {
    id: 8,
    avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    username: "Jorge Perez Julian",
    title: "Negligencias médicas: Cómo reclamar",
    content: `Una negligencia médica ocurre si no te informaron de los riesgos, hubo un error en el diagnóstico, olvidaron material quirúrgico o te dieron el alta antes de tiempo con consecuencias negativas. Si crees haber sido víctima, solicita una copia completa de tu historia clínica y presenta una reclamación en el hospital.

Busca una valoración médica independiente y reclama primero en la vía administrativa. Tienes un año para actuar desde que ocurrió el daño o se manifestó. Las indemnizaciones pueden cubrir daños físicos, psicológicos y económicos. No ignores estos casos, ya que tienes derechos como paciente.

`,
    datePosted: "2024-01-04",
    likes: 892,
    comments: 234,
  },
  {
    id: 9,
    avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    username: "Jorge Perez Julian",
    title: "Bullying escolar: Protocolo de actuación",
    content: `El bullying no es "cosa de niños". Si tu hijo/a presenta cambios de comportamiento, evita ir al colegio, tiene un descenso repentino en sus notas o problemas de sueño y alimentación, podrían ser señales de acoso escolar. Documenta todo lo ocurrido, incluyendo fechas, hechos y testigos.

Comunica el caso por escrito al tutor y exige la activación del protocolo antibullying. Si el colegio no responde, presenta una denuncia ante la inspección educativa. El centro tiene responsabilidad civil y puede ser denunciado por inacción. Hay asociaciones especializadas que pueden apoyarte en el proceso para proteger a tu hijo/a.`,
    datePosted: "2024-01-03",
    likes: 2345,
    comments: 445,
  },
  {
    id: 23,
    avatar:
      "https://images.pexels.com/photos/3778212/pexels-photo-3778212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Carmen Delia Vázquez",
    title: "Mi experiencia defendiendo víctimas de abusos bancarios",
    content: `Durante mis quince años como abogada especializada en derecho bancario, he visto cómo las entidades financieras han utilizado repetidamente prácticas abusivas contra sus clientes. Es fundamental que sepas que si tienes una hipoteca con cláusulas abusivas, el banco está obligado a eliminarlas y devolver todo lo cobrado indebidamente. He defendido a más de 300 familias en casos de cláusulas suelo, gastos hipotecarios y IRPH, consiguiendo que les devuelvan en muchos casos más de 20.000 euros. La clave está en revisar toda la documentación de tu hipoteca, especialmente las cláusulas en letra pequeña que muchas veces pasamos por alto al firmar. Los bancos suelen presionar diciendo que estas reclamaciones no prosperarán, pero la realidad es que los tribunales están dando la razón a los consumidores en la mayoría de los casos. Si tienes una hipoteca, no dudes en hacerla revisar por un profesional, podrías recuperar mucho dinero.`,
    datePosted: "2024-01-12",
    likes: 2341,
    comments: 567,
  },
  {
    id: 24,
    avatar:
      "https://images.pexels.com/photos/29567837/pexels-photo-29567837/free-photo-of-hombre-confiado-en-traje-de-negocios-al-aire-libre.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Alberto Méndez Rojas",
    title: "La realidad del divorcio con hijos",
    content: `Como abogado matrimonialista, quiero compartir la realidad que veo cada día en mi despacho sobre los divorcios con hijos. El mayor error que cometen las parejas es utilizar a los hijos como arma arrojadiza durante el proceso de separación. Esto causa daños emocionales que pueden durar toda la vida. He visto casos donde los niños desarrollan problemas de ansiedad, depresión y bajo rendimiento escolar debido al conflicto entre sus padres. Es fundamental entender que el divorcio es entre los adultos, no entre los niños y sus padres. La custodia compartida está funcionando muy bien en muchas familias, pero requiere que ambos progenitores pongan de su parte y mantengan una comunicación fluida en todo lo relacionado con los hijos. Los tribunales cada vez dan más importancia a la opinión de los menores, especialmente a partir de los 12 años, aunque esto no significa que sean ellos quienes deban decidir. El objetivo siempre debe ser minimizar el impacto emocional en los niños y mantener una relación sana con ambos padres.`,
    datePosted: "2024-01-11",
    likes: 1892,
    comments: 345,
  },
  {
    id: 25,
    avatar:
      "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Marina Torres García",
    title: "¿Qué hacer si sufres acoso laboral?",
    content: `Como psicóloga laboral y asesora legal, quiero compartir mi experiencia ayudando a víctimas de acoso laboral. El mobbing o acoso laboral es mucho más común de lo que pensamos, y muchas veces las víctimas tardan en reconocerlo porque se normaliza el maltrato. En mi experiencia, el acoso suele comenzar de forma sutil: comentarios aparentemente inofensivos, pequeñas humillaciones en público, exclusión de reuniones importantes, o asignación de tareas imposibles de cumplir. Es fundamental empezar a documentar todos estos incidentes desde el primer momento, guardando correos, mensajes y si es posible, grabando conversaciones cuando la ley lo permita. Muchas víctimas cometen el error de esperar demasiado tiempo para buscar ayuda, lo que puede resultar en problemas graves de salud mental y física. No debemos olvidar que el acoso laboral es un riesgo psicosocial que la empresa está obligada a prevenir y abordar. La primera acción debe ser comunicar la situación a recursos humanos o a los representantes sindicales, siempre por escrito y guardando una copia. Si la empresa no toma medidas, es momento de acudir a la Inspección de Trabajo o buscar asesoramiento legal especializado.`,
    datePosted: "2024-01-10",
    likes: 3456,
    comments: 678,
  },
  {
    id: 26,
    avatar:
      "https://images.pexels.com/photos/28513051/pexels-photo-28513051/free-photo-of-hombre-de-negocios-confiado-en-traje-formal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Ricardo Blanco Ortiz",
    title: "La verdad sobre los accidentes de tráfico",
    content: `Tras una década dedicándome a defender a víctimas de accidentes de tráfico, he aprendido que los primeros momentos después del accidente son cruciales. Las aseguradoras tienen equipos enteros dedicados a minimizar las indemnizaciones, y muchas víctimas cometen errores que luego les cuestan miles de euros. El más común es aceptar la primera oferta de la aseguradora sin conocer realmente el alcance de las lesiones. Las secuelas pueden aparecer días o incluso semanas después del accidente, especialmente en el caso del latigazo cervical. Otro error frecuente es no acudir inmediatamente al médico tras el accidente, pensando que el dolor pasará solo. Esto puede dificultar enormemente la posterior reclamación. Es fundamental hacerse un reconocimiento médico completo y guardar toda la documentación, incluso si crees que estás bien. También es importante tomar fotos del accidente desde todos los ángulos posibles y conseguir los datos de testigos. La experiencia me ha enseñado que estos detalles, que parecen insignificantes en el momento, pueden ser decisivos para obtener una indemnización justa.`,
    datePosted: "2024-01-09",
    likes: 2789,
    comments: 456,
  },
  {
    id: 27,
    avatar:
      "https://images.pexels.com/photos/12396627/pexels-photo-12396627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    username: "Laura Montoya Pérez",
    title: "Lo que nadie te cuenta sobre las herencias",
    content: `Como notaria con más de veinte años de experiencia, he visto cómo las herencias pueden destruir familias enteras por falta de información y planificación. La creencia más peligrosa es pensar que todo se resolverá automáticamente tras el fallecimiento. Nada más lejos de la realidad. Las decisiones que tomamos en vida tienen consecuencias enormes para nuestros herederos. El testamento es fundamental, pero no es suficiente. Hay que planificar la sucesión teniendo en cuenta aspectos fiscales, empresariales y familiares. He visto casos donde los herederos han tenido que renunciar a la herencia por no poder pagar los impuestos, o familias que han terminado en los tribunales por no haber clarificado la distribución de bienes específicos. Es especialmente importante en casos de empresas familiares o cuando hay hijos de diferentes matrimonios. La transparencia y la comunicación en vida son fundamentales para evitar conflictos posteriores. También es crucial entender que aceptar una herencia significa asumir también las deudas del fallecido. Por eso siempre recomiendo aceptar a beneficio de inventario, especialmente si no se conoce la situación económica exacta del fallecido.`,
    datePosted: "2024-01-08",
    likes: 1567,
    comments: 234,
  },
];

const rules = [
  {
    number: 1,
    title: "Las publicaciones deben tratar sobre temas legales",
    description:
      "Asegúrate de que tu publicación esté relacionada con derecho, legislación o el ejercicio de la abogacía.",
  },
  {
    number: 2,
    title: "Incluye contexto en tu pregunta o discusión",
    description:
      "Explica claramente el caso o situación que deseas debatir para facilitar respuestas precisas.",
  },
  {
    number: 3,
    title: "Evita solicitudes de asesoría legal personalizada",
    description:
      "Este no es un foro para consultas jurídicas individuales. Busca un abogado para asesoría específica.",
  },
  {
    number: 4,
    title: "Los comentarios deben aportar valor",
    description:
      "Las respuestas deben ofrecer información útil, jurisprudencia, doctrina o debate fundamentado.",
  },
  {
    number: 5,
    title: "Respeto y ética profesional",
    description:
      "Mantén un tono respetuoso y evita descalificaciones personales o lenguaje inapropiado.",
  },
  {
    number: 6,
    title: "No se permiten publicaciones promocionales",
    description:
      "No uses la comunidad para promocionar tus servicios legales o los de terceros.",
  },
  {
    number: 7,
    title: "No se permiten respuestas generadas por IA",
    description:
      "Las respuestas deben ser redactadas por humanos con conocimiento en derecho.",
  },
];

// Datos de moderadores
const moderators = [
  {
    username: "JustitiaLex",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    username: "JurisMaster",
    avatar: "/placeholder.svg?height=40&width=40",
    isCreator: true,
  },
  {
    username: "CodigoCivilista",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

// Marcadores de la comunidad
const communityMarkers = [
  { title: "REGLAMENTO" },
  { title: "DIRECTORIO DE ABOGADOS" },
  { title: "RECURSOS LEGALES" },
];

export default function CommunityPage() {
  return (
    <div className="w-full max-w-5xl h-full mx-auto">
      <img
        src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg"
        alt="Community"
        className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-all"
      />
      <div className="grid grid-cols-[160px_1fr] items-center justify-between mt-2 h-full">
        <div className="w-fit h-full flex relative">
          <span className="w-40 h-40 absolute bottom-0 rounded-tr-md rounded-br-md border-t-8 border-r-8 border-slate-100 overflow-hidden bg-slate-100">
            <img
              src="https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg"
              alt="image"
              className="w-full h-full rounded-md overflow-hidden block object-cover"
            />
          </span>
        </div>
        <div className="shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden bg-white flex w-full">
          <div className="p-4 flex items-center justify-between w-full">
            <h2 className="text-lg font-bold text-gray-900">Foro Jurídico</h2>

            <div className="flex items-center gap-2">
              <PrimaryButton className="bg-white border-gray-300 border text-gray-700 hover:bg-gray-50 gap-2">
                <PlusIcon className="size-4" />
                Crear publicación
              </PrimaryButton>
              <PrimaryButton>Unirse</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[69.7%_30%] gap-2 justify-between mt-2">
        <div>
          <PostPreviewCollection posts={legalPosts} />
        </div>
        <div className="flex flex-col gap-2">
          <CommunityInfoCard
            title="Foro Jurídico"
            description="El Foro Jurídico es un espacio para debatir y compartir conocimientos sobre derecho, legislación y el ejercicio de la abogacía. Desde análisis de jurisprudencia hasta debates sobre reformas legales, esta comunidad reúne a abogados, estudiantes de derecho y entusiastas del ámbito jurídico para discutir y mantenerse actualizados sobre el mundo legal."
            creationDate="Jul 2009"
            memberCount="3,7 M"
            onlineCount="303"
            topPercentage="1%"
            currentlyDebating={true}
            communityMarkers={communityMarkers}
            rules={rules}
            moderators={moderators}
          />
          <LegalDisclamer />
        </div>
      </div>
    </div>
  );
}
