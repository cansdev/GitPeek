import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'GitHub',
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

      <Tabs.Screen
        name="repoList"
        options={{
          title:"Repo List",
          tabBarIconStyle: { display: "none" },
          tabBarButton: () => null,
          tabBarVisible: false,  
        }}
        />

      <Tabs.Screen 
        name="userProfile"
        options={{
          title:"User Profile",
          tabBarButton: () => null,
          tabBarVisible: false,        
        }}

        />

        </Tabs>
  );
}
