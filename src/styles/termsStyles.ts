import { StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 40,
  },
  updateText: {
    color: '#666',
    marginBottom: 20,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
  },
  closingText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 30,
    color: colors.primary,
    fontWeight: '500',
  },
});

export default styles;