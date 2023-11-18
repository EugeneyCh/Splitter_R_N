import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
// import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import SelectTip from './src/components/SelectTip';

export default function App() {
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <ScrollView style={styles.container}>
          <Header />
          <StatusBar style="auto" />
          <SelectTip />
        </ScrollView>
        {/* <AppNavigation /> */}
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c4e4e7',
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
});
