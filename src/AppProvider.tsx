/**
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface ProvideProps {
  children: JSX.Element | JSX.Element[];
}

function AppProviders(props: ProvideProps) {
  const { children } = props;

  return (
    <SafeAreaProvider>{children}</SafeAreaProvider>
  );
}

export default AppProviders;
