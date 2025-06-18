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
    backgroundColor: '#FF9F00',
    marginBottom: 8,
  },
  indicator: {
    backgroundColor: '#FFFF',
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
   
  profileContainer: {
    alignItems: 'flex-start',
    marginTop: 20, 
    padding: 4,
    flex: 0.2,
  },
  mascotasLista: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mascotaItem: {
    marginHorizontal: 4,
    marginVertical: 4,
    backgroundColor: '#FFF',
    borderRadius: 12,
    elevation: 2,
    overflow: 'hidden',
    minWidth: 125,
  },
  mascotaImagen: {
    height: 120,
    borderColor: '#FFF',
    width: '100%',
    
  },
  mascotaTextoContenedor: {
    width: '100%',
    backgroundColor: '#FF9F00',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 40,
    justifyContent: 'center',
    
  },
  mascotaNombre: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginTop: 50,
    marginRight: 20,
    minWidth: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});
