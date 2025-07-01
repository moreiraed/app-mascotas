import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: colors.primary,
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
    color: colors.primary,
  },
  gallery: {
    paddingVertical: 8,
    
  },
  galleryImage: {
    width: (screenWidth - 32) / 3,
    margin: 4,
    height: ((screenWidth - 32) / 3) * 1.05,
    borderRadius: 8,
    resizeMode: 'cover',
    borderColor: colors.primary,
    borderWidth: 3,
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: -20,
    padding: 25,
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
    backgroundColor: colors.primary,
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
    borderRadius: 12,
    marginTop: 40,
    marginRight: 20,
    minWidth: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    paddingVertical: 0,
    paddingHorizontal: 0,
    alignItems: 'stretch',
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 2,
    marginVertical: 0,
    marginBottom: 1,
    alignSelf: 'stretch',
  },
  menuItemText: {
    paddingRight: 50,
    paddingLeft: 50,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  menuItemSeparator: {
    height: 1,
    backgroundColor: 'transparent',
    width: '100%',
  },
});
