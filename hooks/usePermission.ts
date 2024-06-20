import { useEffect, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native";

export default function usePermission(deps: any[]) {
  const [granted, setGranted] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);

  const startRequest = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    const launchPermission = async () => {
      if (Platform.OS === "android") {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        ];

        for (const permission of permissions) {
          const granted = await PermissionsAndroid.request(
            permission,
            {
              title: "Bluetooth Permission",
              message: "This app needs access to your Bluetooth in order to connect with Smart Sophia Scale",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setGranted([...granted, permission]);
          }
        }
      }
    }
    launchPermission();

  }, [refresh, ...deps])

  return { granted, startRequest };
}