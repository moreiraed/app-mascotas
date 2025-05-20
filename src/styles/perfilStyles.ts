import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EFE9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FF9F00',
    marginRight: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  galleryContainer: {
    gap: 4,
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 4,
    borderWidth: 2,
    borderColor: '#FF9F00',
    borderRadius: 8,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 10,
  },
  spacer: {
    flex: 1,
  },
    gallery: {
    flex: 100,
    marginTop: 50,
  },
sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 12,
  marginLeft: 4,
}
});