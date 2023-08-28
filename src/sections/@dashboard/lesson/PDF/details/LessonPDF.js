/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document, StyleSheet } from '@react-pdf/renderer';
//
// import styles from './LessonStyle';

// ----------------------------------------------------------------------

LessonPDF.propTypes = {
  invoice: PropTypes.object,
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default function LessonPDF({ lesson }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text>{lesson.title}</Text>
        </View>
        <View style={styles.content}>
          <Text>{lesson.content}</Text>
        </View>
      </Page>
    </Document>
  );
}
