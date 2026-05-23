export type Setting = {
  key: string;
  value: string;
  updated_at?: string;
};

export type SettingPayload = {
  value: string;
};
