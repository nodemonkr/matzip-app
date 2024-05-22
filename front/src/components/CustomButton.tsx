import React from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../constants';

//  pressableprops를 상속받은 이유는 custombutton로 각 컴포넌트에서 onpress 이벤트를 보내는데
// onpress이벤트를 처리하기 위해서는 PressableProps를 상속받아서 사용해야한다
interface CustomButtonProps extends PressableProps {
  label: string; // 버튼의 이름을 나타내기 위한 속성
  variant?: 'filled' | 'outlined'; // variant 속성은 색상이있는 버튼인지 테두리 색만 있는 버튼인지 구분
  size?: 'large' | 'medium'; // 버튼의 사이즈
  inValid?: boolean; // 버튼의 비활성화 상태
}
// 스마트폰 기기의 화면 정보를 가져옴 (스타일을 기기마다 다르게하기 위해서)
const deviceHeight = Dimensions.get('screen').height;

function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  ...props
}: CustomButtonProps) {
  return (
    // 여러 스타일을 적용할 때는 배열[]안에 콤마로 구분해서 넣으면 된다
    <Pressable
      disabled={inValid}
      // inValid가 true일때만 styles.invlid 적용
      style={({pressed}) => [
        styles.container,

        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
      ]}
      {...props}>
      <View style={styles[size]}>
        <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inValid: {
    opacity: 0.5,
  },
  filled: {
    // backgroundColor: colors.PINK_700,
    backgroundColor: colors.ORANGE_700,
  },
  outlined: {
    // borderColor: colors.PINK_700,
    borderColor: colors.ORANGE_700,
    borderWidth: 1,
  },
  filledPressed: {
    // backgroundColor: colors.PINK_700,
    backgroundColor: colors.YELLOW_700,
  },
  outlinedPressed: {
    // backgroundColor: colors.PINK_500,
    backgroundColor: colors.YELLOW_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {color: colors.WHITE},
  outlinedText: {color: colors.ORANGE_700},
});

export default CustomButton;
