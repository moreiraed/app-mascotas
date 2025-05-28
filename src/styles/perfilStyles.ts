import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EFE9',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FF9F00',
    marginRight: 16,
   
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
     padding: 10,
  },
  tabBar: {
    backgroundColor: '#F7EFE9',
    marginBottom: 8,
  },
  indicator: {
    backgroundColor: '#FF9F00',
    height: 3,
  },
  tabLabel: {
    fontWeight: 'bold',
    textTransform: 'none',
    color: 'gray',
  
  },
  tabLabelFocused: {
    color: '#FF9F00',
  },
  gallery: {
    paddingVertical: 8,
  },
  galleryImage: {
    flex: 1,
    margin: 4,
    height: 120,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  mascotasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotasTexto: {
    fontSize: 16,
    color: '#777',
  },
   cover: {
    width: screenWidth,
  height: 200,
  resizeMode: 'cover',
    
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -100, 
    flex: 0.2,
  },
 
});
