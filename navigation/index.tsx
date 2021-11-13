import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image } from 'react-native';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import CpfScreen from '../screens/CpfScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import OfferScreen from '../screens/OfferScreen';
import PreviewDebtScreen from '../screens/PreviewDebtScreen';
import LookiaScreen from '../screens/LookiaScreen';
import FinancialEducation from '../screens/FinancialEducation';

import LogoCaduca from '../assets/logo-caduca.png'

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cpf" component={CpfScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreviewDebtScreen" component={PreviewDebtScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="OfferScreen" component={OfferScreen} options={{ title: 'Oferta' }} />
      <Stack.Screen name="LookiaScreen" component={LookiaScreen} options={{ title: 'Analise Lookia' }} />
      
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Caducadas"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Caducadas"
        component={TabOneScreen}
        options={({ navigation }) => ({
          title: 'Caducadas',
          tabBarIcon: ({ color }) => <MaterialIcons
            name="directions-run"
            size={25}
            color={'black'}
          />,
          headerLeft: () => (
            <Image 
              source={LogoCaduca} 
              style={{
                width: 30,
                height: 30,
                marginLeft: 10
              }}/>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <MaterialIcons
                name="directions-run"
                size={25}
                color={'black'}
                style={{ marginRight: 15 }}
              />
              
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Pagos"
        component={TabTwoScreen}
        options={({ navigation }) => ({
          title: 'Pagos',
          tabBarIcon: ({ color }) => <MaterialIcons
            name="payments"
            size={25}
            color={'black'}
          />,
          headerLeft: () => (
            <Image 
              source={LogoCaduca} 
              style={{
                width: 30,
                height: 30,
                marginLeft: 10
              }}/>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <MaterialIcons
                name="payments"
                size={25}
                color={'black'}
                style={{ marginRight: 15 }}
              />
              {/* <MaterialIcons name="payments" size={24} color="black" /> */}
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="EducacaoFinanceira"
        component={FinancialEducation}
        options={({ navigation }) => ({
          title: 'Educação Financeira',
          tabBarIcon: ({ color }) => <MaterialIcons
            name="cast-for-education"
            size={25}
            color={'black'}
          />,
          headerLeft: () => (
            <Image 
              source={LogoCaduca} 
              style={{
                width: 30,
                height: 30,
                marginLeft: 10
              }}/>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <MaterialIcons
                name="cast-for-education"
                size={25}
                color={'black'}
                style={{ marginRight: 15 }}
              />
              {/* <MaterialIcons name="payments" size={24} color="black" /> */}
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
