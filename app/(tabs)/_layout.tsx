import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'blue', 
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 80,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10, //Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 10, height: 10 }, //iOS
        shadowOpacity: 0.4, //iOS
        shadowRadius: 15, //iOS
        zIndex: 10,
      },
      headerStyle: {
        height: 80,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
      }
      }}>
      <Tabs.Screen
        name="search"
        options={{
          title: 'GitHub',
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
          tabBarLabel: 'Search',
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

      <Tabs.Screen
        name="repoList"
        options={{
          title:"Repo List",
          tabBarButton: () => null,
        }}
        />

      <Tabs.Screen 
        name="userProfile"
        options={{
          title:"User Profile",
          tabBarButton: () => null,
        }}
        />

        </Tabs>
  );
}
