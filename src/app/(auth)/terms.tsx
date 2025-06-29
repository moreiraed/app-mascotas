import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import MainButtonLong from '@/src/components/MainButtonLong';
import fontStyles from '@/src/styles/fontStyles';
import styles from '@/src/styles/termsStyles';

const TermsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.updateText}>Última actualización: 28/06/2025</Text>

        <Text style={styles.paragraph}>
          Bienvenido/a a nuestra aplicación para la búsqueda, reporte y adopción de mascotas. 
          Este proyecto ha sido desarrollado con fines educativos como parte de una materia universitaria, 
          y no representa una aplicación comercial ni oficial.
        </Text>

        <Text style={styles.paragraph}>
          Al utilizar esta aplicación, usted acepta los siguientes términos y condiciones:
        </Text>

        <Text style={styles.sectionTitle}>1. Uso General</Text>
        <Text style={styles.paragraph}>
          • Esta aplicación tiene como objetivo facilitar la publicación de mascotas perdidas, encontradas, 
          en adopción, y permitir el intercambio de información a través de un foro.
        </Text>
        <Text style={styles.paragraph}>
          • El uso de la app es gratuito y no requiere pagos de ningún tipo.
        </Text>
        <Text style={styles.paragraph}>
          • El contenido publicado por los usuarios es responsabilidad exclusiva de quien lo publica.
        </Text>

        <Text style={styles.sectionTitle}>2. Registro y Cuentas</Text>
        <Text style={styles.paragraph}>
          • Los usuarios pueden crear una cuenta con fines de publicación e interacción en el foro.
        </Text>
        <Text style={styles.paragraph}>
          • Al registrarse, se comprometen a proporcionar información verdadera y actualizada.
        </Text>
        <Text style={styles.paragraph}>
          • No está permitido suplantar identidades ni utilizar cuentas con fines fraudulentos.
        </Text>

        <Text style={styles.sectionTitle}>3. Publicaciones</Text>
        <Text style={styles.paragraph}>
          • Las publicaciones deben ser respetuosas, relevantes y relacionadas con mascotas perdidas, 
          encontradas o en adopción.
        </Text>
        <Text style={styles.paragraph}>
          • Queda prohibido publicar contenido ofensivo, ilegal, falso o que viole derechos de terceros.
        </Text>
        <Text style={styles.paragraph}>
          • Nos reservamos el derecho de eliminar publicaciones inapropiadas si corresponde.
        </Text>

        <Text style={styles.sectionTitle}>4. Foro de Discusión</Text>
        <Text style={styles.paragraph}>
          • El foro está destinado a compartir consejos, experiencias y consultas sobre mascotas.
        </Text>
        <Text style={styles.paragraph}>
          • No se permiten insultos, amenazas ni lenguaje discriminatorio.
        </Text>

        <Text style={styles.sectionTitle}>5. Responsabilidad</Text>
        <Text style={styles.paragraph}>
          • Dado que esta es una aplicación educativa en desarrollo, no garantizamos la disponibilidad 
          constante del servicio ni la veracidad de toda la información publicada.
        </Text>
        <Text style={styles.paragraph}>
          • Los desarrolladores no se hacen responsables por pérdidas, daños o conflictos derivados 
          del uso de la app o de las publicaciones entre usuarios.
        </Text>

        <Text style={styles.sectionTitle}>6. Privacidad</Text>
        <Text style={styles.paragraph}>
          • La aplicación puede almacenar datos básicos del usuario como nombre de usuario, email y publicaciones.
        </Text>
        <Text style={styles.paragraph}>
          • No se comparten datos con terceros ni se utilizan con fines comerciales.
        </Text>
        <Text style={styles.paragraph}>
          • Al ser un proyecto académico, no contamos con sistemas de protección avanzados. 
          Por favor, evite compartir información sensible.
        </Text>

        <Text style={styles.sectionTitle}>7. Cambios en los Términos</Text>
        <Text style={styles.paragraph}>
          • Estos términos pueden ser modificados en el futuro a medida que evolucione el desarrollo del proyecto.
        </Text>
        <Text style={styles.paragraph}>
          • El uso continuado de la app implica la aceptación de cualquier cambio.
        </Text>

        <Text style={styles.closingText}>
          Gracias por usar nuestra app y colaborar con la comunidad de cuidado animal.
        </Text>

        <MainButtonLong 
          title="Aceptar y volver" 
          onPress={() => router.back()}
          //style={{ marginTop: 30 }}
        />
      </View>
    </ScrollView>
  );
};

export default TermsScreen;