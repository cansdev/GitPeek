import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text} from 'react-native';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Github',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
          tabBarLabel: 'Search',
        }}

      />

      <Tabs.Screen
        name="home"
        options={{
            title: 'Home',
            headerTitleAlign: 'center',
            tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />,
            tabBarLabel: 'Home',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          tabBarLabel: 'Profile',
            }}
        />
        </Tabs>
  );
}
