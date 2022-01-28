import { UPDATE_THEME } from '../constants/actionConstants';
import  { ThemeType } from '../types/ThemeType';
interface IUpdateThemeAction{
    type: typeof UPDATE_THEME,
    themeType:ThemeType,
}
export type UpdateThemeActionType = IUpdateThemeAction;

export const UpdateThemeAction = (theme:ThemeType):IUpdateThemeAction =>({
    type:UPDATE_THEME,
    themeType: theme
})



