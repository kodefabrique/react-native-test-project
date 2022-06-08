import DeviceInfo from 'react-native-device-info';
import { version } from '../../package.json';
import { Platform } from 'react-native';
import { IData } from 'types';

function getDeviceInfo() {
  try {
    const deviceId = DeviceInfo.getDeviceId();
    const device = DeviceInfo.getDeviceSync();
    const deviceName = DeviceInfo.getDeviceNameSync();
    const brand = DeviceInfo.getBrand();
    const bundleId = DeviceInfo.getBundleId();
    const firstInstallTime = DeviceInfo.getFirstInstallTimeSync();
    const fingerprint = DeviceInfo.getFingerprintSync();
    const hardware = DeviceInfo.getHardwareSync();

    const baseInfo = {
      hardware,
      deviceId,
      device,
      deviceName,
      brand,
      bundleId,
      firstInstallTime,
      fingerprint,
    };

    return Object.keys(baseInfo)
      .map((key) => `${key}: ${baseInfo[key]}`)
      .join(', ');
  } catch {
    return '';
  }
}

function getType() {
  return Platform.OS === 'ios' ? 2 : 1;
}

function getUserAgent() {
  try {
    return DeviceInfo.getUserAgentSync();
  } catch {
    return '';
  }
}

export function getHeader() {
  return {
    'Application-Info': getDeviceInfo() || '',
    'Application-Version': version || '',
    'Application-Type': getType() || 1,
    'user-agent': getUserAgent() || '',
  };
}

function convertPartsDataToString(data: IData) {
  return !data ? '' : typeof data === 'object' ? JSON.stringify(data) : String(data);
}

export function composeScheme(parts: TemplateStringsArray, partsData: IData[]) {
  return parts
    .map((part, index) => part + convertPartsDataToString(partsData[index]))
    .reduce((acc, next) => acc + next, '');
}
