import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Input, ListItem } from 'react-native-elements';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

export default function Address({ route, navigation }) {
  console.log( route );

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZa8ASBVP4WQTJnu8in6QJD3ziLWRRlZg",
  authDomain: "addressbook1-56ed7.firebaseapp.com",
  databaseURL: "https://addressbook1-56ed7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "addressbook1-56ed7",
  storageBucket: "addressbook1-56ed7.appspot.com",
  messagingSenderId: "261588262991",
  appId: "1:261588262991:web:2f6b2cca18bfe4213e4a3a",
  measurementId: "G-9W73NPDEM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//const analytics = getAnalytics(app);

const [address, setAddress] = useState('');
const [items, setItems] = useState([]);

useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        const items = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
        setItems(items);
    });
}, []);

const saveAddress = () => {
    push(
        ref(database, 'items/'),
        { 'fullAddress': fullAddress }
    );
};

const deleteAddress = (key) => {
    removeEventListener(
        ref(database, 'items/' + key),
    )
}

useEffect(() => {
  const { fullAddress } = route.params || false;
  
  if (fullAddress) {
    saveAddress(fullAddress);
  }
  }, [route.params?.fullAddress]);

const listSeparator = () => {
  return(
    <View
      style={{
        height: 5,
        width: '80%',
        backgroundColor: '#fff',
        marginLeft: '80%'
      }}
    />
  );
};

renderItem = ({ item }) => {
    <ListItem bottomDivider>
        <ListItem.Content>
            <ListItem.Title>{ item.address }</ListItem.Title>
            <Button onLongPress={() => deleteAddress(item.key) } />
        </ListItem.Content>
    </ListItem>
}

  return (
    <View style={styles.container}>
     
     <Input
     containerStyle={{ marginTop: '15%' }}
      placeholder='Type address here' label='PLACEFINDER'
      onChangeText={ text => setAddress(text) }
      value={ address }
    />

    <Button
      title='SHOW ON MAP'
      containerStyle={{ width: '60%' }}
      onPress={() => {(navigation.navigate('Map', { address: address }));
      setAddress('');
    }}
    />

    <FlatList
        data={ items }
        ItemSeparatorComponent={ listSeparator }
        renderItem={ renderItem }
        keyExtractor={ item => item.key }
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
});
