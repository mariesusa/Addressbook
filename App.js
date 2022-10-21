import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import Address from './Address'
import Map from './Map'
const Stack = createNativeStackNavigator();

export default function App() {

return(
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Address' component={ Address } />
      <Stack.Screen name='Map' component={ Map } />
    </Stack.Navigator>
  </NavigationContainer>
)};
