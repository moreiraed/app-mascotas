// app/(tabs)/adoptar/create.tsx
import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { usePets } from '@/src/contexts/PetsContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pet } from '@/src/types/publicationsTypes';
import { useAuth } from '@/src/hooks/useAuth';

const CreateAdoptionScreen = () => {
  const { user } = useAuth();
  const { addPet } = usePets();
  const router = useRouter();
  
  const [form, setForm] = useState<Omit<Pet, 'id' | 'createdAt'> & { ownerId: string }>({
    name: '',
    type: 'Perro',
    breed: '',
    age: '',
    gender: 'Macho',
    color: '',
    location: '',
    description: '',
    reward: false,
    specialFeatures: [''],
    contact: {
      name: '',
      phone: '',
      email: '',
    },
    status: 'adoption',
    image: '',
    date: new Date().toLocaleDateString(),
    ownerId: user?.id || '',
  });

  const handleChange = (field: keyof (Omit<Pet, 'id' | 'createdAt'> & { ownerId: string }), value: string | boolean) => {
      setForm(prev => ({ ...prev, [field]: value }));
    };
  
    const handleContactChange = (field: keyof Pet['contact'], value: string) => {
      setForm(prev => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }));
    };
  
    const handleSpecialFeatureChange = (index: number, value: string) => {
      const newFeatures = form.specialFeatures?.map((feature, i) => 
        i === index ? value : feature
      ) || [''];
      setForm(prev => ({ ...prev, specialFeatures: newFeatures }));
    };
  
    const addSpecialFeature = () => {
      setForm(prev => ({
        ...prev,
        specialFeatures: [...(prev.specialFeatures || ['']), ''],
      }));
    };
  
    const removeSpecialFeature = (index: number) => {
      const newFeatures = form.specialFeatures?.filter((_, i) => i !== index) || [''];
      setForm(prev => ({ ...prev, specialFeatures: newFeatures }));
    };
  
    const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setForm(prev => ({ ...prev, image: result.assets[0].uri }));
      }
    };

  const handleSubmit = async () => {
    try {
      if (!user) {
        Alert.alert('Error', 'Debes iniciar sesión para crear publicaciones');
        return;
      }

      if (!form.name || !form.breed || !form.description || !form.contact.name || !form.contact.phone) {
        Alert.alert('Error', 'Por favor completa los campos obligatorios');
        return;
      }

      await addPet({
        ...form,
        status: 'adoption',
        ownerId: user.id
      });
      Alert.alert('Éxito', 'Publicación de adopción creada correctamente');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la publicación');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nueva Publicación de Adopción</Text>
      
      <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información Básica</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Nombre de la mascota *"
                value={form.name}
                onChangeText={text => handleChange('name', text)}
              />
              
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={form.type}
                  onValueChange={value => handleChange('type', value)}>
                  <Picker.Item label="Perro" value="Perro" />
                  <Picker.Item label="Gato" value="Gato" />
                  <Picker.Item label="Otro" value="Otro" />
                </Picker>
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Raza *"
                value={form.breed}
                onChangeText={text => handleChange('breed', text)}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Edad (opcional)"
                value={form.age}
                onChangeText={text => handleChange('age', text)}
              />
              
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={form.gender}
                  onValueChange={value => handleChange('gender', value)}>
                  <Picker.Item label="Macho" value="Macho" />
                  <Picker.Item label="Hembra" value="Hembra" />
                </Picker>
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Color (opcional)"
                value={form.color}
                onChangeText={text => handleChange('color', text)}
              />
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Describe a la mascota *"
                value={form.description}
                onChangeText={text => handleChange('description', text)}
                multiline
              />
              
              {form.status === 'lost' && (
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  placeholder="Última vez visto (opcional)"
                  value={form.lastSeenDescription}
                  onChangeText={text => handleChange('lastSeenDescription', text)}
                  multiline
                />
              )}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Características especiales</Text>
              {form.specialFeatures.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <TextInput
                    style={[styles.input, styles.featureInput]}
                    placeholder={`Característica ${index + 1}`}
                    value={feature}
                    onChangeText={text => handleSpecialFeatureChange(index, text)}
                  />
                  {form.specialFeatures.length > 1 && (
                    <TouchableOpacity 
                      style={styles.removeFeatureButton}
                      onPress={() => removeSpecialFeature(index)}>
                      <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity 
                style={styles.addButton}
                onPress={addSpecialFeature}>
                <Text style={styles.addButtonText}>+ Añadir característica</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contacto</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre *"
                value={form.contact.name}
                onChangeText={text => handleContactChange('name', text)}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Teléfono *"
                value={form.contact.phone}
                onChangeText={text => handleContactChange('phone', text)}
                keyboardType="phone-pad"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Email (opcional)"
                value={form.contact.email}
                onChangeText={text => handleContactChange('email', text)}
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Imagen</Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {form.image ? (
                  <Image source={{ uri: form.image }} style={styles.imagePreview} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="camera" size={40} color="#999" />
                    <Text style={styles.imagePlaceholderText}>Seleccionar imagen</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <TouchableOpacity 
                style={[styles.checkboxContainer, form.reward && styles.checkboxChecked]}
                onPress={() => setForm(prev => ({ ...prev, reward: !prev.reward }))}>
                <Ionicons 
                  name={form.reward ? "checkbox" : "square-outline"} 
                  size={24} 
                  color={form.reward ? "#4E9F3D" : "#999"} 
                />
                <Text style={styles.checkboxLabel}>Ofrecer recompensa</Text>
              </TouchableOpacity>
            </View>
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureInput: {
    flex: 1,
    marginRight: 10,
  },
  removeFeatureButton: {
    padding: 5,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#4E9F3D',
    fontWeight: '600',
  },
  imagePicker: {
    height: 200,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: '#999',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
  },
  checkboxChecked: {
    borderColor: '#4E9F3D',
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4E9F3D',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateAdoptionScreen;