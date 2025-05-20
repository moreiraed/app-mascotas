import { StyleSheet, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

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
    width: 100,
    height: 100,
    borderRadius: 400,
    borderWidth: 5,
    borderColor: '#FF9F00',
    marginRight: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  galleryContainer: {
    gap: 1,
  },
  galleryImage: {
    width: 180,
    height: 180,
    margin: 2,
    borderWidth: 2.5,
    borderColor: '#000',
    borderRadius: 8,
  },
  spacer: {
    flex: 1,
  },
    gallery: {
    flex: 10,
    marginTop: 30,
    width: width * 0.95, 
    marginBottom: -15
  },
sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 12,
  marginLeft: 4,
},

});