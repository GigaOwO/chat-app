import { Profiles } from '@/_lib/graphql/API';
import { THEME_COLORS } from '@/(aurora)/_containers/ThemeColors/constants';

export function getThemeColorFromCustomData(profile: Profiles): string {
  const DEFAULT_THEME_COLOR = THEME_COLORS[0].value;

  if (!profile.customData) return DEFAULT_THEME_COLOR;

  try {
    const customData = JSON.parse(profile.customData);
    const colorId = customData.themeColor;
    const color = THEME_COLORS.find(c => c.id === colorId);
    return color ? color.value : DEFAULT_THEME_COLOR;
  } catch {
    return DEFAULT_THEME_COLOR;
  }
}