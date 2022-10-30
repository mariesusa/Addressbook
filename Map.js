import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ route, navigation }) {
  console.log( route );

const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
    };

const { address } = route.params;
const [geolocation, setGeolocation] = useState(initial);
const [fullAddress, setFullAddress] = useState('');

useEffect(() => {
    (async ({address}) => {
    try {
        const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=r0vb5J2B0gkhcNQ7YyQfNAk8fKMqFBsa&location=${address}`);
        const data = await response.json();

        const location = data.results[0].locations[0];
    
        const { lat, lng } = data.results[0].locations[0].latLng;
        setGeolocation({ ...geolocation, latitude: lat, longitude: lng });
        setFullAddress(`${location.street} ${location.adminArea6} ${location.adminArea5}`);
        } catch (error) {
            Alert.alert('Error', error);
        }
        Keyboard.dismiss();
    })
  });
    
      return (
        <View style={styles.container}>
         
         <MapView
            style={ styles.map }
            region={ geolocation }>

            <Marker
                coordinate={ fullAddress }
            />
        </MapView>

        <Button
            title='SAVE LOCATION'
            containerStyle={{ width: '60%' }}
            onPress={() => navigation.navigate('Address', { fullAddress: fullAddress }) }
        />
    
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        },
      map: {
        flex: 1,
        width: '95%',
        height: '95%'
        }
    });
    