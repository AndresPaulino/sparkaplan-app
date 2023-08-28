import { Page, View, Text, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Panton',
  fonts: [
    { src: '/fonts/Panton/Panton-Trial-Regular.ttf' },
    { src: '/fonts/Panton/Panton-Trial-Bold.ttf' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 15,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 8,
    marginBottom: 15,
  },
  dateIcon: {
    marginRight: 10,
  },
  subTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 8,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 8,
  },
  listBullet: {
    width: 10,
    fontSize: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    marginBottom: 20,
  },
});

export default function LessonPDF({ lesson = {} }) {
  // Parsing the content string into a JSON object
  const parsedContent = JSON.parse(lesson.content || '{}');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>{lesson.lesson_title}</Text>

          <View style={styles.dateBox}>
            <View style={styles.dateIcon}>
              {/* Ideally place a PDF compatible Calendar icon here */}
            </View>
            <Text>{lesson.date}</Text>
          </View>

          <Text style={styles.subTitle}>Objective:</Text>
          <Text style={styles.paragraph}>{lesson.learning_objective}</Text>

          <Text style={styles.subTitle}>Materials:</Text>
          <View style={styles.list}>
            {parsedContent.materials &&
              parsedContent.materials.map((material, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listBullet}>-</Text>
                  <Text>{material}</Text>
                </View>
              ))}
          </View>

          {parsedContent.sections &&
            parsedContent.sections.map((section, index) => (
              <View key={index}>
                <Text style={styles.subTitle}>{section.title}</Text>

                <View style={styles.dateBox}>
                  {/* Ideally place a PDF compatible Clock icon here */}
                  <Text>{section.duration}</Text>
                </View>
                <Text style={styles.paragraph}>{section.description}</Text>
                <Text style={styles.paragraph}>{section.instructions}</Text>
                <View style={styles.divider} />
              </View>
            ))}

          <Text style={styles.subTitle}>Assessment:</Text>
          <Text style={styles.paragraph}>{parsedContent.assessment}</Text>

          <Text style={styles.subTitle}>Conclusion:</Text>
          <Text style={styles.paragraph}>{parsedContent.conclusion}</Text>
        </View>
      </Page>
    </Document>
  );
}
