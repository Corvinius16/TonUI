import { UPDATE_THEME } from '../constants/actionConstants';
import { DARK_THEME, LIGHT_THEME } from '../constants/themeConstants';
import  ITheme  from '../types/ThemeType';
import  {UpdateThemeActionType} from '../actions/themeActions'
import {ThemeType} from '../types/ThemeType';

type themeState = ITheme;

const initialThemeState: ITheme = {
    themeType: ThemeType.Dark
}
const style = document.getElementById('style-direction') as HTMLLinkElement;
const UpdateTheme = (state = initialThemeState, action: UpdateThemeActionType): themeState=> {
  switch (action.type) {
    case UPDATE_THEME :
        const {themeType} = action;
        state = {
            themeType,
        }
        if(themeType == ThemeType.Dark){
            style.href=DARK_THEME
        }
        else{
            style.href=LIGHT_THEME
        }
        return state;
    default:
      return state;
  }
}
  
export default UpdateTheme;

