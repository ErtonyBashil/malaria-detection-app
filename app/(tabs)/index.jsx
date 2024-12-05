import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LoadingModal from '../../components/LoadingModal';

export default function FileUploadScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileUpload = async () => {
    Alert.alert(
      'Choisir une option',
      'Comment voulez-vous téléverser un fichier ?',
      [
        { text: 'Caméra', onPress: openCamera },
        { text: 'Fichiers', onPress: pickFile },
        { text: 'Annuler', style: 'cancel' },
      ],
    );
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission requise', 'La caméra est nécessaire pour prendre une photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true)

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
        setSubmitting(false)
        alert("Pas d'action pour le moment")
      }, 3000)
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Téléverser le fichier</Text>

      <View style={styles.mainPreview}>
        {selectedFile ? (
          selectedFile.uri ? (
            <Image source={{ uri: selectedFile.uri }} style={styles.imagePreview} />
          ) : (
            <Text>{selectedFile.name}</Text>
          )
        ) : (
          <Text style={styles.placeholderText}>Aperçu principal</Text>
        )}
      </View>

      <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
        <Text style={styles.uploadText}>Téléverser un fichier</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={!selectedFile} style={[styles.analyzeButton, !selectedFile&&{backgroundColor: "gray"}]} onPress={handleSubmit}>
        <Text style={styles.analyzeText}>Analyser</Text>
      </TouchableOpacity>
      <LoadingModal isVisible={submitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  mainPreview: {
    flex: 1,
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    color: '#999',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  previewContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  previewBox: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  uploadBox: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderStyle: 'dashed',
  },
  uploadText: {
    color: '#666',
  },
  analyzeButton: {
    width: '90%',
    height: 60,
    backgroundColor: '#8B0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  analyzeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
