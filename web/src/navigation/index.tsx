/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { FC, useCallback, useEffect, useState } from "react";
import { FC } from "react";
//import { ColorSchemeName } from "react-native";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

// import { Deck, RootStackParamList, RootTabParamList } from "../types";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<main></main>}>
      <Route path="deck" element={<></>} />
      <Route path="queue" element={<></>} />
      <Route path="not-found" element={<></>} />
      <Route path="modal" element={<></>} />
    </Route>
  )
);

export const Navigation: FC = () => <RouterProvider router={router} />;
